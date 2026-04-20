import type { CSSProperties } from 'react';
import { createLocalizedTitle, type RenderableSectionTitle, type SectionShape } from '../i18n/sectionBuilders.ts';
import { useI18n } from '../i18n/LanguageProvider.tsx';
import type { LocalizedText } from '../i18n/types.ts';
import { paragraphStyle, h2Style, codeBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import phoenixFrameworkOverview from '../images/phoenix/slide03-img01.png';

function Copy({ value }: { value: LocalizedText }) {
  const { text } = useI18n();
  return <>{text(value)}</>;
}

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

export function getPhoenixComponentFrameworkSlide01Sections(accentColor: string): SectionShape<RenderableSectionTitle>[] {
  return [
    {
      id: 'document-goal',
      numeral: '01',
      title: createLocalizedTitle('组件框架', 'Component Framework'),
      blocks: [
        <>
          <div style={{ marginBottom: '26px', textAlign: 'left' }}>
            <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }}>
              H5 DOCUMENT SPEC · /web-design-develop/component-framework
            </div>
            <div
              style={{
                border: `1px solid ${accentColor}22`,
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '16px',
                background: 'rgba(255,255,255,0.012)',
              }}
            >
              <ImageWithStatus
                src={phoenixFrameworkOverview}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '5px',
                  border: `1px dashed ${accentColor}55`,
                  background: 'rgba(255,255,255,0.01)',
                }}
                alt="Phoenix 组件框架与页面结构总览"
              />
            </div>
            <p style={{ ...paragraphStyle(), marginTop: '10px' }}>
              <Copy value={{ zh: '本文件是 Phoenix 项目的组件状态系统规范。它同时服务 Figma 设计师、前端工程师和 AI Coding Agent（Codex），目标不是仅描述 UI，而是形成一套可推导、可生成、可实现的组件系统。', en: 'This document defines the Phoenix component-state system. It serves Figma designers, frontend engineers, and the AI Coding Agent (Codex). The goal is not to describe UI alone, but to establish a component system that can be inferred, generated, and implemented.' }} />
            </p>
            <p style={{ ...paragraphStyle(), color: '#8f7d61', fontSize: '14px' }}>
              <Copy value={{ zh: '上图对应我整理的网页产品信息架构与组件分层长图，用来统一业务页面、弹窗、表单、列表和 AI 生成工作台之间的组件语言。', en: 'The diagram maps the information architecture and component layers I organized for the web product, aligning the component language across business pages, dialogs, forms, lists, and the AI generation workbench.' }} />
            </p>
          </div>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '文档服务对象', en: 'Document audience' }} /></h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '我和AI Coder的角色', en: 'Roles for me and AI Coder' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '使用方式', en: 'How it is used' }} /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle()}><Copy value={{ zh: 'Figma 设计师', en: 'Figma designer' }} /></td>
                  <td style={tdStyle()}><Copy value={{ zh: '建立 Component Set 与 Variant', en: 'Build component sets and variants' }} /></td>
                </tr>
                <tr>
                  <td style={tdStyle()}><Copy value={{ zh: '前端工程师', en: 'Frontend engineer' }} /></td>
                  <td style={tdStyle()}><Copy value={{ zh: '实现组件 Props / State / Event', en: 'Implement component props, state, and events' }} /></td>
                </tr>
                <tr>
                  <td style={tdStyle()}><Copy value={{ zh: 'AI Coding Agent', en: 'AI coding agent' }} /></td>
                  <td style={tdStyle()}><Copy value={{ zh: '自动生成组件结构与状态逻辑', en: 'Generate component structure and state logic automatically' }} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '规范覆盖内容', en: 'Scope' }} /></h2>
          <ul style={listStyle()}>
            <li><Copy value={{ zh: '视觉 Variant', en: 'Visual variants' }} /></li>
            <li><Copy value={{ zh: '交互 State', en: 'Interaction states' }} /></li>
            <li><Copy value={{ zh: '前端接口', en: 'Frontend interfaces' }} /></li>
            <li><Copy value={{ zh: '组件元信息（metadata）', en: 'Component metadata' }} /></li>
          </ul>
        </>,
      ],
    },
    {
      id: 'core-model-and-global-states',
      numeral: '02',
      title: createLocalizedTitle('组件系统核心模型与全局状态', 'Core component model and global states'),
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '四层模型', en: 'Four-layer model' }} /></h2>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: 'Phoenix 组件统一遵循四层模型，通过 `type / variant / state / theme` 四个维度描述组件实例。', en: 'Phoenix components follow a four-layer model, describing each instance through `type / variant / state / theme`.' }} />
          </p>
          <div style={codeBlockStyle()}>
{`Component
 ├── type
 ├── variant
 ├── state
 └── theme`}
          </div>
          <p style={captionStyle()}>代码块 2-1 Phoenix 组件统一遵循四层模型</p>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '示例', en: 'Example' }} /></h2>
          <div style={codeBlockStyle()}>
{`Button
 ├ type: button
 ├ variant: primary
 ├ state: hover
 └ theme: dark`}
          </div>
          <p style={captionStyle()}>代码块 2-2 组件实例通过 type、variant、state、theme 组合确定</p>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '全局交互状态系统', en: 'Global interaction states' }} /></h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}>State</th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '类型', en: 'Type' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '说明', en: 'Description' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '触发方式', en: 'Trigger' }} /></th>
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

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: '重要原则', en: 'Key principle' }} /></h2>
          <div style={codeBlockStyle()}>
{`pressed ≠ selected`}
          </div>
          <ul style={listStyle()}>
            <li><Copy value={{ zh: 'pressed：瞬时状态', en: 'pressed: instant state' }} /></li>
            <li><Copy value={{ zh: 'selected：持久状态', en: 'selected: persistent state' }} /></li>
          </ul>
        </>,
      ],
    },
    {
      id: 'metadata-schema',
      numeral: '03',
      title: createLocalizedTitle('组件元数据结构', 'Component metadata schema'),
      blocks: [
        <>
          <p style={paragraphStyle()}>
            <Copy value={{ zh: '为了让 Codex 能自动生成组件，建议每个组件都遵循统一 schema。', en: 'To let Codex generate components automatically, each component should follow a consistent schema.' }} />
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
      title: createLocalizedTitle('Button 与 SegmentedControl', 'Button and SegmentedControl'),
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'Button · 组件元数据', en: 'Button · component metadata' }} /></h2>
          <div style={codeBlockStyle()}>
{`{
  name: "Button",
  category: "input",
  variants: ["primary","secondary","tertiary","application","dropdown"],
  states: ["default","hover","pressed","selected","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'Button · Figma 组件结构', en: 'Button · Figma component structure' }} /></h2>
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

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'Button · 前端接口', en: 'Button · frontend API' }} /></h2>
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

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'Button · 状态行为定义', en: 'Button · state behavior' }} /></h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '状态', en: 'State' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '表现', en: 'Appearance' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '触发', en: 'Trigger' }} /></th>
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

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'SegmentedControl · 组件元数据', en: 'SegmentedControl · component metadata' }} /></h2>
          <div style={codeBlockStyle()}>
{`{
  name: "SegmentedControl",
  category: "navigation",
  variants: ["text","iconText"],
  states: ["default","selected","disabled"],
  themes: ["dark","light"]
}`}
          </div>

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'SegmentedControl · 前端接口', en: 'SegmentedControl · frontend API' }} /></h2>
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

          <h2 style={h2Style(accentColor)}><Copy value={{ zh: 'SegmentedControl · 状态行为定义', en: 'SegmentedControl · state behavior' }} /></h2>
          <div style={tableWrapStyle()}>
            <table style={tableStyle()}>
              <thead>
                <tr>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '状态', en: 'State' }} /></th>
                  <th style={thStyle(accentColor)}><Copy value={{ zh: '规则', en: 'Rule' }} /></th>
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
