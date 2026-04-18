import React from 'react';
import { classNames } from '@dsn/core';
import './PageBody.css';

export interface PageBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * De paginainhoud: doorgaans een `<main>` element met `id="main-content"`.
   */
  children: React.ReactNode;

  /**
   * Extra CSS-klassen
   */
  className?: string;
}

/**
 * PageBody component
 * Structurele wrapper voor de hoofdinhoud van een pagina. Vult de beschikbare
 * verticale ruimte op binnen `PageLayout` zodat `PageFooter` altijd onderaan
 * de viewport staat (sticky footer patroon via `flex: 1`).
 *
 * @example
 * ```tsx
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
export const PageBody = React.forwardRef<HTMLDivElement, PageBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-page-body', className)}
        {...props}
      >
        <div className="dsn-page-body__inner">{children}</div>
      </div>
    );
  }
);

PageBody.displayName = 'PageBody';
