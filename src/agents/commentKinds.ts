import type { CommentKind } from './types';

/**
 * Visual language for comment "kinds".
 *
 * Each kind has a single glyph shown in front of the body — this is the
 * quickest signal the reader picks up when scanning the gutter. Labels are
 * used in screen readers and tooltips, not body text.
 */
export interface CommentKindDef {
  id: CommentKind;
  glyph: string;
  label: string;
  /** Short Chinese label used in the header tag. */
  tag: string;
  /** Accent color applied to the glyph + underline. */
  color: string;
  /** One-sentence explanation (used as tooltip). */
  hint: string;
}

export const COMMENT_KINDS: Record<CommentKind, CommentKindDef> = {
  brainstorm: {
    id: 'brainstorm',
    glyph: '✦',
    label: 'Brainstorm',
    tag: '脑洞',
    color: '#d4c4a0',
    hint: '一个还没经过验证、但值得抛出来的设想。',
  },
  reflect: {
    id: 'reflect',
    glyph: '◈',
    label: 'Reflect',
    tag: '反思',
    color: '#8b7db5',
    hint: '一段放慢节奏、往回看一步的注释。',
  },
  challenge: {
    id: 'challenge',
    glyph: '⟂',
    label: 'Challenge',
    tag: '挑战',
    color: '#c97f6e',
    hint: '对作者观点或结构设计的一个反对或再诘问。',
  },
  'ask-reader': {
    id: 'ask-reader',
    glyph: '?',
    label: 'Ask reader',
    tag: '问读者',
    color: '#6f8f92',
    hint: '把一个问题交还给读者，请你在心里回答。',
  },
};

export const COMMENT_KIND_LIST = Object.values(COMMENT_KINDS);

export function getCommentKind(kind: CommentKind): CommentKindDef {
  return COMMENT_KINDS[kind];
}
