import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PageFooter } from './PageFooter';

const defaultLogo = (
  <a href="/">
    <span>Logo</span>
    <span className="dsn-visually-hidden">
      Starter Kit — terug naar homepage
    </span>
  </a>
);

describe('PageFooter', () => {
  // ---------------------------------------------------------------------------
  // Structuur
  // ---------------------------------------------------------------------------

  it('rendert een <footer>-element', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(container.querySelector('footer')).toBeTruthy();
  });

  it('heeft de basis dsn-page-footer klasse', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(container.querySelector('footer')).toHaveClass('dsn-page-footer');
  });

  it('rendert de inner-wrapper met dsn-page-footer__inner', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(container.querySelector('.dsn-page-footer__inner')).toBeTruthy();
  });

  it('rendert een grid (dsn-grid) binnen de inner-wrapper', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(
      container.querySelector('.dsn-page-footer__inner .dsn-grid')
    ).toBeTruthy();
  });

  it('rendert slot1 in de footer', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(container.querySelector('footer a[href="/"]')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // colorScheme
  // ---------------------------------------------------------------------------

  it('heeft geen inverse modifier bij colorScheme default', () => {
    const { container } = render(<PageFooter slot1={defaultLogo} />);
    expect(container.querySelector('footer')).not.toHaveClass(
      'dsn-page-footer--inverse'
    );
  });

  it('heeft de inverse modifier bij colorScheme inverse', () => {
    const { container } = render(
      <PageFooter slot1={defaultLogo} colorScheme="inverse" />
    );
    expect(container.querySelector('footer')).toHaveClass(
      'dsn-page-footer--inverse'
    );
  });

  // ---------------------------------------------------------------------------
  // Slots
  // ---------------------------------------------------------------------------

  it('rendert slot3 als dat meegegeven wordt', () => {
    const { container } = render(
      <PageFooter slot1={defaultLogo} slot3={<p>Lorem ipsum</p>} />
    );
    expect(container.querySelector('footer p')).toBeTruthy();
  });

  it('rendert slot4 als dat meegegeven wordt', () => {
    const { container } = render(
      <PageFooter
        slot1={defaultLogo}
        slot4={
          <ul>
            <li>
              <a href="/privacy">Privacyverklaring</a>
            </li>
          </ul>
        }
      />
    );
    expect(container.querySelector('footer ul')).toBeTruthy();
    expect(container.querySelector('footer a[href="/privacy"]')).toBeTruthy();
  });

  it('rendert slot2 als dat meegegeven wordt', () => {
    const { container } = render(
      <PageFooter
        slot1={defaultLogo}
        slot2={<span data-testid="secondary">Extra</span>}
      />
    );
    expect(container.querySelector('[data-testid="secondary"]')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // className en ref
  // ---------------------------------------------------------------------------

  it('voegt extra className toe aan het root element', () => {
    const { container } = render(
      <PageFooter slot1={defaultLogo} className="extra-class" />
    );
    expect(container.querySelector('footer')).toHaveClass('extra-class');
  });

  it('stuurt HTML-attributen door naar het <footer>-element', () => {
    const { container } = render(
      <PageFooter slot1={defaultLogo} data-testid="page-footer" />
    );
    expect(container.querySelector('[data-testid="page-footer"]')).toBeTruthy();
  });

  it('geeft ref door naar het <footer>-element', () => {
    const ref = { current: null as HTMLElement | null };
    render(<PageFooter slot1={defaultLogo} ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe('footer');
  });
});
