#!/usr/bin/env node
'use strict';

/**
 * PreToolUse hook (matcher: Bash).
 * Blocks `git push` unless the PR phase has been reached AND a human has
 * left a one-time approval marker (Hooks/.push-approved). Also refuses to
 * let any Bash command touch either approval marker file, so approval can
 * only ever be granted by a human acting outside of Claude's tool calls.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUSH_MARKER = path.join(PROJECT_ROOT, 'Hooks', '.push-approved');
const OVERRIDE_MARKER = path.join(PROJECT_ROOT, 'Hooks', '.artifact-override');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function respond(decision, reason) {
  const out = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: decision,
    },
  };
  if (reason) out.hookSpecificOutput.permissionDecisionReason = reason;
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
}

function deny(reason) {
  respond('deny', reason);
}

function allow(reason) {
  respond('allow', reason);
}

let payload;
try {
  payload = JSON.parse(readStdin() || '{}');
} catch (e) {
  // Malformed input is not this hook's concern; do not block unrelated calls.
  process.exit(0);
}

const toolName = payload.tool_name || '';
const command = (payload.tool_input && payload.tool_input.command) || '';

if ((toolName !== 'Bash' && toolName !== 'PowerShell') || typeof command !== 'string') {
  process.exit(0);
}

// The approval markers may only be created/removed by a human, never by Claude.
if (/\.push-approved\b/i.test(command) || /\.artifact-override\b/i.test(command)) {
  deny(
    'Approval marker files (Hooks/.push-approved, Hooks/.artifact-override) may only be ' +
      'created or removed by a human outside of any Claude tool call. This command was blocked.'
  );
}

const isGitPush = /\bgit\s+push\b/i.test(command);
if (!isGitPush) {
  process.exit(0);
}

// Phase-eligibility: pushing is only ever considered once the PR phase has been reached.
const requiredForPrPhase = [
  path.join(PROJECT_ROOT, 'verify.md'),
  path.join(PROJECT_ROOT, 'Agents', 'pr.agent.md'),
  path.join(PROJECT_ROOT, 'Skills', 'pr', 'SKILL.md'),
  path.join(PROJECT_ROOT, 'Prompts', 'pr.prompt.md'),
];
const missing = requiredForPrPhase.filter((f) => !fs.existsSync(f));
if (missing.length > 0) {
  deny(
    'Push blocked: the PR phase has not been reached (missing: ' +
      missing.map((f) => path.relative(PROJECT_ROOT, f)).join(', ') +
      '). Pushing is prohibited during Implementation, Review, and Verify.'
  );
}

if (!fs.existsSync(PUSH_MARKER)) {
  deny(
    'Push blocked: the PR phase has been reached, but no explicit human push approval was found. ' +
      'A human must create Hooks/.push-approved themselves, outside of any Claude tool call, before pushing.'
  );
}

// Consume the one-time approval marker before allowing the push through.
try {
  fs.unlinkSync(PUSH_MARKER);
} catch (e) {
  deny('Push blocked: approval marker was found but could not be consumed (' + e.message + ').');
}

allow('Push approved: PR phase reached and the one-time human approval marker was consumed.');
