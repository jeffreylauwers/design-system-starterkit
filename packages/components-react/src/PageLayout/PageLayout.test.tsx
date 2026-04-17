import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  // ---------------------------------------------------------------------------
  // Structuur
  // ---------------------------------------------------------------------------

  it('rendert een <div>-element', () => {
    const { container } = render(
      <PageLayout>
        <div>inhoud</div>
      </PageLayout>
    );
    expect(container.querySelector('div.dsn-page-layout')).toBeTruthy();
  });

  it('heeft de basis dsn-page-layout klasse', () => {
    const { container } = render(
      <PageLayout>
        <div>inhoud</div>
      </PageLayout>
    );
    expect(container.querySelector('div')).toHaveClass('dsn-page-layout');
  });

  it('rendert children', () => {
    const { container } = render(
      <PageLayout>
        <header>header</header>
        <main>main</main>
        <footer>footer</footer>
      </PageLayout>
    );
    expect(container.querySelector('header')).toBeTruthy();
    expect(container.querySelector('main')).toBeTruthy();
    expect(container.querySelector('footer')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // className en ref
  // ---------------------------------------------------------------------------

  it('voegt extra className toe aan het root element', () => {
    const { container } = render(
      <PageLayout className="extra-class">
        <div>inhoud</div>
      </PageLayout>
    );
    expect(container.querySelector('div')).toHaveClass(
      'dsn-page-layout',
      'extra-class'
    );
  });

  it('stuurt HTML-attributen door naar het <div>-element', () => {
    const { container } = render(
      <PageLayout data-testid="page-layout">
        <div>inhoud</div>
      </PageLayout>
    );
    expect(container.querySelector('[data-testid="page-layout"]')).toBeTruthy();
  });

  it('geeft ref door naar het <div>-element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <PageLayout ref={ref}>
        <div>inhoud</div>
      </PageLayout>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('div');
  });
});
