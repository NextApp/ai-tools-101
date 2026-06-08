---
name: content-pipeline
description: 内容文章全生命周期管理——创建、审查、修改、发布的标准化流程。协调内容创作、Prompt优化师、事实核查员、内容主编、内容编辑五个Agent协同工作。当需要写新文章、修改现有文章、或发布文章时加载此skill。
user-invocable: true
allowed-tools: Bash(git *), Bash(npm *), Bash(python3 *)
---

# 内容文章全生命周期流水线

此 skill 定义了 AI 工具内容站点的文章生产标准化流程。五个 agent 串行协作，每阶段有明确的质量门。

## Agent 清单

| Agent ID | 名称 | 职责 |
|----------|------|------|
| [@内容创作](mention://agent/24f88291-928b-47e2-b5cc-ac71241b0eea) | 内容创作 | 按 Prompt 生成文章初稿 |
| [@Prompt优化师](mention://agent/55f668b8-a6d3-471a-b339-a4751c68c72f) | 优化 Prompt | 把选题变成强化版写作指令 |
| [@事实核查员](mention://agent/44db8f15-4678-4719-8181-fdf437e25f19) | 核查事实 | 验证版本号/价格/功能/引用 |
| [@内容主编](mention://agent/a530a75a-e520-439a-908a-3b88a02f9ef2) | 提升质量 | 去AI味/吸引力/人性化 |
| [@全栈开发](mention://agent/d5da950d-d09a-4339-a250-0fda55877354) | 格式校验+发布 | Description/字数/链接/日期 + commit |

## 场景一：创建新文章

### 阶段 0：选题确认
用户提供选题关键词或 X 帖子链接。
如果信息不足（没给工具名/文章角度/目标读者），先追问补齐再进入阶段 1。

### 阶段 1：Prompt 优化（→ Prompt优化师）
把选题发给 Prompt优化师，让他输出强化版写作指令。
输出必须包含：选题角度、目标读者画像、差异化叙事策略、必须包含的 H2 结构、格式约束。
确认 Prompt 质量后进入阶段 2。

### 阶段 2：文章生成（→ 内容创作）
把优化后的 Prompt 发给内容创作，让他写初稿。
生成后检查：
- 文件是否放在 `src/content/posts/`？
- Frontmatter 是否完整（title, pubDate, updatedDate, tags, description）？
- pubDate 必须是**当天实际日期**（如今天是 6月8日，写 `2026-06-08`）
- 字数是否达标？

### 阶段 3：事实核查（→ 事实核查员）
把文章发给事实核查员。
输出：标注所有不准确之处 + 修正版本 + 来源。
如果核查员标注了问题，回到阶段 2 要求内容创作根据标注修改。

### 阶段 4：质量提升（→ 内容主编）
把修改后的文章发给内容主编。
输出：逐段标注 AI 套话、开篇钩子弱点、信息密度问题、人性化缺失。
如果主编标注了问题，要求内容创作逐条修改。

### 阶段 5：格式校验（→ 全栈开发）
最终检查：
```bash
python3 -c "
import os, re
# 检查 description 150-160 chars
# 检查 字数 >= 1500
# 检查 外链 >= 2
# 检查 内链 >= 2
# 检查 pubDate 是当天日期
# 检查 updatedDate 存在
"
npm run build  # 确认 0 errors
```
如果有任何一项不通过，修好后重新 build。

### 阶段 6：发布
```bash
git add src/content/posts/
git commit -m "feat: add [文章标题]"
git push origin main
```
Vercel 自动部署。发布后回复用户：文章标题 + 链接 + 关键指标。

## 场景二：修改现有文章

1. 用户指定要改哪篇文章 + 要改什么
2. 如果用户给的方向不具体，先跑一次内容主编审查找问题
3. 涉及事实类修改 → 事实核查员
4. 涉及质量/风格类修改 → 内容主编
5. 改完后跑阶段 5 格式校验
6. 更新 updatedDate 为当天日期
7. commit 信息用 `fix:` 前缀

## 场景三：发布文章（文章已写好，只差发布）

如果文章文件已经在 `src/content/posts/` 里，只需要校验和发布：
1. 跑阶段 5 格式校验
2. npm run build 确认无误
3. git commit + push
4. 告诉用户已发布 + 链接

## 格式校验脚本

每篇文章发布前必须通过以下检查，把下面的 Python 脚本跑一遍：

```python
import os, re

# 改成你要检查的文件名
FILE = "src/content/posts/your-article.md"

c = open(FILE).read()
front = c.split('---', 2)[1]
body = c.split('---', 2)[-1]

# Description length
desc = re.search(r'description:\s*"?(.+?)"?\s*\n', front)
dl = len(desc.group(1).strip()) if desc else 0
print(f"Description: {dl} chars {'✅' if 150<=dl<=160 else '⚠️  MUST BE 150-160'}")

# Word count
wc = len(body.split())
print(f"Word count: {wc} {'✅' if wc>=1500 else '⚠️  MUST BE >= 1500'}")

# External links
ext = len(re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', body))
print(f"External links: {ext} {'✅' if ext>=2 else '⚠️  NEED >= 2'}")

# Internal links
intern = len(re.findall(r'\[([^\]]+)\]\((/blog/[^)]+)\)', body))
print(f"Internal links: {intern} {'✅' if intern>=2 else '⚠️  NEED >= 2'}")

# pubDate check
pub = re.search(r'pubDate:\s*(.+)', front)
print(f"pubDate: {pub.group(1).strip() if pub else 'MISSING'}")

# updatedDate check
upd = re.search(r'updatedDate:\s*(.+)', front)
print(f"updatedDate: {upd.group(1).strip() if upd else 'MISSING ⚠️'}")

# Tags check
tags = re.search(r'tags:\s*\[.*?\]', front)
print(f"Tags: {'✅' if tags else 'MISSING ⚠️'}")
```

## 注意事项

- **pubDate 规则**：必须写当天实际日期。不要凭记忆写，不要抄其他文章的日期。问自己"今天是几号？"
- **description 规则**：严格 150-160 字符，超了会被 Google 截断，短了浪费展示空间
- **updatedDate 规则**：修改已有文章时必须更新为当天日期
- **提交信息规则**：新文章用 `feat:`，修改用 `fix:`，删除用 `chore:`
- **不要跳过阶段**：每个阶段都是质量门，跳过任何一个都会在投产时暴露问题
