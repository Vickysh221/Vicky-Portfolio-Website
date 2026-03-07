import { useEffect } from 'react';
import './DocPage.css';

type DocPageProps = {
  routePath: string;
};

const chapterMap: Record<string, string> = {
  'page-header': '概览',
  's-goal': '01 · 总览',
  's-driving': '02 · 行车运镜',
  's-camera': '03 · 相机参数空间',
  's-parking': '04 · 驻车运镜',
  's-unity': '05 · Unity 模拟设计',
};

export default function DocPage({ routePath }: DocPageProps) {
  useEffect(() => {
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section, header.page-header'));
    const topbarChapter = document.getElementById('topbar-chapter');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => link.classList.remove('active'));
          const id = entry.target.id;
          const currentLink = document.querySelector<HTMLAnchorElement>(`.sidebar-nav a[href="#${id}"]`);
          currentLink?.classList.add('active');

          if (topbarChapter && chapterMap[id]) {
            topbarChapter.textContent = chapterMap[id];
          }
        });
      },
      { rootMargin: '-52px 0px -60% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="doc-page">
      <nav className="topbar">
        <span className="topbar-logo">Xinyue Shou · Design Doc</span>
        <span className="topbar-sep" />
        <span className="topbar-chapter" id="topbar-chapter">
          01 · 项目目标和背景
        </span>
      </nav>

      <div className="layout">
        <aside className="sidebar">
          <p className="sidebar-label">目录</p>
          <ul className="sidebar-nav" id="sidebar-nav">
            <li><a href="#page-header">概览</a></li>
            <li><a href="#s-goal">系统目标</a></li>
            <li><a href="#s-overview" className="sub">系统概述</a></li>
            <li><a href="#s-principles" className="sub">设计原则</a></li>
            <li><a href="#s-driving">行车运镜</a></li>
            <li><a href="#s-driving-events" className="sub">行车事件</a></li>
            <li><a href="#s-driving-priority" className="sub">优先级规则</a></li>
            <li><a href="#s-camera">相机参数空间</a></li>
            <li><a href="#s-parking">驻车运镜</a></li>
            <li><a href="#s-unity">Unity 模拟设计</a></li>
          </ul>
        </aside>

        <main>
          <header className="page-header" id="page-header">
            <p className="page-eyebrow">H5 文档规范 · {routePath}</p>
            <h1 className="page-title">3D 场景主视图竞争与优先级仲裁机制</h1>
            <p className="page-subtitle">
              页面采用统一 H5 内容规范：页面标题、一级标题、二级标题、正文、图片与视频区块全部使用统一样式定义，且完全继承项目当前主色、字体与线性圆角。
            </p>
            <div className="page-meta">
              <span>版本 v1.0</span>
              <span>类型 产品设计规范</span>
              <span>状态 草稿</span>
            </div>
          </header>

          <section id="s-goal">
            <h1 className="doc-h1"><span className="h1-index">01</span>总览</h1>
            <h2 className="doc-h2">系统目标</h2>
            <div className="doc-body">
              <p>在多系统事件并发的情况下，定义谁占据主视图，并通过可控的镜头打断机制，引导驾驶员关注当前最重要的驾驶信息。</p>
            </div>
            <div className="callout">
              <p className="callout-label">核心问题</p>
              <p>在多事件并发条件下，当前主视图应该展示什么？</p>
            </div>
            <h2 className="doc-h2" id="s-overview">系统概述</h2>
            <div className="doc-body">
              <p>将各业务触发镜头抽象为虚拟摄像头状态，统一在一个相机系统内平滑过渡，避免割裂的独立动画。</p>
            </div>
            <h2 className="doc-h2" id="s-principles">设计原则</h2>
            <ul className="doc-list">
              <li>注意力优先：镜头切换服务于驾驶任务，仅在关键事件节点触发。</li>
              <li>最小镜头集：合并关注点相近的事件镜头，避免状态爆炸。</li>
              <li>稳定性优先：限制非必要切换，减少频繁运镜干扰。</li>
              <li>安全信息优先：高优先级状态不被低优先级打断。</li>
            </ul>
          </section>

          <section id="s-driving">
            <h1 className="doc-h1"><span className="h1-index">02</span>行车运镜</h1>
            <h2 className="doc-h2" id="s-driving-events">行车事件</h2>
            <div className="doc-body"><p>定义系统信号源如何向镜头系统提交变化请求。</p></div>
            <div className="media-block">
              <div className="media">🖼 Image · 行车事件示意图</div>
              <p className="media-caption">图 2-1 行车事件触发来源概览</p>
            </div>
            <h2 className="doc-h2" id="s-driving-priority">行车事件优先级规则</h2>
            <div className="doc-body"><p>优先级高的事件可以打断低优先级镜头，确保关键信息优先呈现。</p></div>
            <div className="media-block">
              <div className="video-placeholder">
                <div>▶</div>
                <div>Video · 行车运镜演示</div>
              </div>
              <p className="media-caption">视频 2-1 行车运镜视角示例</p>
            </div>
          </section>

          <section id="s-camera">
            <h1 className="doc-h1"><span className="h1-index">03</span>相机参数空间变化</h1>
            <div className="doc-body"><p>主视图竞争结果是参数目标覆盖，而非镜头硬切。通过连续参数变化保持体验连贯。</p></div>
            <div className="media-block">
              <div className="video-placeholder"><div>▶</div><div>Video · 相机过渡和打断</div></div>
              <p className="media-caption">视频 3-1 相机过渡与打断策略</p>
            </div>
          </section>

          <section id="s-parking">
            <h1 className="doc-h1"><span className="h1-index">04</span>驻车运镜</h1>
            <div className="doc-body">
              <p>驻车镜头更聚焦车身部件状态与功能交互，同时兼顾环境可读性。</p>
            </div>
          </section>

          <section id="s-unity">
            <h1 className="doc-h1"><span className="h1-index">05</span>Unity 模拟设计</h1>
            <div className="doc-body"><p>通过 Unity 原型验证规则有效性，反推产品策略可行性。</p></div>
            <hr className="doc-divider" />
            <div className="doc-body">
              <p>
                以上结构可直接复用为项目中所有 <strong>#/A/B</strong> 子页面的 H5 样式基线（标题层级、正文段落、图片规则、视频规则）。
              </p>
            </div>
          </section>
        </main>
      </div>

      <footer>
        <span>Xinyue Shou · 设计文档</span>
        <span>3D 场景主视图竞争与优先级仲裁机制</span>
      </footer>
    </div>
  );
}
