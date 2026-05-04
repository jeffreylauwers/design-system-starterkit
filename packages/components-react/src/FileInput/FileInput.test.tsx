import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileInput } from './FileInput';

describe('FileInput', () => {
  it('renders as an input element', () => {
    render(<FileInput data-testid="input" />);
    expect(screen.getByTestId('input').tagName).toBe('INPUT');
  });

  it('always has type="file"', () => {
    render(<FileInput data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'file');
  });

  it('always has base dsn-file-input class', () => {
    render(<FileInput data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('dsn-file-input');
  });

  it('applies custom className', () => {
    render(<FileInput className="custom" data-testid="input" />);
    const el = screen.getByTestId('input');
    expect(el).toHaveClass('dsn-file-input');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<FileInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<FileInput id="upload" accept=".pdf" data-testid="input" />);
    const el = screen.getByTestId('input');
    expect(el).toHaveAttribute('id', 'upload');
    expect(el).toHaveAttribute('accept', '.pdf');
  });

  it('can be disabled', () => {
    render(<FileInput disabled data-testid="input" />);
    expect(screen.getByTestId('input')).toBeDisabled();
  });

  it('can be required', () => {
    render(<FileInput required data-testid="input" />);
    expect(screen.getByTestId('input')).toBeRequired();
  });

  it('supports multiple file selection', () => {
    render(<FileInput multiple data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('multiple');
  });

  describe('invalid state', () => {
    it('sets aria-invalid when invalid prop is true', () => {
      render(<FileInput invalid data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });

    it('does not set aria-invalid when invalid prop is false', () => {
      render(<FileInput invalid={false} data-testid="input" />);
      expect(screen.getByTestId('input')).not.toHaveAttribute('aria-invalid');
    });

    it('does not set aria-invalid by default', () => {
      render(<FileInput data-testid="input" />);
      expect(screen.getByTestId('input')).not.toHaveAttribute('aria-invalid');
    });
  });

  describe('accessibility', () => {
    it('can have aria-describedby', () => {
      render(<FileInput aria-describedby="help-text" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute(
        'aria-describedby',
        'help-text'
      );
    });

    it('can have aria-labelledby', () => {
      render(<FileInput aria-labelledby="label-id" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute(
        'aria-labelledby',
        'label-id'
      );
    });
  });
});
