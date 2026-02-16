import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormFieldDescription } from './FormFieldDescription';

describe('FormFieldDescription', () => {
  it('renders children', () => {
    render(<FormFieldDescription>Vul uw officiële voornaam in.</FormFieldDescription>);
    expect(screen.getByText('Vul uw officiële voornaam in.')).toBeInTheDocument();
  });

  it('renders as a <p> element', () => {
    render(<FormFieldDescription>Description text</FormFieldDescription>);
    expect(screen.getByText('Description text').tagName).toBe('P');
  });

  it('always has base dsn-form-field-description class', () => {
    render(<FormFieldDescription>Description</FormFieldDescription>);
    expect(screen.getByText('Description')).toHaveClass('dsn-form-field-description');
  });

  it('applies custom className', () => {
    render(<FormFieldDescription className="custom">Description</FormFieldDescription>);
    const el = screen.getByText('Description');
    expect(el).toHaveClass('dsn-form-field-description');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLParagraphElement | null };
    render(<FormFieldDescription ref={ref}>Description</FormFieldDescription>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('spreads additional HTML attributes', () => {
    render(<FormFieldDescription id="email-desc" data-testid="description">Help text</FormFieldDescription>);
    const el = screen.getByTestId('description');
    expect(el).toHaveAttribute('id', 'email-desc');
  });

  it('renders multi-line content', () => {
    render(
      <FormFieldDescription>
        Dit is de eerste regel. Dit is de tweede regel.
      </FormFieldDescription>
    );
    expect(screen.getByText(/Dit is de eerste regel/)).toBeInTheDocument();
  });
});
