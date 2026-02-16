# @dsn/core

Core utilities and global styles for the design system — CSS reset, utility classes, and shared JavaScript helpers.

## Features

- CSS reset (normalize + opinionated defaults)
- Utility CSS classes
- `classNames()` — conditional class name builder
- `bem()` / `bemModifiers()` — BEM class name helpers

## Installation

```bash
pnpm add @dsn/core
```

## Usage

### CSS

```css
/* Import the global reset + utilities */
@import '@dsn/core/css';
```

### JavaScript / TypeScript

```ts
import { classNames, bem, bemModifiers } from '@dsn/core';

// Conditional class names
classNames('btn', isActive && 'btn--active', className);
// => 'btn btn--active custom-class'

// BEM block + element
bem('card', 'header');
// => 'card__header'

// BEM with modifiers
bemModifiers('card', { active: true, size: 'lg' });
// => 'card card--active card--size-lg'
```

## Exports

| Export                          | Description                                  |
| ------------------------------- | -------------------------------------------- |
| `classNames(...args)`           | Joins truthy class name arguments            |
| `bem(block, element?)`          | Returns BEM block or block\_\_element string |
| `bemModifiers(base, modifiers)` | Returns base class with modifier classes     |

## Building

```bash
pnpm --filter @dsn/core build
```

## License

MIT
