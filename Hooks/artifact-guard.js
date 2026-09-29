#!/usr/bin/env node
'use strict';

/**
 * PreToolUse hook (matcher: Edit|Write).
 * Blocks writes to SDLC artifacts once a later phase has already been
 * built on top of them, per the Boundaries already stated in
 * Agents/implementation.agent.md, Agents/review.agent.md,
 * Agents/verify.agent.md and Agents/pr.agent.md. A locked file can only be
 * edited if a human has left a one-time override marker
 * (Hooks/.artifact-override), which this hook consumes on use. Neither
 * approval marker file may itself be created or modified through Edit/Write.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OVERRIDE_MARKER = path.join(PROJECT_ROOT, 'Hooks', '.artifact-override');
const PUSH_MARKER = path.join(PROJECT_ROOT, 'Hooks', '.push-approved');

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

function exists(relPath) {
  return fs.existsSync(path.join(PROJECT_ROOT, relPath));
}

let payload;
try {
  payload = JSON.parse(readStdin() || '{}');
} catch (e) {
  process.exit(0);
}

const toolName = payload.tool_name || '';
if (toolName !== 'Edit' && toolName !== 'Write') {
  process.exit(0);
}

const filePath = (payload.tool_input && payload.tool_input.file_path) || '';
if (!filePath) {
  process.exit(0);
}

const abs = path.resolve(filePath);

// The approval markers may only be created/removed by a human, never by Claude.
if (abs === OVERRIDE_MARKER || abs === PUSH_MARKER) {
  deny(
    'Approval marker files (Hooks/.push-approved, Hooks/.artifact-override) may only be ' +
      'created or removed by a human outside of any Claude tool call. This edit was blocked.'
  );
}

const rel = path.relative(PROJECT_ROOT, abs).split(path.sep).join('/');

// Phase-derived lock table: each entry's file is locked as soon as the artifact that
// starts the *next* phase (per that phase's own Agent Boundaries) has been created.
// requirements.md is the one exception: neither the Architecture nor the Design Review
// Agent names it as a file-level boundary, so it stays editable until Implementation
// Planning begins (design-review.md exists) per implementation-planning.agent.md.
const LOCKS = [
  {
    files: ['requirements.md'],
    isLocked: () => exists('design-review.md'),
    reason: 'Implementation Planning has begun (design-review.md exists).',
  },
  {
    files: ['architecture.md'],
    isLocked: () => exists('architecture.md'),
    reason: 'Design Review has begun (architecture.md exists).',
  },
  {
    files: ['design-review.md'],
    isLocked: () => exists('design-review.md'),
    reason: 'Implementation Planning has begun (design-review.md exists).',
  },
  {
    files: ['implementation-plan.md'],
    isLocked: () => exists('implementation-plan.md'),
    reason: 'Implementation has begun (implementation-plan.md exists).',
  },
  {
    files: ['index.html'],
    isLocked: () => exists('index.html'),
    reason: 'Review has begun (index.html exists).',
  },
  {
    files: ['styles.css'],
    isLocked: () => exists('styles.css'),
    reason: 'Review has begun (styles.css exists).',
  },
  {
    files: ['app.js'],
    isLocked: () => exists('app.js'),
    reason: 'Review has begun (app.js exists).',
  },
  {
    files: ['review.md'],
    isLocked: () => exists('review.md'),
    reason: 'Verify has begun (review.md exists).',
  },
  {
    files: ['verify.md'],
    isLocked: () => exists('verify.md'),
    reason: 'The PR phase has begun (verify.md exists).',
  },
];

for (const lock of LOCKS) {
  if (!lock.files.includes(rel)) continue;

  if (!lock.isLocked()) {
    allow();
  }

  if (fs.existsSync(OVERRIDE_MARKER)) {
    try {
      fs.unlinkSync(OVERRIDE_MARKER);
    } catch (e) {
      deny('Locked artifact edit blocked: override marker found but could not be consumed (' + e.message + ').');
    }
    allow('Edit allowed: one-time human override marker was consumed for a locked artifact.');
  }

  deny(
    `Blocked: '${rel}' is a locked, previously approved SDLC artifact. ${lock.reason} ` +
      'If a correction is genuinely required, ask a human to create Hooks/.artifact-override themselves, ' +
      'outside of any Claude tool call, before retrying.'
  );
}

allow();
