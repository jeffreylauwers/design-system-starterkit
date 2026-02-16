import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormFieldErrorMessage } from './FormFieldErrorMessage';

describe('FormFieldErrorMessage', () => {
  it('renders children', () => {
    render(
      <FormFieldErrorMessage>Dit veld is verplicht.</FormFieldErrorMessage>
    );
    expect(screen.getByText('Dit veld is verplicht.')).toBeInTheDocument();
  });

  it('renders as a <p> element', () => {
    render(<FormFieldErrorMessage>Error text</FormFieldErrorMessage>);
    expect(screen.getByText('Error text').tagName).toBe('P');
  });

  it('always has base dsn-form-field-error-message class', () => {
    render(<FormFieldErrorMessage>Error</FormFieldErrorMessage>);
    expect(screen.getByText('Error')).toHaveClass(
      'dsn-form-field-error-message'
    );
  });

  it('applies custom className', () => {
    render(
      <FormFieldErrorMessage className="custom">Error</FormFieldErrorMessage>
    );
    const el = screen.getByText('Error');
    expect(el).toHaveClass('dsn-form-field-error-message');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLParagraphElement | null };
    render(<FormFieldErrorMessage ref={ref}>Error</FormFieldErrorMessage>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <FormFieldErrorMessage id="email-error" data-testid="error">
        Error message
      </FormFieldErrorMessage>
    );
    const el = screen.getByTestId('error');
    expect(el).toHaveAttribute('id', 'email-error');
  });

  describe('icon', () => {
    it('shows icon by default', () => {
      const { container } = render(
        <FormFieldErrorMessage>Error</FormFieldErrorMessage>
      );
      const icon = container.querySelector('.dsn-icon');
      expect(icon).toBeInTheDocument();
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(
        <FormFieldErrorMessage>Error</FormFieldErrorMessage>
      );
      const icon = container.querySelector('.dsn-icon');
      expect(icon).toHaveAttribute('aria-hidden');
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(
        <FormFieldErrorMessage showIcon={false}>Error</FormFieldErrorMessage>
      );
      const icon = container.querySelector('.dsn-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('shows icon when showIcon is true', () => {
      const { container } = render(
        <FormFieldErrorMessage showIcon={true}>Error</FormFieldErrorMessage>
      );
      const icon = container.querySelector('.dsn-icon');
      expect(icon).toBeInTheDocument();
    });

    it('renders both icon and error text', () => {
      const { container } = render(
        <FormFieldErrorMessage>Dit veld is verplicht</FormFieldErrorMessage>
      );
      expect(container.querySelector('.dsn-icon')).toBeInTheDocument();
      expect(screen.getByText('Dit veld is verplicht')).toBeInTheDocument();
    });
  });
});
