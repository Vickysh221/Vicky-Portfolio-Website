import type { PersonaDef, PersonaId } from './types';

/**
 * Four agent personas that read the portfolio alongside the human reader.
 * Keep the set small and distinct — each voice should be instantly
 * recognizable by color + glyph + role tag.
 */
export const PERSONAS: Record<PersonaId, PersonaDef> = {
  'relational-philosopher': {
    id: 'relational-philosopher',
    name: 'being',
    role: 'Relational Philosopher · 关系哲学家',
    accent: '#8b7db5', // soft violet — matches Agentic Design project hue
    glyph: 'β',
    voice: '追问"人和系统之间发生了什么关系"，擅长从结构里看出温度。',
  },
  'ux-advocate': {
    id: 'ux-advocate',
    name: 'becoming',
    role: 'UX Advocate · 体验代言人',
    accent: '#c8a96e', // gold — portfolio primary
    glyph: 'γ',
    voice: '站在使用者一侧，盯紧"这一秒用户在想什么"；关注变化与过程。',
  },
  'agent-first-designer': {
    id: 'agent-first-designer',
    name: 'object',
    role: 'Agent-First Designer · 以物为中心的设计者',
    accent: '#6f8f92', // teal — matches Gamification project hue
    glyph: 'Ø',
    voice: '倾向于"如果这件事由 agent 来做，它会怎么看"；走 object-oriented 路线。',
  },
  docent: {
    id: 'docent',
    name: 'thread',
    role: 'Docent · 读者向导',
    accent: '#a09070', // dim gold
    glyph: 'τ',
    voice: '为读者铺路，解释这一节在整体脉络里的位置。',
  },
};

export const PERSONA_LIST = Object.values(PERSONAS);

export function getPersona(id: PersonaId): PersonaDef {
  return PERSONAS[id];
}
