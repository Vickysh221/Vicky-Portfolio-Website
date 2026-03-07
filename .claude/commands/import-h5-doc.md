# import-h5-doc

将 H5 格式的文档内容导入到 portfolio 的指定路由 + 指定 slide（子子页）中。

**用法：**
```
/import-h5-doc <route> --slide <N> [file-path]
```

- `<route>` — 完整路由，如 `/jidu-hmi/3d-map`
- `--slide <N>` — 目标 slide 的 0-based 索引（默认 0）
- `[file-path]` — 可选文档路径（`.txt` / `.md`）；省略时可直接粘贴内容

**示例：**
```
/import-h5-doc /jidu-hmi/3d-map --slide 0 ./docs/3d-map-overview.md
/import-h5-doc /jidu-hmi/3d-map --slide 1
/import-h5-doc /personal/language-diary --slide 2 ./docs/lang-diary-tech.txt
```

---

## 前置检查（每次执行均需完成）

1. **读取 `src/constants/routeDepth.ts`**
   - 确认 `<route>` 存在于 `PAGE_META`；若不存在，报错停止
   - 读取 `SLIDE_COUNTS[route]`，确认 `--slide N` 在有效范围 `[0, count-1]` 内
     - 若该路由不在 `SLIDE_COUNTS`（count = 1），则只接受 `--slide 0`

2. **读取 `src/pages/H5DocContent.tsx`**
   - 找到 `sectionMap` 对象，列出已注册的所有 key
   - 检查 `'<route>:<N>'` 是否已存在
     - **若已存在**：询问用户是否覆盖（`替换现有内容？[y/N]`），否则停止
     - **若不存在**：继续

3. **获取文档内容**
   - 若提供了文件路径，读取文件
   - 若文件是 `.docx`，提示：`Word 文件无法直接读取，请先运行：pandoc input.docx -o output.md 或 Word → 另存为纯文本`，然后停止
   - 若未提供文件路径，提示：`请粘贴文档内容（纯文本或 Markdown）：`，等待用户输入

---

## Step 1 — 解析文档结构

将文档内容按以下规则解析为层级结构：

| 文档元素 | 识别方式 |
|---------|---------|
| **H1**（章节） | `# 文字` / Word"标题1" / 中文编号行（一、二、…）/ 全大写独行 |
| **H2**（小节） | `## 文字` / Word"标题2" / `1.1`、`2.1` 式小节 |
| **正文段落** | 普通文字行，非标题非列表 |
| **列表项** | `- ` / `• ` / `·` / 数字序号 / 中文顿号 |
| **图片** | `[图 x-x]` / `图片：xxx` / `IMAGE` / `.png/.jpg/.webp` 文件名 |
| **视频** | `[视频 x-x]` / `视频：xxx` / `VIDEO` / `.mp4/.mov` 文件名 |
| **图注** | 紧跟图片/视频的行，格式"图/视频 编号 说明" |
| **代码块** | ` ``` ` 包裹 / 等宽缩进块 |
| **加粗** | `**文字**` / Word 粗体 |
| **表格** | Markdown 表格 / 竖线分隔行 |

---

## Step 2 — 生成函数名

从路由最后一段生成 camelCase 函数名：

```
/jidu-hmi/3d-map      + slide 0 → get3dMapSlide0Sections
/jidu-hmi/3d-map      + slide 1 → get3dMapSlide1Sections
/phoenix-ai/fuli-plus + slide 2 → getFuliPlusSlide2Sections
/personal/language-diary + slide 0 → getLanguageDiarySlide0Sections
```

规则：取路由末段 → kebab→camelCase → 首字母大写 → 加 `get` 前缀 + `Slide${N}` + `Sections` 后缀

---

## Step 3 — 映射为 TSX 函数

遵循 `H5DocContent.tsx` 中已有的样式函数，生成如下结构：

```tsx
function get<Name>Slide<N>Sections(accentColor: string): SectionData[] {
  return [
    {
      id: '<slug>',        // H1标题的 kebab-case 英文 slug
      numeral: '01',       // 两位序号
      title: '<H1标题>',
      blocks: [
        <>
          {/* H2 → */}
          <h2 style={h2Style(accentColor)}>
            <span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor, opacity: 0.9 }} />
            H2标题文字
          </h2>

          {/* 段落 → */}
          <p style={paragraphStyle()}>正文内容原文保留</p>

          {/* 列表 → */}
          <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {['项1', '项2'].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 图片 → */}
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('image', accentColor)}>IMAGE · 图注文字</div>
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 x-x 图注</div>
          </div>

          {/* 视频 → */}
          <div style={mediaBlockStyle()}>
            <div style={placeholderStyle('video', accentColor)}>VIDEO · 文件名或主题</div>
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>视频 x-x 说明</div>
          </div>

          {/* 加粗 → */}
          <strong style={{ color: '#efe4d0' }}>加粗文字</strong>

          {/* 代码块 → */}
          <pre style={{ fontSize: '11px', color: '#c8a96e', background: 'rgba(200,169,110,0.06)',
                        padding: '10px 12px', borderRadius: 4, overflowX: 'auto', margin: '8px 0' }}>
            代码内容
          </pre>

          {/* 表格 → 转为 h2 + ul 列表组，每行作为 li，表头作为 h2 */}
        </>,
      ],
    },
    // 更多 sections...
  ];
}
```

**内容处理约定：**
- 原文中文内容**原样保留**，不精简不改写
- 长段落（>200字）按语义断点拆为多个 `<p>`
- 图片/视频无法导入真实素材，统一占位，图注原文保留
- 表格每行转为 `<li>`，表头转为 `<h2>`

---

## Step 4 — 注册到 sectionMap

在 `H5DocContent.tsx` 中找到 `sectionMap` 对象，追加新条目：

```tsx
// 在文件中 sectionMap 对象定义的最后一个已有条目之后插入新函数和新 key

// 1. 在 sectionMap 上方插入新的 getter 函数（紧接在最后一个 getter 函数之后）
function get<Name>Slide<N>Sections(accentColor: string): SectionData[] { ... }

// 2. 在 sectionMap 对象内追加一行：
'<route>:<N>': get<Name>Slide<N>Sections,
```

**定位锚点（用于 Edit 工具精准替换）：**
- 找 `const sectionMap: Record<...> = {` 结尾的 `};`，在 `};` 前插入新 key
- 找已有函数列表末尾（`// ─── Section map` 注释行上方），插入新函数

---

## Step 5 — 验证

1. 运行 `npx tsc --noEmit`，确认无类型错误
2. 输出摘要报告：

```
✓ 已导入：<route>  slide <N>
  函数名：get<Name>Slide<N>Sections
  注册 key：'<route>:<N>'
  章节数（H1）：<n> 个
  占位块：图片 <x> 个 · 视频 <y> 个（需后续替换为真实素材）

当前 <route> 各 slide 状态：
  slide 0  ✓ 有内容
  slide 1  ✗ 占位符
  slide 2  ✓ 有内容（刚导入）
```

---

## 边界情况

| 情况 | 处理方式 |
|------|---------|
| 路由不在 PAGE_META | 报错，列出可用路由 |
| --slide N 超出 SLIDE_COUNTS 范围 | 报错，提示有效范围 |
| 该 key 已在 sectionMap 中 | 询问是否覆盖 |
| 文档内容为空 | 报错停止 |
| 文档只有正文无 H1 | 将全部内容放入单个 SectionData，numeral='01'，title 取文档首行或路由标题 |
| .docx 文件路径 | 提示转换命令后停止 |
