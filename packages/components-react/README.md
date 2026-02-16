# @dsn/components-react

React components for the Design System Starter Kit.

## Installation

```bash
pnpm add @dsn/components-react
```

## Usage

### Importing Components

The package provides a convenient barrel export for importing multiple components:

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

### Example

```tsx
import { Button, Icon } from '@dsn/components-react';

function App() {
  return (
    <Button variant="strong" size="default">
      <Icon name="check" size="sm" />
      Save Changes
    </Button>
  );
}
```

## Available Components

### Content Components

- **Button** - Primary action component with variants and sizes
- **Heading** - Semantic heading component (h1-h6)
- **Icon** - SVG icon component with 45+ icons
- **Link** - Anchor element with external link support
- **OrderedList** - Numbered list component
- **Paragraph** - Text paragraph component
- **UnorderedList** - Bulleted list component

### Form Components

- **TextInput** - Single-line text input
- **EmailInput** - Email input with validation
- **PasswordInput** - Password input with toggle visibility
- **NumberInput** - Numeric input
- **TelephoneInput** - Phone number input
- **SearchInput** - Search field
- **TimeInput** - Time picker
- **TextArea** - Multi-line text input
- **Checkbox** - Checkbox input
- **CheckboxGroup** - Group of checkboxes with fieldset
- **CheckboxOption** - Checkbox with label (convenience component)
- **Radio** - Radio button input
- **RadioGroup** - Group of radio buttons with fieldset
- **RadioOption** - Radio button with label (convenience component)
- **OptionLabel** - Label for checkboxes and radio buttons

### Form Field Components

- **FormField** - Complete form field wrapper (label + description + input + error)
- **FormFieldLabel** - Label for form fields
- **FormFieldDescription** - Help text for form fields
- **FormFieldErrorMessage** - Error message display
- **FormFieldStatus** - Status indicator for form fields

## Features

- **TypeScript Support** - All components are fully typed
- **JSDoc Documentation** - Comprehensive documentation with usage examples
- **ForwardRef** - All components support ref forwarding
- **Accessibility** - WCAG 2.1 Level AA compliant
- **Composable** - Components are designed to work together
- **Themeable** - Uses design tokens for easy customization

## Component Composition

```tsx
import { FormField, EmailInput, Button, Icon } from '@dsn/components-react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <form>
      <FormField
        label="Email address"
        htmlFor="email"
        description="We'll never share your email"
        error={error}
      >
        <EmailInput
          id="email"
          invalid={!!error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>

      <Button variant="strong" type="submit">
        <Icon name="login" size="sm" />
        Sign In
      </Button>
    </form>
  );
}
```

## Build

The package build includes:

1. **Icon Generation** - Automatically generates icon registry from SVG files
2. **TypeScript Compilation** - Compiles to JavaScript with type declarations

```bash
# Build the package
pnpm build

# Generate icons only
pnpm generate:icons

# Type check
pnpm type-check

# Watch mode
pnpm watch
```

## CSS

CSS styles are imported from `@dsn/components-html` for each component. The CSS is not bundled with the JavaScript - you need to import it separately in your application.

## Dependencies

- `@dsn/core` - Core utilities and styles
- `@dsn/design-tokens` - Design tokens
- `react` (peer dependency) - React 18+
- `react-dom` (peer dependency) - React DOM 18+

## License

MIT - Jeffrey Lauwers
