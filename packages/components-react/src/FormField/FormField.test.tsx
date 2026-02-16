import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { TextInput } from '../TextInput';
import { CheckboxOption } from '../CheckboxOption';

describe('FormField', () => {
  describe('Regular field (div/label)', () => {
    it('renders as div by default', () => {
      const { container } = render(
        <FormField label="Test Label" htmlFor="test">
          <TextInput id="test" />
        </FormField>
      );
      expect(container.querySelector('div.dsn-form-field')).toBeInTheDocument();
      expect(container.querySelector('fieldset')).not.toBeInTheDocument();
    });

    it('renders label with htmlFor', () => {
      render(
        <FormField label="Email" htmlFor="email">
          <TextInput id="email" />
        </FormField>
      );
      const label = screen.getByText('Email');
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', 'email');
    });

    it('renders label with suffix', () => {
      render(
        <FormField label="Optional Field" htmlFor="test" labelSuffix="(niet verplicht)">
          <TextInput id="test" />
        </FormField>
      );
      expect(screen.getByText('Optional Field')).toBeInTheDocument();
      expect(screen.getByText('(niet verplicht)')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <FormField label="Test" htmlFor="test" description="This is a description">
          <TextInput id="test" />
        </FormField>
      );
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(
        <FormField label="Test" htmlFor="test" error="This field is required">
          <TextInput id="test" />
        </FormField>
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders status message', () => {
      render(
        <FormField label="Test" htmlFor="test" status="280 characters remaining">
          <TextInput id="test" />
        </FormField>
      );
      expect(screen.getByText('280 characters remaining')).toBeInTheDocument();
    });

    it('sets aria-describedby with description', () => {
      const { container } = render(
        <FormField label="Test" htmlFor="test" description="Help text">
          <TextInput id="test" />
        </FormField>
      );
      const field = container.querySelector('.dsn-form-field');
      expect(field).not.toHaveAttribute('aria-describedby');
      const descriptionEl = screen.getByText('Help text');
      expect(descriptionEl).toHaveAttribute('id', 'test-description');
    });

    it('hides label when hideLabel is true', () => {
      render(
        <FormField label="Hidden Label" htmlFor="test" hideLabel>
          <TextInput id="test" />
        </FormField>
      );
      const label = screen.getByText('Hidden Label');
      expect(label).toHaveClass('dsn-visually-hidden');
    });

    it('renders children', () => {
      render(
        <FormField label="Test" htmlFor="test">
          <TextInput id="test" placeholder="Enter text" />
        </FormField>
      );
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });
  });

  describe('Group field (fieldset/legend)', () => {
    it('renders as fieldset when isGroup is true', () => {
      const { container } = render(
        <FormField label="Test Group" isGroup>
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      expect(container.querySelector('fieldset.dsn-form-field')).toBeInTheDocument();
      expect(container.querySelector('div.dsn-form-field')).not.toBeInTheDocument();
    });

    it('renders legend instead of label', () => {
      render(
        <FormField label="Group Label" isGroup>
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      const legend = screen.getByText('Group Label');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('renders legend with suffix', () => {
      render(
        <FormField label="Interests" isGroup labelSuffix="(optional)">
          <div>
            <CheckboxOption label="Sport" value="sport" />
          </div>
        </FormField>
      );
      expect(screen.getByText('Interests')).toBeInTheDocument();
      expect(screen.getByText('(optional)')).toBeInTheDocument();
    });

    it('renders description in fieldset', () => {
      render(
        <FormField label="Test Group" isGroup description="Choose your options">
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      expect(screen.getByText('Choose your options')).toBeInTheDocument();
    });

    it('renders error in fieldset', () => {
      render(
        <FormField label="Test Group" isGroup error="Select at least one option">
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      expect(screen.getByText('Select at least one option')).toBeInTheDocument();
    });

    it('hides legend when hideLabel is true', () => {
      render(
        <FormField label="Hidden Legend" isGroup hideLabel>
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      const legend = screen.getByText('Hidden Legend');
      expect(legend).toHaveClass('dsn-visually-hidden');
    });

    it('sets aria-describedby on fieldset', () => {
      const { container } = render(
        <FormField label="Test Group" htmlFor="test-group" isGroup description="Help text">
          <div>
            <CheckboxOption label="Option 1" value="1" />
          </div>
        </FormField>
      );
      const fieldset = container.querySelector('fieldset');
      expect(fieldset).toHaveAttribute('aria-describedby', 'test-group-description');
    });
  });

  describe('Custom className', () => {
    it('applies custom className to div', () => {
      const { container } = render(
        <FormField label="Test" htmlFor="test" className="custom-class">
          <TextInput id="test" />
        </FormField>
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('applies custom className to fieldset', () => {
      const { container } = render(
        <FormField label="Test" isGroup className="custom-class">
          <div>Test</div>
        </FormField>
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to div', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <FormField label="Test" htmlFor="test" ref={ref}>
          <TextInput id="test" />
        </FormField>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to fieldset', () => {
      const ref = React.createRef<HTMLFieldSetElement>();
      render(
        <FormField label="Test" isGroup ref={ref as any}>
          <div>Test</div>
        </FormField>
      );
      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
    });
  });
});
