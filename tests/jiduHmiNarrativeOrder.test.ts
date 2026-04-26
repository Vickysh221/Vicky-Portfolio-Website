import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { PROJECTS } from '../src/projectRegistry.ts';
import { PAGE_META, ROUTE_DEPTH } from '../src/constants/routeDepth.ts';
import { CHAPTER_SUMMARIES } from '../src/home/chapterSummaries.ts';

function readProjectFile(relativePath: string): string {
  return readFileSync(fileURLToPath(new URL(`../${relativePath}`, import.meta.url)), 'utf8');
}

const EXPECTED_JIDU_NARRATIVE = [
  {
    route: '/jidu-hmi/unity3d-camera',
    numeral: 'I',
    label: {
      zh: '共驾地图：以一镜到底串联场景',
      en: 'Co-Driving Map: Linking Scenarios Through a Single Continuous View',
    },
  },
  {
    route: '/jidu-hmi/3d-map',
    numeral: 'II',
    label: {
      zh: '机器世界模型：把环境理解推到前台',
      en: 'Machine World Model: Bringing Environmental Understanding to the Frontstage',
    },
  },
  {
    route: '/jidu-hmi/3d-map-driving-component-states',
    numeral: 'III',
    label: {
      zh: '注意力本体：用线、块、点翻译机器认知',
      en: 'Attention Ontology: Translating Machine Cognition Into Lines, Blocks, and Points',
    },
  },
  {
    route: '/jidu-hmi/dashboard-layout',
    numeral: 'IV',
    label: {
      zh: '责任语言：说明谁主导、何时接管',
      en: 'Responsibility Language: Showing Who Leads and When to Take Over',
    },
  },
  {
    route: '/jidu-hmi/avp',
    numeral: 'V',
    label: {
      zh: 'AVP 协作模型：在机器执行中保留人的判断',
      en: 'AVP Collaboration Model: Keeping Human Judgment Inside Machine Execution',
    },
  },
  {
    route: '/jidu-hmi/3d-map-gesture',
    numeral: 'VI',
    label: {
      zh: '共享视角：让人进入机器的观察方式',
      en: "Shared Perspective: Letting the Human Enter the Machine's View",
    },
  },
  {
    route: '/jidu-hmi/minimap-camera',
    numeral: 'VII',
    label: {
      zh: '空间证据：用 SLAM 小地图确认局部环境',
      en: 'Spatial Evidence: Confirming Local Context Through the SLAM Minimap',
    },
  },
] as const;

const EXPECTED_FIRST_SLIDE_COVERS = [
  {
    route: '/jidu-hmi/unity3d-camera',
    file: 'src/pages/H5DocContentUnityCameraSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/unity3d-camera', accentColor)",
  },
  {
    route: '/jidu-hmi/3d-map',
    file: 'src/pages/H5DocContent3dMapSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/3d-map', accentColor)",
  },
  {
    route: '/jidu-hmi/3d-map-driving-component-states',
    file: 'src/pages/H5DocContent3dMapDrivingComponentStatesSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/3d-map-driving-component-states', accentColor)",
  },
  {
    route: '/jidu-hmi/dashboard-layout',
    file: 'src/pages/H5DocContentDashboardLayoutSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/dashboard-layout', accentColor)",
  },
  {
    route: '/jidu-hmi/avp',
    file: 'src/pages/H5DocContentAvpSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/avp', accentColor)",
  },
  {
    route: '/jidu-hmi/3d-map-gesture',
    file: 'src/pages/H5DocContent3dMapGestureSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/3d-map-gesture', accentColor)",
  },
  {
    route: '/jidu-hmi/minimap-camera',
    file: 'src/pages/H5DocContentMinimapCameraSlide01.tsx',
    coverCall: "createJiduNarrativeCoverSection('/jidu-hmi/minimap-camera', accentColor)",
  },
] as const;

const EXPECTED_COVER_EVIDENCE = [
  {
    route: '/jidu-hmi/unity3d-camera',
    description: 'Single-shot was not a visual effect. It was a product principle: one system, one set of eyes, multiple scenarios.',
    image: 'cover-cam.jpg',
  },
  {
    route: '/jidu-hmi/3d-map',
    description: 'The 3D map exposed what the vehicle saw, what it considered important, and how it organized the driving environment.',
    image: '2d3d-poster.jpg',
  },
  {
    route: '/jidu-hmi/3d-map-driving-component-states',
    description: 'Routes became lines, perception objects became blocks, and parking slots or targets became points because each represented a different cognitive role.',
    image: 'cover-jidu-attention-ontology.png',
  },
  {
    route: '/jidu-hmi/dashboard-layout',
    description: 'In assisted driving, HMI must communicate not only state, but responsibility: who leads, what the machine asks from the human, and when takeover is required.',
    image: 'cover-jidu-responsibility-language.png',
  },
  {
    route: '/jidu-hmi/avp',
    description: 'AVP was not only an automated parking flow. It was a collaboration model where the machine executed planned routines while the human remained involved in decision-making.',
    image: 'cover-avp.jpg',
  },
  {
    route: '/jidu-hmi/3d-map-gesture',
    description: "Gesture and free-look interaction allowed the human to enter the machine's perspective, rather than passively receive machine output.",
    image: 'cover-gesture.jpg',
  },
  {
    route: '/jidu-hmi/minimap-camera',
    description: 'The minimap turns local space, route, and target points into evidence the driver can confirm, rather than a detached miniature map.',
    image: 'cover-slam.jpg',
  },
] as const;

test('jidu hmi subpages follow the human-agent narrative order', () => {
  const project = PROJECTS.find((entry) => entry.route === '/jidu-hmi');
  assert.ok(project);

  const actual = project.subPages.map(({ route, numeral, label }) => ({ route, numeral, label }));
  assert.deepEqual(actual, EXPECTED_JIDU_NARRATIVE);
});

test('jidu hmi route metadata stays aligned with narrative labels and child titles', () => {
  const rootSubPages = PAGE_META['/jidu-hmi'].subPages?.map(({ route, numeral, label }) => ({ route, numeral, label }));
  assert.deepEqual(rootSubPages, EXPECTED_JIDU_NARRATIVE);

  for (const chapter of EXPECTED_JIDU_NARRATIVE) {
    assert.deepEqual(PAGE_META[chapter.route].title, chapter.label, `Child page title drift for ${chapter.route}`);
    assert.equal(PAGE_META[chapter.route].parent, '/jidu-hmi');
  }
});

test('jidu hmi route depths follow the same narrative order', () => {
  assert.deepEqual(
    EXPECTED_JIDU_NARRATIVE.map((chapter) => ROUTE_DEPTH[chapter.route]),
    [-2000, -3000, -4000, -5000, -6000, -7000, -8000],
  );
});

test('jidu hmi narrative chapters keep evidence previews and reading summaries', () => {
  const project = PROJECTS.find((entry) => entry.route === '/jidu-hmi');
  assert.ok(project);

  for (const chapter of project.subPages) {
    assert.ok(chapter.previewMedia?.src, `Missing evidence preview for ${chapter.route}`);
    assert.match(CHAPTER_SUMMARIES[chapter.route], /./, `Missing chapter summary for ${chapter.route}`);
  }
});

test('jidu hmi first article slides start with narrative cover sections', () => {
  for (const chapter of EXPECTED_FIRST_SLIDE_COVERS) {
    const source = readProjectFile(chapter.file);
    assert.ok(
      source.includes(chapter.coverCall),
      `Missing first-slide narrative cover insertion for ${chapter.route}`,
    );
  }
});

test('jidu hmi narrative covers bind portfolio-language descriptions to evidence images', () => {
  const source = readProjectFile('src/pages/jiduHmiNarrativeCover.tsx');

  for (const cover of EXPECTED_COVER_EVIDENCE) {
    assert.match(source, new RegExp(cover.route.replaceAll('/', '\\/')), `Missing cover route ${cover.route}`);
    assert.match(source, new RegExp(cover.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Missing narrative description for ${cover.route}`);
    assert.match(source, new RegExp(cover.image.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Missing evidence image for ${cover.route}`);
  }
});
