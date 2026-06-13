---
name: content-pipeline
description: 内容文章全生命周期管理 v2——数据驱动选题、类型约束、11步协同流水线、26条质量约束、自动分发与效果复盘。所有Agent协作规范。
user-invocable: true
allowed-tools: Bash(git *), Bash(npm *), Bash(python3 *)
---

# 内容文章全生命周期流水线 v2

## Agent 清单

| 顺序 | Agent | 职责 |
|------|-------|------|
| 0 | [@选题审核员](mention://agent/88ef61ae-088c-48f7-ad48-ec02a00c31dd) | 数据驱动选题+审核：GSC数据/工具库存/竞品雷达 |
| 1 | [@Prompt优化师](mention://agent/55f668b8-a6d3-471a-b339-a4751c68c72f) | 把选题变成强化版写作指令 |
| 2 | [@内容创作](mention://agent/24f88291-928b-47e2-b5cc-ac71241b0eea) | 按Prompt生成文章初稿 |
| 3 | [@事实核查员](mention://agent/44db8f15-4678-4719-8181-fdf437e25f19) | 验证版本号/价格/功能/引用准确性 |
| 4 | [@内容主编](mention://agent/a530a75a-e520-439a-908a-3b88a02f9ef2) | 去AI味/吸引力/人性化/信息密度 |
| 5 | [@全栈开发](mention://agent/d5da950d-d09a-4339-a250-0fda55877354) | 格式校验+发布+分发+复盘 |

---

## 完整流程（11步）

```
[数据选题] → [选题审核] → [类型约束] → [Prompt强化] → [文章生成]
    ↓
[事实核查] → [内容主编] → [格式校验] → [发布] → [自动分发] → [7天复盘]
```

### 阶段 0：数据驱动选题（→ 选题审核员，每周一自动触发）
从三个数据源收集候选选题：
1. **GSC 表现分析**：哪些查询给过曝光但排名低？哪些页面曝光高但 CTR 低？
2. **工具库存扫描**：扫 tools.json，找评分高+有affiliate+没被写过独立评测的工具
3. **竞品雷达**：扫 Zapier AI 板块、Every.to、Reddit r/aiTools 的热门话题

**输出**：5-10 个候选选题，按优先级排序：
```
优先级 = (有affiliate × 10) + (搜索量预估 × 5) + (竞争度低 × 3) - (已有覆盖 × 20)
```
取前 3 个进入阶段 1。

### 阶段 1：选题审核（→ 选题审核员）
对每个候选选题，逐项审核：

| 维度 | 检查 |
|------|------|
| 品类匹配 | 是否属于8大品类之一？不匹配 → ❌ 直接reject |
| 竞争度 | SERP前5是谁？DA 80+霸占 → 标记"高风险" |
| 已有覆盖 | 是否已有80%+重合的文章？→ ❌ 同类相食，reject |
| 搜索需求 | 预估月搜索量？<50 → 低优先级 |
| 变现机会 | 覆盖的工具是否有affiliate program？无 → 降级 |
| 时效性 | 热点(48h) vs 常青(可排队) vs 窗口(X天有效) |

**输出**：✅通过 / ⚠️待定 / ❌不通过，带 P0-P3 优先级。

### 阶段 2：文章类型约束（硬约束）

**只允许以下两种类型，其他类型直接 reject：**
- **深度对比（vs）**：A vs B 全面对比，必须有对比表格，必须有"谁适合谁不适合"
- **操作教程（how-to）**："How to do X with Y"，必须有步骤编号，必须有实际代码/操作示例

**明确禁止的类型：**
- ❌ "Best X Tools" 列表文 → 0 曝光已验证无效
- ❌ 品类综述文 → 0 曝光已验证无效
- ❌ 新闻稿/发布会总结 → 无搜索长尾，两周后流量归零
- ❌ 纯观点/趋势分析 → 无搜索意图

### 阶段 3：Prompt 强化（→ Prompt优化师）

### 阶段 4：文章生成（→ 内容创作）

### 阶段 5：事实核查（→ 事实核查员）

### 阶段 6：质量提升（→ 内容主编）

### 阶段 7：格式校验（→ 全栈开发）

### 阶段 8：发布（→ 全栈开发）
```bash
git add src/content/posts/
git commit -m "feat: add [文章标题]"
git push origin main
```

### 阶段 9：自动分发（→ 全栈开发）
- 生成 X/Twitter thread（英文，每条 < 280 字符，钩子+要点+链接）
- 生成 Pinterest Pin（HTML模板截图 → PNG）
- 生成 Pin 描述（标题 + 描述 + 链接 + 2-3个hashtag）

### 阶段 10：7天效果复盘（→ 全栈开发，每周日自动触发）
检查发布 ≥7 天的文章表现：
- 曝光 < 50 → 标记"需优化：改标题/加长内容" → 创建 fix issue
- CTR < 1% → 标记"需优化：改 title 和 description"
- 曝光 > 200 → 标记"成功模式" → 自动给同类选题加权
- 点击 > 10 → 标记"高价值文章" → 加内链、推更多分发

---

## 硬约束清单（违反直接 reject，共 10 条）

| # | 规则 | 检查方式 |
|---|------|---------|
| H1 | **必须英文** | 全文检查，出现中文直接 reject |
| H2 | **只允许两种类型：深度对比(vs) / 操作教程(how-to)** | Stage 2 判断 |
| H3 | **话题必须匹配 8 大品类之一** | Stage 1 判断 |
| H4 | **pubDate 必须是当天实际日期** | 格式校验脚本 |
| H5 | **description 严格 150-160 字符** | 格式校验脚本 |
| H6 | **字数 ≥ 1500** | 格式校验脚本 |
| H7 | **外链 ≥ 2** | 格式校验脚本 |
| H8 | **内链 ≥ 2** | 格式校验脚本 |
| H9 | **npm run build 零 errors** | 发布前最后一步 |
| H10 | **Frontmatter 完整：title, pubDate, updatedDate, tags, description** | 格式校验脚本 |

## 软约束清单（违反需修正，共 13 条）

| # | 规则 | 负责Agent |
|---|------|----------|
| S1 | AI套话禁止：rapidly evolving / furthermore / game-changer / revolutionary / whether you're / unprecedented / unlock the power / dive into / in today's world | 内容主编 |
| S2 | 被动语态密度不能过高 | 内容主编 |
| S3 | 开篇不能用背景介绍开头，必须用具体场景/数据/个人经历 | 内容主编 |
| S4 | 全文至少 1 处个人经验或翻车经历 | 内容主编 |
| S5 | 每个工具评测至少列 2 条"这个工具不适合谁" | Prompt优化师 |
| S6 | 模型版本号必须与当前最新一致：GPT-5.5 / Claude Opus 4.8 / Gemini 3.1 Pro / DALL-E 4 | 事实核查员 |
| S7 | 定价信息必须引用官方当前数据 | 事实核查员 |
| S8 | 平均句长 ≤ 20 词 | 格式校验 |
| S9 | H2 ≥ 6 个 | 格式校验 |
| S10 | 必须有 affiliate disclosure 放在文末 | 内容创作 |
| S11 | 修改已有文章必须更新 updatedDate 为当天 | 发布流程 |
| S12 | 发布时必须自动生成 X 帖子 + Pinterest Pin | 阶段9 |
| S13 | 选题工具必须有 affiliate program，否则降级优先级 | 阶段1 |

## 提交约束（3 条）

| # | 规则 |
|---|------|
| C1 | commit 前缀：新文章 `feat:`，修改 `fix:`，删除 `chore:` |
| C2 | commit message 包含文章标题 |
| C3 | push 到 origin main，不要 force push |

---

## 格式校验脚本（阶段 7 使用）

```python
import os, re, sys

FILE = sys.argv[1] if len(sys.argv) > 1 else "src/content/posts/your-article.md"
c = open(FILE).read()
front = c.split('---', 2)[1]; body = c.split('---', 2)[-1]

all_ok = True

# H4-H10 checks
desc = re.search(r'description:\s*"?(.+?)"?\s*\n', front)
dl = len(desc.group(1).strip()) if desc else 0
ok = 150 <= dl <= 160; all_ok &= ok
print(f"H5 description: {dl} chars {'✅' if ok else '⚠️ MUST BE 150-160'}")

wc = len(body.split()); ok = wc >= 1500; all_ok &= ok
print(f"H6 word count: {wc} {'✅' if ok else '⚠️ MUST BE >= 1500'}")

ext = len(re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', body)); ok = ext >= 2; all_ok &= ok
print(f"H7 external links: {ext} {'✅' if ok else '⚠️ NEED >= 2'}")

intern = len(re.findall(r'\[([^\]]+)\]\((/blog/[^)]+)\)', body)); ok = intern >= 2; all_ok &= ok
print(f"H8 internal links: {intern} {'✅' if ok else '⚠️ NEED >= 2'}")

pub = re.search(r'pubDate:\s*(.+)', front)
print(f"H4 pubDate: {pub.group(1).strip() if pub else 'MISSING ⚠️'}")

upd = re.search(r'updatedDate:\s*(.+)', front)
print(f"H10 updatedDate: {upd.group(1).strip() if upd else 'MISSING ⚠️'}")

tags = re.search(r'tags:\s*\[.*?\]', front)
print(f"H10 tags: {'✅' if tags else 'MISSING ⚠️'}")

# H1: English check
cn_chars = len(re.findall(r'[\u4e00-\u9fff]', body))
print(f"H1 Chinese chars: {cn_chars} {'⚠️ MUST BE ENGLISH' if cn_chars > 0 else '✅'}")

# S8: avg sentence length
sents = re.split(r'[.!?]+', body)
sents = [s.strip() for s in sents if len(s.strip()) > 20]
avg = sum(len(s.split()) for s in sents) / len(sents) if sents else 0
print(f"S8 avg sentence: {avg:.0f} words {'✅' if avg <= 20 else '⚠️'}")

# S9: H2 count
h2s = len(re.findall(r'^## ', body, re.M))
print(f"S9 H2 count: {h2s} {'✅' if h2s >= 6 else '⚠️'}")

print(f"\n{'ALL CHECKS PASSED ✅' if all_ok else 'SOME CHECKS FAILED ⚠️ — fix before publish'}")
```

---

## 注意事项

- **不要跳过阶段**：每个阶段都是质量门
- **pubDate 规则**：必须写当天实际日期，不要凭记忆
- **description 规则**：150-160 字符，Google SERP 截断线
- **updatedDate 规则**：修改已有文章时必须更新
- **语言规则**：全站英文，发现中文直接 reject
- **类型规则**：不是对比就不是教程，就不写
- **数据驱动**：选题优先看 GSC 数据，不是看感觉
