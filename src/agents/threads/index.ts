import type { AgentThread, ResolvedComment } from '../types';
import { getPersona } from '../personas';
import { avpThread } from './avp';

const THREADS: AgentThread[] = [avpThread];

export function getThreadForRoute(route: string): AgentThread | null {
  return THREADS.find((t) => t.route === route) ?? null;
}

/**
 * Resolve a thread's comments into a two-level tree (root + replies) with
 * persona info already attached. Keeps the view layer simple.
 */
export function resolveThread(thread: AgentThread): ResolvedComment[] {
  const byId = new Map<string, ResolvedComment>();

  for (const c of thread.comments) {
    byId.set(c.id, {
      ...c,
      persona: getPersona(c.personaId),
      replies: [],
    });
  }

  const roots: ResolvedComment[] = [];
  for (const c of thread.comments) {
    const node = byId.get(c.id)!;
    if (c.replyTo && byId.has(c.replyTo)) {
      byId.get(c.replyTo)!.replies.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
