import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { TextInput } from '../TextInput';

describe('FormField', () => {
  it('renders as div', () => {
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
      <FormField
        label="Optional Field"
        htmlFor="test"
        labelSuffix="(niet verplicht)"
      >
        <TextInput id="test" />
      </FormField>
    );
    expect(screen.getByText('Optional Field')).toBeInTheDocument();
    expect(screen.getByText('(niet verplicht)')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <FormField
        label="Test"
        htmlFor="test"
        description="This is a description"
      >
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

  it('creates description id when htmlFor and description provided', () => {
    render(
      <FormField label="Test" htmlFor="test" description="Help text">
        <TextInput id="test" />
      </FormField>
    );
    const descriptionEl = screen.getByText('Help text');
    expect(descriptionEl).toHaveAttribute('id', 'test-description');
  });

  it('renders children', () => {
    render(
      <FormField label="Test" htmlFor="test">
        <TextInput id="test" placeholder="Enter text" />
      </FormField>
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField label="Test" htmlFor="test" className="custom-class">
        <TextInput id="test" />
      </FormField>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards ref to div', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FormField label="Test" htmlFor="test" ref={ref}>
        <TextInput id="test" />
      </FormField>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('adds invalid modifier class when error is present', () => {
    const { container } = render(
      <FormField label="Test" htmlFor="test" error="Error message">
        <TextInput id="test" />
      </FormField>
    );
    expect(
      container.querySelector('.dsn-form-field--invalid')
    ).toBeInTheDocument();
  });
});
