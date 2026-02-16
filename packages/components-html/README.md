# @dsn/components-html

Pure HTML/CSS components for the design system — no JavaScript required.

Use these components in static HTML pages, server-rendered templates, or any project that doesn't use a JavaScript framework.

## Features

- Pure CSS, no JavaScript dependencies
- BEM class naming convention
- Uses design tokens via CSS custom properties
- Works with any templating language or static HTML

## Installation

```bash
pnpm add @dsn/components-html
```

## Usage

### In HTML

Include the CSS and use BEM classes on standard HTML elements:

```html
<link rel="stylesheet" href="@dsn/design-tokens/dist/css/variables.css" />
<link rel="stylesheet" href="@dsn/components-html/dist/components.css" />

<button class="dsn-button dsn-button--strong dsn-button--size-default">
  Save
</button>

<button class="dsn-button dsn-button--default dsn-button--size-small">
  Cancel
</button>

<button class="dsn-button dsn-button--strong-negative dsn-button--size-default">
  Delete
</button>
```

### In JavaScript/TypeScript Projects

The package exports individual component CSS files:

```tsx
// Import all components
import '@dsn/components-html';

// Or import individual components
import '@dsn/components-html/button';
import '@dsn/components-html/icon';
import '@dsn/components-html/text-input';
```

**Available exports:**

- `./button` - Button component styles
- `./icon` - Icon component styles
- `./paragraph` - Paragraph component styles
- `./heading` - Heading component styles
- `./link` - Link component styles
- `./unordered-list` - Unordered list styles
- `./ordered-list` - Ordered list styles
- `./text-input` - Text input styles
- `./text-area` - Text area styles
- `./form-field-label` - Form field label styles
- `./form-field-description` - Form field description styles
- `./form-field-error-message` - Form field error message styles
- `./form-field-status` - Form field status styles

## Available Components

| Component             | CSS Classes                                                      | Export Path                  |
| --------------------- | ---------------------------------------------------------------- | ---------------------------- |
| Button                | `dsn-button`, `dsn-button--{variant}`, `dsn-button--size-{size}` | `./button`                   |
| Icon                  | `dsn-icon`, `dsn-icon--size-{size}`                              | `./icon`                     |
| Heading               | `dsn-heading`, `dsn-heading--level-{level}`                      | `./heading`                  |
| Paragraph             | `dsn-paragraph`, `dsn-paragraph--size-{size}`                    | `./paragraph`                |
| Link                  | `dsn-link`, `dsn-link--external`                                 | `./link`                     |
| UnorderedList         | `dsn-unordered-list`                                             | `./unordered-list`           |
| OrderedList           | `dsn-ordered-list`                                               | `./ordered-list`             |
| TextInput             | `dsn-text-input`, `dsn-text-input--size-{size}`                  | `./text-input`               |
| TextArea              | `dsn-text-area`, `dsn-text-area--size-{size}`                    | `./text-area`                |
| FormFieldLabel        | `dsn-form-field-label`                                           | `./form-field-label`         |
| FormFieldDescription  | `dsn-form-field-description`                                     | `./form-field-description`   |
| FormFieldErrorMessage | `dsn-form-field-error-message`                                   | `./form-field-error-message` |
| FormFieldStatus       | `dsn-form-field-status`                                          | `./form-field-status`        |

## Assets

SVG icons are available in `assets/icons/` for use as inline SVGs:

```
assets/icons/
├── check.svg
├── chevron-down.svg
├── home.svg
├── ... (20 icons total)
```

## Building

```bash
pnpm --filter @dsn/components-html build
```

## License

MIT
