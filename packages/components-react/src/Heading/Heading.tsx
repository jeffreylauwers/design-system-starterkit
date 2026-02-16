import React from 'react';
import { classNames } from '@dsn/core';
import './Heading.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingAppearance =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantic heading level — determines the HTML element (h1–h6)
   * @default 2
   */
  level?: HeadingLevel;

  /**
   * Visual appearance — controls font size, line height, and spacing.
   * Defaults to matching the level (e.g. level 2 → heading-2).
   */
  appearance?: HeadingAppearance;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Heading content
   */
  children?: React.ReactNode;
}

/**
 * Heading component with independent semantic level and visual appearance
 *
 * @example
 * ```tsx
 * // Basic usage — level and appearance match
 * <Heading level={1}>Page Title</Heading>
 *
 * // Semantic h2, styled as heading-4
 * <Heading level={2} appearance="heading-4">Subsection</Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, appearance, className, children, ...props }, ref) => {
    const resolvedAppearance = appearance ?? (`heading-${level}` as HeadingAppearance);
    const Tag = `h${level}` as const;

    const classes = classNames(
      'dsn-heading',
      `dsn-heading--${resolvedAppearance}`,
      className
    );

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
