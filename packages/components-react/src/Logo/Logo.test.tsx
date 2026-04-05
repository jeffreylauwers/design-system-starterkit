import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders as an <svg> element', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild?.nodeName).toBe('svg');
  });

  it('always has base dsn-logo class', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toHaveClass('dsn-logo');
  });

  it('has role="img" by default (standalone)', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toHaveAttribute('role', 'img');
  });

  it('renders a <title> element by default', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('title')).not.toBeNull();
  });

  it('renders default title text "Starter Kit"', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('title')?.textContent).toBe('Starter Kit');
  });

  it('renders custom title text when title prop is provided', () => {
    const { container } = render(<Logo title="Mijn Organisatie" />);
    expect(container.querySelector('title')?.textContent).toBe(
      'Mijn Organisatie'
    );
  });

  it('links aria-labelledby to the title id by default', () => {
    const { container } = render(<Logo />);
    const svg = container.firstChild as SVGSVGElement;
    const titleId = container.querySelector('title')?.getAttribute('id');
    expect(svg.getAttribute('aria-labelledby')).toBe(titleId);
  });

  it('sets aria-hidden and omits role + title when aria-hidden={true}', () => {
    const { container } = render(<Logo aria-hidden={true} />);
    const svg = container.firstChild as SVGSVGElement;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
    expect(svg).not.toHaveAttribute('aria-labelledby');
    expect(container.querySelector('title')).toBeNull();
  });

  it('sets aria-hidden and omits role + title when aria-hidden="true"', () => {
    const { container } = render(<Logo aria-hidden="true" />);
    const svg = container.firstChild as SVGSVGElement;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
    expect(container.querySelector('title')).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<Logo className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-logo');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as SVGSVGElement | null };
    render(<Logo ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('spreads additional SVG attributes', () => {
    const { container } = render(<Logo data-testid="logo" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'logo');
  });

  it('renders dsn-logo__primary path for background', () => {
    const { container } = render(<Logo />);
    const primaryPaths = container.querySelectorAll('.dsn-logo__primary');
    expect(primaryPaths.length).toBeGreaterThan(0);
  });

  it('renders dsn-logo__label path for inner rectangle', () => {
    const { container } = render(<Logo />);
    const labelPath = container.querySelector('.dsn-logo__label');
    expect(labelPath).not.toBeNull();
  });
});
