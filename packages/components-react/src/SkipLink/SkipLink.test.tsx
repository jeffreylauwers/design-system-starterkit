import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders children', () => {
    render(<SkipLink href="#main">Ga direct naar de hoofdinhoud</SkipLink>);
    expect(
      screen.getByRole('link', { name: 'Ga direct naar de hoofdinhoud' })
    ).toBeInTheDocument();
  });

  it('renders as an anchor element', () => {
    render(<SkipLink href="#main">Skip</SkipLink>);
    expect(screen.getByRole('link').tagName).toBe('A');
  });

  it('sets href on the anchor', () => {
    render(<SkipLink href="#main-content">Skip</SkipLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '#main-content');
  });

  it('applies base dsn-skip-link class', () => {
    render(<SkipLink href="#main">Skip</SkipLink>);
    expect(screen.getByRole('link')).toHaveClass('dsn-skip-link');
  });

  it('applies custom className', () => {
    render(
      <SkipLink href="#main" className="custom">
        Skip
      </SkipLink>
    );
    expect(screen.getByRole('link')).toHaveClass('dsn-skip-link', 'custom');
  });

  it('uses default children text when no children provided', () => {
    render(<SkipLink href="#main" />);
    expect(
      screen.getByRole('link', { name: 'Ga direct naar de hoofdinhoud' })
    ).toBeInTheDocument();
  });

  it('renders custom children text', () => {
    render(<SkipLink href="#main">Sla navigatie over</SkipLink>);
    expect(
      screen.getByRole('link', { name: 'Sla navigatie over' })
    ).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLAnchorElement | null };
    render(
      <SkipLink ref={ref} href="#main">
        Skip
      </SkipLink>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes through additional anchor attributes', () => {
    render(
      <SkipLink href="#main" data-testid="skip-link">
        Skip
      </SkipLink>
    );
    expect(screen.getByTestId('skip-link')).toBeInTheDocument();
  });

  it('passes lang attribute', () => {
    render(
      <SkipLink href="#main" lang="en">
        Skip to main content
      </SkipLink>
    );
    expect(screen.getByRole('link')).toHaveAttribute('lang', 'en');
  });
});
