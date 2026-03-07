# import-h5-doc

将 H5 格式的 Word 文档内容导入到 portfolio 的指定路由子页面中。

**用法：**
```
/import-h5-doc <route> <doc-file-path-or-content>
```

**示例：**
```
/import-h5-doc /jidu-hmi/3d-map ./docs/3d-map.docx
/import-h5-doc /phoenix-ai/fuli-plus
```

---

## 执行步骤

### 前置：读取上下文

1. 读取 `src/pages/H5DocContent.tsx` 了解当前已注册的路由和代码结构
2. 读取 `src/constants/routeDepth.ts` 确认目标路由存在于 `PAGE_META`
3. 如果 `$ARGUMENTS` 提供了文件路径，读取该文件；否则，如果文件路径是 `.docx`，提示用户先将文档内容粘贴为纯文本或 Markdown

---

### Step 1 — 解析文档结构

将传入的文档按照以下 H5 层级解析（不区分来源是 Word / Markdown / 纯文本）：

| 文档元素 | 识别方式 |
|---------|---------|
| **H1** | Word 样式"标题1" / `# ` / 全大写独行 / 中文章节编号（一、二、三） |
| **H2** | Word 样式"标题2" / `## ` / 中文小节（1.1、2.1） |
| **正文段落** | 普通段落文字 |
| **列表项** | `- ` / `• ` / `·` / 中文顿号前缀或数字序号 |
| **图片引用** | `[图 x-x]` / `图片：xxx` / `IMAGE` / `.png/.jpg` 文件名 |
| **视频引用** | `[视频 x-x]` / `视频：xxx` / `VIDEO` / `.mp4/.mov` 文件名 |
| **图注** | 紧跟图片/视频的行，以"图"/"视频"+"编号"+"说明"构成 |

---

### Step 2 — 映射为 TSX 代码

将解析结果转换为 `SectionData[]`，遵循 `H5DocContent.tsx` 中已有的样式函数和规范：

**结构映射规则：**

```
每个 H1 → 一个 SectionData 条目
  id:      kebab-case 的英文 slug（不含数字前缀）
  numeral: 两位数字序号（'01', '02' …）
  title:   H1 标题原文
  blocks:  以下内容组成一个 <> fragment：
    H2 → <h2 style={h2Style(accentColor)}>
            <span style={{ width:3, height:12, borderRadius:2, background:accentColor, opacity:0.9 }} />
            H2标题文字
          </h2>
    段落 → <p style={paragraphStyle()}>文字</p>
    列表 → <ul style={{ margin:'10px 0 0', padding:0, listStyle:'none', display:'grid', gap:6 }}>
              {['项1','项2'].map(item => (
                <li key={item} style={{ color:'#a99679', fontSize:'12px', lineHeight:1.8, display:'flex', gap:8 }}>
                  <span style={{ color:accentColor }}>—</span><span>{item}</span>
                </li>
              ))}
            </ul>
    图片引用 → <div style={mediaBlockStyle()}>
                  <div style={placeholderStyle('image', accentColor)}>IMAGE · 图注文字</div>
                  <div style={{ marginTop:8, color:'#7f6f55', fontSize:'10px' }}>图 x-x 图注</div>
                </div>
    视频引用 → <div style={mediaBlockStyle()}>
                  <div style={placeholderStyle('video', accentColor)}>VIDEO · 文件名或主题</div>
                  <div style={{ marginTop:8, color:'#7f6f55', fontSize:'10px' }}>视频 x-x 说明</div>
                </div>
```

**生成函数命名规则：**
- 路由 `/jidu-hmi/unity3d-camera` → 函数名 `getUnity3dCameraSections`
- 路由 `/phoenix-ai/fuli-plus` → 函数名 `getFuliPlusSections`
- 路由 `/personal/language-diary` → 函数名 `getLanguageDiarySections`
- 规则：取路由最后一段，转为 camelCase，加 `get` 前缀和 `Sections` 后缀

**生成模板（插入到文件中已有函数之后、`H5Section` 组件之前）：**
```tsx
function get<Name>Sections(accentColor: string): SectionData[] {
  return [
    {
      id: '<slug>',
      numeral: '01',
      title: '<H1标题>',
      blocks: [
        <>
          {/* ... 转换后的内容 ... */}
        </>,
      ],
    },
    // ... 更多 sections
  ];
}
```

---

### Step 3 — 注册路由

在 `H5DocContent.tsx` 的 `export default function H5DocContent` 中，找到路由选择逻辑：

**当前模式（简单 ternary）：**
```tsx
const sections = route === '/jidu-hmi/unity3d-camera' ? getUnitySections(accentColor) : getRuleSections(accentColor);
```

**如果只有 2 个路由 → 扩展为三元：**
```tsx
const sections =
  route === '/jidu-hmi/unity3d-camera' ? getUnitySections(accentColor) :
  route === '<new-route>' ? get<Name>Sections(accentColor) :
  getRuleSections(accentColor);
```

**如果已有 3 个以上路由，或新增后超过 3 个 → 改为 switch/map（一次性重构）：**
```tsx
const sectionMap: Record<string, (c: string) => SectionData[]> = {
  '/jidu-hmi/unity3d-camera': getUnitySections,
  '<existing>': get<Existing>Sections,
  '<new-route>': get<Name>Sections,
};
const sections = (sectionMap[route] ?? getRuleSections)(accentColor);
```

---

### Step 4 — 验证

1. 运行 `npx tsc --noEmit` 确认无类型错误
2. 报告：
   - 新增了哪个函数 (`get<Name>Sections`)
   - 注册的路由字符串
   - 生成了多少个 SectionData 条目（H1 节数）
   - 哪些段落需要人工补充真实内容（图片/视频占位）

---

## 内容处理约定

- **不要改写或精简文档内容**，原文的中文文字原样保留进 `<p>` 标签
- **图片/视频**：无法导入真实素材，统一生成占位块；图注原文保留
- **代码块**（Word 中的代码格式）→ 用 `<pre>` 包裹，样式 `{ fontSize:'11px', color:'#c8a96e', background:'rgba(200,169,110,0.06)', padding:'10px 12px', borderRadius:4, overflowX:'auto', margin:'8px 0' }`
- **表格** → 转为带标题的列表组，每行作为一个 `<li>` 条目，标题行作为 `<h2>`
- **加粗文字** → `<strong style={{ color:'#efe4d0' }}>文字</strong>`
- **长段落（>200字）** → 按语义断点拆分为多个 `<p>` 标签

---

## 注意事项

- 导入前先检查该路由是否已在 `H5DocContent.tsx` 中注册，若已注册则询问用户是否覆盖
- 若用户未提供文档内容或文件路径，提示：`请提供文档内容。可粘贴纯文本/Markdown，或提供文件路径（.txt / .md）`
- `.docx` 文件无法直接读取，提示用户用 Word "另存为纯文本" 或 Pandoc 转换
