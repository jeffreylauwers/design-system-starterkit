import React from 'react';
import { classNames } from '@dsn/core';
import './PageLayout.css';

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Paginainhoud: doorgaans `PageHeader`, `PageBody` en `PageFooter`.
   */
  children: React.ReactNode;

  /**
   * Extra CSS-klassen
   */
  className?: string;
}

/**
 * PageLayout component
 * Structurele wrapper die `PageHeader`, `PageBody` en `PageFooter` verticaal
 * stapelt via flexbox. Garandeert dat de pagina altijd de volledige viewport
 * vult (`min-block-size: 100dvh`) en dat `PageFooter` altijd onderaan staat
 * zodra `PageBody` `flex: 1` heeft.
 *
 * `PageLayout` is een neutrale `<div>` zonder semantische rol. De semantische
 * landmarks komen van de children (`<header>`, `<main>`, `<footer>`).
 *
 * @example
 * ```tsx
 * <SkipLink href="#main-content" />
 * <PageLayout>
 *   <PageHeader logoSlot={<Logo />} />
 *   <PageBody>
 *     <main id="main-content" tabIndex={-1}>
 *       <Container>...</Container>
 *     </main>
 *   </PageBody>
 *   <PageFooter slot1={<Logo />} />
 * </PageLayout>
 * ```
 */
export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-page-layout', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageLayout.displayName = 'PageLayout';
