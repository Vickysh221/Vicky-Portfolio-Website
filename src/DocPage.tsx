import { useEffect, type CSSProperties } from 'react';

type DocPageProps = {
  routePath: string;
};

const sectionStyle: CSSProperties = {
  marginBottom: '32px',
  textAlign: 'left',
};

const h1Style: CSSProperties = {
  color: '#f0e8d8',
  fontSize: '18px',
  borderBottom: '1px solid rgba(200, 169, 110, 0.18)',
  paddingBottom: '10px',
  marginBottom: '14px',
  letterSpacing: '0.02em',
  fontStyle: 'italic',
};

const h2Style: CSSProperties = {
  color: '#c8a96e',
  fontSize: '13px',
  margin: '14px 0 8px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};

const pStyle: CSSProperties = {
  color: '#a09070',
  fontSize: '12px',
  lineHeight: 1.8,
};

const listStyle: CSSProperties = {
  color: '#a09070',
  fontSize: '12px',
  lineHeight: 1.8,
  paddingLeft: '16px',
};

export function DocSpecContent({ routePath }: DocPageProps) {
  return (
    <>
      <div style={{ marginBottom: '26px', textAlign: 'left' }}>
        <div style={{ color: '#c8a96e', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }}>
          H5 DOCUMENT SPEC · {routePath}
        </div>
        <div style={{ color: '#f0e8d8', fontSize: '24px', lineHeight: 1.2, fontStyle: 'italic' }}>
          3D 场景主视图竞争与优先级仲裁机制
        </div>
        <p style={{ ...pStyle, marginTop: '10px' }}>
          定义页面标题、一级标题、二级标题、正文、图片与视频规则；风格完全继承项目现有 UI 规范（主色、字体、线性边框与圆角）。
        </p>
      </div>

      <section style={sectionStyle}>
        <h1 style={h1Style}>01 总览</h1>
        <h2 style={h2Style}>系统目标</h2>
        <p style={pStyle}>定义主视图优先级与镜头打断策略，在多事件并发时保持视觉连续与信息优先级一致。</p>
        <h2 style={h2Style}>设计原则</h2>
        <ul style={listStyle}>
          <li>注意力优先：镜头切换仅发生在关键节点。</li>
          <li>最小镜头集：合并相近场景，降低系统复杂度。</li>
          <li>稳定性优先：减少频繁切换带来的认知干扰。</li>
          <li>安全信息优先：高优先级可打断低优先级。</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h1 style={h1Style}>02 行车运镜</h1>
        <h2 style={h2Style}>图片规则</h2>
        <div style={{ border: '1px dashed rgba(200,169,110,0.35)', borderRadius: '8px', padding: '24px', color: '#6a5a40' }}>
          16:9 图片区块，占满正文宽度，配图注说明（图 2-1）。
        </div>
        <h2 style={h2Style}>视频规则</h2>
        <div style={{ border: '1px dashed rgba(200,169,110,0.35)', borderRadius: '8px', padding: '24px', color: '#6a5a40', marginTop: '8px' }}>
          16:9 视频区块，统一播放占位符与文件名标注（视频 2-1）。
        </div>
      </section>

      <section style={{ ...sectionStyle, marginBottom: 0 }}>
        <h1 style={h1Style}>03 应用说明</h1>
        <p style={pStyle}>当前先应用到 `#/jidu-hmi/unity3d-camera` 页面框架，并将文档内容全部放在 CONTENT 区域中。</p>
      </section>
    </>
  );
}

export default function DocPage({ routePath }: DocPageProps) {
  useEffect(() => {
    document.title = `H5 Doc · ${routePath}`;
  }, [routePath]);

  return <DocSpecContent routePath={routePath} />;
}
