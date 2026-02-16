# Components

**Last Updated:** February 14, 2026

Complete component specifications and guidelines for the Design System Starter Kit.

---

## Table of Contents

1. [Component Guidelines](#component-guidelines)
2. [Content Components](#content-components)
3. [Form Components](#form-components)
4. [Web Components Registration](#web-components-registration)

---

## Component Guidelines

### Importing Components

**React Components** - Use the barrel export for convenience:

```tsx
// ✅ Recommended: Import multiple components at once
import {
  Button,
  TextInput,
  Heading,
  FormField,
  Icon,
} from '@dsn/components-react';

// Also supported: Import individually
import { Button } from '@dsn/components-react/Button';
```

**All React components are fully typed** and include JSDoc documentation with usage examples.

### Component Token Architecture

**CRITICAL:** All components MUST use component tokens, not semantic tokens directly.

#### Token Hierarchy

```
Component CSS → Component Tokens → Semantic Tokens → Values
```

**Why Component Tokens:**

- Central definition of component styling
- Easy theming (change tokens, not CSS)
- Multi-brand support
- Consistent with design token standards
- Scalable architecture

### BEM Naming Convention

**Block Element Modifier**

```css
.dsn-button {
} /* Block */
.dsn-button__icon {
} /* Element */
.dsn-button--strong {
} /* Modifier */
.dsn-button--size-small {
} /* Modifier */
```

### Component Composition

Components are designed to compose together:

**Content Components**

```jsx
// React — Button with icon
<Button variant="strong" size="default">
  <Icon name="check" size="sm" />
  Save Changes
</Button>

// React — Button loading state (animated loader replaces iconStart)
<Button loading>Saving...</Button>

// React — External link (visible hint, no icon)
<Link href="https://example.com" external>Visit example.com</Link>
```

```html
<!-- Web Component — Button with icon -->
<dsn-button variant="strong" size="default">
  <dsn-icon name="check" size="sm"></dsn-icon>
  Save Changes
</dsn-button>

<!-- Web Component — External link -->
<dsn-link href="https://example.com" external>Visit example.com</dsn-link>
```

**Form Components**

```jsx
// React — Complete form field with text input
<FormField
  label="Email address"
  htmlFor="email"
  description="We'll never share your email"
  error={errors.email}
>
  <EmailInput
    id="email"
    invalid={!!errors.email}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>

// React — Checkbox group with fieldset/legend
<FormField
  label="Notification preferences"
  isGroup
  description="Choose how you want to be notified"
>
  <CheckboxGroup legend="Notification preferences">
    <CheckboxOption label="Email notifications" />
    <CheckboxOption label="SMS notifications" />
    <CheckboxOption label="Push notifications" />
  </CheckboxGroup>
</FormField>

// React — Radio group
<FormField label="Delivery method" isGroup>
  <RadioGroup legend="Delivery method">
    <RadioOption label="Standard shipping" name="delivery" />
    <RadioOption label="Express shipping" name="delivery" />
  </RadioGroup>
</FormField>
```

---

## Content Components

### Icon Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/icon/`

**Tokens:** Uses fluid sizing tokens (`calc(font-size × line-height)`)

**Icons:** 45 Tabler Icons (expandable via icon pipeline)

**Sizes:** 7 variants (sm, md, lg, xl, 2xl, 3xl, 4xl)

**Icon pipeline:**

1. Add SVG files to `packages/components-html/assets/icons/`
2. Run `node packages/components-react/scripts/generate-icons.js` (generates `icon-registry.generated.ts`)
3. Run `node packages/components-web/scripts/build-css.js` (generates `icon-paths.generated.ts`)
4. Storybook Icon stories auto-update via exported `iconMap`

### Button Component

**Status:** Complete (HTML, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/button/`

**Component Tokens:** 90+ tokens in `tokens/components/button.json`

**Variants (10 total):**

- Base: `strong`, `default`, `subtle`, `link`
- Negative: `strong-negative`, `default-negative`, `subtle-negative`
- Positive: `strong-positive`, `default-positive`, `subtle-positive`

**Sizes (3 total):**

- `small`, `default`, `large`

**Loading state:**

- `loading` prop disables interaction (`pointer-events: none`)
- Replaces `iconStart` with an animated `<Icon name="loader">` that spins (0.8s linear infinite)
- Text remains visible during loading
- Uses `em` units so the spinner scales with button size

**Tests:** React (25 tests), Web Component (53 tests)

### Paragraph Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/paragraph/`

**Variants (3 total):**

- `default` - Standard body text
- `lead` - Introductory paragraphs
- `small-print` - Disclaimers, footnotes

**Tests:** React (9 tests), Web Component (17 tests)

### Link Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/link/`

**Component Tokens:** `tokens/components/link.json`

**Features:**

- `disabled` — Disables link (removes href, adds aria-disabled)
- `current` — Marks link as current page (aria-current="page")
- `iconStart` / `iconEnd` — Icon slots before/after text
- `size` — Optional: `small`, `default`, `large` (when omitted, inherits font from parent)
- `external` — Opens in new tab with `target="_blank"`, `rel="noopener noreferrer"`, and visible "(opens in new tab)" hint text (no icon, follows GOV.UK pattern)

**Sizes (3 total):**

- `small` — font-size: sm, icon-size: sm
- `default` — font-size: md, icon-size: md
- `large` — font-size: lg, icon-size: lg

**Inline behavior:** Without an explicit `size` prop/attribute, the Link uses `font: inherit` and flows naturally within paragraphs, inheriting the parent's font size. This makes it ideal for inline usage within Paragraph components.

**Icon size scale (shared with Button):**

| Size variant | Icon token         |
| ------------ | ------------------ |
| `small`      | `dsn.icon.size.sm` |
| `default`    | `dsn.icon.size.md` |
| `large`      | `dsn.icon.size.lg` |

**Tests:** React (32 tests), Web Component (38 tests)

### Heading Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/heading/`

**Appearances (6 total):**

- `heading-1` through `heading-6`

**Features:**

- Independent `level` (semantic h1–h6) and `appearance` (visual style) props
- Heading component tokens with full set per level (font-family, font-weight, color, font-size, line-height, margin-block-end)
- Token namespace `dsn.heading.level-{1-6}.*` — avoids collision with core `dsn.heading.*` tokens
- Font-size scale shifted one level down: heading-1 = 3xl, heading-2 = 2xl, ... heading-6 = sm

**Tests:** React (13 tests), Web Component (24 tests)

### UnorderedList Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/unordered-list/`

**Component Tokens:** `tokens/components/unordered-list.json`

**Features:**

- Accent-colored bullet markers via `--dsn-unordered-list-marker-color`
- Consistent typography and spacing via design tokens
- Nesting support (nested `<ul>` elements)

**Tokens:**

- `font-family`, `font-weight`, `color`, `font-size`, `line-height`
- `padding-inline-start`, `margin-block-end`, `gap`
- `marker-color` — accent color for bullet markers

**Tests:** React (7 tests), Web Component (7 tests)

### OrderedList Component

**Status:** Complete (HTML/CSS, React, Web Component)

**Location:** `packages/components-{html|react|web}/src/ordered-list/`

**Component Tokens:** `tokens/components/ordered-list.json`

**Features:**

- `start` prop — allows numbering to begin at a custom number
- Accent-colored number markers via `--dsn-ordered-list-marker-color`
- Consistent typography and spacing via design tokens
- Nesting support (nested `<ol>` elements)

**Tokens:**

- `font-family`, `font-weight`, `color`, `font-size`, `line-height`
- `padding-inline-start`, `margin-block-end`, `gap`
- `marker-color` — accent color for number markers

**Tests:** React (8 tests), Web Component (11 tests)

---

## Form Components

**Status:** Complete (HTML/CSS, React) - 19 components total

**Location:** `packages/components-{html|react}/src/`

### Input Components

#### TextInput

**Tokens:** `tokens/components/text-input.json`, references `form-control.json`

**Sizes:** `default`, `large`

**States:** default, hover, focus, active, disabled, invalid, read-only

**Props:** `disabled`, `invalid`, `readOnly`, `size`, `width`

**Width variants:** `xs`, `sm`, `md`, `lg`, `xl`, `full`

**Tests:** React (9 tests)

#### TextArea

**Tokens:** `tokens/components/text-area.json`, references `form-control.json`

**Sizes:** `default`, `large`

**Props:** `disabled`, `invalid`, `readOnly`, `size`, `rows`, `width`

**Tests:** React (9 tests)

#### NumberInput

**Tokens:** `tokens/components/number-input.json`, extends TextInput tokens

**Props:** `min`, `max`, `step`, `disabled`, `invalid`, `readOnly`, `size`, `width`

**Tests:** React (9 tests)

#### PasswordInput

**Tokens:** `tokens/components/password-input.json`, extends TextInput tokens

**Props:** All TextInput props, type="password"

**Tests:** React (9 tests)

#### EmailInput

**Tokens:** `tokens/components/email-input.json`, extends TextInput tokens

**Props:** All TextInput props, type="email"

**Tests:** React (9 tests)

#### TelephoneInput

**Tokens:** `tokens/components/telephone-input.json`, extends TextInput tokens

**Props:** All TextInput props, type="tel"

**Tests:** React (9 tests)

#### SearchInput

**Tokens:** `tokens/components/search-input.json`, extends TextInput tokens

**Features:** Search icon on the left, calculated padding to accommodate icon

**Props:** All TextInput props, type="search"

**Tests:** React (9 tests)

#### TimeInput

**Tokens:** `tokens/components/time-input.json`, extends TextInput tokens

**Features:** Native time picker in supported browsers

**Props:** All TextInput props, type="time"

**Tests:** React (9 tests)

### Selection Components

#### Checkbox

**Tokens:** `tokens/components/checkbox.json`

**Fluid sizing:** `calc(var(--dsn-text-font-size-md) * var(--dsn-text-line-height-md))`

**Icon size:** 67% of checkbox size

**Icons:** `check.svg` (checked), `minus.svg` (indeterminate)

**States:** default, hover, focus, checked, indeterminate, disabled, checked-disabled

**Props:** `checked`, `indeterminate`, `disabled`

**Tests:** React (7 tests)

#### Radio

**Tokens:** `tokens/components/radio.json`

**Fluid sizing:** `calc(var(--dsn-text-font-size-md) * var(--dsn-text-line-height-md))`

**Icon size:** 33% of radio size (inner circle)

**Checked disabled color:** White for contrast against disabled background

**States:** default, hover, focus, checked, disabled, checked-disabled

**Props:** `checked`, `disabled`

**Tests:** React (7 tests)

#### CheckboxOption

**Tokens:** `tokens/components/checkbox-option.json`

**Features:** Combines Checkbox + Label with accessible touch targets

**Touch targets:** Uses `padding-block` for WCAG 2.5.5 compliance

**Props:** `label`, `checked`, `indeterminate`, `disabled`

**Tests:** React (13 tests)

#### RadioOption

**Tokens:** `tokens/components/radio-option.json`

**Features:** Combines Radio + Label with accessible touch targets

**Touch targets:** Uses `padding-block` for WCAG 2.5.5 compliance

**Props:** `label`, `checked`, `disabled`

**Tests:** React (13 tests)

### Group Components

#### CheckboxGroup

**Tokens:** `tokens/components/checkbox-group.json`

**Features:** Fieldset/legend structure for accessible grouping

**Legend tokens:** References `form-field-label` tokens (DRY principle)

**Props:** `legend`, `hideLegend`, `children`

**Tests:** React (8 tests)

#### RadioGroup

**Tokens:** `tokens/components/radio-group.json`

**Features:** Fieldset/legend structure for accessible grouping

**Legend tokens:** References `form-field-label` tokens (DRY principle)

**Props:** `legend`, `hideLegend`, `children`

**Tests:** React (9 tests)

### Form Field Container & Helper Components

#### FormField

**Tokens:** `tokens/components/form-field.json`

**Intelligent rendering:** Automatically uses fieldset/legend for groups, div/label for regular controls

**Features:** Combines Label, Description, Control, Error, Status with automatic aria-describedby linking

**Invalid state:** Red left border via `form-field.invalid` tokens

**Props:** `label`, `htmlFor`, `labelSuffix`, `description`, `error`, `status`, `isGroup`, `hideLabel`, `children`, `invalid`

**Tests:** React (11 tests)

#### FormFieldLabel

**Tokens:** `tokens/components/form-field-label.json`

**Features:** Required indicator, suffix support

**Props:** `htmlFor`, `required`, `suffix`, `children`

**Tests:** React (7 tests)

#### FormFieldDescription

**Tokens:** `tokens/components/form-field-description.json`

**Features:** Help text for form fields

**Props:** `id`, `children`

**Tests:** React (7 tests)

#### FormFieldErrorMessage

**Tokens:** `tokens/components/form-field-error-message.json`

**Features:** Validation error messages

**Props:** `id`, `children`

**Tests:** React (7 tests)

#### FormFieldStatus

**Tokens:** `tokens/components/form-field-status.json`

**Features:** Status messages (e.g., character count)

**Props:** `id`, `children`

**Tests:** React (7 tests)

### Shared Form Control Tokens

**form-control.json**

Base tokens for all input-like controls:

- Properties: font-family, font-size, font-weight, color, background-color, border-color, border-radius, border-width, padding, min-block-size, max-inline-size
- States: default, hover, focus, active, disabled, invalid, read-only
- Size variants: default, large
- Width variants: xs, sm, md, lg, xl, full

---

## Web Components Registration

Web Components are **NOT** auto-registered on import to avoid side effects. You must explicitly register them:

```ts
// Option 1: Register all components at once
import { defineAllComponents } from '@dsn/components-web';
defineAllComponents();

// Option 2: Register specific components
import { defineButton, defineIcon } from '@dsn/components-web';
defineButton();
defineIcon();

// Option 3: Register with custom tag names
import { defineButton } from '@dsn/components-web';
defineButton('my-custom-button');
```

**Default tag names:**

- `dsn-button`
- `dsn-heading`
- `dsn-icon`
- `dsn-link`
- `dsn-ordered-list`
- `dsn-paragraph`
- `dsn-unordered-list`

**Why explicit registration?**

- Avoids side effects on import (better tree-shaking)
- Allows custom tag names per project
- Prevents duplicate registration errors
- Follows Web Component best practices

---

## Component Statistics

**Total Components:** 26

**Implementations:**

- **HTML/CSS:** 26 components
- **React:** 26 components (396 tests total)
- **Web Component:** 7 components (Button, Heading, Icon, Link, OrderedList, Paragraph, UnorderedList)

**Test Coverage:** 396 tests across 24 test suites

---

## Related Documentation

- **[Architecture](./01-architecture.md)** - Token architecture
- **[Design Tokens Reference](./02-design-tokens-reference.md)** - All token values
- **[Development Workflow](./04-development-workflow.md)** - Adding components
- **[Storybook Configuration](./05-storybook-configuration.md)** - Component documentation
