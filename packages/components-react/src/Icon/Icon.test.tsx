import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies base dsn-icon class', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toHaveClass('dsn-icon');
  });

  it('does not add size class for default md size', () => {
    const { container } = render(<Icon name="check" size="md" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('dsn-icon');
    expect(svg).not.toHaveClass('dsn-icon--md');
  });

  it('applies size class for non-default sizes', () => {
    const { container } = render(<Icon name="check" size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('dsn-icon--lg');
  });

  it('is decorative (aria-hidden) when no aria-label', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('has role="img" and aria-label when label is provided', () => {
    const { container } = render(<Icon name="settings" aria-label="Open settings" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).toHaveAttribute('aria-label', 'Open settings');
  });

  it('applies custom className', () => {
    const { container } = render(<Icon name="check" className="custom" />);
    expect(container.querySelector('svg')).toHaveClass('custom');
  });

  it('warns and returns null for unknown icon name', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    // @ts-expect-error testing invalid icon name
    const { container } = render(<Icon name="nonexistent" />);
    expect(container.firstChild).toBeNull();
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[DSN Icon] Icon "nonexistent" not found')
    );
    spy.mockRestore();
  });

  it('renders different icons', () => {
    const { container, rerender } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).toBeInTheDocument();

    rerender(<Icon name="star" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
