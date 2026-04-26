import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style } from './h5Styles';
import { createJiduNarrativeCoverSection } from './jiduHmiNarrativeCover';



export function getUnitySections(accentColor: string): SectionData[] {
  return [
    createJiduNarrativeCoverSection('/jidu-hmi/unity3d-camera', accentColor),
    {
      id: 'goal',
      numeral: '01',
      title: '共驾地图：定义多事件主视图',
      blocks: [
        <>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />系统目标</h2>
          <p style={paragraphStyle()}>
            在辅助驾驶与导航融合的驾驶场景中，系统会同时接收多源事件，包括：
- 导航信息（导航机动点 / 路况变化等）
- 辅助驾驶状态（升降级、自动变道等）
- 车辆状态（电量、胎压、传感器异常）
- 用户操作（手势、视角切换）
这些事件都会竞争主视图的展示权。
如果缺乏统一规则，容易导致：
- 关键信息被非关键状态打断
- 视图频繁跳变，用户失去信任
- 系统行为不可预测，增加认知负担
核心问题：在多事件并发条件下，当前“主视图”应该展示什么？
            在多系统事件并发的情况下，定义谁占据主视图，并通过可控的镜头打断机制，引导驾驶员关注当前最重要的驾驶信息。
          </p>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />设计原则</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {['注意力优先', '最小镜头集', '稳定性优先', '安全信息优先'].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />设计目标</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {[
              '安全信息优先，不被低优先级状态打断',
              '用户注意力可控，避免无意义的视角变化',
              '系统行为稳定可预测，符合驾驶心智模型',
              '支持未来更多 AI 事件的接入（智驾能力演进）'
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />我的角色</h2>
          <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
            {
              ['产品定义 & 系统设计',
              '事件抽象与优先级规则制定',
              '状态机与视图切换策略设计',
              '通过 Unity 原型进行规则验证，反推产品决策合理性'
            ].map((item) => (
              <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                <span style={{ color: accentColor }}>—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h2 style={h2Style(accentColor)}><span style={{ width: 3, height: 12, borderRadius: 2, background: accentColor }} />核心方案</h2>
          <div style={{ margin: '6px 0 0' }}>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>主视图优先级仲裁系统</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['将所有可能影响显示的输入统一抽象为 事件',
                '为每类事件定义优先级是否允许打断',
                '系统在任意时刻只允许一个事件拥有主视图控制权'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>视图状态机</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['定义清晰的视图状态与切换路径： Driving / Navigation / Parking / AVP / APA 等 (详见后章节）'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ color: '#c8a96e', fontSize: '16px', margin: '12px 0 6px' }}>信息分层与注意力管理</div>
            <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 6, marginLeft: 16 }}>
              {
                ['通过视角、焦点、缩放策略表达此刻用户最需要关注什么',
                '例如：导航中路线与机动点优先 / 停车中车身周边与后向区域优先'
              ].map((item) => (
                <li key={item} style={{ color: '#a99679', fontSize: '16px', display: 'flex', gap: 8 }}>
                  <span style={{ color: accentColor }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </>,
      ],
    },


  ];
}
