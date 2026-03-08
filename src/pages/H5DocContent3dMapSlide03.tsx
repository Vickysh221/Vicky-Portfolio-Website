import type { CSSProperties, ReactNode } from 'react';
import type { SectionData } from './H5DocContentSlideFactory';
import { paragraphStyle, subtitleStyle, mediaBlockStyle } from './h5Styles';
import { ImageWithStatus } from '../components/MediaWithStatus';
import img01 from '../images/3d-2dmap/slide03-img01.png';
import img02 from '../images/3d-2dmap/slide03-img02.png';
import img03 from '../images/3d-2dmap/slide03-img03.png';
import img04 from '../images/3d-2dmap/slide03-img04.png';

function listStyle(): CSSProperties {
  return {
    margin: '10px 0 12px',
    paddingLeft: 18,
    color: '#a99679',
    fontSize: '15px',
    lineHeight: 1.9,
  };
}



function bulletList(items: string[]): ReactNode {
  return (
    <ul style={listStyle()}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function get3dMapSlide03Sections(accentColor: string): SectionData[] {
  return [
    {
      id: 'view-system-overview',
      numeral: '01',
      title: '视角体系总览',
      blocks: [
        <>
          <div style={{ color: '#c8a96e', fontSize: '11px', letterSpacing: '0.2em', marginBottom: 8 }}>
            H5 DOCUMENT SPEC · /jidu-hmi/3d-map
          </div>
          <p style={{ ...paragraphStyle(), marginTop: 0 }}>
            本页用于定义 3D 地图系统中的主要视角类型，包括 SR 视角、路线视角、路况视角以及漫游 / 锁定视角，并明确各自的触发条件、退出条件和显示元素规则。
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', marginTop: 12 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '8px 10px', color: '#c8a96e', fontWeight: 500, textAlign: 'left', whiteSpace: 'nowrap', width: '80px' }}>视角状态</th>
                <th style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '8px 10px', color: '#c8a96e', fontWeight: 500, textAlign: 'left' }}>视图预览</th>
                <th style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '8px 10px', color: '#c8a96e', fontWeight: 500, textAlign: 'left', width: '140px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>SR 视角</td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px' }}>
                  <div style={mediaBlockStyle()}>
                    <ImageWithStatus src={img01} alt="SR 视角预览" style={{ width: '100%', height: 'auto', borderRadius: 4, display: 'block' }} />
                  </div>
                </td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle' }}>默认视角</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>路况视角</td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px' }}>
                  <div style={mediaBlockStyle()}>
                    <ImageWithStatus src={img02} alt="路况视角预览" style={{ width: '100%', height: 'auto', borderRadius: 4, display: 'block' }} />
                  </div>
                </td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle' }}>
                  <div>临时视角</div>
                  <div style={{ color: '#8d7960', fontSize: '13px', marginTop: 4 }}>（除非用户选择固定）</div>
                  <div style={{ marginTop: 8 }}>SR 以小图呈现（必要时）</div>
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>路线视角</td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px' }}>
                  <div style={mediaBlockStyle()}>
                    <ImageWithStatus src={img03} alt="路线视角预览" style={{ width: '100%', height: 'auto', borderRadius: 4, display: 'block' }} />
                  </div>
                </td>
                <td style={{ border: '1px solid rgba(200,169,110,0.25)', padding: '10px', color: '#a99679', verticalAlign: 'middle' }}></td>
              </tr>
            </tbody>
          </table>
        </>,
      ],
    },
    {
      id: 'route-view',
      numeral: '02',
      title: '路线视角',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>触发条件</h2>
          {bulletList([
            '系统触发：用户发起算路 / 搜路',
            '系统触发：用户偏航后触发重算路线',
            '用户触发：主动切换到「路线视角」',
          ])}
          <h2 style={subtitleStyle(accentColor)}>退出条件</h2>
          {bulletList([
            '搜路 / 算路流程结束',
            '用户未进行锁定视角操作、无手势操作，切换至全览后 10 秒自动退出',
            '用户主动下达退出视角指令',
          ])}
          <h2 style={subtitleStyle(accentColor)}>显示元素</h2>
          {bulletList([
            '路线：保持恒定屏幕宽度，显示路况，不显示感知信息',
            '气泡：沿用 2D 地图各场景显示元素，如 POI、充电站、红绿灯、电子眼',
            '感知物：隐藏他车等其他交通参与者',
          ])}
        </>,
      ],
    },
    {
      id: 'traffic-view',
      numeral: '03',
      title: '路况视角',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>触发条件</h2>
          {bulletList(['用户主动切换到「路况视角」'])}
          <h2 style={subtitleStyle(accentColor)}>退出条件</h2>
          {bulletList(['用户未进行锁定视角操作、无手势操作，切换至全览后 10 秒自动退出'])}
          <h2 style={subtitleStyle(accentColor)}>显示元素</h2>
          {bulletList([
            '路线：同时兼顾导航面、路况信息与感知信息',
            '气泡：显示渲染范围内所有 2D 地图场景元素',
            '感知物：显示',
          ])}
        </>,
      ],
    },
    {
      id: 'sr-view',
      numeral: '04',
      title: 'SR 视角',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>触发条件</h2>
          <p style={paragraphStyle()}>
            SR 视角为系统默认视角，无需显式触发。该视角下也包含一系列事件运镜，如自动变道、APA 泊车、倒车等镜头变化。
          </p>
          <h2 style={subtitleStyle(accentColor)}>显示元素</h2>
          {bulletList([
            '路线：车道级导航元素 + 智驾轨控线（如 PPA、LCC）',
            '其他智驾元素：如车位、落位框、车道纠偏线等',
            '气泡：可视范围内的红绿灯、导航机动点、POI',
            '感知物：全量显示',
          ])}
          <h2 style={subtitleStyle(accentColor)}>角色说明</h2>
          <p style={paragraphStyle()}>
            SR 视角承担环境理解与智驾状态表达的核心职责，是整个系统中的主视角基础层，其他视角更多是围绕任务目标进行临时切换。
          </p>
        </>,
      ],
    },
    {
      id: 'roam-and-lock',
      numeral: '05',
      title: '漫游与锁定视角',
      blocks: [
        <>
          <h2 style={subtitleStyle(accentColor)}>漫游视角</h2>
          <p style={paragraphStyle()}>
            用户通过手势操作后双击屏幕，或通过语音输入与「锁定视角」相关的指令，可进入漫游视角。该视角强调用户主动探索和自由观察。
          </p>
          <h2 style={subtitleStyle(accentColor)}>锁定视角</h2>
          <p style={paragraphStyle()}>
            用户可在任意镜头下通过双击屏幕或语音输入「锁定视角」相关指令，进入锁定视角。锁定后，系统不再按默认时间策略自动恢复主视角。
          </p>
          <h2 style={subtitleStyle(accentColor)}>设计意义</h2>
          <p style={paragraphStyle()}>
            漫游与锁定机制用于给用户保留主动控制权，避免系统自动切换过于强势。这玩意儿本质上是在系统智能和用户意志之间搭一个不那么讨打的缓冲层。
          </p>
        </>,
      ],
    },
    {
      id: 'media-placeholders',
      numeral: '06',
      title: '图示与占位',
      blocks: [
        <>
                    <div style={mediaBlockStyle()}>
            <ImageWithStatus
              src={img04}
              style={{ width: '100%', height: 'auto', borderRadius: '5px', border: `1px dashed rgba(200,169,110,0.28)`, background: 'rgba(255,255,255,0.01)' }} 
              alt="AVP learning user flow overview" 
            /></div>
        

          
          {/* <p style={captionStyle()}>图 6-1 主要视角类型与切换关系示意</p>
          <h2 style={subtitleStyle(accentColor)}>图片</h2>
          <div style={mediaPlaceholderStyle()}>Image · 各视角下的元素显隐规则对照图</div>
          <p style={captionStyle()}>图 6-2 路线、气泡与感知物在不同视角下的显示差异</p>
          <h2 style={subtitleStyle(accentColor)}>视频</h2>
          <div style={mediaPlaceholderStyle()}>Video · 路线视角、路况视角与 SR 视角切换演示</div>
          <p style={captionStyle()}>视频 6-1 不同视角下的切换逻辑与显示反馈演示</p> */}
        </>,
      ],
    },
    
  ];
}
