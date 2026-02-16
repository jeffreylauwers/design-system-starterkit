# @dsn/components-web

Web Components for the design system — framework-agnostic custom elements using Shadow DOM.

## Features

- Standard Web Components (Custom Elements v1)
- Shadow DOM encapsulation
- Shares CSS with HTML/CSS components (via build script)
- Works in any framework or vanilla HTML
- TypeScript typed
- Tree-shakeable: only register the components you need

## Installation

```bash
pnpm add @dsn/components-web
```

## Usage

Components must be explicitly registered before use. This gives you control over bundle size and tag names.

### Register all components

For quick setup, register all components at once:

```ts
import { defineAllComponents } from '@dsn/components-web';

defineAllComponents();
```

Then use in HTML:

```html
<dsn-button variant="strong">Save</dsn-button>
<dsn-icon name="check" size="lg"></dsn-icon>
<dsn-heading level="1">Welcome</dsn-heading>
```

### Register specific components (recommended)

For optimal bundle size, register only the components you need:

```ts
import { defineButton, defineIcon } from '@dsn/components-web';

defineButton();
defineIcon();
```

### Custom tag names

Register components with your own tag names to avoid conflicts:

```ts
import { defineButton } from '@dsn/components-web';

defineButton('my-button');
```

```html
<my-button variant="strong">Save</my-button>
```

### JavaScript API

Access component properties programmatically:

```ts
const button = document.querySelector('dsn-button');

// Properties
button.variant = 'strong';
button.size = 'large';
button.loading = true;
button.disabled = true;
button.fullWidth = true;
button.iconOnly = true;
```

## Available Components

| Component | Default Tag       | Define Function     | Key Attributes                                                              |
| --------- | ----------------- | ------------------- | --------------------------------------------------------------------------- |
| Button    | `<dsn-button>`    | `defineButton()`    | `variant`, `size`, `disabled`, `loading`, `full-width`, `icon-only`, `type` |
| Icon      | `<dsn-icon>`      | `defineIcon()`      | `name`, `size`, `aria-label`                                                |
| Heading   | `<dsn-heading>`   | `defineHeading()`   | `level`, `appearance`                                                       |
| Paragraph | `<dsn-paragraph>` | `defineParagraph()` | `variant`                                                                   |
| Link      | `<dsn-link>`      | `defineLink()`      | `href`, `disabled`, `current`                                               |

## TypeScript Support

All components are fully typed. Import types for use in your code:

```ts
import type { ButtonVariant, ButtonSize } from '@dsn/components-web';
import type { IconName, IconSize } from '@dsn/components-web';
import type { HeadingLevel, HeadingAppearance } from '@dsn/components-web';
import type { ParagraphVariant } from '@dsn/components-web';
```

## Building

The build generates Shadow DOM CSS from shared sources, then compiles TypeScript:

```bash
pnpm --filter @dsn/components-web build
```

## License

MIT
