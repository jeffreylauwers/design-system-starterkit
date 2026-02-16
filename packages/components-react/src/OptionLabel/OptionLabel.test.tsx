import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OptionLabel } from './OptionLabel';

describe('OptionLabel', () => {
  it('renders as a span element', () => {
    render(<OptionLabel data-testid="label">Test Label</OptionLabel>);
    const label = screen.getByTestId('label');
    expect(label.tagName).toBe('SPAN');
  });

  it('displays the label text', () => {
    render(<OptionLabel>Accept terms</OptionLabel>);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('always has base dsn-option-label class', () => {
    render(<OptionLabel data-testid="label">Test</OptionLabel>);
    expect(screen.getByTestId('label')).toHaveClass('dsn-option-label');
  });

  it('applies custom className', () => {
    render(
      <OptionLabel className="custom" data-testid="label">
        Test
      </OptionLabel>
    );
    const el = screen.getByTestId('label');
    expect(el).toHaveClass('dsn-option-label');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<OptionLabel ref={ref}>Test</OptionLabel>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <OptionLabel id="my-label" data-custom="value" data-testid="label">
        Test
      </OptionLabel>
    );
    const el = screen.getByTestId('label');
    expect(el).toHaveAttribute('id', 'my-label');
    expect(el).toHaveAttribute('data-custom', 'value');
  });

  describe('disabled state', () => {
    it('adds disabled class when disabled prop is true', () => {
      render(
        <OptionLabel disabled data-testid="label">
          Test
        </OptionLabel>
      );
      expect(screen.getByTestId('label')).toHaveClass(
        'dsn-option-label--disabled'
      );
    });

    it('does not add disabled class by default', () => {
      render(<OptionLabel data-testid="label">Test</OptionLabel>);
      expect(screen.getByTestId('label')).not.toHaveClass(
        'dsn-option-label--disabled'
      );
    });
  });
});
