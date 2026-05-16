#!/usr/bin/env node
/**
 * Builds dist/components.css by concatenating all component CSS files.
 *
 * Automatically discovers all component directories in src/ — no manual
 * updates needed when new components are added.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

fs.mkdirSync(DIST_DIR, { recursive: true });

const entries = fs
  .readdirSync(SRC_DIR, { withFileTypes: true })
  .sort((a, b) => a.name.localeCompare(b.name));

const allCss = [];

for (const entry of entries) {
  if (!entry.isDirectory()) continue;

  const cssFile = path.join(SRC_DIR, entry.name, `${entry.name}.css`);
  if (!fs.existsSync(cssFile)) continue;

  allCss.push(fs.readFileSync(cssFile, 'utf-8'));
}

fs.writeFileSync(path.join(DIST_DIR, 'components.css'), allCss.join('\n'));

console.log(`Built dist/components.css from ${allCss.length} components.`);
