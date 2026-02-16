# Storybook Configuration

**Last Updated:** February 14, 2026

Documentation for the Storybook setup, runtime theme switching, and documentation structure.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Configuration Files](#configuration-files)
3. [Runtime Theme Switching](#runtime-theme-switching)
4. [TokenTable Component](#tokentable-component)
5. [Documentation Structure](#documentation-structure)

---

## Architecture Overview

Storybook uses a four-file configuration for runtime theme switching and documentation:

```
packages/storybook/.storybook/
├── main.ts              # Storybook config, static dirs, multilevel-sort
├── preview.ts           # Decorator, globalTypes (toolbar), storySort
├── preview-head.html    # Dynamic token loading script
└── preview-body.css     # Preview iframe styles
```

**Documentation structure per component:**

```
packages/storybook/src/
├── Button.stories.tsx    # Stories (variants, sizes, states)
├── Button.docs.mdx       # MDX wrapper (Meta, Story, Controls, Markdown)
└── Button.docs.md        # Dutch documentation content
```

---

## Configuration Files

### main.ts

**Location:** `packages/storybook/.storybook/main.ts`

**Purpose:** Core Storybook configuration

**Key features:**

- Static file serving (design tokens, icons)
- Addon configuration
- Story file patterns
- Multilevel sort plugin for docs-first ordering

```ts
import type { StorybookConfig } from '@storybook/react-vite';
import { configureSort } from 'storybook-multilevel-sort';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    {
      from: '../../design-tokens/dist',
      to: '/design-tokens/dist',
    },
    {
      from: '../../components-html/assets',
      to: '/assets',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: 'storybook-multilevel-sort',
      options: {
        configureSort: configureSort({
          typeOrder: ['docs', 'story'],
        }),
      },
    },
  ],
};

export default config;
```

### preview.ts

**Location:** `packages/storybook/.storybook/preview.ts`

**Purpose:** Defines toolbar controls and decorator for theme switching

**Key features:**

- Toolbar controls for Theme, Mode, Density
- Decorator for dynamic token loading
- Story sorting

```ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'start',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'start', title: 'Start Theme' },
          { value: 'wireframe', title: 'Wireframe' },
        ],
      },
    },
    mode: {
      name: 'Mode',
      defaultValue: 'light',
      toolbar: {
        items: [
          { value: 'light', title: 'Light Mode' },
          { value: 'dark', title: 'Dark Mode' },
        ],
      },
    },
    projectType: {
      name: 'Density',
      defaultValue: 'default',
      toolbar: {
        items: [
          { value: 'default', title: 'Default (Fluid)' },
          { value: 'information-dense', title: 'Information Dense (Fixed)' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'start';
      const mode = context.globals.mode || 'light';
      const projectType = context.globals.projectType || 'default';

      // Load CSS configuration dynamically...
      // (see Runtime Theme Switching section)

      return Story();
    },
  ],
};

export default preview;
```

**Important:** Token CSS is NOT imported statically. This prevents CSS cascade conflicts.

### preview-head.html

**Location:** `packages/storybook/.storybook/preview-head.html`

**Purpose:** Handles dynamic token loading in the preview iframe

**Key features:**

- Fetch-based CSS loading (no `<link>` tags)
- `:root:root` selector for higher specificity
- MutationObserver to keep styles at end of `<head>`
- URL parameter parsing for toolbar state

```html
<script>
  (function () {
    const CONFIG_BASE_URL = '/design-tokens/dist/css';

    function loadTokenConfig(configName) {
      fetch(`${CONFIG_BASE_URL}/${configName}.css`)
        .then((r) => r.text())
        .then((cssText) => {
          // Remove existing dynamic styles
          const existing = document.head.querySelector('[data-dsn-tokens]');
          if (existing) existing.remove();

          // Use :root:root for higher specificity
          const style = document.createElement('style');
          style.setAttribute('data-dsn-tokens', configName);
          style.textContent = cssText.replace(':root', ':root:root');
          document.head.appendChild(style);
        });
    }

    // MutationObserver ensures our styles stay at end of <head>
    const observer = new MutationObserver(() => {
      const tokenStyle = document.head.querySelector('[data-dsn-tokens]');
      if (tokenStyle && tokenStyle !== document.head.lastElementChild) {
        document.head.appendChild(tokenStyle);
      }
    });

    observer.observe(document.head, { childList: true });

    // URL polling detects Storybook toolbar changes
    let lastUrl = window.location.href;
    setInterval(() => {
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        // Parse globals from URL and load config...
      }
    }, 100);
  })();
</script>
```

### preview-body.css

**Location:** `packages/storybook/.storybook/preview-body.css`

**Purpose:** Base styles for the preview iframe

```css
body {
  background-color: var(--dsn-color-neutral-bg-document);
  color: var(--dsn-color-neutral-color-document);
}
```

---

## Runtime Theme Switching

### Why This Architecture?

1. **Static imports cause cascade issues** — Vite/webpack bundles CSS imports, which may load after dynamically injected styles
2. **`:root:root` selector** — Higher specificity ensures dynamic tokens override bundled ones
3. **MutationObserver** — New styles added by HMR or components don't break theming
4. **URL parameter parsing** — Storybook encodes globals in URL (`?globals=mode:dark`)
5. **Works for Stories AND Docs** — Unlike decorators, the script runs for all iframe content

### How It Works

1. User changes toolbar control (Theme, Mode, or Density)
2. Storybook updates URL with new global values
3. Script in `preview-head.html` detects URL change
4. Script parses globals from URL parameters
5. Script fetches new CSS configuration
6. Script removes old `<style>` element
7. Script creates new `<style>` with `:root:root` selector
8. Script appends to end of `<head>`
9. MutationObserver ensures it stays last
10. All components update with new token values

### Example: Switching to Dark Mode

1. User clicks "Dark Mode" in toolbar
2. URL changes to `?globals=mode:dark`
3. Script detects change
4. Script fetches `/design-tokens/dist/css/start-dark-default.css`
5. Script injects with `:root:root` selector
6. All `--dsn-*` variables update
7. Components re-render with new colors

---

## TokenTable Component

**Location:** `packages/storybook/src/helpers/TokenTable.tsx`

**Purpose:** Display live CSS variable values in documentation

**Features:**

- Shows token name, CSS variable, and computed value
- Updates automatically on theme change
- Uses MutationObserver to detect style changes
- Listens for `storybook-globals-updated` event

### Implementation

```tsx
function useComputedCssValue(cssVar: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    const updateValue = () => {
      const computed = getComputedStyle(
        document.documentElement
      ).getPropertyValue(cssVar);
      setValue(computed.trim());
    };

    // Initial value
    updateValue();

    // Watch for style changes
    const observer = new MutationObserver(() => {
      updateValue();
    });

    observer.observe(document.head, { childList: true, subtree: true });

    // Listen for Storybook global changes
    const handleGlobalsUpdate = () => updateValue();
    window.addEventListener('storybook-globals-updated', handleGlobalsUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener(
        'storybook-globals-updated',
        handleGlobalsUpdate
      );
    };
  }, [cssVar]);

  return value;
}
```

### Usage in Documentation

```tsx
<TokenTable
  tokens={[
    { name: 'Background', cssVar: '--dsn-button-strong-background-color' },
    { name: 'Text Color', cssVar: '--dsn-button-strong-color' },
  ]}
/>
```

---

## Documentation Structure

### Component Documentation Files

Each component has three files:

1. **Stories file** (`.stories.tsx`) - Interactive examples
2. **MDX file** (`.docs.mdx`) - Documentation wrapper
3. **Markdown file** (`.docs.md`) - Dutch content

### Stories File Example

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@dsn/components-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Strong: Story = {
  args: {
    variant: 'strong',
    children: 'Strong Button',
  },
};
```

### MDX File Example

```mdx
{/* Button.docs.mdx */}
import { Meta, Story, Controls } from '@storybook/blocks';
import \* as ButtonStories from './Button.stories';
import buttonDocs from './Button.docs.md?raw';

<Meta of={ButtonStories} />

{/* Split markdown on marker */}
{buttonDocs.split('<!-- VOORBEELD -->')[0]}

{/* Live example */}

<Story of={ButtonStories.Default} />
<Controls of={ButtonStories.Default} />

{/* Rest of documentation */}
{buttonDocs.split('<!-- VOORBEELD -->')[1]}
```

### Markdown File Example

```markdown
<!-- Button.docs.md -->

# Button

## Doel

De Button component wordt gebruikt voor acties die direct effect hebben.

<!-- VOORBEELD -->

## Use when

- De gebruiker moet een actie uitvoeren
- Je een primaire of secundaire call-to-action nodig hebt

## Don't use when

- Je naar een andere pagina wilt navigeren (gebruik Link)
- De actie destructief is zonder bevestiging

## Best practices

- Gebruik duidelijke, actie-gerichte tekst
- Plaats primaire acties rechts, secundaire links
- Beperk het aantal buttons per scherm

## Design tokens

[TokenTable showing button tokens]
```

### Docs-First Ordering

The `storybook-multilevel-sort` plugin ensures Docs pages appear first:

```ts
configureSort({
  typeOrder: ['docs', 'story'],
});
```

**Sidebar structure:**

```
Components
  ├── Button
  │   ├── Docs (appears first)
  │   ├── Default
  │   ├── Strong
  │   └── Loading
  └── Icon
      ├── Docs (appears first)
      ├── Default
      └── Sizes
```

---

## Storybook Features

### Toolbar Controls

- **Theme** - Switch between themes (start, wireframe)
- **Mode** - Switch between light/dark modes
- **Density** - Switch between fluid/fixed typography

### Addons

- `@storybook/addon-links` - Navigation between stories
- `@storybook/addon-essentials` - Core Storybook features
- `@storybook/addon-interactions` - Testing interactions
- `@storybook/addon-a11y` - Accessibility testing
- `storybook-multilevel-sort` - Sidebar ordering

### Accessibility Testing

Every story automatically includes accessibility checks via `@storybook/addon-a11y`:

- WCAG 2.1 Level AA violations
- Color contrast issues
- Missing ARIA attributes
- Keyboard navigation problems

---

## Development Workflow

### Running Storybook

```bash
# Start Storybook
pnpm dev

# Build static Storybook
pnpm --filter @dsn/storybook build
```

### Adding Documentation for a New Component

1. **Create stories file** - `ComponentName.stories.tsx`
2. **Create MDX file** - `ComponentName.docs.mdx`
3. **Create markdown file** - `ComponentName.docs.md`
4. **Follow existing pattern** - Use Button as template
5. **Test theme switching** - Verify all themes/modes work

### Writing Good Stories

```tsx
// ✅ Good - clear names, realistic content
export const DefaultState: Story = {
  args: {
    children: 'Save changes',
    variant: 'strong',
  },
};

// ❌ Bad - generic names, unclear purpose
export const Story1: Story = {
  args: {
    children: 'Button',
  },
};
```

---

## Related Documentation

- **[Architecture](./01-architecture.md)** - Theme architecture
- **[Components](./03-components.md)** - Component specifications
- **[Development Workflow](./04-development-workflow.md)** - Development guidelines
