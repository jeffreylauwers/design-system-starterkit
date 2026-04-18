import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PageBody } from './PageBody';

describe('PageBody', () => {
  // ---------------------------------------------------------------------------
  // Structuur
  // ---------------------------------------------------------------------------

  it('rendert een <div>-element', () => {
    const { container } = render(
      <PageBody>
        <main>inhoud</main>
      </PageBody>
    );
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('heeft de basis dsn-page-body klasse', () => {
    const { container } = render(
      <PageBody>
        <main>inhoud</main>
      </PageBody>
    );
    expect(container.querySelector('div')).toHaveClass('dsn-page-body');
  });

  it('rendert een dsn-page-body__inner wrapper', () => {
    const { container } = render(
      <PageBody>
        <main>inhoud</main>
      </PageBody>
    );
    expect(
      container.querySelector('.dsn-page-body > .dsn-page-body__inner')
    ).toBeTruthy();
  });

  it('rendert children', () => {
    const { container } = render(
      <PageBody>
        <main id="main-content">Hoofdinhoud</main>
      </PageBody>
    );
    expect(container.querySelector('main#main-content')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // className en ref
  // ---------------------------------------------------------------------------

  it('voegt extra className toe aan het root element', () => {
    const { container } = render(
      <PageBody className="extra-class">
        <main>inhoud</main>
      </PageBody>
    );
    expect(container.querySelector('div')).toHaveClass(
      'dsn-page-body',
      'extra-class'
    );
  });

  it('stuurt HTML-attributen door naar het <div>-element', () => {
    const { container } = render(
      <PageBody data-testid="page-body">
        <main>inhoud</main>
      </PageBody>
    );
    expect(container.querySelector('[data-testid="page-body"]')).toBeTruthy();
  });

  it('geeft ref door naar het <div>-element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <PageBody ref={ref}>
        <main>inhoud</main>
      </PageBody>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('div');
  });
});
