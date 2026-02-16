# Button Component

Accessible button component with multiple variants, sizes, and icon support.

## Features

- 10 variants (strong, default, subtle, link + negative/positive sentiments)
- 3 sizes (small, default, large)
- Icon support (with text or icon-only)
- Loading state
- Full width option
- Accessible (WCAG compliant pointer targets, focus states)
- Uses design tokens for colors, spacing, typography

## Variants

### Strong

Main call-to-action buttons for primary actions.

```tsx
<Button variant="strong">Save</Button>
```

### Default

Alternative actions, less prominent than strong.

```tsx
<Button variant="default">Cancel</Button>
```

### Subtle

Low-emphasis actions.

```tsx
<Button variant="subtle">Edit</Button>
```

### Link

Button styled as a text link.

```tsx
<Button variant="link">Learn more</Button>
```

### Sentiment Variants

Each base variant (strong, default, subtle) has negative and positive sentiment options:

```tsx
<Button variant="strong-negative">Delete</Button>
<Button variant="strong-positive">Confirm</Button>
<Button variant="default-negative">Reject</Button>
<Button variant="default-positive">Approve</Button>
<Button variant="subtle-negative">Remove</Button>
<Button variant="subtle-positive">Accept</Button>
```

## Sizes

| Size    | Use Case                      |
| ------- | ----------------------------- |
| small   | Compact UI, tables, cards     |
| default | Default, most common size     |
| large   | Prominent CTAs, hero sections |

## Usage

### React

```tsx
import { Button } from '@dsn/components-react';
import { Icon } from '@dsn/components-react';

// Basic
<Button variant="strong">Save</Button>

// With size
<Button variant="default" size="large">Cancel</Button>

// With icon
<Button variant="strong">
  <Icon name="plus" />
  Add item
</Button>

// Icon only
<Button variant="subtle" iconOnly aria-label="Settings">
  <Icon name="settings" />
</Button>

// Loading state (automatically disabled + aria-busy)
<Button variant="strong" loading>
  Saving...
</Button>

// Full width
<Button variant="strong" fullWidth>
  Continue
</Button>

// Disabled
<Button variant="strong" disabled>
  Disabled
</Button>
```

### HTML/CSS

```html
<!-- Basic button -->
<button class="dsn-button dsn-button--strong dsn-button--size-default">
  Save
</button>

<!-- With size -->
<button class="dsn-button dsn-button--default dsn-button--size-large">
  Cancel
</button>

<!-- With icon -->
<button class="dsn-button dsn-button--strong dsn-button--size-default">
  <svg class="dsn-icon" aria-hidden="true">...</svg>
  Add item
</button>

<!-- Icon only -->
<button
  class="dsn-button dsn-button--subtle dsn-button--size-default dsn-button--icon-only"
  aria-label="Settings"
>
  <svg class="dsn-icon">...</svg>
</button>

<!-- Loading (add aria-busy for screen readers) -->
<button
  class="dsn-button dsn-button--strong dsn-button--size-default dsn-button--loading"
  disabled
  aria-busy="true"
>
  Saving...
</button>

<!-- Full width -->
<button
  class="dsn-button dsn-button--strong dsn-button--size-default dsn-button--full-width"
>
  Continue
</button>

<!-- Disabled -->
<button class="dsn-button dsn-button--strong dsn-button--size-default" disabled>
  Disabled
</button>
```

## Accessibility

### WCAG Compliance

**Pointer Targets (WCAG 2.5.5):**

- All buttons meet 48x48px minimum touch target
- Uses `--dsn-pointer-target-min-block-size` and `--dsn-pointer-target-min-inline-size` tokens

**Focus Indicators:**

- Visible focus outline using design tokens
- `:focus-visible` for keyboard-only focus
- Uses `--dsn-focus-outline-*` tokens

**Color Contrast:**

- All variants meet WCAG AA contrast requirements
- Tested with design token color values

### Icon-Only Buttons

Icon-only buttons **must** have an accessible label:

```tsx
// GOOD
<Button iconOnly aria-label="Close dialog">
  <Icon name="x" />
</Button>

// BAD - No accessible label
<Button iconOnly>
  <Icon name="x" />
</Button>
```

### Loading State

Loading buttons are automatically:

- Disabled (no interaction)
- Marked with `aria-busy="true"` for screen reader feedback
- Show loading spinner
- Content becomes transparent

```tsx
<Button loading>Saving...</Button>
```

## Design Tokens Used

### Spacing

- `--dsn-button-size-{small,default,large}-padding-block`
- `--dsn-button-size-{small,default,large}-padding-inline`
- `--dsn-button-size-{small,default,large}-gap`
- `--dsn-button-size-{small,default,large}-font-size`

### Typography

- `--dsn-text-font-family-default`
- `--dsn-text-font-weight-bold`
- `--dsn-text-line-height-md`

### Borders

- `--dsn-border-width-thin`
- `--dsn-border-radius-md`

### Focus

- `--dsn-focus-outline-width`
- `--dsn-focus-outline-style`
- `--dsn-focus-outline-color`
- `--dsn-focus-outline-offset`

### Accessibility

- `--dsn-pointer-target-min-block-size`
- `--dsn-pointer-target-min-inline-size`

## TypeScript Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'strong'
    | 'strong-negative'
    | 'strong-positive'
    | 'default'
    | 'default-negative'
    | 'default-positive'
    | 'subtle'
    | 'subtle-negative'
    | 'subtle-positive'
    | 'link';
  size?: 'small' | 'default' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

## Examples

### Form Buttons

```tsx
<form>
  {/* Primary action */}
  <Button variant="strong" type="submit">
    Save
  </Button>

  {/* Secondary action */}
  <Button variant="default" type="button">
    Cancel
  </Button>
</form>
```

### Destructive Confirmation

```tsx
<Dialog>
  <DialogTitle>Delete Account?</DialogTitle>
  <DialogContent>This action cannot be undone.</DialogContent>
  <DialogActions>
    <Button variant="default">Cancel</Button>
    <Button variant="strong-negative">
      <Icon name="trash" />
      Delete Account
    </Button>
  </DialogActions>
</Dialog>
```

### Loading States

```tsx
function SaveButton() {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await saveData();
    setLoading(false);
  };

  return (
    <Button variant="strong" loading={loading} onClick={handleSave}>
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS custom properties (IE11 not supported)
- Uses `:focus-visible` (polyfill available for older browsers)

## License

MIT
