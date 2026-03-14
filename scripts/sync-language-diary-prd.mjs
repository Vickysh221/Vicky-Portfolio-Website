import fs from 'node:fs';
import path from 'node:path';

const portfolioRoot = '/Users/vickyshou/Documents/trae_projects/My-portfolio';
const prdRoot = '/Users/vickyshou/language app multiagent/docs/product-prd';
const outFile = path.join(portfolioRoot, 'src/pages/languageDiary/generated/languageDiarySlides.generated.ts');

const slidePlan = [
  {
    numeral: '01',
    title: 'Vision · Why This Product Exists',
    kicker: 'Problem, product promise, and user-facing value',
    intro:
      'This chapter introduces Language Diary as a ritual-based language companion: not a quiz-first tool, but a system that turns everyday expression into reusable learning assets.',
    sections: [
      {
        heading: 'Product Definition',
        docs: ['01-product-overview.md'],
      },
      {
        heading: 'Core Cognitive Framing',
        docs: ['COGNITIVE_ARCHITECTURE.md'],
      },
    ],
  },
  {
    numeral: '02',
    title: 'System Architecture · Ritual Flow',
    kicker: 'How the product is staged across morning, daytime, and night',
    intro:
      'The system is organized as a stage-based architecture. Each ritual moment has its own behavioral goal, memory surface, and orchestration logic.',
    sections: [
      {
        heading: 'System Layers',
        docs: ['02-system-architecture.md'],
      },
      {
        heading: 'Coordination and Runtime',
        docs: ['04-agent-coordination.md', '06-api-and-runtime-surfaces.md'],
      },
    ],
  },
  {
    numeral: '03',
    title: 'Agent System · Roles, Prompts, and Hand-offs',
    kicker: 'How each agent behaves and where the baton passes',
    intro:
      'Language Diary is not a single prompt with many tabs. It is a structured multi-agent system with explicit cognitive roles, behavior contracts, and technical hand-offs.',
    sections: [
      {
        heading: 'Core Agents',
        docs: [
          'agents/orchestrator.md',
          'agents/daytime-capture-agent.md',
          'agents/acquisition-agent.md',
          'agents/knowledge-agent.md',
        ],
      },
      {
        heading: 'Recall, Integration, and Output Agents',
        docs: [
          'agents/morning-recall-agent.md',
          'agents/morning-wake-agent.md',
          'agents/night-wrapup-agent.md',
          'agents/diary-agent.md',
          'agents/quiz-agent.md',
        ],
      },
    ],
  },
  {
    numeral: '04',
    title: 'Memory & Regulation · The Invisible Product Core',
    kicker: 'Why the real product moat lives under the chat surface',
    intro:
      'The visible interface is conversational, but the actual product depth sits in memory encoding, retrieval, linking, profile adaptation, and behavioral regulation.',
    sections: [
      {
        heading: 'Memory Layers',
        docs: [
          '03-memory-architecture.md',
          'memory/session-store.md',
          'memory/memory-manager.md',
          'memory/event-anchor-service.md',
          'memory/auto-memory-capture-service.md',
        ],
      },
      {
        heading: 'Service and Profile Layers',
        docs: [
          'services/anchor-link-service.md',
          'services/guardrails.md',
          'services/laddering-engine.md',
          'profiles/language-profile-manager.md',
          'profiles/generation-policy-injector.md',
        ],
      },
    ],
  },
  {
    numeral: '05',
    title: 'Implementation, Evaluation, and Productization',
    kicker: 'How the system is governed, measured, and extended',
    intro:
      'This final chapter focuses on prompt governance, evaluation logic, and the path from prototype structure to a more mature product system.',
    sections: [
      {
        heading: 'Prompt and Quality Control',
        docs: ['05-prompt-guardrails-and-generation.md'],
      },
      {
        heading: 'Evaluation and Roadmap',
        docs: ['07-evaluation-risks-and-roadmap.md'],
      },
    ],
  },
];

function readDoc(relPath) {
  return fs.readFileSync(path.join(prdRoot, relPath), 'utf8');
}

function normalizeText(text) {
  return text
    .replace(/\r/g, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTitle(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : 'Untitled';
}

function extractParagraphs(md) {
  return normalizeText(md)
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !/^#+\s/.test(p))
    .filter((p) => !/^[-*]\s/.test(p))
    .filter((p) => !/^\d+\.\s/.test(p));
}

function extractSummary(md, maxLength = 220) {
  const paragraph = extractParagraphs(md)[0] || '';
  return paragraph.length > maxLength ? `${paragraph.slice(0, maxLength - 1)}…` : paragraph;
}

function isGoodBullet(text) {
  if (!text) return false;
  if (text.length < 8) return false;
  if (/^(event|preference|goal|reflection|summary|messages|domains|language|level|intent)$/i.test(text)) return false;
  return true;
}

function extractBullets(md, limit = 4) {
  const bullets = [];
  for (const rawLine of md.split('\n')) {
    const line = rawLine.trim();
    let bullet = '';
    if (/^[-*]\s+/.test(line)) {
      bullet = normalizeText(line.replace(/^[-*]\s+/, ''));
    } else if (/^\d+\.\s+/.test(line)) {
      bullet = normalizeText(line.replace(/^\d+\.\s+/, ''));
    }
    if (!isGoodBullet(bullet)) continue;
    if (!bullets.includes(bullet)) bullets.push(bullet);
    if (bullets.length >= limit) break;
  }
  if (bullets.length >= 2) return bullets;

  const fallbackParagraphs = extractParagraphs(md)
    .map((p) => p.replace(/[:：]$/g, '').trim())
    .filter((p) => p.length >= 18)
    .slice(0, limit);
  return fallbackParagraphs;
}

function buildDoc(relPath) {
  const md = readDoc(relPath);
  return {
    path: relPath,
    label: extractTitle(md),
    summary: extractSummary(md),
    bullets: extractBullets(md, relPath.startsWith('agents/') ? 4 : 4),
  };
}

function buildSlide(slide) {
  const sections = slide.sections.map((section) => ({
    heading: section.heading,
    docs: section.docs.map(buildDoc),
  }));

  const highlights = sections
    .flatMap((section) => section.docs)
    .slice(0, 3)
    .map((doc) => ({ label: doc.label, text: doc.summary }));

  return {
    numeral: slide.numeral,
    title: slide.title,
    kicker: slide.kicker,
    intro: slide.intro,
    highlights,
    sections,
  };
}

const generated = slidePlan.map(buildSlide);

const fileText = `/* eslint-disable */
// AUTO-GENERATED by scripts/sync-language-diary-prd.mjs
// Do not edit manually. Update source docs in language app multiagent/docs/product-prd instead.

export interface SyncedHighlight {
  label: string;
  text: string;
}

export interface SyncedDocumentRow {
  label: string;
  path: string;
  summary: string;
  bullets: string[];
}

export interface SyncedSlideSection {
  heading: string;
  docs: SyncedDocumentRow[];
}

export interface SyncedSlideData {
  numeral: string;
  title: string;
  kicker: string;
  intro: string;
  highlights: SyncedHighlight[];
  sections: SyncedSlideSection[];
}

export const languageDiarySlides: SyncedSlideData[] = ${JSON.stringify(generated, null, 2)};
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, fileText, 'utf8');
console.log(`Synced language diary slides -> ${outFile}`);
