import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormFieldLabel } from './FormFieldLabel';

describe('FormFieldLabel', () => {
  it('renders children', () => {
    render(<FormFieldLabel>Voornaam</FormFieldLabel>);
    expect(screen.getByText('Voornaam')).toBeInTheDocument();
  });

  it('renders as a <label> element', () => {
    render(<FormFieldLabel>Label text</FormFieldLabel>);
    expect(screen.getByText('Label text').tagName).toBe('LABEL');
  });

  it('always has base dsn-form-field-label class', () => {
    render(<FormFieldLabel>Label</FormFieldLabel>);
    expect(screen.getByText('Label')).toHaveClass('dsn-form-field-label');
  });

  it('applies custom className', () => {
    render(<FormFieldLabel className="custom">Label</FormFieldLabel>);
    const el = screen.getByText('Label');
    expect(el).toHaveClass('dsn-form-field-label');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLLabelElement | null };
    render(<FormFieldLabel ref={ref}>Label</FormFieldLabel>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <FormFieldLabel htmlFor="firstname" data-testid="label">
        Voornaam
      </FormFieldLabel>
    );
    const el = screen.getByTestId('label');
    expect(el).toHaveAttribute('for', 'firstname');
  });

  describe('suffix', () => {
    it('renders suffix when provided', () => {
      render(
        <FormFieldLabel suffix="(niet verplicht)">Tussenvoegsel</FormFieldLabel>
      );
      expect(screen.getByText('(niet verplicht)')).toBeInTheDocument();
    });

    it('suffix has correct class', () => {
      render(<FormFieldLabel suffix="(niet verplicht)">Label</FormFieldLabel>);
      expect(screen.getByText('(niet verplicht)')).toHaveClass(
        'dsn-form-field-label-suffix'
      );
    });

    it('renders suffix as span inside label', () => {
      render(<FormFieldLabel suffix="(niet verplicht)">Label</FormFieldLabel>);
      const suffix = screen.getByText('(niet verplicht)');
      expect(suffix.tagName).toBe('SPAN');
      expect(suffix.parentElement?.tagName).toBe('LABEL');
    });

    it('does not render suffix when not provided', () => {
      render(<FormFieldLabel>Label without suffix</FormFieldLabel>);
      expect(screen.queryByText('(niet verplicht)')).not.toBeInTheDocument();
    });

    it('renders both label text and suffix', () => {
      render(<FormFieldLabel suffix="(verplicht)">E-mailadres</FormFieldLabel>);
      expect(screen.getByText('E-mailadres')).toBeInTheDocument();
      expect(screen.getByText('(verplicht)')).toBeInTheDocument();
    });
  });
});
