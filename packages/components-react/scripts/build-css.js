#!/usr/bin/env node
/**
 * Resolves CSS @import chains and copies self-contained CSS files to dist.
 *
 * tsc does not copy .css files, so this script runs before tsc to ensure
 * that `import './Button.css'` in compiled JS resolves correctly when
 * the package is installed from npm.
 *
 * Also writes dist/index.css bundling all component styles for consumers
 * who prefer a single global import.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

function resolveImports(cssContent, baseDir) {
  return cssContent.replace(
    /@import\s+['"]([^'"]+)['"]\s*;/g,
    (match, importPath) => {
      const resolved = path.resolve(baseDir, importPath);
      if (!fs.existsSync(resolved)) {
        throw new Error(
          `CSS import not found: ${resolved} (imported from ${baseDir})`
        );
      }
      const imported = fs.readFileSync(resolved, 'utf-8');
      return resolveImports(imported, path.dirname(resolved));
    }
  );
}

const allCss = [];
let count = 0;

const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });
for (const entry of entries) {
  if (!entry.isDirectory()) continue;

  const cssFile = path.join(SRC_DIR, entry.name, `${entry.name}.css`);
  if (!fs.existsSync(cssFile)) continue;

  const css = fs.readFileSync(cssFile, 'utf-8');
  const resolved = resolveImports(css, path.dirname(cssFile));

  const distDir = path.join(DIST_DIR, entry.name);
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, `${entry.name}.css`), resolved);

  allCss.push(resolved);
  count++;
}

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, 'index.css'), allCss.join('\n'));

console.log(`Built CSS for ${count} components → dist/index.css`);
