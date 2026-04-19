/**
 * Agent comment system — shared types.
 *
 * The system simulates a few "agent personas" reading the project together with
 * the human reader. Each persona can leave comments, reply to each other, or
 * @mention the reader. This is an MVP framework: content is authored manually
 * (no live LLM), but the data shape is stable so real generation can be
 * swapped in later.
 */

/** A stable id for one of the pre-defined agent personas. */
export type PersonaId =
  | 'relational-philosopher'
  | 'ux-advocate'
  | 'agent-first-designer'
  | 'docent';

/** Recipient of an @mention in a comment. */
export type MentionTarget =
  | { kind: 'persona'; id: PersonaId }
  | { kind: 'reader' };

/** What flavor of contribution this comment is. */
export type CommentKind =
  | 'brainstorm' // ✦  open-ended spark / "what if"
  | 'reflect'    // ◈  reflective reading, mid-speed
  | 'challenge'  // ⟂  push-back / counter-position
  | 'ask-reader';// ?  turn a question back to the reader

export interface PersonaDef {
  id: PersonaId;
  /** Short on-screen name, e.g. 关系哲学家. */
  name: string;
  /** 1-line role tag shown under the name. */
  role: string;
  /** Primary accent color for the avatar + underline. */
  accent: string;
  /** One-letter avatar glyph (rendered inside a colored circle). */
  glyph: string;
  /** 2-3 word voice description used when writing new comments. */
  voice: string;
}

/** One comment anchored to a specific anchor id in the page. */
export interface AgentComment {
  /** Stable id so comments can reply to each other. */
  id: string;
  personaId: PersonaId;
  kind: CommentKind;
  /** The Anchor id this comment hangs off of. */
  anchorId: string;
  /** Plain-text body; supports @-mentions via `mentions`. */
  body: string;
  /** Optional mentions rendered as colored chips in the body. */
  mentions?: MentionTarget[];
  /** If present, this comment is a reply inside the same thread. */
  replyTo?: string;
}

/** All comments for a given page route. */
export interface AgentThread {
  /** Route this thread belongs to, e.g. `/jidu-hmi/avp`. */
  route: string;
  comments: AgentComment[];
}

/** Shape of a ready-to-render thread for the gutter. */
export interface ResolvedComment extends AgentComment {
  persona: PersonaDef;
  /** Child replies, already ordered. */
  replies: ResolvedComment[];
}
