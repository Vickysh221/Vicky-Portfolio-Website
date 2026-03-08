import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style } from './h5Styles';



export function getUnitySections(accentColor: string): SectionData[] {
  return [
    {
      id: 'goal',
      numeral: '01',
      title: '总览',
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
        </>,
      ],
    },
    {
      id: 'driving',
      numeral: '02',
      title: '行车运镜',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            行车模式下，相机跟随在自车后方，以第三人称视角表达路况信息。高优先级事件（如安全预警）可打断低优先级镜头。
          </p>
          
        </>,
      ],
    },
    {
      id: 'camera',
      numeral: '03',
      title: '相机参数空间变化',
      blocks: [
        <>
          <p style={paragraphStyle()}>
            主视图竞争的结果不是"切镜头"，而是参数目标覆盖。通过连续参数变化，而不是离散动画状态，实现镜头间平滑过渡。
          </p>
 
        </>,
      ],
    },
  ];
}
