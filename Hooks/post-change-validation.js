#!/usr/bin/env node
'use strict';

// PostToolUse quality/validation hook — demonstrates how a hook can run a
// lightweight check after a source-code edit and report the result back as
// context. The edit has already happened by the time this runs, so this
// hook is purely informational and can never block or undo it.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function report(message) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext: message,
      },
    })
  );
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
if (path.basename(filePath) !== 'app.js') {
  process.exit(0);
}

try {
  execFileSync(process.execPath, ['--check', filePath], { stdio: 'pipe' });
  report('post-change-validation: `node --check app.js` passed.');
} catch (e) {
  const details = (e.stderr && e.stderr.toString()) || e.message;
  report(`post-change-validation: \`node --check app.js\` FAILED:\n${details}`);
}

process.exit(0);
