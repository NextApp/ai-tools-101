---
title: "How to Use ChatGPT for Coding: A Beginner's Step-by-Step Guide"
description: "Learn how to use ChatGPT for coding with this beginner-friendly step-by-step guide. Build real projects, debug code, and understand when to use AI vs. learning to code yourself."
pubDate: 2026-06-03
tags: ['ChatGPT', 'Coding', 'Beginners', 'Python', 'JavaScript']
---

I taught my neighbor's 14-year-old son to build a working weather app using ChatGPT in under two hours. He had never written a line of code before. By the end of the session, the app fetched real-time data from an API and displayed it in a browser. That experience convinced me: ChatGPT fundamentally changes what "learning to code" looks like in 2026.

But here's what nobody tells you — ChatGPT is also really good at helping you write bad code. It will confidently generate solutions that look right but fail on edge cases. It will suggest outdated libraries. It will write code you don't understand, and when that code breaks, you'll have no idea how to fix it.

This guide walks the line between those two realities. You'll learn what ChatGPT can actually do for coding, set it up properly, build five real projects, and — most importantly — understand when to let the AI drive and when to open a proper tutorial.

## What Can ChatGPT Actually Do for Coding?

### Understanding ChatGPT's Coding Capabilities

ChatGPT handles a surprisingly broad range of programming tasks. Here's what the current models (GPT-4o and o-series) can do reliably:

| Task | Reliability | Notes |
|------|-------------|-------|
| Generate standalone functions | High | Single-purpose functions with clear inputs/outputs work best |
| Explain existing code | High | Paste code and ask "what does this do?" — near-perfect results |
| Debug error messages | High | Give it the error + relevant code, it finds issues fast |
| Write tests | Medium-High | Good for unit tests; needs review for integration tests |
| Build full applications | Medium | Works for simple CRUD apps; falls apart on complex state management |
| Optimize performance | Medium | Suggestions are often correct but sometimes miss context |
| System design | Low-Medium | Useful for brainstorming but not architectural decisions |

ChatGPT knows Python, JavaScript, TypeScript, HTML/CSS, SQL, Bash, and Ruby particularly well. Its knowledge of Rust, Go, C++, and Java is solid but less exhaustive. For niche languages like Elixir, Haskell, or COBOL, expect more hallucinations.

**What it can't do reliably:**

- Maintain a mental model of your full codebase across multiple files
- Follow complex architectural constraints without reminders
- Guarantee security best practices (never trust it for auth code without review)
- Predict how changes will affect production systems with real users

**The model matters.** The free tier (GPT-4o mini) handles boilerplate and syntax questions fine but struggles with multi-step logic. The paid GPT-4o model handles complex refactors and catches subtle bugs that the free tier misses. If you're coding daily, the $20/month Plus plan pays for itself within the first debugging session.

### ChatGPT Free vs Plus vs Pro for Coding — Which Tier Do You Need?

| Feature | Free (GPT-4o mini) | Plus ($20/mo) | Pro ($200/mo) |
|---------|-------------------|---------------|---------------|
| Code quality | Good for snippets | Solid for full features | Excellent, with o-series reasoning |
| Context window | 8K tokens | 32K tokens | 128K tokens |
| File uploads | Images only | Code files, images, PDFs | Everything, plus large repos |
| Code interpreter | No | Yes (analyzes CSVs, runs code) | Yes (advanced) |
| Custom GPTs | Limited | Full access | Full access |
| Who it's for | Trying it out | Daily coding work | Professional devs shipping daily |

For most beginners, the free tier is enough to follow this guide. Upgrade to Plus when you start hitting rate limits or need to paste entire files for debugging.

## Setting Up ChatGPT for Coding (Step-by-Step)

### Accessing ChatGPT

1. Go to [chat.openai.com](https://chat.openai.com) and create an account (Google/email sign-up works).
2. If you plan to code seriously, subscribe to ChatGPT Plus ($20/month) — you'll hit the free tier's message cap fast when debugging.
3. Install the desktop app (macOS/Windows) for productivity — it has a global shortcut (Option+Space) that opens a chat from anywhere, which beats switching browser tabs every time you need a quick question answered.

No special configuration is needed. ChatGPT works out of the box for coding.

### Recommended Extensions & Integrations

These tools put ChatGPT directly into your coding environment:

**VS Code + Continue:** Install the [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue) in VS Code. Configure it with your OpenAI API key. You get inline code completions, chat-with-codebase, and the ability to highlight code and ask "explain this" or "fix this" without leaving the editor. This is significantly faster than copying code back and forth to a browser tab.

**Terminal with ShellGPT:** `pip install shellgpt` gives you an `sgpt` command. Run `sgpt "extract all URLs from access.log"` and it generates a bash one-liner. Pair this with `sgpt --shell` and it suggests shell commands and asks before executing.

**Raycast + ChatGPT plugin:** If you're on macOS, Raycast's ChatGPT extension lets you highlight code anywhere on your screen and send it to ChatGPT via a keyboard shortcut. Great for quick questions when you're reading docs or code reviews.

For a deeper dive into writing effective instructions for these tools, check out our [prompt engineering guide]({{article-10-url}}).

## 5 Real Coding Projects for Beginners Using ChatGPT

Each project below follows the same pattern: you describe what you want, ChatGPT writes the code, you test it, and you iterate. I've included the exact prompts I used and the resulting code.

### 1. Build a To-Do List Web App in 30 Minutes

Prompt: *"Write a complete to-do list web app in a single HTML file. Include: add tasks, mark as done with a strikethrough, delete tasks, and save tasks to localStorage so they persist after page reload. Use clean modern CSS. No frameworks."*

Here's what ChatGPT produces (tested and working):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo List</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      padding-top: 60px;
    }
    .container {
      background: #fff;
      padding: 32px;
      border-radius: 12px;
      width: 480px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    }
    h1 { margin-bottom: 20px; font-size: 24px; }
    .input-row { display: flex; gap: 8px; margin-bottom: 20px; }
    .input-row input {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
    }
    .input-row button {
      padding: 10px 20px;
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
    .task-list { list-style: none; }
    .task-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .task-item .done { text-decoration: line-through; color: #999; }
    .task-item .task-text {
      flex: 1;
      cursor: pointer;
      font-size: 15px;
    }
    .task-item .delete-btn {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      font-size: 18px;
    }
    .empty { text-align: center; color: #999; padding: 30px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>My Tasks</h1>
    <div class="input-row">
      <input type="text" id="taskInput" placeholder="Add a new task..." />
      <button id="addBtn">Add</button>
    </div>
    <ul class="task-list" id="taskList"></ul>
  </div>

  <script>
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('todos')) || [];

    function save() {
      localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function render() {
      taskList.innerHTML = '';
      if (!tasks.length) {
        taskList.innerHTML = '<li class="empty">No tasks yet. Add one above.</li>';
        return;
      }
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
          <span class="task-text ${task.done ? 'done' : ''}" data-index="${index}">${task.text}</span>
          <button class="delete-btn" data-index="${index}">&times;</button>
        `;
        taskList.appendChild(li);
      });
    }

    taskList.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      if (e.target.classList.contains('task-text')) {
        tasks[index].done = !tasks[index].done;
        save();
        render();
      }
      if (e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1);
        save();
        render();
      }
    });

    addBtn.addEventListener('click', () => {
      const text = taskInput.value.trim();
      if (!text) return;
      tasks.push({ text, done: false });
      taskInput.value = '';
      save();
      render();
    });

    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') addBtn.click();
    });

    render();
  </script>
</body>
</html>
```

Save this as `todo.html` and open it in a browser. You have a working, persistent to-do list. Next step — ask ChatGPT to add due dates, categories, or a dark mode toggle.

Once you've mastered building small apps like this, try using [specialized ChatGPT prompts for productivity]({{article-02-url}}) to speed up your development workflow even more.

### 2. Write a Python Web Scraper from Scratch

Prompt: *"Write a Python script that scrapes the top 10 posts from Hacker News (news.ycombinator.com), extracts each title, URL, and points, and prints them sorted by points descending. Use requests and BeautifulSoup. Include rate limiting (1 second between requests) and a User-Agent header."*

```python
import requests
from bs4 import BeautifulSoup
import time

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/120.0.0.0 Safari/537.36'
}

def fetch_hn_page():
    url = 'https://news.ycombinator.com/'
    resp = requests.get(url, headers=HEADERS, timeout=10)
    resp.raise_for_status()
    return resp.text

def parse_posts(html):
    soup = BeautifulSoup(html, 'html.parser')
    posts = []
    rows = soup.select('tr.athing')
    for row in rows[:10]:
        title_el = row.select_one('.titleline > a')
        points_el = row.find_next_sibling('tr').select_one('.score')
        if title_el:
            posts.append({
                'title': title_el.text,
                'url': title_el.get('href', ''),
                'points': int(points_el.text.split()[0]) if points_el else 0
            })
    return posts

def main():
    print("Fetching Hacker News top posts...")
    html = fetch_hn_page()
    time.sleep(1)
    posts = parse_posts(html)
    posts.sort(key=lambda p: p['points'], reverse=True)

    print(f"\n{'#':<3} {'Points':<8} Title")
    print("-" * 80)
    for i, post in enumerate(posts, 1):
        print(f"{i:<3} {post['points']:<8} {post['title'][:70]}")
        print(f"    URL: {post['url']}\n")

if __name__ == '__main__':
    main()
```

Run it with `pip install requests beautifulsoup4` then `python scraper.py`. The output shows today's top HN posts ranked by upvotes.

**Extend it:** Ask ChatGPT to save results to a CSV, scrape multiple pages, or add keyword filtering.

### 3. Create a Simple API with ChatGPT's Help

Prompt: *"Write a simple REST API using Python FastAPI with three endpoints: POST /items to add an item (name, price), GET /items to list all items, and GET /items/{id} to get one item. Store items in memory as a list. Include Pydantic models for validation."*

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class ItemCreate(BaseModel):
    name: str
    price: float

class Item(ItemCreate):
    id: int

items: List[Item] = []
next_id = 1

@app.post("/items", response_model=Item, status_code=201)
def create_item(item: ItemCreate):
    global next_id
    new_item = Item(id=next_id, **item.model_dump())
    items.append(new_item)
    next_id += 1
    return new_item

@app.get("/items", response_model=List[Item])
def list_items():
    return items

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    for item in items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")
```

Run it with `pip install fastapi uvicorn` then `uvicorn api:app --reload`. Visit `http://localhost:8000/docs` for an auto-generated Swagger UI where you can test all three endpoints directly in the browser.

### 4. Debug a Broken JavaScript Function

Real example: a reader submitted this function that was supposed to calculate the total price of cart items after applying discounts. It was returning `NaN` for certain inputs.

**Before (broken):**

```javascript
function calculateTotal(cart, discountCode) {
  let total = 0;
  const discounts = { 'SAVE10': 10, 'VIP20': 20 };

  for (let i = 0; i <= cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  if (discounts[discountCode]) {
    total = total - (total * discount / 100);
  }

  return total;
}
```

Prompt: *"This function returns NaN sometimes. Find and fix all errors."*

ChatGPT identified three bugs: (1) off-by-one in the loop (`<=` should be `<`), (2) variable name mismatch (`discount` vs `discounts[discountCode]`), (3) no validation for empty cart or missing items.

**After (fixed):**

```javascript
function calculateTotal(cart, discountCode) {
  if (!Array.isArray(cart) || cart.length === 0) return 0;

  const discounts = { 'SAVE10': 10, 'VIP20': 20 };
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') continue;
    total += item.price * item.quantity;
  }

  if (discounts[discountCode]) {
    total -= total * (discounts[discountCode] / 100);
  }

  return Math.round(total * 100) / 100;
}
```

This is ChatGPT's sweet spot — finding bugs that stare you in the face but your brain skips over after looking at the same code for 30 minutes.

### 5. Convert Excel Data to SQL Database

Prompt: *"I have an Excel file 'sales_data.xlsx' with columns: date, product, quantity, revenue, region. Write a Python script that reads this file, creates a SQLite database, creates a table, and inserts all rows. Include error handling for missing columns."*

```python
import pandas as pd
import sqlite3

DB_PATH = 'sales.db'
EXCEL_PATH = 'sales_data.xlsx'

REQUIRED_COLUMNS = ['date', 'product', 'quantity', 'revenue', 'region']

def main():
    try:
        df = pd.read_excel(EXCEL_PATH)
    except FileNotFoundError:
        print(f"Error: '{EXCEL_PATH}' not found.")
        return

    missing = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing:
        print(f"Missing columns: {missing}")
        return

    df = df[REQUIRED_COLUMNS]
    conn = sqlite3.connect(DB_PATH)
    df.to_sql('sales', conn, if_exists='replace', index=False)
    conn.close()

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM sales")
    print(f"Inserted {cur.fetchone()[0]} rows into 'sales' table.")
    cur.execute("SELECT * FROM sales LIMIT 3")
    for row in cur.fetchall():
        print(row)
    conn.close()

if __name__ == '__main__':
    main()
```

Run with `pip install pandas openpyxl` then `python excel_to_sql.py`. You can now run SQL queries against your Excel data.

## Common Mistakes Beginners Make with ChatGPT for Coding

**1. Accepting code without testing it.** ChatGPT wrote you a sorting algorithm? Good. Does it handle an empty array? Does it work with negative numbers? Test it. The model generates plausible-looking code, not verified code.

**2. Treating ChatGPT as a replacement for understanding.** When ChatGPT writes a function and you paste it in, ask it to explain each line. If you can't explain what the code does to someone else, you didn't learn anything — and you'll be stuck when it breaks.

**3. Not providing enough context.** "Fix my code" with no error message, no expected behavior, no stack trace is useless. Give ChatGPT: what you tried, what you expected, what actually happened, and the error message. The quality of the fix correlates directly with the quality of your problem description.

**4. Using an outdated model.** Free-tier GPT-4o mini will sometimes suggest deprecated library versions or removed APIs. If ChatGPT suggests `create-react-app` in 2026, it's behind the times. Always check the official docs of whatever library it recommends.

**5. Expecting it to design architecture.** ChatGPT can write a function. It cannot design a system that handles 10,000 requests per second, manages distributed state, and fails gracefully under load. That requires human judgment.

**6. Copy-pasting API keys or secrets.** Never paste real API keys, passwords, or tokens into ChatGPT. Its training data is not your private session, but it's a bad habit. Use placeholder values.

## FAQ: Does ChatGPT Replace Learning to Code?

**Short answer:** No. But it changes what you need to learn.

Five years ago, a beginner spent weeks memorizing syntax, learning CSS flexbox rules, and debugging semicolon placement. In 2026, ChatGPT handles syntax for you. What it can't do: understand your user's problem, decide what to build, evaluate trade-offs, and verify that the solution actually works.

Here's what you still need to learn:

- **Computational thinking** — breaking problems into steps a computer can execute
- **Debugging methodology** — forming hypotheses, isolating issues, testing assumptions
- **Reading code** — you don't need to write every line, but you must comprehend what ChatGPT produces
- **System design** — how components interact, where bottlenecks live, what fails and how

Here's what you can safely offload to ChatGPT:

- Syntax lookups ("how do I declare a map in Go again?")
- Boilerplate generation (REST endpoints, form validation, file I/O)
- Test scaffolding ("generate 10 edge case inputs for this function")
- Documentation ("add docstrings to every public method")

**The career question.** Will ChatGPT reduce demand for junior developers? The evidence from 2025-2026 suggests the market shifted — companies hire fewer pure "code monkeys" but still desperately need engineers who understand systems, communicate clearly, and solve real business problems. ChatGPT makes the technical bar lower, which means the thinking bar is now higher.

For a broader comparison of AI coding tools beyond ChatGPT, see our [comprehensive comparison of AI coding assistants]({{article-06-url}}).

## Start Here

ChatGPT works best when you treat it as a pair programmer who's fast but occasionally wrong. Start with the To-Do List app above — it takes 30 minutes and you'll have a working product. From there, pick one of the other projects. The key is building things, not just reading about building things.

If you want structured prompts that make ChatGPT more effective for your day-to-day work, grab the [20 best ChatGPT prompts for productivity]({{article-02-url}}) next.
