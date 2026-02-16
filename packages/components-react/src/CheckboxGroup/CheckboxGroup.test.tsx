import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxOption } from '../CheckboxOption';

describe('CheckboxGroup', () => {
  it('renders a fieldset element', () => {
    const { container } = render(
      <CheckboxGroup legend="Test Group">
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('renders the legend', () => {
    render(
      <CheckboxGroup legend="My Group">
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(screen.getByText('My Group')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <CheckboxGroup legend="Test Group">
        <CheckboxOption label="Option 1" value="1" />
        <CheckboxOption label="Option 2" value="2" />
      </CheckboxGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CheckboxGroup legend="Test Group" className="custom-class">
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('hides legend visually when hideLegend is true', () => {
    render(
      <CheckboxGroup legend="Hidden Legend" hideLegend>
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    const legend = screen.getByText('Hidden Legend');
    expect(legend).toHaveClass('dsn-visually-hidden');
  });

  it('shows legend when hideLegend is false', () => {
    render(
      <CheckboxGroup legend="Visible Legend" hideLegend={false}>
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    const legend = screen.getByText('Visible Legend');
    expect(legend).not.toHaveClass('dsn-visually-hidden');
  });

  it('forwards ref to fieldset element', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    render(
      <CheckboxGroup legend="Test Group" ref={ref}>
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('passes through fieldset attributes', () => {
    const { container } = render(
      <CheckboxGroup
        legend="Test Group"
        disabled
        aria-describedby="description"
      >
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('disabled');
    expect(fieldset).toHaveAttribute('aria-describedby', 'description');
  });
});
