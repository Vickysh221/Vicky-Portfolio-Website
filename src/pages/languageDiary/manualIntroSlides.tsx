import type { CSSProperties, ReactNode } from 'react';
import type { SectionData } from '../H5DocContentSlideFactory';
import {
  dividerStyle,
  gridListStyle,
  infoTagStyle,
  kickerStyle,
  mediaBlockStyle,
  paragraphStyle,
  smallMetaStyle,
  subtitleStyle,
  ListItem,
} from '../h5Styles';
import { ImageWithStatus, VideoWithStatus } from '../../components/MediaWithStatus';
import diarySlide02Img01 from '../../images/diary-agent/slide02-img01.png';
import diarySlide02Vid01 from '../../images/diary-agent/slide02-vid01-540p.mp4';
import diarySlide02Vid02 from '../../images/diary-agent/slide02-vid02-540p.mp4';
import diarySlide02Vid03 from '../../images/diary-agent/slide02-vid03-540p.mp4';

function mediaPairStyle(): CSSProperties {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '12px',
  };
}

function mediaPairItemStyle(): CSSProperties {
  return {
    flex: '1 1 280px',
    minWidth: 0,
  };
}

function journeyMediaStyle(accentColor: string): CSSProperties {
  return {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '5px',
    border: `1px dashed ${accentColor}55`,
    background: 'rgba(255,255,255,0.01)',
  };
}

function renderMotivationSlide(accentColor: string): ReactNode[] {
  return [
    <div key="motivation-intro">
      <div style={kickerStyle(accentColor)}>项目动机</div>
      <h2 style={subtitleStyle(accentColor)}>开始前的一点小啰嗦</h2>
      <p style={paragraphStyle()}>
        从始至终，语言学习对我来说都是 “Study for the sake of itself”。读到《The Language Instinct》时，
        “语言天赋是一种基因层面的能力” 这个观点，突然把我过去几年零散的体验串成了一条线。
      </p>
      <p style={paragraphStyle()}>
        我开始理解，学习语言的兴奋不只是掌握一个单词或一个用法，而像是在唤醒身体里某个古老的本能。
        这个过程本身，变成了我对自身存在的一种觉察。
      </p>
    </div>,
    <div key="motivation-scenes" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>My Current Language Moments</div>
      <ul style={gridListStyle(8)}>
        <ListItem accent={accentColor}>西语还只有 A1 水平，但已经能在弗拉明戈课堂里用最基础的词汇和外教交流。</ListItem>
        <ListItem accent={accentColor}>第一次在音乐里听懂 “ahora”，在舞步中理解 “izquierda”，那种瞬间连接现实的感觉非常强。</ListItem>
        <ListItem accent={accentColor}>当老师夸 “tu falda bonita”，当我在真实场景里逐一解锁 bastón、mantón 这些词时，我能明确感觉到一个世界在展开。</ListItem>
      </ul>
    </div>,
    <div key="motivation-why">
      <h2 style={subtitleStyle(accentColor)}>我为什么想做这个项目</h2>
      <p style={paragraphStyle()}>
        我想让更多人意识到，多语言不必被理解成一段沉重而遥远的旅程。所有微小但真实的时刻，
        都是学习的一部分，也都值得被记录、被回看、被重新激活。
      </p>
      <p style={paragraphStyle()}>
        现在如果有人问我为什么学德语、西语，甚至未来想继续学更多语言，我很难给出一个功利的答案。
        我更像是在不断创造机会，让自己更靠近语言，靠近文化、声音，以及现实生活里一个又一个细小场景。
      </p>
      <p style={paragraphStyle()}>
        语言学习本身，成了我理解世界、理解自己的方式。
      </p>
    </div>,
    <div key="motivation-ai">
      <div style={dividerStyle()} />
      <div style={infoTagStyle(accentColor, 'tech')}>AI Shift</div>
      <p style={paragraphStyle()}>
        大语言模型和 Agent 的出现进一步改变了我的学习方式。我开始用 Agent 记录生活、交换记忆、优化表达，
        让语言学习的阻力被一点点消除，变成更自由、更定制化、也更贴近自我的体验。
      </p>
      <p style={paragraphStyle()}>
        我第一次真实感到，AI 也许会让更多人重新发现自己身上的“语言本能”。
      </p>
    </div>,
  ];
}

function renderJourneyPlaceholderSlide(accentColor: string): ReactNode[] {
  return [
    <div key="journey-intro">
      <div style={kickerStyle(accentColor)}>产品目标和用户旅程</div>
      <h2 style={subtitleStyle(accentColor)}>把“表达”视为长期资产的语言学习系统</h2>
      <p style={paragraphStyle()}>
        这是一个把“表达”视为长期资产的语言学习系统。它让用户在白天通过真实对话暴露自己的语言边界，
        在夜间把这些边界转化为可复用的表达记忆，并把语言学习重新嵌入生活的节律之中。
      </p>
      <p style={paragraphStyle()}>
        对 Mira 来说，她不是在完成练习，而是在一点点学会：如何用另一种语言，更准确地成为自己。
      </p>
    </div>,
    <div key="journey-framing" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>Narrative Framing</div>
      <p style={paragraphStyle()}>
        在这个作品里，我会用一个叫 Mira 的小女孩来讲它。
      </p>
    </div>,
    <div key="journey-morning" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>晨间唤醒</div>
      <p style={paragraphStyle()}>
        清晨，Mira 醒来，她伸手摸到床边的手机，脑子里还是散的。她并不想一大早就看到那种
        “你昨天学的第 6 个单词还记得吗” 的问题。
      </p>
      <p style={paragraphStyle()}>
        她打开应用的时候，迎面而来的不是任务感，而是一句很轻的开场：
        “Lass uns eine Erinnerung kurz aufwecken.” 让我们轻轻叫醒一个记忆。
      </p>
      <p style={paragraphStyle()}>
        一天不是从输入知识开始，而是从一个熟悉的位置开始开口。有时是一个场景，有时是一个偏好，
        有时是一个方向，有时是一个未完成的念头。
      </p>
      <div style={mediaPairStyle()}>
        <div style={mediaPairItemStyle()}>
          <VideoWithStatus src={diarySlide02Vid01} style={journeyMediaStyle(accentColor)} controls playsInline title="Mira 晨间唤醒视频" />
        </div>
        <div style={mediaPairItemStyle()}>
          <ImageWithStatus src={diarySlide02Img01} style={journeyMediaStyle(accentColor)} alt="Mira 晨间唤醒插画占位" />
        </div>
      </div>
    </div>,
    <div key="journey-daytime" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>白天陪伴</div>
      <p style={paragraphStyle()}>
        白天，Mira 并不是在“上课”。她只是像平常一样，和 app 里的 agent 伙伴聊天。她说今天在学校发生的小事，
        说自己为什么有点难过，说某个时刻明明有感觉，却不知道怎样用目标语言把它说得更准确。
      </p>
      <p style={paragraphStyle()}>
        这个陪伴她的“语言搭子”不是一个不停纠错的老师，更像一个贴身的语言陪伴者。它会顺着 Mira 当下的话题往下走，
        保持轻量、自然、像朋友一样的追问；它尽量不讲大道理，也不把对话拉回教材。
      </p>
      <p style={paragraphStyle()}>
        它做得更重要的一件事，是在 Mira 的真实表达里悄悄识别那些“值得升级”的部分。
        某个句子可以更自然，某个词还不够贴近她真正的感受，某种表达方式其实已经带有她稳定的个性轮廓。
      </p>
    </div>,
    <div key="journey-accumulation" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>学习在悄悄积累</div>
      <p style={paragraphStyle()}>
        这种白天的对话并不会只停留在聊天记录中。系统会把 Mira 当天说过的话、出现过的表达、关联的词和片段，
        逐渐组织成一种可回收的素材。
      </p>
      <ul style={gridListStyle(8)}>
        <ListItem accent={accentColor}>有些会进入词汇或知识卡片</ListItem>
        <ListItem accent={accentColor}>有些会形成表达升级线索</ListItem>
        <ListItem accent={accentColor}>有些会作为带有生活场景、情绪温度和个人痕迹的事件锚点被记住</ListItem>
      </ul>
      <p style={paragraphStyle()}>
        对 Mira 来说，这意味着语言不再是抽象的规则，而是被绑定到她自己的生活片段上：
        早餐前的匆忙、和朋友闹别扭后的沉默、某个开心得想立刻告诉别人的时刻。
        语言从一开始就和记忆缠在一起。
      </p>
      <div style={mediaPairStyle()}>
        <div style={mediaPairItemStyle()}>
          <VideoWithStatus src={diarySlide02Vid02} style={journeyMediaStyle(accentColor)} controls playsInline title="Mira 白天表达沉淀视频" />
        </div>
        <div style={mediaPairItemStyle()}>
          <ImageWithStatus src={diarySlide02Img01} style={journeyMediaStyle(accentColor)} alt="Mira 白天陪伴插画占位" />
        </div>
      </div>
    </div>,
    <div key="journey-night" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>晚间回顾</div>
      <p style={paragraphStyle()}>
        到了晚上，这个 app 的角色会发生变化。白天陪 Mira 说话的搭子，会在夜里变成一个更有整理能力的语言老师。
      </p>
      <p style={paragraphStyle()}>
        他不会像传统复习那样只问她今晚要背哪个词，而是更像把 Mira 白天散落的表达重新捧回来：
        今天你最想重新看一眼的是哪个词、哪个句子、哪一个你没说好的瞬间？
      </p>
      <p style={paragraphStyle()}>
        这里最重要的不是复述知识点，而是帮助 Mira 完成一次从“生活中的含混感受”
        到“可以被再次使用的语言形式”的转化。
      </p>
    </div>,
    <div key="journey-memory" style={mediaBlockStyle()}>
      <div style={smallMetaStyle()}>记忆收回</div>
      <div style={infoTagStyle(accentColor, 'tech')}>语言学习记忆</div>
      <p style={paragraphStyle()}>
        系统会帮助 Mira 回看一个词在今天真实语境里的意思。它可能会比较相邻表达之间的差别，
        给出更自然的句子升级，或者只提炼一个她明天还能继续使用的小句型。
      </p>
      <p style={paragraphStyle()}>
        语言知识不再以条目的形式出现，而是以“今天我本来想这样说，下次我可以更自然地这样说”的方式留下来。
      </p>
      <div style={infoTagStyle(accentColor, 'source')}>个人情感记忆</div>
      <p style={paragraphStyle()}>
        这部分并不是心理分析，也不是对 Mira 贴死板标签，而是一种更轻的、陪伴式的反映：
        今天她说话时像不像一个很谨慎的人？她是不是总在克制、绕开，或者特别努力地让自己的表达显得不冒犯别人？
      </p>
      <p style={paragraphStyle()}>
        在这个 app 的设想里，语言学习从来不是脱离主体的。一个人怎样说话，往往也暴露了她怎样面对世界。
        到了晚上，系统不仅帮助 Mira 记住“怎么说”，也帮助她记住“原来我今天是这样在感受、这样在组织自己”。
      </p>
      <div style={mediaPairStyle()}>
        <div style={mediaPairItemStyle()}>
          <VideoWithStatus src={diarySlide02Vid03} style={journeyMediaStyle(accentColor)} controls playsInline title="Mira 夜间记忆收回视频" />
        </div>
        <div style={mediaPairItemStyle()}>
          <ImageWithStatus src={diarySlide02Img01} style={journeyMediaStyle(accentColor)} alt="Mira 夜间回顾插画占位" />
        </div>
      </div>
    </div>,
    <div key="journey-core">
      <div style={dividerStyle()} />
      <p style={paragraphStyle()}>
        这个项目真正的核心，是建立一种嵌入日常节律的表达系统。
      </p>
    </div>,
  ];
}

export function getManualLanguageDiaryIntroSlides(accentColor: string): SectionData[] {
  return [
    {
      id: 'language-diary-slide-01',
      numeral: '01',
      title: '项目动机 · 开始前的一点小啰嗦',
      blocks: renderMotivationSlide(accentColor),
    },
    {
      id: 'language-diary-slide-02',
      numeral: '02',
      title: '产品目标和用户旅程 · Ritual Flow',
      blocks: renderJourneyPlaceholderSlide(accentColor),
    },
  ];
}
