import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, codeBlockStyle } from './h5Styles';

function captionStyle(): CSSProperties {
  return {
    color: '#7f6f55',
    fontSize: '13px',
    lineHeight: 1.7,
    margin: '6px 0 0',
  };
}

function listStyle(): CSSProperties {
  return {
    margin: '6px 0 10px',
    paddingLeft: '20px',
    color: '#a99679',
    lineHeight: 1.9,
  };
}

function tableWrapStyle(): CSSProperties {
  return {
    margin: '12px 0',
    overflowX: 'auto',
    border: '1px solid rgba(200,169,110,0.15)',
    borderRadius: '6px',
    background: 'rgba(255,255,255,0.012)',
  };
}

function tableStyle(): CSSProperties {
  return {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '560px',
  };
}

function thStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '13px',
    fontWeight: 500,
    textAlign: 'left',
    padding: '10px 12px',
    borderBottom: '1px solid rgba(200,169,110,0.12)',
  };
}

function tdStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '14px',
    lineHeight: 1.7,
    padding: '10px 12px',
    borderBottom: '1px solid rgba(200,169,110,0.08)',
    verticalAlign: 'top',
  };
}

export function getPhoenixComponentFrameworkSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'document-goal',
      numeral: '01',
      title: 'Phoenix 设计系统 · 组件状态规范',
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>
            <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }}>
              H5 DOCUMENT SPEC · /web-design-develop/component-framework
            </div>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              本文件是 Phoenix 项目的组件状态系统规范。它同时服务 Figma 设计师、前端工程师和 AI Coding Agent（Codex），目标不是仅描述 UI，而是形成一套可推导、可生成、可实现的组件系统。
            </p>
          </div>

          <h2 style={h2Style(accentColor)}>文档服务对象</h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}>我和AI Coder的角色</th>
                  <th style={thStyle(accentColor)}>使用方式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle()}>Figma 设计师</td>
                  <td style={tdStyle()}>建立 Component Set 与 Variant</td>
                </tr>
                <tr>
                  <td style={tdStyle()}>前端工程师</td>
                  <td style={tdStyle()}>实现组件 Props / State / Event</td>
                </tr>
                <tr>
                  <td style={tdStyle()}>AI Coding Agent</td>
                  <td style={tdStyle()}>自动生成组件结构与状态逻辑</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={h2Style(accentColor)}>规范覆盖内容</h2>
          <ul style={listStyle()}>
            <li>视觉 Variant</li>
            <li>交互 State</li>
            <li>前端接口</li>
            <li>组件元信息（metadata）</li>
          </ul>
        </>,
      ],
    },
    {
      id: 'core-model-and-global-states',
      numeral: '02',
      title: '组件系统核心模型与全局状态',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>四层模型</h2>
          <p style={paragraphStyle()}>
            Phoenix 组件统一遵循四层模型，通过 `type / variant / state / theme` 四个维度描述组件实例。
          </p>
          <div style={codeBlockStyle()}>
{`Component
 ├── type
 ├── variant
 ├── state
 └── theme`}
          </div>
          <p style={captionStyle()}>代码块 2-1 Phoenix 组件统一遵循四层模型</p>

          <h2 style={h2Style(accentColor)}>示例</h2>
          <div style={codeBlockStyle()}>
{`Button
 ├ type: button
 ├ variant: primary
 ├ state: hover
 └ theme: dark`}
          </div>
          <p style={captionStyle()}>代码块 2-2 组件实例通过 type、variant、state、theme 组合确定</p>

          <h2 style={h2Style(accentColor)}>全局交互状态系统</h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}>State</th>
                  <th style={thStyle(accentColor)}>类型</th>
                  <th style={thStyle(accentColor)}>说明</th>
                  <th style={thStyle(accentColor)}>触发方式</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['default', '基础状态', '初始展示', '默认'],
                  ['hover', '交互状态', '鼠标悬停', ':hover'],
                  ['pressed', '交互状态', '按压瞬态', ':active'],
                  ['selected', '业务状态', '当前选择', 'selected=true'],
                  ['disabled', '可用性状态', '不可交互', 'disabled=true'],
                  ['error', '反馈状态', '输入错误', "status='error'"],
                  ['empty', '数据状态', '数据为空', 'items.length=0'],
                ].map(([state, type, desc, trigger]) => (
                  <tr key={state}>
                    <td style={tdStyle()}>{state}</td>
                    <td style={tdStyle()}>{type}</td>
                    <td style={tdStyle()}>{desc}</td>
                    <td style={tdStyle()}>{trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={h2Style(accentColor)}>重要原则</h2>
          <div style={codeBlockStyle()}>
{`pressed ≠ selected`}
          </div>
          <ul style={listStyle()}>
            <li>pressed：瞬时状态</li>
            <li>selected：持久状态</li>
          </ul>
        </>,
      ],
    },
    {
      id: 'metadata-schema',
      numeral: '03',
      title: '组件元数据结构',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            为了让 Codex 能自动生成组件，建议每个组件都遵循统一 schema。
          </p>
          <div style={codeBlockStyle()}>
{`interface ComponentSpec {
  name: string
  category: 'input' | 'navigation' | 'display' | 'feedback'
  variants: string[]
  states: string[]
  themes: ('dark' | 'light')[]
  props: Record<string, string>
}`}
          </div>
          <p style={captionStyle()}>代码块 4-1 统一 metadata schema 便于设计系统推导和组件自动生成</p>
        </>,
      ],
    },
    {
      id: 'button-and-segmented-control',
      numeral: '04',
      title: 'Button 与 SegmentedControl',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>Button · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Button",
  category: "input",
  variants: ["primary","secondary","tertiary","application","dropdown"],
  states: ["default","hover","pressed","selected","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Button · Figma 组件结构</h2>
          <div style={codeBlockStyle()}>
{`Button
 ├ Variant
 │   ├ Primary
 │   ├ Secondary
 │   ├ Tertiary
 │   ├ Application
 │   └ Dropdown
 ├ State
 │   ├ Default
 │   ├ Hover
 │   ├ Pressed
 │   ├ Selected
 │   └ Disabled
 └ Theme
     ├ Dark
     └ Light`}
          </div>

          <h2 style={h2Style(accentColor)}>Button · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'application'
  | 'dropdown'

interface ButtonProps {
  variant?: ButtonVariant
  disabled?: boolean
  selected?: boolean
  icon?: 'leading' | 'trailing'
  onClick?: () => void
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Button · 状态行为定义</h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}>状态</th>
                  <th style={thStyle(accentColor)}>表现</th>
                  <th style={thStyle(accentColor)}>触发</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Default', '标准背景', '默认'],
                  ['Hover', '提升亮度', 'hover'],
                  ['Pressed', '加深背景', 'active'],
                  ['Selected', '高亮描边', 'selected=true'],
                  ['Disabled', '降低透明度', 'disabled=true'],
                ].map(([state, appearance, trigger]) => (
                  <tr key={state}>
                    <td style={tdStyle()}>{state}</td>
                    <td style={tdStyle()}>{appearance}</td>
                    <td style={tdStyle()}>{trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={h2Style(accentColor)}>SegmentedControl · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "SegmentedControl",
  category: "navigation",
  variants: ["text","iconText"],
  states: ["default","selected","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>SegmentedControl · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface SegmentedOption {
  label: string
  value: string
  disabled?: boolean
}

interface SegmentedControlProps {
  value: string
  options: SegmentedOption[]
  onChange: (value: string) => void
}`}
          </div>

          <h2 style={h2Style(accentColor)}>SegmentedControl · 状态行为定义</h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}>状态</th>
                  <th style={thStyle(accentColor)}>规则</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Default', '未选中'],
                  ['Selected', 'value === option'],
                  ['Disabled', 'option.disabled'],
                ].map(([state, rule]) => (
                  <tr key={state}>
                    <td style={tdStyle()}>{state}</td>
                    <td style={tdStyle()}>{rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>,
      ],
    },
    {
      id: 'input-family-components',
      numeral: '05',
      title: 'Switch、Checkbox、Slider、Input',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>Switch · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Switch",
  category: "input",
  variants: ["toggle","button"],
  states: ["on","off","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Switch · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface SwitchProps {
  checked: boolean
  disabled?: boolean
  type?: 'toggle' | 'button'
  onChange?: (value: boolean) => void
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Checkbox · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Checkbox",
  category: "input",
  variants: ["default"],
  states: ["checked","unchecked","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Checkbox · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface CheckboxProps {
  checked: boolean
  disabled?: boolean
  label?: string
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Slider · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Slider",
  category: "input",
  variants: ["default"],
  states: ["default","dragging","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Slider · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface SliderProps {
  value: number
  min: number
  max: number
  step: number
  disabled?: boolean
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Input · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Input",
  category: "input",
  variants: ["text","number","password","search"],
  states: ["default","focus","filled","error","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Input · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface InputProps {
  value?: string | number
  placeholder?: string
  disabled?: boolean
  status?: 'default' | 'error'
  message?: string
}`}
          </div>
        </>,
      ],
    },
    {
      id: 'dialog-list-search-index',
      numeral: '06',
      title: 'Dialog、List、SearchBar、AlphabetIndex',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}>Dialog · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Dialog",
  category: "feedback",
  variants: ["default","confirm","loading","error"],
  states: ["open","closed"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>Dialog · 前端接口</h2>
          <div style={codeBlockStyle()}>
{`interface DialogProps {
  open: boolean
  type?: 'default' | 'confirm' | 'loading' | 'error'
  title?: string
  description?: string
}`}
          </div>

          <h2 style={h2Style(accentColor)}>List · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "List",
  category: "display",
  variants: ["imageGrid","horizontalCard"],
  states: ["default","selected","empty"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>SearchBar · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "SearchBar",
  category: "input",
  variants: ["default"],
  states: ["default","typing","filled","disabled","noResult"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}>AlphabetIndex · 组件元数据</h2>
          <div style={codeBlockStyle()}>
{`{
  name: "AlphabetIndex",
  category: "navigation",
  variants: ["default"],
  states: ["default","active","disabled"],
  themes: ["dark","light"]
}`}
          </div>
        </>,
      ],
    },
  ];
}
