# Changelog

**Design System Starter Kit Version History**

All notable changes to this project are documented in this file.

---

## Version 4.3.0 (February 17, 2025)

### CI/CD Fixes & Interactive Design Token Explorer

**CI/CD Test Fixes**

- **FormField tests rewritten** — Tests updated to match refactored architecture: `FormField` always renders div/label, removed all `isGroup` test cases
- **CheckboxGroup tests rewritten** — Tests updated to match refactored component: renders div container (not fieldset), removed `legend`/`hideLegend` prop tests
- **RadioGroup tests rewritten** — Tests updated to match refactored component: renders div container (not fieldset), removed `legend`/`hideLegend` prop tests
- **All 613 tests passing** across 35 test suites (down from 628 due to removed tests for deleted API surface)

**Architecture Clarification (documented in tests)**

The component architecture was refactored in v4.2.0 but tests weren't updated:

| Component       | Old API (removed)            | New API                                         |
| --------------- | ---------------------------- | ----------------------------------------------- |
| `FormField`     | `isGroup`, `hideLabel` props | Always div/label; use `FormFieldset` for groups |
| `CheckboxGroup` | `legend`, `hideLegend` props | Simple div container only                       |
| `RadioGroup`    | `legend`, `hideLegend` props | Simple div container only                       |

**Interactive Design Token Explorer**

- **TokenControls component** added to Design Tokens documentation page
- **Three selectors** for live token exploration: Theme, Mode, and Project Type
- **Theme options**: Start, Wireframe (matches actual available token files)
- **Mode options**: Light, Dark
- **Project Type options**: Default, Information Dense (from `project-types/` folder)
- **Live updates**: Selecting a configuration dynamically loads the corresponding CSS file and refreshes all TokenTable values on the page
- All 8 configurations available: 2 themes × 2 modes × 2 project types

**Documentation Updates**

- README component composition examples updated to use new `FormFieldset` API
- Test counts updated to 613

---

## Version 4.2.0 (February 16, 2025)

### GitHub Pages Deployment & Storybook Improvements

**GitHub Pages Setup**

- **Automated Storybook deployment** — GitHub Actions workflow deploys Storybook to GitHub Pages on every push to main
- **Live Storybook URL** — [https://jeffreylauwers.github.io/design-system-starterkit/](https://jeffreylauwers.github.io/design-system-starterkit/)
- **Base path configuration** — Vite base path configured via `STORYBOOK_BASE_PATH` environment variable
- **Relative asset paths** — Design tokens use relative paths (`./design-tokens/dist/css`) for GitHub Pages compatibility

**Introduction Page**

- **Welcome page added** — Comprehensive introduction page as Storybook landing page
- **Navigation ordering** — Introduction appears first in sidebar, before Foundations and Components
- **Design tokens preload** — Default tokens (start-light-default) loaded immediately on Storybook start
- **Quick start guide** — Installation instructions, usage examples, component overview included

**Form Field Container Components**

- **FormFieldLegend component** — Legend element component for fieldset/legend structure, reuses FormFieldLabel CSS
- **FormFieldset component** — Container component for group controls (checkbox groups, radio groups)
- **FormField invalid state** — Red left border when error prop is present
- **Design tokens for invalid state** — form-field.json extended with invalid border styling

**FormFieldStatus Enhancements**

- **Three-variant system** — default (subtle info), positive (success with check icon), warning (caution with alert-triangle icon)
- **Icon support** — Conditional icons for positive and warning variants
- **showIcon prop** — Allows disabling icons on positive/warning variants

**Bug Fixes & Improvements**

- **ESLint errors fixed** — Unescaped quotes in JSX replaced with HTML entities (&ldquo;/&rdquo;/&rsquo;)
- **Prettier formatting** — All 81 files formatted consistently
- **TypeScript exports** — FormFieldStatusVariant type properly exported
- **Component index files** — Added missing index.ts for FormFieldLegend and FormFieldset

**Component Count**

- **21 form components** — FormFieldLegend and FormFieldset added to form component collection
- **25 total components** — 7 content components + 18 form components (Priority 1-4 complete)

---

## Version 4.1.0 (February 14, 2026)

### Build Pipeline & Module System Improvements

**Build Pipeline Enhancement**

- **Explicit build ordering** — Root build script now executes in explicit dependency order: `tokens → core → components → storybook`
- **Granular build commands** — New scripts: `build:tokens`, `build:core`, `build:components`, `build:storybook`
- **Icon generation automation** — Icon registry generation automatically included in `components-react` build step
- **Build dependency guarantee** — No more race conditions; dependencies always build before dependents

**Module System & Imports**

- **Barrel exports** — New `/packages/components-react/src/index.ts` exports all components for convenient importing
- **Clean import syntax** — `import { Button, TextInput } from '@dsn/components-react'` now supported
- **Package exports** — `components-html` package.json extended with granular exports for individual CSS files
- **Vitest config enhancement** — Added `@dsn/components-html` alias for proper CSS module resolution

**Import Patterns:**

```tsx
// ✅ New: Barrel export (recommended)
import { Button, TextInput, Heading } from '@dsn/components-react';

// ✅ Still supported: Individual imports
import { Button } from '@dsn/components-react/Button';
```

**CSS Module Resolution:**

```tsx
// React components now use relative imports for CSS
import './Button.css';
// → @import '../../../components-html/src/button/button.css';

// This ensures compatibility with PostCSS/Vite CSS bundling
```

**Package Structure:**

- **components-html exports** — 14 individual CSS file exports (`./button`, `./icon`, `./text-input`, etc.)
- **Barrel export grouping** — Components organized by category (Typography, Form Inputs, Form Options, Form Field)

**Documentation Updates**

- README.md updated with build pipeline diagram and import examples
- Development Workflow docs enhanced with import patterns section
- Components docs updated with barrel export usage
- Package READMEs created/updated with export documentation

**Testing**

- **All 628 tests passing** across 35 test suites
- CSS import path changes verified in test environment
- Build pipeline tested end-to-end

---

## Version 4.0.0 (February 13, 2026)

### Form Components - Complete Release

- **TextInput component** — Complete (HTML/CSS, React) with size variants (default, large) and states (disabled, invalid, read-only)
- **TextArea component** — Complete (HTML/CSS, React) with size variants and states
- **NumberInput component** — Complete (HTML/CSS, React) with min/max/step props and size variants
- **PasswordInput component** — Complete (HTML/CSS, React) extends TextInput with type="password"
- **EmailInput component** — Complete (HTML/CSS, React) extends TextInput with type="email"
- **TelephoneInput component** — Complete (HTML/CSS, React) extends TextInput with type="tel"
- **SearchInput component** — Complete (HTML/CSS, React) with search icon on the left
- **TimeInput component** — Complete (HTML/CSS, React) with type="time" for native time picker
- **Checkbox component** — Complete (HTML/CSS, React) with checked, indeterminate, disabled states
- **Radio component** — Complete (HTML/CSS, React) with checked, disabled states
- **CheckboxOption component** — Complete (HTML/CSS, React) combines Checkbox + Label with accessible touch targets
- **RadioOption component** — Complete (HTML/CSS, React) combines Radio + Label with accessible touch targets
- **CheckboxGroup component** — Complete (HTML/CSS, React) div container for CheckboxOption items; pair with FormFieldset for accessible grouping
- **RadioGroup component** — Complete (HTML/CSS, React) div container for RadioOption items; pair with FormFieldset for accessible grouping
- **FormField component** — Complete (HTML/CSS, React) div/label container for single-value inputs (TextInput, TextArea, etc.)
- **FormFieldset component** — Complete (HTML/CSS, React) fieldset/legend container for group controls (CheckboxGroup, RadioGroup)
- **FormFieldLabel component** — Complete (HTML/CSS, React) with required indicator and suffix support
- **FormFieldDescription component** — Complete (HTML/CSS, React) for help text
- **FormFieldErrorMessage component** — Complete (HTML/CSS, React) for validation errors
- **FormFieldStatus component** — Complete (HTML/CSS, React) for status messages

### Form Components - Technical Improvements

- **Fluid checkbox/radio sizing** — Size scales with typography using `calc(var(--dsn-text-font-size-md) * var(--dsn-text-line-height-md))`
- **Checkbox icons** — Uses `check.svg` for checked state, `minus.svg` for indeterminate state
- **Radio disabled checked** — Inner circle uses white color for proper contrast against disabled background
- **Touch target accessibility** — CheckboxOption/RadioOption use `padding-block` instead of `min-block-size` for WCAG 2.5.5 compliance
- **Legend token optimization** — CheckboxGroup/RadioGroup legend tokens reference FormFieldLabel tokens (DRY principle)
- **Form field invalid state tokens** — Created `form-field.json` with red left border styling for invalid fields
- **19 form component token files** — Complete design token coverage for all form components

### Testing

- React Checkbox tests (7 tests), React Radio tests (7 tests)
- React CheckboxOption tests (13 tests), React RadioOption tests (13 tests)
- React CheckboxGroup tests (8 tests), React RadioGroup tests (9 tests)
- React FormField tests (11 tests), React TextInput tests (9 tests), React TextArea tests (9 tests)
- **396 tests** across 24 test suites

---

## Version 3.9.0 (February 9, 2026)

### Button & Link Enhancements

- **Button loading state** — Animated loader icon replaces `iconStart` when `loading` is true, uses `loader.svg` from icon set
- **Button loading CSS** — `::after` pseudo-element spinner replaced with real `<Icon name="loader">` element and `dsn-button-spin` keyframe animation
- **Link external prop** — `external` prop/attribute adds `target="_blank"`, `rel="noopener noreferrer"`, and visible "(opens in new tab)" hint text
- **Link external — no icon** — Follows GOV.UK pattern: no visual icon for external links, plain text hint instead

### Icon System & CSS Quality

- **Icon expansion** — 45 Tabler icons (was 20), Storybook Icon stories now dynamically generated from `iconMap`
- **Storybook Icon stories fix** — Hardcoded icon array replaced with dynamic `Object.keys(iconMap)` export
- **CSS anti-patterns fixed** — `transition: all` replaced with specific properties in Button and Link
- **Focus-visible deduplication** — 9 identical `:focus-visible` blocks consolidated into single shared rule (420 → 351 lines in button.css)
- **Loading spinner scaling** — Fixed `rem` → `em` units so spinner scales with button size

### Utilities & Accessibility

- **Utilities hardcoded values fixed** — Gap, font-weight, and container utilities now use design tokens
- **sr-only utility** — Available in `@dsn/core` utilities for visually hiding content while keeping it accessible to screen readers

### Testing

- React Button tests (25 tests, +2 new), React Link tests (32 tests, +7 new)
- **317 tests** across 15 test suites

---

## Version 3.8.0 (February 7, 2026)

### List Components

- **UnorderedList component** — Complete (HTML/CSS, React, Web Component) with accent-colored bullet markers
- **OrderedList component** — Complete (HTML/CSS, React, Web Component) with `start` prop support
- **UnorderedList component tokens** — `unordered-list.json` with font-family, font-weight, color, font-size, line-height, padding, margin, gap, marker-color
- **OrderedList component tokens** — `ordered-list.json` with font-family, font-weight, color, font-size, line-height, padding, margin, gap, marker-color
- **ListCombinations stories** — Mixed list compositions with Heading, Paragraph, and Link components

### Storybook Documentation Overhaul

- **Storybook documentation overhaul** — All component docs rewritten in Dutch with consistent structure
- **Docs page structure** — Doel, Voorbeeld (live Story + Controls), Use when, Don't use when, Best practices, Design tokens
- **MDX files updated** — `ArgsTable` (deprecated) replaced with `Controls` from `@storybook/blocks`
- **Docs split-import pattern** — Markdown split on `<!-- VOORBEELD -->` marker; intro before live example, rest after
- **Sidebar ordering fixed** — `storybook-multilevel-sort` plugin installed; Docs entry now appears first per component
- **Storybook main.ts** — `configureSort()` with `typeOrder: ['docs', 'story']` for docs-first ordering

### Testing

- React UnorderedList tests (7 tests), Web Component UnorderedList tests (7 tests)
- React OrderedList tests (8 tests), Web Component OrderedList tests (11 tests)
- **308 tests** across 15 test suites

---

## Version 3.7.0 (February 6, 2026)

### Link Component

- **Link component** — Complete (HTML/CSS, React, Web Component) with icon support and 3 size variants
- **Link size variants** — `small`, `default`, `large` with size-specific font-size, gap, and icon-size tokens
- **Link inline behavior** — Without explicit size, link inherits font from parent (`font: inherit`) for seamless inline usage in paragraphs
- **Link component tokens** — `link.json` with color, text-decoration, gap, icon-size, hover/active/disabled states, and size variants
- **Link Storybook stories** — Default, WithIconStart, WithIconEnd, WithBothIcons, Disabled, CurrentPage, InlineWithText, Sizes, SizesWithIcons, InlineWithParagraphVariants

### Icon & Focus Improvements

- **Icon size scale updated** — Consistent across Button and Link: small → `icon.size.sm`, default → `icon.size.md`, large → `icon.size.lg`
- **Focus indicator dual outline** — `box-shadow` added for inverse outline behind the primary outline, ensuring visibility on all backgrounds
- **Focus inverse outline token** — `dsn.focus.inverse.outline-color` added for the secondary box-shadow outline

### Wireframe Theme

- **Wireframe theme overhaul** — Comic Sans font, pure black/white neutral colors, all color scales alias to neutral, yellow (#ffdd00) focus background
- **Button small min-block-size** — Changed from pointer-target token to hardcoded `2.5rem`
- **Link text-underline-offset** — Set to `4px` for improved readability

### Testing

- React Link tests (25 tests), Web Component Link tests (38 tests)
- **275 tests** across 11 test suites

---

## Version 3.6.0 (February 5, 2026)

### Runtime Theme Switching

- **Runtime theme switching in Storybook** — Full support for theme/mode/density switching on both Stories and Docs pages
- **Dynamic CSS loading** — Tokens loaded at runtime via fetch(), not bundled statically
- **CSS cascade fix** — Dynamic tokens use `:root:root` selector for higher specificity
- **MutationObserver** — Ensures dynamic token styles stay at end of `<head>` for cascade priority
- **Web Components registration** — Removed auto-registration side effects, added `defineAllComponents()` helper
- **TokenTable improvements** — Live computed CSS values update correctly on theme changes
- **Storybook preview-head.html** — New file for iframe-level token loading
- **Fixed invalid icon reference** — Changed `external-link` to `arrow-right` in Button stories

---

## Version 3.5.0 (February 5, 2026)

### Three-Axis Token Architecture

- **Three-axis token architecture** — Theme × Mode × Project Type configuration model
- **Theme axis** — `start` (default) and `wireframe` themes, each defining ALL tokens
- **Mode axis** — `light` and `dark` modes, affecting ONLY color tokens
- **Project Type axis** — `default` (fluid clamp) and `information-dense` (fixed) typography
- New folder structure: `themes/{name}/base.json`, `colors-light.json`, `colors-dark.json`
- New folder structure: `project-types/{name}/typography.json`
- 8 full configurations generated (2 themes × 2 modes × 2 project types)
- Dynamic build system with configuration matrix
- Storybook toolbar controls for Theme, Mode, and Density switching
- TokenTable component shows live computed CSS values
- Backward compatibility aliases maintained (`variables.css` → `start-light-default.css`)
- Wireframe theme: system fonts, grayscale colors, minimal border-radius
- Removed old core/ folder and themes/light.json, themes/dark.json

---

## Version 3.4.0 (January 30, 2026)

### Button Icon Support

- Button `iconStart` and `iconEnd` props (React) — both can be used simultaneously
- Button Web Component named slots `icon-start` and `icon-end`
- Button icon-size tokens per button size (updated in v3.7.0: small → `dsn.icon.size.sm`, default → `dsn.icon.size.md`, large → `dsn.icon.size.lg`)
- Button icon-only-padding tokens per button size — replaces hardcoded `--dsn-space-inline-*`
- CSS icon sizing in button context (`.dsn-button--size-* > .dsn-icon`)
- New Storybook stories: WithIconStart, WithIconEnd, WithIconStartAndEnd, IconSizes
- React Button tests (23 tests, +4 new)
- Web Component Button tests (53 tests, +3 new)

---

## Version 3.3.0 (January 29, 2026)

### Heading Component

- Heading component with 6 appearances: heading-1 through heading-6
- Independent `level` (semantic h1–h6) and `appearance` (visual style) props
- Heading component tokens with full set per level (font-family, font-weight, color, font-size, line-height, margin-block-end)
- Token namespace `dsn.heading.level-{1-6}.*` — avoids collision with core `dsn.heading.*` tokens
- Each level references semantic heading tokens (`dsn.heading.font-family`, `dsn.heading.font-weight`, `dsn.heading.color`) but can be overridden individually
- Font-size scale shifted one level down: heading-1 = 3xl, heading-2 = 2xl, ... heading-6 = sm
- Heading HTML/CSS component (`@dsn/components-html`)
- Heading React component with forwardRef (`@dsn/components-react`)
- Heading Web Component (`<dsn-heading>`) with Shadow DOM and dynamic element swapping
- Heading React tests (13 tests)
- Heading Web Component tests (24 tests)
- Heading Storybook stories (Default, Heading1, Heading2, Heading3, AppearanceOverride, AllLevels)

---

## Version 3.2.0 (January 29, 2026)

### Paragraph Token Refactoring

- Paragraph token architecture refactored to base/variant pattern
- Shared properties (font-family, font-weight, color, max-inline-size) on base class `.dsn-paragraph`
- Variant modifiers only define differences (font-size, line-height, margin-block-end)
- IBM Plex Sans font loaded via Google Fonts import in reset.css
- Body font-family now references `var(--dsn-text-font-family-default)` with system fallback

---

## Version 3.1.0 (January 29, 2026)

### Paragraph Component

- Paragraph component with 3 variants: default, lead, small-print
- Paragraph component tokens (font-size, line-height, font-weight, color, margin, max-inline-size)
- Paragraph HTML/CSS component (`@dsn/components-html`)
- Paragraph React component (`@dsn/components-react`)
- Paragraph Web Component (`<dsn-paragraph>`) with Shadow DOM
- Paragraph Web Component tests
- Paragraph React component tests
- Paragraph Storybook stories (Default, Lead, SmallPrint, AllVariants)

---

## Version 3.0.0 (January 29, 2026)

### Storybook & Documentation

- Storybook dark mode toggle via `@storybook/addon-themes`
- Custom `css/variables-scoped` Style Dictionary format for class-scoped dark CSS
- Design token reference page (Foundations/Design Tokens) with visual previews
- `@storybook/addon-a11y` for accessibility testing in every story
- Story background color responds to theme switching via `dsn.color.neutral.bg-document`
- TokenTable helper component for token documentation

---

## Version 2.9.0 (January 29, 2026)

### Icon System

- Fluid icon sizes — `calc(font-size × line-height)` with CSS variable references
- Icon Web Component (`<dsn-icon>`) with Shadow DOM and inline SVG rendering
- Icon HTML/CSS component added to `@dsn/components-html`
- Shared icon CSS: `components-html/src/icon/icon.css` as single source of truth
- Icon path registry auto-generated from SVG files for Web Components
- `build-css.js` extended to generate icon styles and icon path data
- Icon Web Component tests (48 tests covering all icons, sizes, accessibility)
- Storybook: Button + Icon composition stories (With icon, Icon only)
- `@dsn/components-html` build updated to include icon CSS
- SVG assets included in published `@dsn/components-html` package

---

## Version 2.8.0 (January 29, 2026)

### Development Infrastructure

- TypeScript type checking across all packages (`pnpm type-check`)
- CI workflow updated with type-check step
- Modern `exports` fields added to all package.json files
- Husky + lint-staged pre-commit hooks (ESLint + Prettier)
- Web Component tests for DsnButton (50 tests)
- ESLint ignorePatterns for auto-generated files (`*.generated.*`)
- Design tokens watch mode fixed (`node --watch-path`)
- Icon generation script error handling improved
- Design tokens TypeScript declarations now export typed constants (520+)
- Package READMEs added for all packages
- Storybook tsconfig.json created
- components-web tsconfig.json refactored to extend root
- `.gitignore` updated for generated files

---

## Version 2.7.0 (January 28, 2026)

### Form Control Tokens

- Form control tokens added for input, select, textarea, checkbox, radio components
- Tokens split across core files (non-color) and theme files (color)
- Core tokens: borders.json, spacing.json, typography.json, sizing.json
- Theme tokens: light.json, dark.json (color tokens only)
- Heading color token added to themes
- All form control states covered: default, hover, focus, active, disabled, invalid, read-only

---

## Version 2.6.0 (January 28, 2026)

### Web Components Foundation

- React Button component verified - already using correct class names
- Web Button component created (`<dsn-button>` custom element)
- Web Component package (@dsn/components-web) set up with TypeScript
- Web Button demo page created
- Consistent API across HTML, React, and Web Component implementations

---

## Version 2.5.0 (January 28, 2026)

### Component Token Architecture

- Component token architecture fully implemented and documented
- Button component tokens created (90+ tokens)
- Button CSS refactored to use component tokens
- Light and dark theme build pipeline working
- Colors.json added for universal color tokens (transparent)
- Mobile-first CSS methodology documented
- Token file organization improved (core/ and components/ folders)

---

## Version 2.4.0 (January 27, 2026)

### Component Standards

- Component token workflow documented and established
- Component naming conventions finalized (strong, default, subtle + sentiments)
- Size naming conventions finalized (small, default, large)
- Explicit CSS class approach documented

---

## Version 2.3.0 (January 22, 2026)

### Foundation Complete

- Phase 1-5 COMPLETE: Repository, tokens, core, Icon, and Button components
- 376 semantic tokens generating successfully
- Build pipeline verified and working

---

**Built by Jeffrey Lauwers**
