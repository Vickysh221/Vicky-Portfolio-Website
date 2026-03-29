import { type SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, ListItem, gridListStyle, documentCardStyle, smallMetaStyle, infoTagStyle } from './h5Styles';

export function getPhoenixFuliPlusSlide04Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'two-modes',
      numeral: '05',
      title: '两种模式：上传图模式 / 语言模式',
      blocks: [
        <>
          <div style={infoTagStyle(accentColor, 'source')}>mode design</div>
          <h2 style={h2Style(accentColor)}>模式一：上传图模式</h2>
          <p style={paragraphStyle()}>
            上传图模式并不是 image similarity mode。原图在这里更像一个 <strong>anchor state</strong>：系统不是帮用户找最像的图，而是围绕原图去构造“保留某一层、打开其他层”的可能性。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>系统真正要问的问题</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>用户到底想保留的是 motif、arrangement、style，还是整体 mood？</ListItem>
              <ListItem accent={accentColor}>原图只是起点，不是答案。</ListItem>
              <ListItem accent={accentColor}>系统提供的是 anchored possibility exploration，而不是原图复制。</ListItem>
            </ul>
          </div>
          <h2 style={h2Style(accentColor)}>模式二：语言模式</h2>
          <p style={paragraphStyle()}>
            语言模式也不是 parameter guessing。用户通常一次只能说清一两个维度，所以第一轮更适合做 <strong>dimensional probing</strong>：分别沿 color、motif、arrangement、style / impression 去试探用户真正关心的层。
          </p>
          <div style={documentCardStyle()}>
            <div style={smallMetaStyle()}>为什么要这样设计</div>
            <ul style={gridListStyle(6)}>
              <ListItem accent={accentColor}>用户不擅长先给完整答案，但擅长在比较中发现偏好。</ListItem>
              <ListItem accent={accentColor}>系统要先帮他“看见不同方向”，而不是过早收敛。</ListItem>
              <ListItem accent={accentColor}>语言输入的价值是建立初始 state，不是一次性精确 specification。</ListItem>
            </ul>
          </div>
        </>,
      ],
    },
  ];
}
