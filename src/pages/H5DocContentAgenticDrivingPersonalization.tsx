/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties, ReactNode } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import {
  blockLabelStyle,
  captionStyle,
  dividerStyle,
  gridListStyle,
  h2Style,
  noteCardStyle,
  paragraphStyle,
  smallMetaStyle,
} from './h5Styles';

function P({ children }: { children: ReactNode }) {
  return <p style={paragraphStyle()}>{children}</p>;
}

function InlineEm({ children }: { children: ReactNode }) {
  return <strong style={{ color: '#d8ccb6', fontWeight: 500 }}>{children}</strong>;
}

function Callout({ accentColor, children }: { accentColor: string; children: ReactNode }) {
  return (
    <div
      style={{
        ...noteCardStyle(),
        borderColor: `${accentColor}42`,
        background: `${accentColor}12`,
        margin: '14px 0',
      }}
    >
      <p style={{ ...paragraphStyle(), color: '#d8ccb6', margin: 0, fontSize: '15px' }}>{children}</p>
    </div>
  );
}

function Takeaway({ accentColor, children }: { accentColor: string; children: ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${accentColor}35`, paddingTop: 10, marginTop: 14 }}>
      <div style={{ ...smallMetaStyle(), color: accentColor }}>Takeaway</div>
      <p style={{ ...paragraphStyle(), color: '#efe4d0', margin: 0 }}>{children}</p>
    </div>
  );
}

function QuietPanel({ children }: { children: ReactNode }) {
  return <div style={{ ...noteCardStyle(), margin: '14px 0' }}>{children}</div>;
}

function SplitWorldVisual({ accentColor }: { accentColor: string }) {
  const sideStyle: CSSProperties = {
    minHeight: 128,
    border: '1px solid rgba(200,169,110,0.14)',
    borderRadius: 6,
    padding: 14,
    background: 'rgba(255,255,255,0.012)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 12,
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, margin: '14px 0' }}>
      <div style={sideStyle}>
        <div style={blockLabelStyle()}>Standardized World</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {['fixed rules', 'single road logic', 'one optimal answer'].map((item) => (
            <div key={item} style={{ height: 10, borderRadius: 2, background: 'rgba(200,169,110,0.18)', width: item === 'one optimal answer' ? '72%' : '100%' }} />
          ))}
        </div>
        <p style={captionStyle()}>规则恒定、路况单一，系统只需要执行统一解。</p>
      </div>
      <div style={{ ...sideStyle, borderColor: `${accentColor}42` }}>
        <div style={{ ...blockLabelStyle(), color: accentColor }}>Real Roads</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['weather', 'density', 'driver rhythm', 'risk preference'].map((item, idx) => (
            <div
              key={item}
              style={{
                minHeight: idx % 2 === 0 ? 30 : 42,
                borderRadius: 6,
                border: `1px solid ${idx === 1 ? `${accentColor}44` : 'rgba(200,169,110,0.14)'}`,
                background: idx === 1 ? `${accentColor}12` : 'rgba(255,255,255,0.012)',
                color: '#a99679',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <p style={captionStyle()}>复杂路况中，驾驶开始包含情境判断与用户差异。</p>
      </div>
    </div>
  );
}

function VendorMatrix({ accentColor }: { accentColor: string }) {
  const headers = [
    '厂商 / 平台',
    'Agent 面向的核心对象',
    '记忆 / 个性化（公开）',
    '自动化等级语境（公开 / 可推断）',
    '传感与融合侧重',
    '执行 / 线控与跨域融合',
    '延迟 / 实时性主张（公开）',
    '合规 / 监管“就绪度”线索',
  ];

  const rows = [
    [
      '智己（IM Ultra Agent / IM Fusion Nova）',
      '舱驾底盘一体：意图 → 动作',
      '未公开细节；强调“专属司机助理”',
      '以 L2 / L3 / L4 叙事表达“迈向具身智能”；具体 ODD / 责任边界未在该通告内展开',
      '未公开传感配置',
      '强调线控底盘 + 舱驾一体融合架构',
      '未公开量化；强调底层打通减少系统延迟（表述性）',
      '暂以发布信息为主，后续仍需看准入 / 试点文件',
    ],
    [
      '千里科技（Agent OS / 千里智驾）',
      '座舱 Agent OS + 智驾路线图',
      '明确“长短期全场景记忆、车端-移动端打通、自我训练成长”',
      '智驾 1.0 面向 L2+；公布 L3 / L4 路线图，但时间节点仍属于规划',
      '“全融合地图”：导航 3D 车道级 + 智驾 SR 融合',
      '宣称端云一体；未公开线控集成细节',
      '座舱语音宣称“毫秒级端到端”',
      '路线图与试点 / 准入仍待验证',
    ],
    [
      '特斯拉（FSD Supervised）',
      '辅助驾驶功能集 + 路线导航',
      '个性化细节未公开',
      '明确需驾驶员全程注意、随时接管；不使车辆自动驾驶，属于典型 L2 责任边界',
      '车端感知细节不在该手册段落中展开',
      '执行由车辆控制系统完成；是否跨域融合未在该来源展开',
      '舱内摄像头监测注意力，主要是与安全相关的“协同”',
      '以用户手册方式强调责任与限制，合规表达非常清晰',
    ],
    [
      'Waymo（Waymo Driver）',
      'L4 自动驾驶系统（商业运营 ODD 内）',
      '个性化不是主要公开点',
      '公开 rider-only 里程与人类基准对比；研究中以“无驾驶员在座”口径讨论 ADS',
      '多传感融合；公开页面未逐项列传感器，但以 ADS 运营与评估为核心',
      '运营与安全方法学强调系统级测试与场景验证',
      '以事故率 / 索赔率等结果指标对外呈现，而非“毫秒”口径',
      '以运营数据与同行评估框架回应“可部署性”',
    ],
    [
      'Mobileye（SuperVision / Chauffeur / Drive）',
      '传感冗余与安全模型方法学',
      '个性化不是主要公开点',
      '产品线覆盖从 ADAS 到更高阶自动驾驶，具体等级依产品不同而变化',
      '“True Redundancy”：相机子系统 + 雷达 / 激光子系统双栈冗余',
      '安全方法学（RSS）强调形式化规则与可解释安全模型',
      '未公开系统级端到端延迟指标',
      '强调“可供行业与政府形成共同安全定义”的模型取向',
    ],
    [
      '蔚来（NOP+ / NOMI GPT / NWM）',
      '智驾 + 座舱大模型并行',
      'NOMI GPT 强调多模态感知 / 认知 / 情感引擎；智驾强调持续迭代',
      'NOP+ 为辅助驾驶；并公开 NWM / NADArch 2.0，但等级不等同法规意义上的 L3',
      '未公开完整传感配置',
      '披露 steer-by-wire 获得量产许可，执行层能力增强',
      '未公开毫秒级口径',
      '在中国试点政策环境下持续推进，仍受准入 / ODD 约束',
    ],
    [
      '小鹏（XNGP / 端到端大模型）',
      '智驾大模型 + 全国覆盖体验',
      '个性化维度未系统披露',
      '以“辅助驾驶体验”叙事，公开端到端大模型组合',
      '方案细节以视觉 / 模型为重点；该新闻页未列传感清单',
      '未公开线控融合细节',
      '强调高频 OTA 迭代节奏，即软件交付能力',
      '仍处于辅助驾驶语境；法规 L3 仍需对应准入与限定 ODD',
    ],
    [
      '华为乾崑（ADS / HarmonySpace）',
      '智驾 + 车控 + 座舱生态',
      '个性化细节依车型 / 生态而异',
      '合作车型页面强调“辅助驾驶非自动驾驶、驾驶员完全责任人”',
      '未在当前页面展开',
      '未在当前页面展开',
      '未公开毫秒级口径',
      '在中国 L3 准入报道中出现“搭载 ADS”的试点车型线索',
    ],
    [
      '博世（AI cockpit / interior sensing）',
      '座舱 AI 助手 + 车内感知',
      '强调理解习惯 / 偏好 / 语境；车内摄像头用于个性化与注视检测示例',
      '更偏座舱语境，并非直接自动驾驶系统',
      '车内 DMS / OMS + 雷达组合，覆盖分心 / 困倦 / 无响应、个性化等',
      '未公开跨域运动控制；更强调快速升级现有座舱系统',
      '以“快速升级 / 更快实现新功能”描述，而非精确延迟指标',
      '明确把 UNECE R157 的 driver availability recognition（L3）纳入法规路线图',
    ],
    [
      '大陆集团（跨域 HPC / 生成式语音）',
      'cockpit + vehicle functions 的跨域承载',
      '未把“记忆系统”作为主要公开卖点',
      '更偏供应链平台型表达，等级取决于 OEM 如何使用',
      '跨域 HPC 承载驾驶安全与泊车等功能',
      '明确“holistic motion control”与跨域部署',
      '以“简化开发与维护、加速交付”表达，而非精确实时性指标',
      '与大厂云合作引入生成式语音交互，并给出量产准备时间目标',
    ],
  ];

  return (
    <QuietPanel>
      <div style={{ ...blockLabelStyle(), color: accentColor }}>Representative Industry Split</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1480 }}>
          <thead>
            <tr>
              {headers.map((head) => (
                <th
                  key={head}
                  style={{
                    color: '#d8ccb6',
                    fontSize: 12,
                    lineHeight: 1.6,
                    fontWeight: 500,
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderBottom: '1px solid rgba(200,169,110,0.16)',
                    verticalAlign: 'top',
                    whiteSpace: 'normal',
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, idx) => (
                  <td
                    key={cell}
                    style={{
                      color: idx === 0 ? accentColor : '#a99679',
                      fontSize: 13,
                      lineHeight: 1.65,
                      padding: '8px 10px',
                      borderBottom: '1px solid rgba(200,169,110,0.08)',
                      verticalAlign: 'top',
                      whiteSpace: 'normal',
                      minWidth: idx === 0 ? 180 : 220,
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ ...captionStyle(), marginTop: 10 }}>
        这个比较不是为了做市场分析，而是说明：行业虽然都在谈 agent，但并没有统一 agent 在车里到底面向什么对象。也正因为如此，这一章的问题才成立：分歧不只是能力差异，而是 agent definition 本身尚未收敛。
      </p>
    </QuietPanel>
  );
}

function ChainVisual({ accentColor, items }: { accentColor: string; items: string[] }) {
  return (
    <QuietPanel>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        {items.map((item, idx) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                border: `1px solid ${idx === items.length - 1 ? `${accentColor}55` : 'rgba(200,169,110,0.16)'}`,
                background: idx === items.length - 1 ? `${accentColor}12` : 'rgba(255,255,255,0.012)',
                borderRadius: 6,
                color: idx === items.length - 1 ? '#efe4d0' : '#a99679',
                padding: '8px 10px',
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              {item}
            </span>
            {idx < items.length - 1 && <span style={{ color: accentColor, opacity: 0.65 }}>→</span>}
          </div>
        ))}
      </div>
    </QuietPanel>
  );
}

function EvidenceAndMemoryVisual({ accentColor }: { accentColor: string }) {
  const evidence = ['outside the car', 'navigation context', 'inside the car'];
  const memory = ['event memory', 'preference abstraction', 'strategy parameterization'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '14px 0' }}>
      <QuietPanel>
        <div style={{ ...blockLabelStyle(), color: accentColor }}>Evidence Fusion Window</div>
        <ul style={gridListStyle(8)}>
          {evidence.map((item) => (
            <li key={item} style={{ color: '#a99679', fontSize: 14, lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: accentColor, opacity: 0.75 }} />
              {item}
            </li>
          ))}
        </ul>
      </QuietPanel>
      <QuietPanel>
        <div style={{ ...blockLabelStyle(), color: accentColor }}>Habit Learning Path</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {memory.map((item, idx) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: accentColor, fontSize: 12 }}>{String(idx + 1).padStart(2, '0')}</span>
              <span style={{ color: '#a99679', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </QuietPanel>
    </div>
  );
}

function BalanceVisual({ accentColor }: { accentColor: string }) {
  return (
    <QuietPanel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10, alignItems: 'stretch' }}>
        {['rules / safety', 'user preference / behavior', 'system capability / execution'].map((item) => (
          <div
            key={item}
            style={{
              border: `1px solid ${accentColor}35`,
              borderRadius: 6,
              padding: 12,
              color: '#d8ccb6',
              fontSize: 14,
              lineHeight: 1.5,
              textAlign: 'center',
              background: `${accentColor}0f`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: accentColor, fontSize: 16, lineHeight: 1.6, marginTop: 12 }}>
        personalized driving collaborator
      </div>
    </QuietPanel>
  );
}

export function getAgenticDrivingPersonalizationSlide01Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-question',
      numeral: '01',
      title: 'Agent 在辅助驾驶中：驾驶专家，还是个性化驾驶员？',
      blocks: [
        <>
          <P>在辅助驾驶系统中，agent 的价值并不只在于听懂用户说了什么，而在于它能否逐步理解用户是如何驾驶的。</P>
          <P>
            如果把驾驶环境设想成一个完全标准化的世界：道路规则恒定、路况单一、没有天气干扰、也没有复杂的交通参与者，那么 agent 几乎不需要承担额外角色。系统只要基于明确规则执行任务，车辆就已经能够完成驾驶。
          </P>
          <P>
            在这样的前提下，“理解用户”并不会带来额外价值，因为所有决策都可以被收敛为统一的最优解。agent 不再需要判断差异，也不需要解释用户偏好，只需要把标准答案稳定执行出来。
          </P>
          <Callout accentColor={accentColor}>如果驾驶世界是完全标准化的，agent 几乎不会带来额外价值。</Callout>
          <SplitWorldVisual accentColor={accentColor} />
          <P>
            但现实驾驶恰恰不是这样。尤其在复杂路况、高密度博弈和大量临场判断并存的道路环境中，辅助驾驶系统的价值开始从“执行规则”转向“在规则之内理解差异”。
          </P>
          <Takeaway accentColor={accentColor}>agent 的价值，来自真实世界的不标准。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide02Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-industry-definition',
      numeral: '02',
      title: '真实世界里的 Agent，正在被不同厂商定义成不同的东西',
      blocks: [
        <>
          <P>
            今天一些具备感知、决策和执行能力的辅助驾驶产品，已经不满足于单纯理解语音命令，而开始尝试将用户的模糊需求解析成完整的驾驶策略。例如当用户说“下雨了，开稳点”时，系统并不是机械执行一条固定命令，而是要综合调整跟车距离、变道节奏和横纵向控制策略。
          </P>
          <P>
            表面上看，这是意图识别；但更深一层，它已经触及“系统如何理解用户对安全、舒适与效率的综合偏好”。这类系统已经超过了传统的“打开雨刮”“调高空调”式语音控制。
          </P>
          <P>
            但另一个问题也随之出现：不同厂商虽然都在谈 agent，它们面向的“核心对象”并不一样。有的在做驾驶执行，有的在做座舱记忆，有的在做运营级自动驾驶，有的在做形式化安全框架。
          </P>
          <Callout accentColor={accentColor}>问题不只是技术够不够，而是行业还没有统一 agent 的对象。</Callout>
          <VendorMatrix accentColor={accentColor} />
          <Takeaway accentColor={accentColor}>“驾驶 agent”还不是一个统一品类。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-command-critique',
      numeral: '03',
      title: '如果系统只是把模糊话语映射成动作，它和旧规则系统有什么本质区别？',
      blocks: [
        <>
          <P>
            许多智能驾驶系统在设计时，仍然会从较理想的场景出发：先定义一套标准任务，再把异常、补充需求和用户话语作为规则层叠加在任务执行之上。这样的系统可以显得更自然，但它的结构仍然可能非常接近旧的命令系统。
          </P>
          <P>
            问题在于，如果这种理解仍然停留在预设语义到预设动作的映射层面，那么它与传统规则系统之间的差别其实并不大。系统只是把过去明确的控制命令，换成了更模糊的自然语言入口。
          </P>
          <ChainVisual
            accentColor={accentColor}
            items={['explicit command', 'vague language', 'preset semantic parsing', 'preset action path']}
          />
          <P>
            从“打开雨刮”到“下雨了，开稳点”，确实把语言入口变得更接近真实用户。但如果设计者仍然是在前期预埋语义，并据此设计从 A 到 B 的执行路径，这种系统也许更自然，却还没有真正进入“agent”阶段。
          </P>
          <Callout accentColor={accentColor}>把命令说得更像自然语言，不等于系统真的更理解人。</Callout>
          <Takeaway accentColor={accentColor}>自然语言入口，不等于 agent 的本质跃迁。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide04Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-behavior-understanding',
      numeral: '04',
      title: '真正的分水岭，不是听懂一句话，而是看懂用户在具体情境里如何驾驶',
      blocks: [
        <>
          <P>
            真正的难点在于，智能车是一个同时具备“眼、耳、手、脑”的系统。它不仅要听懂用户的语言，还要看懂用户的行为，并在具体情境中解释这些行为背后的意图。
          </P>
          <P>
            地下车库里的一脚刹车，可能意味着避险，也可能意味着准备泊车；二三级道路上的一次减速，可能意味着临停，也可能只是低速通过。类似判断无法只依赖单次语音输入，而必须结合环境、导航上下文、历史行为以及用户在特定场景中的稳定倾向。
          </P>
          <h2 style={h2Style(accentColor)}>A more agentic system would wait for evidence</h2>
          <P>
            面对这类歧义，一个更 agentic 的系统不应立刻弹出泊车模块，或者过早打断驾驶流。它应该进入一个很短的证据融合窗口：看车外是否存在车位线、墙体距离和空位概率；看导航是否已经到达目的地或停车场 POI；也看车内视线和头部姿态是否呈现寻找行为。
          </P>
          <EvidenceAndMemoryVisual accentColor={accentColor} />
          <h2 style={h2Style(accentColor)}>Preference is not only in settings</h2>
          <P>
            个性化偏好不只存在于设置页，也存在于接管、纠正和反复微调里。用户选择“稳健 / 激进”、偏好的速度余量或变道倾向，是显性信号；但系统更需要理解用户在哪里反复加速、减速、接管、拒绝某个动作。
          </P>
          <P>
            因此，习惯学习不是给用户更多开关，而是让系统把交互痕迹组织成 <InlineEm>event memory → preference abstraction → strategy parameterization</InlineEm> 的路径。
          </P>
          <Callout accentColor={accentColor}>真正的 agent，不只是理解语言，而是通过证据与行为轨迹理解人。</Callout>
          <Takeaway accentColor={accentColor}>行为理解，而不是话语理解，才是 agent 的真正分水岭。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide05Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-ux-case-example',
      numeral: '05',
      title: '交互与 UX 模式：在歧义里做判断，并把判断过程变成可被人信任的协作',
      blocks: [
        <>
          <P>
            车载 Agent 的 UX，不是“更会对话”这么简单，而是更难的东西：在歧义里做判断，并且把判断过程变成可被人信任的协作。
          </P>
          <h2 style={h2Style(accentColor)}>习惯学习：从“用户调参数”到“系统学风格”</h2>
          <P>
            个性化研究里最有启发的一点是：驾驶偏好并不只存在于“设置页”，它更存在于接管、纠正、反复微调里。以个性化 ACC 为例，已有工作用逆强化学习在云端学到跟车间距偏好，并在在线阶段利用接管轨迹与反馈增量更新；结果是在仿真 HITL 实验中显著降低干预频次。
          </P>
          <P>
            如果把这个思路迁移到“限速偏好”“提前变道还是临时变道”，产品上就需要两种信号：一类是显式信号，例如用户选择了“稳健 / 激进”“最高限速偏好”；另一类是隐式信号，例如用户在什么路况下总会手动加速、减速、改道，以及接管的时机与原因。这恰好对应“事件记忆 → 偏好抽象 → 策略参数化”的三层记忆路径。
          </P>
          <h2 style={h2Style(accentColor)}>歧义消解：别急着弹窗，先把“证据”凑齐</h2>
          <P>
            以地库刹车这个例子来说，一个更“Agentic”的做法不是立刻弹泊车组件，而是进入一个短时证据融合窗口，时长可能是几百毫秒到几秒，取决于速度与风险。系统需要同时看车外是否靠近车位 / 墙体、是否进入车位区域、是否有泊车线或空位；看导航是否到达目的地、是否进入停车场 POI；也看车内驾驶员头部 / 注视是否在找车位。
          </P>
          <P>
            这里“注视 / 车内感知”不是为了炫技，而是为了减少打扰。像博世的材料里就把 gaze detection 用于识别驾驶员正在看的目标，并把面部识别用于座椅偏好自动调整；同一套传感也用于分心 / 困倦检测。
          </P>
          <h2 style={h2Style(accentColor)}>升级与接管：把“驾驶员在线”做成系统能力，而不是一句免责声明</h2>
          <P>
            L2 系统能否被托付，往往取决于两点：一是驾驶员参与度监测（DMS / Hands-on 等）的可信度；二是系统在边界场景里能否更早、更清晰、更一致地提示。特斯拉手册明确写到系统会发出逐级升级的警告并监测注意力，这是一种把“人机共驾责任”产品化的方式。
          </P>
          <P>
            从供应链视角看，DMS / OMS 被放进法规路线图讨论也说明：在更高阶辅助驾驶 / 自动驾驶到来前，“人是否可接管、可否安全接管”会越来越像硬指标。
          </P>
          <h2 style={h2Style(accentColor)}>可解释性：解释不是“理由”，而是“可预测性”</h2>
          <P>
            解释在驾驶场景里最重要的用途不是说服用户，而是让用户能预测系统下一步，从而降低紧张与误解。学术上 DriveGPT4 等工作强调用大模型做可解释端到端驾驶的可能性；工程上更现实的做法是：把解释聚焦在可操作的约束上——“我为什么不变道（盲区车速差）”“我为什么减速（雨天附着 / 前车急刹风险）”，同时给用户提供“可控的偏好旋钮”。
          </P>
          <h2 style={h2Style(accentColor)}>隐私控制：车内 Agent 必须允许“记忆开关”与“分层授权”</h2>
          <P>
            车载个性化天然触及敏感数据：舱内摄像头、日程、常跑路线、家庭成员偏好。中国的个人信息保护法与汽车数据安全规定（试行）提供了基本合规框架：合法、正当、必要；敏感信息更严格；汽车数据处理也有额外安全要求。
          </P>
          <P>
            因此一个更成熟的产品形态应包含：记忆可视化（我记住了什么）+ 可删除 / 可导出 + 可分层授权（仅车端 / 可上云 / 可跨设备）+ 默认最小化。这既是合规，也是信任基础。
          </P>
          <Takeaway accentColor={accentColor}>这不是一页“交互技巧”总结，而是一个 case example：当 agent 真正面向驾驶行为理解时，UX 会被迫从命令响应转向证据融合、习惯学习、接管机制、可预测性与记忆治理。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide06Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-literature',
      numeral: '06',
      title: '文献给出的提醒：个性化驾驶真正难的，是行为数据如何被获取和组织',
      blocks: [
        <>
          <P>
            关于这一点，综述文章 <InlineEm>A Review of Personalization in Driving Behavior: Dataset, Modeling, and Validation</InlineEm> 提供了一个很重要的参照。文章指出，智能驾驶如果只建立在统一规则和通用驾驶模型之上，虽然能够完成基本任务，但很难真正适应不同驾驶者在跟车节奏、风险容忍度、变道风格和舒适偏好上的差异。
          </P>
          <P>
            这说明，未来的智能驾驶 agent 不能只是一个通用的“驾驶专家”。它还必须在安全边界内，持续形成对具体用户的行为理解。个性化不是锦上添花，而是驾驶场景中用户差异客观存在之后，系统必须处理的结构性问题。
          </P>
          <ChainVisual accentColor={accentColor} items={['Dataset', 'Modeling', 'Validation']} />
          <P>
            更关键的是，这篇文章提醒我们，个性化驾驶的难点首先不在模型，而在行为数据如何被获取和组织。许多现有驾驶数据虽然记录了轨迹、速度、转向、加减速和环境信息，但并不足以支持真正意义上的 personalization。
          </P>
          <QuietPanel>
            <div style={{ ...blockLabelStyle(), color: accentColor }}>Personalization Foundation</div>
            <p style={{ ...paragraphStyle(), margin: 0 }}>
              driver identity + scenario context + repeated behavior
            </p>
          </QuietPanel>
          <P>
            因为系统未必知道“是谁在开”，也未必能长期关联“同一个人在不同场景下如何驾驶”。如果没有把驾驶者身份、场景上下文和重复行为稳定连接起来，模型最终学到的往往只是一个平均化的人类驾驶模板，而不是某个用户在不同场景中的真实偏好结构。
          </P>
          <Callout accentColor={accentColor}>没有把驾驶者身份、场景上下文和重复行为稳定连接起来，模型最终学到的往往只是一个平均化的人类驾驶模板。</Callout>
          <Takeaway accentColor={accentColor}>个性化驾驶的地基，不是更聪明的模型，而是更对的行为数据结构。</Takeaway>
        </>,
      ],
    },
  ];
}

export function getAgenticDrivingPersonalizationSlide07Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-judgment',
      numeral: '07',
      title: '我的判断：agent 不是车主分身，也不是纯粹驾驶专家',
      blocks: [
        <>
          <P>
            也正因此，个性化驾驶不应被理解为“让车更像用户”，而应被理解为“让系统在规则与安全边界内，更准确地判断如何替这个用户驾驶”。
          </P>
          <P>
            这意味着 agent 既不能只是机械执行规则的驾驶专家，也不能只是简单复制车主习惯的分身。前者缺乏对个体差异的适应能力，后者则可能把用户短期习惯、风险偏好甚至不安全行为一并继承进系统。
          </P>
          <BalanceVisual accentColor={accentColor} />
          <P>
            更合理的方向，也许是把它理解为一个在安全约束内持续校准的驾驶协作者。它以通用驾驶能力为底座，但不断通过行为、场景和反馈去修正自己对用户的理解；它不是替用户放大习惯，而是在规则、舒适、安全和控制感之间，为这个用户找到更合适的执行方式。
          </P>
          <Callout accentColor={accentColor}>个性化驾驶不应被理解为“让车更像用户”，而应被理解为“让系统在规则与安全边界内，更准确地判断如何替这个用户驾驶”。</Callout>
          <div style={dividerStyle()} />
          <h2 style={h2Style(accentColor)}>What this means for UX</h2>
          <P>
            “驾驶员在线”应当被做成系统能力，而不是一句免责声明。对于 L2 / 近 L2 系统，信任往往不只来自自动化是否完美，也来自系统如何可信地监测驾驶员可用性，以及在边界场景里多早、多清晰、多一致地升级提醒。
          </P>
          <P>
            解释在驾驶场景里最重要的用途不是说服用户，而是让用户能预测系统下一步。比如“我没有变道，因为盲区车速差过大”，或“我在减速，因为雨天附着下降且前车急刹风险升高”。解释应当增加可预测性，而不是替系统做修辞。
          </P>
          <P>
            个性化成立的前提，也不只是记忆能力，而是记忆治理。车载 agent 学习行为，会触及座舱摄像头、常去路线、日程目的地、家庭成员偏好等敏感信息。因此成熟的 UX 需要记忆可见、删除 / 导出控制、分层授权，以及默认最小化。
          </P>
          <Takeaway accentColor={accentColor}>未来的驾驶 agent，不是更会说话，而是更会在安全约束内理解人。</Takeaway>
        </>,
      ],
    },
  ];
}
