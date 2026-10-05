#!/usr/bin/env node
'use strict';

// PreToolUse safety guard — demonstrates how a hook can block a small,
// explicit set of obviously destructive shell commands before they run.
// It does straightforward text matching only (no Git-state, phase, or
// approval-marker logic). Anything not matched below is allowed through.

const fs = require('fs');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

let payload;
try {
  payload = JSON.parse(readStdin() || '{}');
} catch (e) {
  process.exit(0);
}

const toolName = payload.tool_name || '';
const command = (payload.tool_input && payload.tool_input.command) || '';

if ((toolName !== 'Bash' && toolName !== 'PowerShell') || typeof command !== 'string') {
  process.exit(0);
}

// Each entry is a command pattern considered obviously destructive, and
// the plain-English reason shown to the user when it is blocked.
const DANGEROUS_COMMANDS = [
  {
    pattern: /\brm\s+(-\w*[rf]\w*\s+)*-\w*[rf]\w*\s+(\/|~|\.{1,2}|\*)(\s|$)/i,
    reason: 'Recursive, forced delete of a root-ish path (rm -rf /, ~, ., .., or *).',
  },
  {
    pattern: /\bRemove-Item\b[^\n]*-Recurse\b[^\n]*-Force\b|\bRemove-Item\b[^\n]*-Force\b[^\n]*-Recurse\b/i,
    reason: 'Recursive, forced delete (Remove-Item -Recurse -Force).',
  },
  {
    pattern: /\bgit\s+reset\s+--hard\b/i,
    reason: 'Irreversibly discards uncommitted local changes (git reset --hard).',
  },
];

for (const { pattern, reason } of DANGEROUS_COMMANDS) {
  if (pattern.test(command)) {
    deny(`Blocked by dangerous-command-guard: ${reason}`);
  }
}

process.exit(0);
