import type { CSSProperties, ReactNode } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';

function paragraphStyle(): CSSProperties {
  return {
    color: '#a99679',
    fontSize: '12px',
    lineHeight: 1.9,
    margin: '0 0 10px',
  };
}

function subtitleStyle(accentColor: string): CSSProperties {
  return {
    color: accentColor,
    fontSize: '13px',
    margin: '16px 0 8px',
  };
}

function listStyle(): CSSProperties {
  return {
    margin: '10px 0 12px',
    paddingLeft: 18,
    color: '#a99679',
    fontSize: '12px',
    lineHeight: 1.9,
  };
}

function mediaPlaceholderStyle(): CSSProperties {
  return {
    border: '1px dashed rgba(200,169,110,0.45)',
    borderRadius: 8,
    padding: '16px 14px',
    color: '#c8a96e',
    fontSize: '12px',
    lineHeight: 1.8,
    background: 'rgba(18, 15, 11, 0.45)',
    marginBottom: 6,
  };
}

function captionStyle(): CSSProperties {
  return {
    color: '#8d7960',
    fontSize: '11px',
    lineHeight: 1.7,
    margin: '0 0 12px',
  };
}

function bulletList(items: string[]): ReactNode {
  return (
    <ul style={listStyle()}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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
          <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 8 }}>
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
          <h2 style={subtitleStyle(accentColor)}>SR 必须显性显示的条件</h2>
          {bulletList([
            '需要结合 SR 才能理解当前或即将发生的车辆行为',
            '当前场景存在较高接管可能性',
            '当前场景存在较高风险或不确定性，如失败、遮挡、异常',
            '位于 SR 地图上的交互操作本身是高优先级入口',
          ])}
          <h2 style={subtitleStyle(accentColor)}>非必须显示条件</h2>
          <p style={paragraphStyle()}>
            若以上条件均不满足，则 SR 不作为必须显示的信息源，可以让位于路线理解内容，或以小窗方式保留辅助感知。
          </p>
        </>,
      ],
    },
    {
      id: 'scope',
      numeral: '03',
      title: '适用范围',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>开放道路场景</h2>
          {bulletList(['ASD 较高阶辅助驾驶', 'LCC 车道保持辅助驾驶', 'ACC 与手动驾驶'])}
          <h2 style={subtitleStyle(accentColor)}>封闭 / 弱图道路空间</h2>
          {bulletList(['HAVP 自动泊入泊出', 'HAVP 泊车路线学习', 'APA 自动泊车', '手动驾驶与泊车场景'])}
        </>,
      ],
    },
    {
      id: 'open-road-rules',
      numeral: '04',
      title: '开放道路场景下的 SR 显示规则',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>手动驾驶</h2>
          <p style={paragraphStyle()}>
            手动驾驶下不刚需 SR 视图，用户可以依靠实时道路情况与仪表区信息完成驾驶决策与危险预警接收。
          </p>
          <h2 style={subtitleStyle(accentColor)}>辅助驾驶升级 / 降级</h2>
          {bulletList([
            '用户主动激活 ASD / LCC：SR 非必须显示',
            '系统自动升级为 ASD / LCC：SR 非必须显示',
            '主动或自动降级至 ACC：SR 必须显示，因为接管可能性升高',
          ])}
          <h2 style={subtitleStyle(accentColor)}>退出类场景</h2>
          {bulletList([
            '即将退出 PPA：SR 必须显示',
            '即将到达终点 / 途经点 / 收费站服务区：SR 必须显示',
            '系统原因自动退出、开门立即退出、用户主动退出：SR 通常非必须显示',
          ])}
          <h2 style={subtitleStyle(accentColor)}>特定智驾行为</h2>
          {bulletList([
            '自动变道 / 用户打灯发起变道：SR 必须显示',
            '准备进入匝道 / 进入匝道失败：SR 必须显示',
            '红绿灯被遮挡导致停车：SR 必须显示',
            '汇入主路 / 进入辅路 / 进入失败：SR 必须显示',
            '旁侧避让：SR 必须显示',
            '正常过红绿灯、环岛进出、礼让行人：SR 非必须显示',
          ])}
        </>,
      ],
    },
    {
      id: 'closed-road-rules',
      numeral: '05',
      title: '封闭 / 弱图空间下的显示关系',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>信息优先级</h2>
          <p style={paragraphStyle()}>
            在地库、园区等无图或弱图空间中，用户对导航路线本身关注较低，更关注泊车执行情况与车身周围环境，因此
            SR 应以更大尺寸呈现，导航信息则以下降优先级的小窗方式出现。
          </p>
          <h2 style={subtitleStyle(accentColor)}>默认关系</h2>
          {bulletList([
            '默认主视图为 SR 视角（一级）',
            '用户可进入路线视角（三级）',
            '无法进入路况视角（二级），因为无图场景下渲染范围有限',
            '在路线视角下，SR 小窗必须显示',
          ])}
          <h2 style={subtitleStyle(accentColor)}>制动与确认机制</h2>
          <p style={paragraphStyle()}>
            当用户在搜路 / 算路过程中踩下制动，视角不自动切回 SR，但应弹出「回 SR 视角」相关按键，以确认用户意图。
          </p>
          <h2 style={subtitleStyle(accentColor)}>HAVP / APA 场景说明</h2>
          {bulletList([
            'HAVP 学习中：导航在后台挂起，不显示 3D 导航内容',
            'HAVP 使用中：若在泊出中触发搜路算路，进入全览路线视角并显示 SR 小地图',
            'APA 使用中：若用户制动，不自动切回 SR，但提供「回 SR 视角」按键',
            '泊车中触发搜路算路：进入全览路线视角，并显示 SR 小地图',
          ])}
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
