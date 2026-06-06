---
name: multica-git-workflow
description: Use when committing, pushing code, or creating PRs from a checked-out GitHub repo in the agent runtime. Covers SSH-based git push, gh CLI auth detection, fallback PR creation via GitHub web UI, and how to guide the user when authentication is needed.
user-invocable: false
allowed-tools: Bash(git *), Bash(gh *), Bash(multica *)
---

# Git operations in the Multica agent runtime

This skill standardizes how agents interact with git and GitHub from within
the Multica sandbox environment. The agent runtime has SSH access for `git push`
but `gh` CLI typically needs separate token-based authentication.

## The split: SSH git push works, gh CLI needs a token

The agent runtime sandbox has SSH keys configured, so git operations against
`git@github.com` remotes work out of the box:

```bash
git push origin <branch>   # typically works
```

`gh` CLI (GitHub's official CLI for PRs, issues, releases) does NOT inherit
the user's local `gh auth` session. Run `gh auth status` early in every run:

```bash
gh auth status 2>&1
```

If it returns `not logged into any GitHub hosts`, you do NOT have a gh token.
Do not silently skip PR creation — follow the fallback strategy below.

## Standard workflow

### 1. Verify the remote is SSH

Before pushing, confirm the remote uses SSH (not HTTPS):

```bash
git remote -v
```

If the remote is `https://github.com/...`, switch it to SSH:

```bash
git remote set-url origin git@github.com:<owner>/<repo>.git
```

### 2. Commit changes

```bash
git add <files>
git commit -m "type: short description"
```

Commit message convention: use conventional commits where practical
(`feat:`, `fix:`, `chore:`, `docs:`). Keep it under 72 chars for the summary line.

### 3. Push

```bash
git push origin <branch>
```

If push succeeds, the branch is on GitHub. If it fails with an SSH error,
report the error to the user — do not retry more than once.

### 4. Create a PR

The canonical path is `gh pr create`, but ONLY if `gh` is authenticated.

**When gh IS authenticated:**

```bash
gh pr create --base main --head <branch> \
  --title "<type>: <short description>" \
  --body "<PR description with issue reference>"
```

Include `Closes <ISSUE-KEY>` in the body if the PR should close the issue on
merge. If the parent issue uses Multica's routable key format (`LET-41`), put
the key in the PR title or branch name so the webhook can auto-link.

Verify by checking the PR list:

```bash
gh pr list --head <branch> --json number,url,state
```

**When gh is NOT authenticated (the common case):**

Do NOT silently give up. Instead:

1. Push the branch (step 3 above — SSH should work).
2. Construct the manual PR creation URL for the user:

```
https://github.com/<owner>/<repo>/pull/new/<branch>
```

3. In the result comment, include:
   - The branch name that was pushed
   - The manual PR creation URL
   - A clear call to action: "Click the link above to create the PR"

4. Also instruct the user on how to authenticate gh for future runs:

```
To enable automatic PR creation in future runs, authenticate gh CLI:
  gh auth login
Select GitHub.com → HTTPS → Login with a web browser, then paste the one-time
code at https://github.com/login/device
```

## Pruning merged branches (optional cleanup)

After a PR merges, the branch can be cleaned up:

```bash
git branch -d <merged-branch>        # delete locally
git push origin --delete <merged-branch>  # delete remote
```

Only do this when explicitly asked or when the run produced a branch that is
now merged and stale.

## Incorrect patterns

```bash
# Don't assume gh is authenticated without checking
gh pr create ...  # will fail silently or with confusing error

# Don't use HTTPS remote — it requires a git credential helper
git remote set-url origin https://github.com/owner/repo.git

# Don't skip PR creation entirely without telling the user
# Always provide the manual PR URL as fallback

# Don't use inline --content for commit messages with special chars
git commit -m "fix: $VAR expansion breaks"  # shell expands $VAR
```

Use `git commit -m 'fix: single-quoted literal string'` or a commit message
file for messages containing `$`, backticks, or quotes.

## Guiding the user: the gh auth login script

When gh is not authenticated and the user asks how to fix it, provide these
exact steps:

1. Open https://github.com/settings/tokens in a browser
2. Generate new token (classic), scope: `repo`, `workflow`
3. Copy the token
4. Run in this environment:

```bash
echo "ghp_YOUR_TOKEN" | gh auth login --with-token
```

Or the interactive path:

```bash
gh auth login
# Select: GitHub.com → HTTPS → Login with a web browser
# Open https://github.com/login/device and enter the one-time code
```

A user with SSH keys configured locally does NOT automatically get gh auth
in the agent sandbox. gh CLI auth is a separate credential that must be
explicitly set in the sandbox environment. Explain this clearly if the user
pushes back.
