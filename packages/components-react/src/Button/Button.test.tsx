import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows overriding type', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies variant class', () => {
    render(<Button variant="subtle">Subtle</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button--subtle');
  });

  it('defaults to strong variant', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button--strong');
  });

  it('applies size class', () => {
    render(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button--size-large');
  });

  it('defaults to default size', () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button--size-default');
  });

  it('applies loading class and aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('dsn-button--loading');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('does not have aria-busy when not loading', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('applies full-width class', () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button--full-width');
  });

  it('applies icon-only class', () => {
    render(
      <Button iconOnly aria-label="Close">
        X
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('dsn-button--icon-only');
  });

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button
        disabled
        onClick={() => {
          clicked = true;
        }}
      >
        Click
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  it('applies custom className', () => {
    render(<Button className="custom">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('always has base dsn-button class', () => {
    render(<Button>Base</Button>);
    expect(screen.getByRole('button')).toHaveClass('dsn-button');
  });

  it('supports sentiment variants', () => {
    const { rerender } = render(
      <Button variant="strong-negative">Delete</Button>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'dsn-button--strong-negative'
    );

    rerender(<Button variant="strong-positive">Confirm</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'dsn-button--strong-positive'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders iconStart before children', () => {
    render(
      <Button iconStart={<span data-testid="icon-start">★</span>}>Save</Button>
    );
    const button = screen.getByRole('button');
    const iconStart = button.querySelector('[data-testid="icon-start"]');
    expect(iconStart).toBeInTheDocument();
    // Icon should come before text
    expect(button.firstChild).toBe(iconStart);
  });

  it('renders iconEnd after children', () => {
    render(
      <Button iconEnd={<span data-testid="icon-end">→</span>}>Next</Button>
    );
    const button = screen.getByRole('button');
    const iconEnd = button.querySelector('[data-testid="icon-end"]');
    expect(iconEnd).toBeInTheDocument();
    // Icon should come after text
    expect(button.lastChild).toBe(iconEnd);
  });

  it('renders both iconStart and iconEnd simultaneously', () => {
    render(
      <Button
        iconStart={<span data-testid="icon-start">★</span>}
        iconEnd={<span data-testid="icon-end">→</span>}
      >
        Confirm
      </Button>
    );
    const button = screen.getByRole('button');
    const iconStart = button.querySelector('[data-testid="icon-start"]');
    const iconEnd = button.querySelector('[data-testid="icon-end"]');
    expect(iconStart).toBeInTheDocument();
    expect(iconEnd).toBeInTheDocument();
    expect(button.firstChild).toBe(iconStart);
    expect(button.lastChild).toBe(iconEnd);
  });

  it('renders without icon props (backward-compatible)', () => {
    render(<Button>No icons</Button>);
    const button = screen.getByRole('button', { name: 'No icons' });
    expect(button.childNodes).toHaveLength(1);
  });

  it('shows loader icon instead of iconStart when loading', () => {
    render(
      <Button loading iconStart={<span data-testid="icon-start">★</span>}>
        Saving...
      </Button>
    );
    const button = screen.getByRole('button');
    // iconStart should be replaced by loader
    expect(
      button.querySelector('[data-testid="icon-start"]')
    ).not.toBeInTheDocument();
    // loader icon should be present
    expect(button.querySelector('.dsn-button__loader')).toBeInTheDocument();
  });

  it('shows loader icon when loading without iconStart', () => {
    render(<Button loading>Loading...</Button>);
    const button = screen.getByRole('button');
    expect(button.querySelector('.dsn-button__loader')).toBeInTheDocument();
  });
});
