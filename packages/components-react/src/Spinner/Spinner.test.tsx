import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders as a <div> element', () => {
    const { container } = render(<Spinner label="Laden..." />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-spinner class', () => {
    const { container } = render(<Spinner label="Laden..." />);
    expect(container.firstChild).toHaveClass('dsn-spinner');
  });

  it('always has role="status"', () => {
    const { container } = render(<Spinner label="Laden..." />);
    expect(container.firstChild).toHaveAttribute('role', 'status');
  });

  it('renders an SVG with aria-hidden="true"', () => {
    const { container } = render(<Spinner label="Laden..." />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders track and arc circles', () => {
    const { container } = render(<Spinner label="Laden..." />);
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
    expect(circles[0]).toHaveClass('dsn-spinner__track');
    expect(circles[1]).toHaveClass('dsn-spinner__arc');
  });

  it('renders the label text', () => {
    const { getByText } = render(<Spinner label="Laden..." />);
    expect(getByText('Laden...')).toBeInTheDocument();
  });

  it('does not apply large class by default', () => {
    const { container } = render(<Spinner label="Laden..." />);
    expect(container.firstChild).not.toHaveClass('dsn-spinner--large');
  });

  it('applies large modifier class when size is large', () => {
    const { container } = render(<Spinner label="Laden..." size="large" />);
    expect(container.firstChild).toHaveClass('dsn-spinner--large');
  });

  it('does not apply dsn-visually-hidden to label by default', () => {
    const { container } = render(<Spinner label="Laden..." />);
    const label = container.querySelector('.dsn-spinner__label');
    expect(label).not.toHaveClass('dsn-visually-hidden');
  });

  it('applies dsn-visually-hidden to label when hideLabel is true', () => {
    const { container } = render(<Spinner label="Laden..." hideLabel />);
    const label = container.querySelector('.dsn-spinner__label');
    expect(label).toHaveClass('dsn-visually-hidden');
  });

  it('label always present in DOM when hideLabel is true', () => {
    const { getByText } = render(<Spinner label="Laden..." hideLabel />);
    expect(getByText('Laden...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Spinner label="Laden..." className="custom" />
    );
    expect(container.firstChild).toHaveClass('dsn-spinner');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Spinner label="Laden..." ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads additional HTML attributes', () => {
    const { container } = render(
      <Spinner label="Laden..." data-testid="spinner" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'spinner');
  });
});
