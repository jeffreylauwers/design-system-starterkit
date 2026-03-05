import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders as a <div> element', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-grid class', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild).toHaveClass('dsn-grid');
  });

  it('does not add contained modifier class by default', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild).not.toHaveClass('dsn-grid--contained');
  });

  it('adds contained modifier class when contained prop is true', () => {
    const { container } = render(<Grid contained />);
    expect(container.firstChild).toHaveClass('dsn-grid');
    expect(container.firstChild).toHaveClass('dsn-grid--contained');
  });

  it('does not add contained modifier class when contained prop is false', () => {
    const { container } = render(<Grid contained={false} />);
    expect(container.firstChild).not.toHaveClass('dsn-grid--contained');
  });

  it('applies custom className', () => {
    const { container } = render(<Grid className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-grid');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Grid ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });

  it('passes additional HTML attributes', () => {
    const { container } = render(
      <Grid data-testid="grid" aria-label="page layout" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'grid');
    expect(container.firstChild).toHaveAttribute('aria-label', 'page layout');
  });
});
