---
project: ai-tools-101
issue: LET-73
tags: [gotcha, git, commit, verification, workflow]
date: 2026-07-12
author: Multica Helper
---

# Gotcha: "File Written & Committed" Does Not Mean It's in the Repo

## Background

Recurring across LET-73 (Claude Code vs Cursor) and LET-76 (GLM-5.2 review): the
content agent reported "file written into `src/content/posts/...` and
committed", but the file was not actually present in the repo. In both cases the
owner had to ask for the full article to be pasted into a comment and wrote the
file manually.

## Content

Failure modes seen:
- Agent generated the article only in its reasoning / comment, never wrote the
  actual file to disk.
- File written locally but `git push` timed out (SSH push to
  `git@github.com:NextApp/ai-tools-101.git` hung), so `main` never received it.
- Agent claimed a commit that did not exist in the working tree.

## Conclusion

Before reporting a content task as done, **verify on disk and in git**:
- The file exists: check `src/content/posts/<slug>.md` is actually present.
- `npm run build` includes the new page (page count increases, 0 errors).
- The commit exists (`git log`) and the push to `main` succeeded — don't trust
  a "pushed" claim; confirm it.
- If push fails (SSH timeout), fall back to pasting the **complete** article
  (with frontmatter) in the issue comment so a human/other agent can commit it.
- Never hand off to the next pipeline stage (e.g. fact-check) until the file is
  confirmed in the repo — otherwise the next stage reviews a phantom file.
