import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, subtitleStyle } from './h5Styles';

function mediaPlaceholderStyle(): CSSProperties {
  return {
    border: '1px dashed rgba(200,169,110,0.45)',
    borderRadius: 8,
    padding: '16px 14px',
    color: '#c8a96e',
    fontSize: '16px',
    lineHeight: 1.8,
    background: 'rgba(18, 15, 11, 0.45)',
    marginBottom: 6,
  };
}

function captionStyle(): CSSProperties {
  return {
    color: '#8d7960',
    fontSize: '13px',
    lineHeight: 1.7,
    margin: '0 0 12px',
  };
}

function tableCellBase(): CSSProperties {
  return {
    fontSize: '14px',
    color: '#a99679',
    padding: '8px 10px',
    lineHeight: 1.7,
    borderBottom: '1px solid rgba(200,169,110,0.08)',
    verticalAlign: 'top',
    textAlign: 'left',
  };
}

function tableHeaderCell(accentColor: string): CSSProperties {
  return {
    ...tableCellBase(),
    color: accentColor,
    fontSize: '13px',
    letterSpacing: '0.12em',
    fontWeight: 600,
    borderBottom: '1px solid rgba(200,169,110,0.2)',
  };
}

function SRPriorityJudgementTable({ accentColor }: { accentColor: string }) {
  const rows: { condition: string; result: string; note: string }[] = [
    {
      condition: '需要结合 SR 才能理解当前或即将发生的车辆行为',
      result: 'SR 必须显性显示',
      note: '例如变道、匝道进入、复杂交通关系等行为需要依赖环境理解。',
    },
    {
      condition: '当前场景存在较高接管可能性',
      result: 'SR 必须显性显示',
      note: '接管风险上升时，用户需要通过 SR 快速理解周边环境。',
    },
    {
      condition: '当前场景存在较高风险或不确定性，如失败、遮挡、异常',
      result: 'SR 必须显性显示',
      note: '异常或不确定状态下，SR 作为环境反馈主通道优先级更高。',
    },
    {
      condition: '位于 SR 地图上的交互操作本身是高优先级入口',
      result: 'SR 必须显性显示',
      note: '若交互本身依赖 SR 地图完成，则不能隐藏。',
    },
    {
      condition: '以上条件均不满足',
      result: 'SR 非必须显示',
      note: '可让位于路线理解内容，或以下降优先级的小窗形式辅助存在。',
    },
  ];

  const cellBase = tableCellBase();
  const headerCell = tableHeaderCell(accentColor);

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '38%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '42%' }} />
        </colgroup>
        <thead>
          <tr>
            {['判定条件', 'SR 显示规则', '说明'].map((header) => (
              <th key={header} style={headerCell}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.condition} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.condition}</td>
              <td style={{ ...cellBase, color: '#c8b080' }}>{row.result}</td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OpenRoadSRTable({ accentColor }: { accentColor: string }) {
  const rows: { category: string; scene: string; result: string; note: string }[] = [
    {
      category: '手动驾驶',
      scene: '普通手动驾驶',
      result: 'SR 非必须显示',
      note: '用户可依靠实时道路情况与仪表区信息完成驾驶决策。',
    },
    {
      category: '辅助驾驶升级 / 降级',
      scene: '用户主动激活 ASD / LCC',
      result: 'SR 非必须显示',
      note: '用户主动进入智驾，环境风险预期明确。',
    },
    {
      category: '',
      scene: '系统自动升级 ASD / LCC',
      result: 'SR 非必须显示',
      note: '系统能力增强，不需要强制以 SR 作为主视图。',
    },
    {
      category: '',
      scene: '主动或自动降级至 ACC',
      result: 'SR 必须显示',
      note: '接管可能性升高，需要更强的环境理解。',
    },
    {
      category: '退出类场景',
      scene: '即将退出 PPA',
      result: 'SR 必须显示',
      note: '接管准备阶段，需要通过 SR 理解当前道路关系。',
    },
    {
      category: '',
      scene: '即将到达终点 / 途经点 / 收费站服务区',
      result: 'SR 必须显示',
      note: '驾驶行为即将发生明显变化。',
    },
    {
      category: '',
      scene: '系统原因自动退出 / 开门立即退出 / 用户主动退出',
      result: 'SR 通常非必须显示',
      note: '退出原因更明确，不一定需要额外强化环境信息。',
    },
    {
      category: '特定智驾行为',
      scene: '自动变道 / 用户打灯发起变道',
      result: 'SR 必须显示',
      note: '需要观察侧后方与目标车道交通关系。',
    },
    {
      category: '',
      scene: '准备进入匝道 / 进入匝道失败',
      result: 'SR 必须显示',
      note: '道路结构复杂，环境理解优先级高。',
    },
    {
      category: '',
      scene: '红绿灯被遮挡导致停车',
      result: 'SR 必须显示',
      note: '环境不确定性提升。',
    },
    {
      category: '',
      scene: '汇入主路 / 进入辅路 / 进入失败',
      result: 'SR 必须显示',
      note: '交通关系与道路拓扑变化显著。',
    },
    {
      category: '',
      scene: '旁侧避让',
      result: 'SR 必须显示',
      note: '需要结合周边车辆与空间关系完成判断。',
    },
    {
      category: '',
      scene: '正常过红绿灯 / 环岛进出 / 礼让行人',
      result: 'SR 非必须显示',
      note: '行为模式较稳定，不必强制占据主视图。',
    },
  ];

  const cellBase = tableCellBase();
  const headerCell = tableHeaderCell(accentColor);

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '18%' }} />
          <col style={{ width: '34%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <thead>
          <tr>
            {['类别', '场景', 'SR 显示规则', '说明'].map((header) => (
              <th key={header} style={headerCell}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.scene}-${index}`} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.category}</td>
              <td style={cellBase}>{row.scene}</td>
              <td style={{ ...cellBase, color: '#c8b080' }}>{row.result}</td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClosedRoadSRTable({ accentColor }: { accentColor: string }) {
  const rows: { category: string; scene: string; result: string; note: string }[] = [
    {
      category: '默认关系',
      scene: '地库 / 园区等无图或弱图空间',
      result: 'SR 为主视图',
      note: '用户更关注泊车执行与车身周围环境，导航路线降为辅助信息。',
    },
    {
      category: '',
      scene: '进入路线视角',
      result: 'SR 小窗必须显示',
      note: '即使进入路线理解任务，也不能完全失去环境反馈。',
    },
    {
      category: '',
      scene: '路况视角',
      result: '不可进入',
      note: '无图场景下渲染范围有限，不支持完整路况视角。',
    },
    {
      category: '制动与确认机制',
      scene: '搜路 / 算路过程中踩下制动',
      result: '不自动切回 SR',
      note: '但应弹出「回 SR 视角」按键，确认用户意图。',
    },
    {
      category: 'HAVP / APA 场景',
      scene: 'HAVP 学习中',
      result: '导航后台挂起',
      note: '不显示 3D 导航内容。',
    },
    {
      category: '',
      scene: 'HAVP 使用中触发搜路 / 算路',
      result: '进入全览路线视角 + SR 小地图',
      note: '保留环境理解入口。',
    },
    {
      category: '',
      scene: 'APA 使用中用户制动',
      result: '不自动切回 SR',
      note: '提供「回 SR 视角」按键。',
    },
    {
      category: '',
      scene: '泊车中触发搜路 / 算路',
      result: '进入全览路线视角 + SR 小地图',
      note: '路线理解提升，但 SR 仍保留辅助显示。',
    },
  ];

  const cellBase = tableCellBase();
  const headerCell = tableHeaderCell(accentColor);

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '18%' }} />
          <col style={{ width: '32%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
        </colgroup>
        <thead>
          <tr>
            {['类别', '场景', '结果', '说明'].map((header) => (
              <th key={header} style={headerCell}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.scene}-${index}`} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.category}</td>
              <td style={cellBase}>{row.scene}</td>
              <td style={{ ...cellBase, color: '#c8b080' }}>{row.result}</td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScopeTable({ accentColor }: { accentColor: string }) {
  const rows: { domain: string; scene: string }[] = [
    { domain: '开放道路场景', scene: 'ASD 较高阶辅助驾驶' },
    { domain: '', scene: 'LCC 车道保持辅助驾驶' },
    { domain: '', scene: 'ACC 与手动驾驶' },
    { domain: '封闭 / 弱图道路空间', scene: 'HAVP 自动泊入泊出' },
    { domain: '', scene: 'HAVP 泊车路线学习' },
    { domain: '', scene: 'APA 自动泊车' },
    { domain: '', scene: '手动驾驶与泊车场景' },
  ];

  const cellBase = tableCellBase();
  const headerCell = tableHeaderCell(accentColor);

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '34%' }} />
          <col style={{ width: '66%' }} />
        </colgroup>
        <thead>
          <tr>
            {['场景类型', '适用场景'].map((header) => (
              <th key={header} style={headerCell}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.scene}-${index}`} style={{ background: index % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.domain}</td>
              <td style={cellBase}>{row.scene}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function get3dMapSlide02Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'problem-definition',
      numeral: '01',
      title: '问题定义',
      blocks: [
        <>
          <div style={{ color: '#c8a96e', fontSize: '11px', letterSpacing: '0.2em', marginBottom: 8 }}>
            H5 DOCUMENT SPEC · /jidu-hmi/3d-map
          </div>
          <p style={{ ...paragraphStyle(), marginTop: 0 }}>
            在将 2D 路线地图能力引入 3D 地图层后，主视图需要同时承载「路线理解」与「SR 环境理解」两类信息。
            本页用于定义二者在不同驾驶状态下的显示优先级，明确 SR 何时必须作为主视图存在，何时可以作为辅助信息显示。
          </p>
          <h2 style={subtitleStyle(accentColor)}>冲突背景</h2>
          <p style={paragraphStyle()}>
            在搜路、算路、查看路线等路线相关视角下，用户会同时面对路线信息和 SR 环境信息。由于主视图空间有限，这两类信息在不同驾驶状态中会产生优先级冲突。
          </p>
          <h2 style={subtitleStyle(accentColor)}>核心问题</h2>
          <p style={paragraphStyle()}>
            并非所有智驾或手驾状态都需要 SR 强制占据主视图，因此需要明确：在智驾与手驾相关场景中，SR
            何时必须显性显示，何时可以暂时以小窗或隐藏方式辅助呈现。
          </p>
        </>,
      ],
    },
    {
      id: 'decision-basis',
      numeral: '02',
      title: '核心判定依据',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>SR 显示判定表</h2>
          <SRPriorityJudgementTable accentColor={accentColor} />
        </>,
      ],
    },
    {
      id: 'scope',
      numeral: '03',
      title: '适用范围',
      blocks: [
        <ScopeTable accentColor={accentColor} />,
      ],
    },
    {
      id: 'open-road-rules',
      numeral: '04',
      title: '开放道路场景下的 SR 显示规则',
      blocks: [
        <OpenRoadSRTable accentColor={accentColor} />,
      ],
    },
    {
      id: 'closed-road-rules',
      numeral: '05',
      title: '封闭 / 弱图空间下的显示关系',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            在地库、园区等无图或弱图空间中，用户对导航路线本身关注较低，更关注泊车执行情况与车身周围环境，因此
            SR 应以更大尺寸呈现，导航信息则以下降优先级的小窗方式出现。
          </p>
          <ClosedRoadSRTable accentColor={accentColor} />
        </>,
      ],
    },
    {
      id: 'media-placeholders',
      numeral: '06',
      title: '图示与交互占位',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>图片</h2>
          <div style={mediaPlaceholderStyle()}>Image · 2D / 3D 地图主视图优先级关系示意图</div>
          <p style={captionStyle()}>图 6-1 路线理解与 SR 环境理解的主视图优先级关系</p>
          <h2 style={subtitleStyle(accentColor)}>图片</h2>
          <div style={mediaPlaceholderStyle()}>Image · 开放道路与封闭道路场景下的 SR 显示决策表</div>
          <p style={captionStyle()}>图 6-2 各驾驶场景下 SR 是否必须显示的判定示意</p>
          <h2 style={subtitleStyle(accentColor)}>视频</h2>
          <div style={mediaPlaceholderStyle()}>Video · 搜路 / 算路 / 泊车场景中的主视图切换演示</div>
          <p style={captionStyle()}>视频 6-1 路线视角、SR 视角与小窗辅助显示的切换演示</p>
        </>,
      ],
    },
    {
      id: 'usage-notes',
      numeral: '07',
      title: '应用说明',
      blocks: [
        <p style={paragraphStyle()}>
          当前页面适合作为 2D / 3D 地图融合专题下的 H5 文档内容页，直接接入既有 CONTENT 区域即可。页面结构延续既有模板：顶部信息块 +
          分节标题 + 正文说明 + 图像 / 视频占位，不额外引入新的样式定义。
        </p>,
      ],
    },
  ];
}
