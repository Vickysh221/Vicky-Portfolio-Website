import type { CSSProperties, ReactNode } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle, ListItem } from './h5Styles';

function placeholderStyle(kind: 'image' | 'video', accentColor: string): CSSProperties {
  return {
    height: '130px',
    borderRadius: '5px',
    border: `1px dashed ${kind === 'video' ? `${accentColor}66` : 'rgba(200,169,110,0.28)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: kind === 'video' ? accentColor : '#8f7d5f',
    fontSize: '10px',
    letterSpacing: '0.18em',
    background: 'rgba(255,255,255,0.01)',
  };
}

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
    fontSize: '11px',
    color: '#a99679',
    padding: '8px 10px',
    lineHeight: 1.7,
    borderBottom: '1px solid rgba(200,169,110,0.08)',
    verticalAlign: 'top',
  };

  const headerCell: CSSProperties = {
    ...cellBase,
    color: accentColor,
    fontSize: '10px',
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
                {row.adopted === true && (<span style={{ color: '#7dba8a', fontSize: '10px', letterSpacing: '0.1em' }}>✓</span>)}
                {row.adopted === false && (<span style={{ color: '#c26b5a', fontSize: '10px' }}>✗</span>)}
              </td>
              <td style={{ ...cellBase, color: '#7f6f55' }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ParkingEventList({ accentColor }: { accentColor: string }) {
  const items = [
    { cat: '车辆状态类', examples: '充电状态' },
    { cat: '组件交互联动类', examples: '车门窗控件、故障标识' },
    { cat: '车模交互类', examples: '轮胎胎温胎压、开门指令、故障位置点击' },
  ];

  return (
    <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
      {items.map((it) => (
        <li key={it.cat} style={{ color: '#a99679', fontSize: '12px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
          <span style={{ color: accentColor }}>—</span>
          <span><span style={{ color: '#c8b080' }}>{it.cat}：</span>{it.examples}</span>
        </li>
      ))}
    </ul>
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
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '11px', marginBottom: 10 }}>— 哪些系统信号源向镜头「提出变化请求」</p>
        <EventTable accentColor={accentColor} />
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车事件优先级规则</h2>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '11px', marginBottom: 8 }}>— 不同事件镜头的冲替关系</p>
       
          <div style={mediaBlockStyle()}>
            <img 
              src="/src/images/unity3d-camera/slide01-img01.png" 
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="行车事件示意图" 
            />
            <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 2-1 行车事件优先级仲裁关系</div>
          </div>
        
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车镜头的设计</h2>
        <p style={paragraphStyle()}>在行车模式下，相机跟随在自车的后方，呈现出一种「第三人称」视角，既提供了驾驶的沉浸感，又保证对周围环境的充分展示。</p>
        <p style={paragraphStyle()}>由于当前渲染框架下自车在地图上的行驶并非改变自车的世界坐标位置，暂时不采用游戏中惯用的更灵活「第三人称跟随」方式。</p>
      </>],
    },
    {
      id: 'camera-params', numeral: '03', title: '相机参数空间变化', blocks: [<>
        <p style={{ ...paragraphStyle(), color: '#6a5a40', fontSize: '11px', marginBottom: 12 }}>— 「一镜到底」的实现原理</p>
        <p style={paragraphStyle()}><strong style={{ color: '#efe4d0' }}>主视图竞争的结果不是「切镜头」，而是参数目标的覆盖。</strong>通过镜头参数的连续变化而非离散动画状态，实现镜头之间的平滑过渡。</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />相机模式</h2>
        <p style={paragraphStyle()}>在大部分镜头下，相机看向「自车默认焦点」或「一个被偏移过的焦点」，并与自车保持相对固定的空间位置关系。其效果为：在固定运镜状态下，自车在屏幕上的显示恒定不变。</p>
        <div style={mediaBlockStyle()}>
         
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 3-1 相机与自车相对位置关系（占位）</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />选择该相机模式的原因</h2>
        <ul style={{ margin: '0 0 12px', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
          {['在人机共驾地图的特定驾驶 / 车辆功能下，需给定看车模、地图场景的视角以使特定功能较好实现。', '在车机环境中，不提倡使用灵活度较高的相机，以免导致驾驶过程中不良的视觉体验和功能体验。'].map((t) => (
            <ListItem key={t} accent={accentColor}>{t}</ListItem>
          ))}
        </ul>
        <div style={mediaBlockStyle()}>
          <div style={placeholderStyle('image', accentColor)}>IMAGE · 相机模式对比图</div>
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 3-2 相机模式选择依据（占位）</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />镜头事件的通用触发和流转机制</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {['触发流转示意 A', '状态图 A', '触发流转示意 B', '状态图 B', '触发流转示意 C', '状态图 C'].map((label, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <div style={placeholderStyle(i % 2 === 1 ? 'video' : 'image', accentColor)}>IMAGE · {label}</div>
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '10px' }}>图 3-{3 + i} {label}（占位）</div>
            </div>
          ))}
        </div>
      </>],
    },
    {
      id: 'view-examples', numeral: '04', title: '3D 地图视图呈现', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车运镜视角示例</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {['手动驾驶默认视角', 'AVP 自动泊入视角', '辅助驾驶自动变道视角', '导航驾驶视角'].map((label, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <div style={placeholderStyle('image', accentColor)}>IMAGE · {label}</div>
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '10px' }}>图 4-{i + 1} {label}（占位）</div>
            </div>
          ))}
        </div>
      </>],
    },
    {
      id: 'parking', numeral: '05', title: '驻车运镜', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车镜头的设计</h2>
        <p style={paragraphStyle()}>在驻车模式下，镜头往往服务于特定功能下的车模交互、车辆整体或部件的状态展示，镜头更聚焦于车身或车身某一定点，因此采取更聚焦的镜头。默认 P 档镜头需兼顾车身和周遭环境。</p>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车事件</h2>
        <p style={{ ...paragraphStyle(), marginBottom: 6 }}>驻车事件分为三个状态大类：</p>
        <ParkingEventList accentColor={accentColor} />
        <p style={{ ...paragraphStyle(), marginTop: 12 }}>典型场景包括：3D 场景配合的场景演示、伴随车控车设内用户查看功能说明、用户查看里程能耗与充电状态、用户与 3D 场景组件交互（触发开门 / 查看胎温胎压 / 点击故障位置标识）。</p>
        <div style={mediaBlockStyle()}>
          <div style={placeholderStyle('image', accentColor)}>IMAGE · 驻车事件触发来源示意图</div>
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 5-1 驻车事件触发来源概览（占位）</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车事件优先级规则</h2>
        <p style={paragraphStyle()}>在车辆状态镜头系统中同样存在镜头优先级仲裁策略。若车身同时出现多个异常状态或充电状态叠加，则选择优先级更高的事件镜头进行展示。</p>
        <div style={mediaBlockStyle()}>
          <div style={placeholderStyle('image', accentColor)}>IMAGE · 驻车事件优先级仲裁图</div>
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '10px' }}>图 5-2 驻车事件优先级仲裁关系（占位）</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车运镜视角示例</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {['传感器 L1 异常故障查看视角', '车门 R1 异常故障查看视角', '充电视角', '胎温胎压异常视角'].map((label, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <div style={placeholderStyle('image', accentColor)}>IMAGE · {label}</div>
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '10px' }}>图 5-{i + 3} {label}（占位）</div>
            </div>
          ))}
        </div>
      </>],
    },
  ];
}
