import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, h2Style, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import slide03Img01 from '../images/unity3d-camera/slide03-img01.png';
import slide03Img02 from '../images/unity3d-camera/slide03-img02.png';
import slide03Img03 from '../images/unity3d-camera/slide03-img03.png';
import slide03Img04 from '../images/unity3d-camera/slide03-img04.png';
import slide03Img05 from '../images/unity3d-camera/slide03-img05.png';
import slide03Img07 from '../images/unity3d-camera/slide03-img07.png';
import slide03Img08 from '../images/unity3d-camera/slide03-img08.png';
import slide03Img09 from '../images/unity3d-camera/slide03-img09.png';
import slide03Img10 from '../images/unity3d-camera/slide03-img10.png';



function Accent({ color }: { color: string }) {
  return <span style={{ width: 3, height: 12, borderRadius: 2, background: color, opacity: 0.9, display: 'inline-block' }} />;
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
        <li key={it.cat} style={{ color: '#a99679', fontSize: '16px', lineHeight: 1.8, display: 'flex', gap: 8 }}>
          <span style={{ color: accentColor }}>—</span>
          <span><span style={{ color: '#c8b080' }}>{it.cat}：</span>{it.examples}</span>
        </li>
      ))}
    </ul>
  );
}

export function getUnityCameraSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'view-examples', numeral: '04', title: '3D 地图视图呈现', blocks: [<>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />行车运镜视角示例</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {[
            { label: '手动驾驶默认视角', img: slide03Img01 },
            { label: 'AVP 自动泊入视角', img: slide03Img02 },
            { label: '辅助驾驶自动变道视角', img: slide03Img03 },
            { label: '导航驾驶视角', img: slide03Img04 }
          ].map((item, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <ImageWithStatus
                src={item.img}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
                alt={item.label}
              />
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '13px' }}>图 4-{i + 1} {item.label}</div>
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
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车事件优先级规则</h2>
        <p style={paragraphStyle()}>在车辆状态镜头系统中同样存在镜头优先级仲裁策略。若车身同时出现多个异常状态或充电状态叠加，则选择优先级更高的事件镜头进行展示。</p>
        <div style={mediaBlockStyle()}>
          <ImageWithStatus
            src={slide03Img05}
            style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
            alt="驻车事件触发来源概览和优先级仲裁关系"
          />
          <div style={{ marginTop: 8, color: '#7f6f55', fontSize: '13px' }}>图 5-2 驻车事件触发来源概览和优先级仲裁关系</div>
        </div>
        <h2 style={h2Style(accentColor)}><Accent color={accentColor} />驻车运镜视角示例</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '12px 0' }}>
          {[
            { label: '传感器 L1 异常故障查看视角', img: slide03Img07 },
            { label: '车门 R1 异常故障查看视角', img: slide03Img08 },
            { label: '充电视角', img: slide03Img09 },
            { label: '胎温胎压异常视角', img: slide03Img10 }
          ].map((item, i) => (
            <div key={i} style={mediaBlockStyle()}>
              <ImageWithStatus
                src={item.img}
                style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }}
                alt={item.label}
              />
              <div style={{ marginTop: 6, color: '#7f6f55', fontSize: '13px' }}>图 5-{i + 3} {item.label}</div>
            </div>
          ))}
        </div>
      </>],
    },
  ];
}
