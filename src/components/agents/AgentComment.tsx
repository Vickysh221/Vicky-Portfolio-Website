import type { CSSProperties } from 'react';
import type { ResolvedComment } from '../../agents/types';
import { getCommentKind } from '../../agents/commentKinds';
import { getPersona } from '../../agents/personas';
import { useTypingText } from '../../hooks/useTypingText';

interface AgentCommentProps {
  comment: ResolvedComment;
  /** True when user is hovering the anchor in the document. */
  isAnchorActive: boolean;
  /** True when user is hovering this comment card itself. */
  isSelfActive: boolean;
  onHoverChange: (hovered: boolean) => void;
  /** True once the card is inside the viewport and may start typing. */
  canType: boolean;
  /** A reply sits inside another card — tighter padding, no author header chip. */
  isReply?: boolean;
}

const MONO_STACK =
  "'SF Mono', 'JetBrains Mono', 'Menlo', 'PingFang SC', 'Source Han Sans CN', monospace";

function kindFlag(kind: string): string {
  // Short CLI-flag-like label for the `$ bot describe --<flag>` line.
  switch (kind) {
    case 'brainstorm':
      return '--brainstorm';
    case 'reflect':
      return '--reflect';
    case 'challenge':
      return '--challenge';
    case 'ask-reader':
      return '--ask-reader';
    default:
      return '--note';
  }
}

function MentionChip({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0 5px',
        marginRight: 4,
        fontSize: '10.5px',
        color,
        border: `1px solid ${color}55`,
        borderRadius: 2,
        fontFamily: MONO_STACK,
      }}
    >
      {label}
    </span>
  );
}

function Mentions({ mentions }: { mentions: ResolvedComment['mentions'] }) {
  if (!mentions || mentions.length === 0) return null;
  return (
    <span style={{ marginRight: 6 }}>
      {mentions.map((m, idx) => {
        if (m.kind === 'reader') {
          return (
            <MentionChip key={`reader-${idx}`} label="@you" color="#c8a96e" />
          );
        }
        const persona = getPersona(m.id);
        return (
          <MentionChip
            key={`p-${m.id}-${idx}`}
            label={`@${persona.name}`}
            color={persona.accent}
          />
        );
      })}
    </span>
  );
}

export default function AgentComment({
  comment,
  isAnchorActive,
  isSelfActive,
  onHoverChange,
  canType,
  isReply,
}: AgentCommentProps) {
  const persona = comment.persona;
  const kind = getCommentKind(comment.kind);
  const active = isAnchorActive || isSelfActive;
  const { display, isTyping } = useTypingText(comment.body, canType);

  const cardStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    background: 'rgba(8,6,4,0.94)',
    border: `1px solid ${active ? persona.accent + '55' : 'rgba(200,169,110,0.14)'}`,
    borderRadius: 4,
    boxShadow: active
      ? `0 14px 36px rgba(0,0,0,0.48), 0 0 0 1px ${persona.accent}22`
      : '0 10px 24px rgba(0,0,0,0.32)',
    backdropFilter: 'blur(6px)',
    overflow: 'hidden',
    transition: 'border-color 220ms, box-shadow 220ms, transform 220ms',
    transform: active ? 'translateY(-1px)' : 'none',
    pointerEvents: 'auto',
    marginLeft: isReply ? 12 : 0,
    marginTop: isReply ? 8 : 0,
    fontFamily: MONO_STACK,
  };

  return (
    <div
      data-comment-id={comment.id}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      style={cardStyle}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          borderBottom: '1px solid rgba(200,169,110,0.1)',
          background: 'rgba(0,0,0,0.32)',
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,95,87,0.55)' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(254,188,46,0.55)' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(40,200,64,0.55)' }} />
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            color: '#7a6a50',
            fontSize: 9.5,
            letterSpacing: '0.12em',
          }}
        >
          {persona.name} — portfolio — {kind.tag}
        </span>
        <span
          style={{
            color: kind.color,
            fontSize: 10,
            marginLeft: 4,
          }}
          title={kind.hint}
        >
          {kind.glyph}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px 11px', fontSize: 11.5, lineHeight: 1.75 }}>
        {/* command line */}
        <div style={{ color: '#9a8870', marginBottom: 8, fontSize: 11 }}>
          <span style={{ color: persona.accent }}>$</span>{' '}
          <span style={{ color: persona.accent, opacity: 0.95 }}>{persona.name}</span>
          <span style={{ color: '#7a6a50' }}>@portfolio</span>{' '}
          <span style={{ color: '#c8b88a' }}>speak</span>{' '}
          <span style={{ color: '#d8c8a0' }}>{kindFlag(comment.kind)}</span>
        </div>

        {/* output */}
        <div style={{ color: '#e8dcb8', letterSpacing: '0.01em' }}>
          <span style={{ color: persona.accent, marginRight: 6 }}>▸</span>
          <Mentions mentions={comment.mentions} />
          <span>{display}</span>
          {canType && isTyping && (
            <span
              style={{
                display: 'inline-block',
                width: '0.55em',
                marginLeft: 1,
                background: persona.accent,
                color: 'transparent',
                animation: 'chapter-terminal-caret 1.4s steps(1) infinite',
              }}
            >
              ▮
            </span>
          )}
        </div>

        {/* footer marker once typed out */}
        {canType && !isTyping && display.length > 0 && (
          <div
            style={{
              color: '#6a5a42',
              fontSize: 10,
              letterSpacing: '0.08em',
              borderTop: '1px solid rgba(200,169,110,0.08)',
              paddingTop: 6,
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ color: persona.accent }}>◆</span>
            <span>{persona.role}</span>
          </div>
        )}
      </div>
    </div>
  );
}
