/**
 * Generates the icon registry from the SVG files in components-html/assets/icons/.
 *
 * Run: node scripts/generate-icons.js
 *
 * This produces src/Icon/icon-registry.generated.ts containing:
 * - SVG imports (using ?react suffix for vite-plugin-svgr)
 * - IconName union type
 * - iconMap record
 *
 * To add a new icon: drop the SVG into components-html/assets/icons/ and re-run this script.
 */

const fs = require('fs');
const path = require('path');

const iconsDir = path.resolve(__dirname, '../../components-html/assets/icons');
const outputPath = path.resolve(__dirname, '../src/Icon/icon-registry.generated.ts');

// Verify the icons source directory exists
if (!fs.existsSync(iconsDir)) {
  console.error(`Error: Icons directory not found at ${iconsDir}`);
  console.error('Make sure packages/components-html/assets/icons/ exists.');
  process.exit(1);
}

// Read all .svg files and sort alphabetically
const svgFiles = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith('.svg'))
  .sort();

if (svgFiles.length === 0) {
  console.warn(`Warning: No .svg files found in ${iconsDir}`);
}

const iconNames = svgFiles.map((f) => f.replace('.svg', ''));

// Convert icon name to PascalCase variable name, e.g. "chevron-down" -> "ChevronDown"
function toPascalCase(name) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

const imports = iconNames
  .map(
    (name) =>
      `import ${toPascalCase(name)}Icon from '../../../components-html/assets/icons/${name}.svg?react';`
  )
  .join('\n');

const typeUnion = iconNames.map((name) => `  | '${name}'`).join('\n');

const mapEntries = iconNames
  .map((name) => `  '${name}': ${toPascalCase(name)}Icon,`)
  .join('\n');

const output = `// Auto-generated — do not edit manually.
// Run: node scripts/generate-icons.js
import React from 'react';

${imports}

export type IconName =
${typeUnion};

export const iconMap: Record<IconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
${mapEntries}
};
`;

// Ensure the output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`Generated icon registry with ${iconNames.length} icons: ${outputPath}`);
