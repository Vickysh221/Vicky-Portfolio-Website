import type { CSSProperties } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import unityCameraSlide01Image01 from '../images/unity3d-camera/slide01-img01.png';

function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
}

function EventTable({ accentColor }: { accentColor: string }) {
  const rows: { category: string; sub: string; event: string; adopted: boolean | null; note: string }[] = [
    { category: '手动驾驶 D 挡', sub: '默认视角', event: '—', adopted: true, note: '手动驾驶默认视角，兼顾美观与实用性，是用户挂入 D 挡后的基准视角。' },
    { category: '', sub: '随速度变化的视角', event: '—', adopted: false, note: '用户感知弱，信息收益不足以覆盖主视图竞争成本。' },
    { category: '', sub: '随加速度变化的视角', event: '急减速 / 急加速', adopted: false, note: '引入额外参数变化可能干扰稳定感知，并显著增加系统负载。' },
    { category: '', sub: '导航驾驶事件视角', event: '导航开启', adopted: true, note: '关注前方机动点显示，兼顾前方路线、路况及后方一定距离内他车。' },
    { category: '', sub: '', event: '经过机动点（城市路口）', adopted: false, note: '鸟瞰视角内车辆周边感知信息无法清晰呈现，周边感知对驾驶优先级更高。' },
    { category: '', sub: '', event: '经过机动点（高速匝道）', adopted: false, note: '同上。' },
    { category: '', sub: '', event: '经过隧道', adopted: false, note: '随高精地图停止使用而取消。' },
    { category: '', sub: '', event: '经过环岛 / 桥梁', adopted: false, note: '随高精地图停止使用而取消。' },
    { category: '开放道路辅助驾驶 (ASD/LCC)', sub: '导航下辅助驾驶事件视角', event: '左转弯 / 右转弯 / 掉头', adopted: false, note: '合并入随方向盘转角引发的镜头变化。' },
    { category: '', sub: '通用辅助驾驶事件视角', event: '自动变道', adopted: true, note: '用户需兼顾自车后方、目标车道及前方交通状况，视角向后侧方向移动。' },
    { category: '主动安全事件', sub: '—', event: '前向 / 后向碰撞预警、盲区监测、后侧向碰撞预警、车道偏移预警', adopted: false, note: '已通过声音、屏幕边缘红色警示、安全带抱死等更高优先级方式充分覆盖；镜头变化可能分散用户对关键风险信息的注意力。' },
    { category: '手动驾驶 R 挡', sub: '—', event: '—', adopted: true, note: '用户倒车时需关注自车后方和后侧方物件，尽可能覆盖后方来车的预警状态。' },
    { category: '泊车辅助驾驶', sub: 'AVP 自动代客泊车', event: '路径学习和使用', adopted: true, note: 'AVP 激活，在任意挡位（D/R/P）下关注离自车更近的道路状态及侧/后方车位情况。' },
    { category: '', sub: 'APA 自动泊车辅助', event: '自动泊入 / 出', adopted: true, note: '兼顾自车和车位，满足泊车过程中两者位置的动态变化，衔接 D 挡和 P 挡镜头。' },
    { category: '', sub: '', event: '点选车位', adopted: true, note: '聚焦于泊车感知范围内车位，视角接近俯视，使车位交互热区清晰且尺寸符合需求。' },
    { category: '横向偏移镜头', sub: '方向盘转角引发的镜头变化', event: '—', adopted: true, note: '速度 > 0 且横向偏转幅度超过给定最大值时触发。镜头横向偏移量 = 方向盘转角系数 / 速度系数（限阈值范围内）。可大幅提升转弯时的真实体验感。' },
  ];

  const cellBase: CSSProperties = {
    fontSize: '14px',
    color: '#a99679',
    padding: '8px 10px',
    lineHeight: 1.7,
    borderBottom: '1px solid rgba(200,169,110,0.08)',
    verticalAlign: 'top',
  };

  const headerCell: CSSProperties = {
    ...cellBase,
    color: accentColor,
    fontSize: '13px',
    letterSpacing: '0.12em',
    fontWeight: 600,
    borderBottom: '1px solid rgba(200,169,110,0.2)',
  };

  return (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '18%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '32%' }} />
        </colgroup>
        <thead>
          <tr>
            {['驾驶状态', '视角类别', '触发事件', '采用', '设计说明'].map((h) => (
              <th key={h} style={headerCell}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
              <td style={cellBase}>{row.category}</td>
              <td style={cellBase}>{row.sub}</td>
              <td style={cellBase}>{row.event}</td>
              <td style={{ ...cellBase, textAlign: 'center' }}>
                {row.adopted === true && (<span style={{ color: '#7dba8a', fontSize: '13px', letterSpacing: '0.1em' }}>✓</span>)}
                {row.adopted === false && (<span style={{ color: '#c26b5a', fontSize: '13px' }}>✗</span>)}
              </td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function getUnityChapter2Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'overview', numeral: '01', title: '总览', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />系统目标</h2>
        <p style={paragraphStyle()}>在多系统事件并发的情况下，定义<strong style={{ color: '#efe4d0' }}>谁占据主视图</strong>，并通过可控的镜头打断机制，在保证运镜稳定性的同时，引导驾驶员关注当前最重要的驾驶信息。</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />系统概述</h2>
        <p style={paragraphStyle()}>当不同驾驶与环境事件被触发时，车辆与 3D 地图视角会发生变化，作为信息表达与注意力引导的手段。所有镜头均可在统一的相机系统内平滑过渡，而非相互割裂的独立动画——我们将这些视角抽象为一组<strong style={{ color: '#efe4d0' }}>虚拟摄像头状态</strong>。</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />设计原则</h2>
        <p style={{ ...paragraphStyle(), marginBottom: 6 }}>在复杂驾驶场景下，镜头不再「响应所有事件」，而是<strong style={{ color: '#efe4d0' }}>只为当前最重要的事件服务</strong>。</p>
        <ul style={{ margin: '0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {[['注意力优先', '镜头切换服务于驾驶任务，仅在关键事件节点发生。'], ['最小镜头集', '合并关注点相似的事件镜头，避免状态爆炸。'], ['稳定性优先', '限制非必要视角切换，减少频繁运镜对驾驶注意力的干扰。'], ['安全信息优先', '不被低优先级状态打断。']].map(([title, desc]) => (
            <ListItem key={title} accent={accentColor}><span style={{ color: '#c8b080' }}>{title}：</span>{desc}</ListItem>
          ))}
        </ul>
      </>],
    },
    {
      id: 'driving', numeral: '02', title: '行车运镜', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车事件</h2>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 10 }}>— 哪些系统信号源向镜头「提出变化请求」</p>
        <EventTable accentColor={accentColor} />
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车事件优先级规则</h2>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '13px', marginBottom: 8 }}>— 不同事件镜头的冲替关系</p>
       
          <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={unityCameraSlide01Image01}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>图 2-1 行车事件优先级仲裁关系</div>
          </div>
        
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车镜头的设计</h2>
        <p style={paragraphStyle()}>在行车模式下，相机跟随在自车的后方，呈现出一种「第三人称」视角，既提供了驾驶的沉浸感，又保证对周围环境的充分展示。</p>
        <p style={paragraphStyle()}>由于当前渲染框架下自车在地图上的行驶并非改变自车的世界坐标位置，暂时不采用游戏中惯用的更灵活「第三人称跟随」方式。</p>
      </>],
    },


  ];
}
