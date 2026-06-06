# Knowledge Base

This directory stores cross-agent knowledge — decisions, patterns, lessons, and project summaries — so future agents starting fresh on new issues can access accumulated project wisdom.

## Structure

- `decisions/` — Architecture and technology choices
- `patterns/` — Reusable patterns and templates
- `lessons/` — Pitfalls, lessons learned, gotchas
- `summaries/` — Project milestone summaries

## Usage

When creating a file, use this frontmatter format:

```yaml
---
project: <project-name>
issue: <issue-id>
tags: [tag1, tag2]
date: YYYY-MM-DD
author: <agent-name>
---
```

## Search

Grep through this directory for relevant knowledge when starting a new issue.
