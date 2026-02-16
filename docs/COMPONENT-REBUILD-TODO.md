# Component Rebuild TODO

**Status:** RESTART - Only Button is satisfactory (1/25 components done)
**Last Updated:** 2025-02-14 (Updated after user feedback)

## What Happened

During initial development, component CSS files were created but left empty (only placeholder comments). All form components existed with correct TypeScript and HTML structure, but had zero styling.

Emergency fix attempted: Wrote CSS for 12 components and created stories for 5 components. However, **user is only satisfied with Button** - all other components need complete rebuild.

## User-Approved Components ✅

- [x] **Button** - Complete and satisfactory (CSS + Stories)

## All Components Requiring Complete Rebuild

User has specified the following 24 components need to be rebuilt from scratch in this exact order:

### Content Components (Priority 1)

1. [ ] Icon
2. [ ] Paragraph
3. [ ] Heading
4. [ ] Link
5. [ ] Unordered List
6. [ ] Ordered List

### Form Option Components (Priority 2)

7. [ ] Checkbox
8. [ ] Radio Button
9. [ ] Option Label
10. [ ] Checkbox Option
11. [ ] Radio Option
12. [ ] Checkbox Group
13. [ ] Radio Group

### Form Input Components (Priority 3)

14. [ ] Text Input
15. [ ] Text Area

### Form Field Components (Priority 4)

16. [ ] Form Field Label
17. [ ] Form Field Description
18. [ ] Form Field Error Message
19. [ ] Form Field Status

### Specialized Input Components (Priority 5)

20. [ ] Number Input
21. [ ] Email Input
22. [ ] Telephone Input
23. [ ] Password Input
24. [ ] Search Input
25. [ ] Time Input

## Why Current Components Are NOT Satisfactory

Current issues with attempted components (Checkbox, Radio, TextInput, SearchInput):

- CSS may not properly use all design tokens
- States might be incomplete or incorrect
- Visual appearance doesn't match expectations
- Stories might be too basic or missing important examples
- Need user review at each step to ensure satisfaction

## Step-by-Step Process (Per Component)

### 1. Design Tokens Check

```bash
# Check what tokens exist
grep "dsn-[component-name]" packages/design-tokens/dist/css/start-light-default.css
```

### 2. Verify Component Implementation

- Check `/packages/components-react/src/[ComponentName]/[ComponentName].tsx`
- Verify it imports CSS: `import './[ComponentName].css'`
- Check class names follow BEM: `dsn-component__element--modifier`

### 3. Write/Verify CSS

- Use design tokens (CSS custom properties)
- Implement ALL states: default, hover, focus, active, disabled, invalid, readonly, checked
- Add smooth transitions
- Test accessibility

### 4. Create Storybook Story

```typescript
// Template structure
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@dsn/components-react';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  argTypes: {
    /* ... */
  },
  args: {
    /* defaults */
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {};
export const AllStates: Story = {
  /* ... */
};
```

### 5. Test in Storybook

- Start Storybook: `pnpm dev`
- Navigate to component
- Test all interactive states
- Verify styling matches design tokens

### 6. Commit Progress

```bash
git add packages/components-react/src/ComponentName/
git add packages/storybook/src/ComponentName.stories.tsx
git commit -m "feat: complete ComponentName with CSS and stories"
```

## Rebuild Strategy

**CRITICAL: User must approve each component before moving to the next one**

For each component:

1. Show user the current state (if exists)
2. Discuss what's wrong and what's needed
3. Review available design tokens together
4. Build CSS step-by-step with user feedback
5. Create comprehensive stories
6. **GET USER APPROVAL** before moving to next component

## Next Steps

**Start with Priority 1: Content Components**

- These are likely simpler than form components
- Build confidence with easier components first
- User feedback will establish quality standards for the rest

## Notes

- **One component at a time** - Don't try to batch process
- **Test before moving on** - Each component must work in Storybook
- **No automated scripts** - Use manual Edit tool for TypeScript files
- **Commit frequently** - After each working component
- **Design tokens are ready** - Just need to be applied in CSS

## Reference Files

- Working example: `/packages/storybook/src/Button.stories.tsx`
- CSS example: `/packages/components-react/src/Checkbox/Checkbox.css`
- Available tokens: `/packages/design-tokens/dist/css/start-light-default.css`
