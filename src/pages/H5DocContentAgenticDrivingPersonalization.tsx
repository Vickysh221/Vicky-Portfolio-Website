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
  const rows = [
    ['智己', '舱驾底盘一体的意图到动作链路', '记忆系统公开展开较少', '融合架构与执行'],
    ['千里科技', '记忆与个性化成长', '长短期全场景记忆', '车端与移动端连续'],
    ['特斯拉', '清晰责任边界内的 L2 执行', '个性化不是公开重点', 'FSD Supervised'],
    ['Waymo', 'ODD 内可运营的 L4 Driver', '面向服务部署', '系统能否运营'],
    ['Mobileye', '可解释安全驾驶系统', 'RSS 与冗余感知', '安全方法学'],
    ['蔚来 / 小鹏 / 华为乾崑', '智驾、大模型、车控、座舱整合', '个性化驾驶员模型仍不系统', '体验与生态整合'],
    ['博世 / 大陆', 'agent 的技术承载层', '车内感知与法规路线图', '平台与量产准备'],
  ];

  return (
    <QuietPanel>
      <div style={{ ...blockLabelStyle(), color: accentColor }}>Representative Industry Split</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
          <thead>
            <tr>
              {['厂商 / 平台', 'Agent 面向的核心对象', '记忆 / 个性化（公开）', '执行 / 融合重点'].map((head) => (
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
        这个比较不是为了做市场分析，而是说明：行业虽然都在谈 agent，但并没有统一 agent 在车里到底面向什么对象。
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
      id: 'agentic-driving-literature',
      numeral: '05',
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

export function getAgenticDrivingPersonalizationSlide06Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'agentic-driving-judgment',
      numeral: '06',
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
