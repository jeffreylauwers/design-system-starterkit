/**
 * @dsn/components-web
 * Web Components for the design system
 *
 * This package exports Web Components that can be registered manually or all at once.
 * Components are NOT auto-registered on import - you must explicitly register them.
 *
 * @example Register all components at once
 * ```ts
 * import { defineAllComponents } from '@dsn/components-web';
 * defineAllComponents();
 * ```
 *
 * @example Register specific components
 * ```ts
 * import { defineButton, defineIcon } from '@dsn/components-web';
 * defineButton();
 * defineIcon();
 * ```
 *
 * @example Register with custom tag names
 * ```ts
 * import { defineButton } from '@dsn/components-web';
 * defineButton('my-custom-button');
 * ```
 */

// Internal imports for defineAllComponents
import { defineButton as _defineButton } from './button';
import { defineIcon as _defineIcon } from './icon';
import { defineParagraph as _defineParagraph } from './paragraph';
import { defineHeading as _defineHeading } from './heading';
import { defineLink as _defineLink } from './link';
import { defineUnorderedList as _defineUnorderedList } from './unordered-list';
import { defineOrderedList as _defineOrderedList } from './ordered-list';

// Button
export { DsnButton, defineButton } from './button';
export type { ButtonVariant, ButtonSize } from './button';

// Icon
export { DsnIcon, defineIcon } from './icon';
export type { IconSize, IconName } from './icon';

// Paragraph
export { DsnParagraph, defineParagraph } from './paragraph';
export type { ParagraphVariant } from './paragraph';

// Heading
export { DsnHeading, defineHeading } from './heading';
export type { HeadingLevel, HeadingAppearance } from './heading';

// Link
export { DsnLink, defineLink } from './link';

// Unordered List
export { DsnUnorderedList, defineUnorderedList } from './unordered-list';

// Ordered List
export { DsnOrderedList, defineOrderedList } from './ordered-list';

/**
 * Register all components with their default tag names.
 * Call this once in your application entry point.
 *
 * Default tag names:
 * - dsn-button
 * - dsn-icon
 * - dsn-paragraph
 * - dsn-heading
 * - dsn-link
 * - dsn-unordered-list
 * - dsn-ordered-list
 */
export function defineAllComponents(): void {
  _defineButton();
  _defineIcon();
  _defineParagraph();
  _defineHeading();
  _defineLink();
  _defineUnorderedList();
  _defineOrderedList();
}
