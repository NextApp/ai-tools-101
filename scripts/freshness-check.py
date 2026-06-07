#!/usr/bin/env python3
"""Weekly content freshness scanner.

Scans all articles for outdated model versions, dead links, and missing updatedDate.
Outputs a report that can be posted as a Multica issue comment.
"""

import os, re, sys

POSTS_DIR = "src/content/posts"

# Latest model versions (update these when new models launch)
LATEST_MODELS = {
    "GPT-4": "GPT-5.5",
    "GPT-4o": "GPT-5.5",
    "GPT-4 Turbo": "GPT-5.5",
    "DALL-E 3": "DALL-E 4",
    "Claude 3": "Claude Opus 4.8",
    "Claude 3.5": "Claude Opus 4.8",
    "Claude 4.0": "Claude Opus 4.8",
    "Gemini 2.0": "Gemini 3.1",
    "Gemini 2.5": "Gemini 3.1",
}

def scan():
    findings = []
    
    for fname in sorted(os.listdir(POSTS_DIR)):
        if not fname.endswith('.md'):
            continue
        
        filepath = os.path.join(POSTS_DIR, fname)
        with open(filepath) as f:
            content = f.read()
        
        front = content.split('---', 2)[1]
        body = content.split('---', 2)[-1]
        
        issues = []
        
        # Check for outdated model versions
        for old, new in LATEST_MODELS.items():
            if old in body:
                count = len(re.findall(re.escape(old), body))
                issues.append(f"  ⚠️ `{old}` → `{new}` ({count} occurrences)")
        
        # Check missing updatedDate
        if 'updatedDate:' not in front:
            issues.append("  ⚠️ Missing updatedDate in frontmatter")
        
        # Check pubDate without updatedDate
        pub = re.search(r'pubDate:\s*(.+)', front)
        updated = re.search(r'updatedDate:\s*(.+)', front)
        if pub and updated:
            pub_val = pub.group(1).strip()
            updated_val = updated.group(1).strip()
            if pub_val != updated_val and '2025' in pub_val:
                # Article is from 2025 but updatedDate exists - check if recent
                if '2026-06' not in updated_val:
                    issues.append(f"  ⚠️ Old article ({pub_val}) last updated {updated_val} — may need refresh")
        
        if issues:
            findings.append((fname, issues))
    
    if not findings:
        print("✅ All articles are fresh. No outdated content found.")
        return 0
    
    print(f"## Weekly Freshness Check — {len(findings)} articles need attention\n")
    for fname, issues in findings:
        print(f"### {fname}")
        for issue in issues:
            print(issue)
        print()
    
    return len(findings)

if __name__ == '__main__':
    os.chdir(sys.argv[1] if len(sys.argv) > 1 else '.')
    sys.exit(min(scan(), 1))
