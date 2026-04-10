/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import {
  blockLabelStyle,
  dividerStyle,
  h2Style,
  noteCardStyle,
  paragraphStyle,
  smallMetaStyle,
} from './h5Styles';
import { getAgenticDrivingPersonalizationSlide05Sections } from './H5DocContentAgenticDrivingPersonalization';

function P({ children }: { children: ReactNode }) {
  return <p style={paragraphStyle()}>{children}</p>;
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

function QuietPanel({ children }: { children: ReactNode }) {
  return <div style={{ ...noteCardStyle(), margin: '14px 0' }}>{children}</div>;
}

function Takeaway({ accentColor, children }: { accentColor: string; children: ReactNode }) {
  return (
    <div style={{ borderTop: `1px solid ${accentColor}35`, paddingTop: 10, marginTop: 14 }}>
      <div style={{ ...smallMetaStyle(), color: accentColor }}>Takeaway</div>
      <p style={{ ...paragraphStyle(), color: '#efe4d0', margin: 0 }}>{children}</p>
    </div>
  );
}

export function getDrivingAuthorityContractsMainSections(accentColor: string): SectionData[] {
  return [
    {
      id: 'driving-authority-contracts-main',
      numeral: '01',
      title: '当车开始像同伴一样观察人时，HMI 就不再只是驾驶界面',
      blocks: [
        <>
          <P>
            当车开始像同伴一样观察人时，HMI 就不再只是驾驶界面，而同时变成安全界面、权限界面和学习界面。下一步我会把这层重新分权具体化成一套可设计的机制。
          </P>
          <P>
            对我来说，问题的核心不是“agent 能不能更懂你”，而是 agent 的“注意力、解释权、决策权”应该怎么分配给人。在车里，辅助 / 自动驾驶的 interface 和 companion 式的 interaction 其实不是两套系统，而是同一套注意力仲裁器的两个表层：前者解决“谁在承担动态驾驶任务、何时交还、如何接管”，后者解决“机器理解你什么、记住什么、替你编排什么、什么时候该问你”。
          </P>
          <P>
            NHTSA 对 L2 / L3 的分级，以及 UNECE 对 transition demand、driver availability recognition、minimum risk manoeuvre 的要求，本质上都在画这条边界。
          </P>
          <Callout accentColor={accentColor}>
            在车里，驾驶 automation interface 和 companion interaction 不是两套系统，而是同一套注意力仲裁器的两个表层。
          </Callout>
          <h2 style={h2Style(accentColor)}>我会先把它拆成两个“交互合同”</h2>
          <P>
            第一种是驾驶自动化合同。机器主要看路、车、自身状态，以及你是否还能安全接管；它要求人关注的，是系统状态、能力边界、故障、以及何时必须回到 control loop。NHTSA 的 DVI guidance 很明确：静态状态信息适合持续可见的专属显示；时间相关、尤其需要驾驶员行动的信息，更适合有明确起点的听觉 / 触觉信号；真正时间关键的信息，应该用高显著性的提示把人的注意力重新拉回来。
          </P>
          <P>
            第二种是 companion 合同。它在“看路、看车”的基础上，额外“看人”：看你在什么场景下怎么判断、哪些是稳定偏好、哪些只是偶发行为、哪些根本不该学。EDPB 对 connected vehicles 的指导也说明，车内系统现实中可能接触到驾驶习惯、位置、摄像头、眼动甚至生物特征这类高度个人化的数据；一旦叠加 agent 属性，系统的对象就不再只是道路世界，而是“道路世界里的你”。
          </P>
          <div style={dividerStyle()} />
          <h2 style={h2Style(accentColor)}>车上的 agent 回执也应该分级，而不是一律弹窗</h2>
          <P>
            类比我们和 coding agent 打交道时需要“审批若干 agent 员工回执”。车上的 agent 回执也应该分级，而不是一律弹窗。
          </P>
          <QuietPanel>
            <div style={{ ...blockLabelStyle(), color: accentColor }}>四层回执</div>
            <P>
              <strong style={{ color: '#d8ccb6' }}>已执行，仅留痕。</strong> 只适用于低风险、高置信、可逆的动作，比如“根据雨天稳健偏好，已把跟车风格从 standard 调到 cautious”。这类信息不该抢主注意力，只需要轻提示或事后日志。NHTSA 的 guidance 也支持把非紧急状态信息放在非显著、持续可见的视觉层。
            </P>
            <P>
              <strong style={{ color: '#d8ccb6' }}>需要知晓，不需要现在决策。</strong> 比如“800 米后因施工可能需要人工接管”。这类信息应该提前给、但不应过载；UNECE 对 L3 / ALKS 的思路也是 planned event 要尽早发出 transition demand，并在过渡期保持系统继续运行、按规则升级提醒。
            </P>
            <P>
              <strong style={{ color: '#d8ccb6' }}>需要你定方向。</strong> 比如“地库减速 + 当前导航 + 以往习惯，泊车意图概率 62%，是否进入泊车导向？” 这已经不是 safety-critical control，而是服务编排和偏好确认。它适合在低时压场景下以单步确认出现，而不是在高负荷驾驶中逼你做复杂选择。关于解释形式，近期系统综述发现，比起单纯描述“系统做了什么”，解释“为什么这么做”更有效；而且解释最好是情境化的，必要时多模态，但不同模态要传不同信息，否则容易冗余。
            </P>
            <P>
              <strong style={{ color: '#d8ccb6' }}>必须立刻接管。</strong> 这时已经不是 companion 说话的时机，而是安全层接管交互。UNECE 要求 transition demand 至少以视觉加声音 / 触觉给出，并在规定时间内升级；minimum risk manoeuvre 也有明确触发和减速逻辑。这里不需要“会话式解释”，只需要清晰、强显著、无歧义。
            </P>
          </QuietPanel>
          <h2 style={h2Style(accentColor)}>更本质的 UX 原则：可见性要匹配人此刻的权责</h2>
          <P>
            这背后或许有一条更本质的 UX 原则，也许也就是做镜头系统做多了之后的一点条件反射：可见性不是越多越好，而是越“匹配人此刻的权责”越好。2025 年关于自动驾驶解释的综述和实验都提示了同一个方向：适当解释能提升理解与接受，但细节不是越多越好；过多解释会降低清晰度，甚至制造“我好像更能控制系统了”的错觉，而这种 perceived control 并不等于 real control。
          </P>
          <P>
            所以我会用四个变量来决定“要不要打断人”：风险、置信度、可逆性、时间压力。
          </P>
          <QuietPanel>
            <div style={{ ...blockLabelStyle(), color: accentColor }}>Interrupt Logic</div>
            <P>高风险 + 低置信度，不要 agent 化探索，直接保守 fallback；</P>
            <P>低风险 + 高置信度 + 可逆，自动执行后轻提示；</P>
            <P>低风险 + 低置信度，先进入影子学习或事后确认；</P>
            <P>高风险 + 高置信度，也只能在安全包络内动作，同时高显著地说明当前 responsibility state。</P>
            <P>这个逻辑和 NHTSA / UNECE 对状态信息、接管、MRM 的分工是同向的。</P>
          </QuietPanel>
          <h2 style={h2Style(accentColor)}>记忆层不该只是“存更多数据”，而应该是可治理的优先级系统</h2>
          <P>
            Agent 的记忆层不该只是“存更多数据”，而应该是一个可治理的优先级系统。EDPB 对 connected vehicles 的建议非常贴近这个方向：默认只处理车辆运行严格必要的数据；其他目的的数据处理应让用户能开启 / 关闭；用户应能修改配置、删除相关数据；能本地处理就尽量本地处理，因为这既减少隐私风险，也减少时延，而且特别适合驾驶辅助功能。
          </P>
          <P>
            这意味着，车上的记忆不应该只有“记住了什么”，还要有一整套记忆元数据：它来自哪次行为、在什么场景下成立、置信度多高、会影响哪些策略、是否过期、用户能不能改、能不能一键忘记。这样记忆才不是黑箱用户画像，而是可编辑的策略先验库。这也是“让机器知道下一步该学什么、不该学什么”的前提。EDPB 甚至明确提到，要让用户对数据处理有实际控制，并建议车内应用平台与 safety-relevant functions 分隔。
          </P>
          <h2 style={h2Style(accentColor)}>紧急场景不是展现 agent 智能的时候，而是收敛到最稳健逻辑的时候</h2>
          <P>
            紧急场景不能做低置信、高风险的 agent 决策。现有规范其实已经在这样约束：planned event 要提前发 transition demand；driver 不响应才进入 MRM；严重系统 / 车辆故障时可以立即进入更保守的 minimum risk manoeuvre。还有修订文本明确提出，lane change 最好不要发生在 transition phase 里，也不要在临近或正在变道时再给交接请求。换句话说，紧急时刻不是“展现 agent 智能”的时候，而是“收敛到最稳健安全逻辑”的时候。
          </P>
          <P>
            这和隐私其实是同一逻辑的两面：都反对未经预期的越界。在安全上，越界是系统在低置信、高风险时还替你做主；在隐私上，越界是系统默认采了不该采的数据、把不该云端化的东西传出去、让不可见的记忆持续影响决策。EDPB 的 connected vehicle 指导强调默认最小化、本地处理、可控可删；这和“稳健和安全第一要义”是同一种设计伦理。
          </P>
          <P>
            另外，预先的提醒系统本身也会训练用户。研究显示，提前的 monitoring request 配合后续 take-over request，能改善接管表现、降低工作负荷并提升信任；但如果用户过度依赖系统提示，在没有后续 TOR 的情形下反而可能出现 omission errors。另一项研究也显示，driver monitoring feedback 虽能改善 takeover，但会带来 annoyance trade-off。也就是说，车机不是“提醒越多越负责”，而是要避免把人训练成只会等系统喊。
          </P>
          <div style={dividerStyle()} />
          <h2 style={h2Style(accentColor)}>如果把这套东西落到具体界面上</h2>
          <P>
            如果把这套东西落到具体界面上，我会更倾向于这样做：将当前的智驾播报升级为驾驶责任条，实时显示现在谁负责、系统状态、ODD / 能力边界、接管准备度；把车机陪伴助手的信息显示升级，让它实时显示现在基于哪些偏好在工作、刚学到了什么、哪些记忆候选等待确认；实时只出现 1 / 2 / 4 类回执，第 3 类尽量延后到低负荷时刻；停车后再回放学习，不是边开边问，而是事后说，“今天观察到你在二级路更偏好提前两个路口变道，要不要保存？”；同时提供记忆工坊，让每条记忆都能看来源、场景、生效范围、上次使用、编辑 / 忘记 / 永不学习；一旦进入高风险或低置信状态，所有 companion 式解释自动退场，只保留安全提示与接管信息。
          </P>
          <Takeaway accentColor={accentColor}>
            这篇的核心不是再给车里加一个会说话的 agent，而是把 HMI 重新理解成一套分权机制：谁现在负责、谁可以解释、谁能替谁决定、系统又该在什么条件下闭嘴。
          </Takeaway>
        </>,
      ],
    },
  ];
}

export function getDrivingAuthorityContractsUxSubpageSections(accentColor: string): SectionData[] {
  return getAgenticDrivingPersonalizationSlide05Sections(accentColor);
}
