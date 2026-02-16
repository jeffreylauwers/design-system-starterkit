import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import { RadioOption } from '../RadioOption';

describe('RadioGroup', () => {
  it('renders a fieldset element', () => {
    const { container } = render(
      <RadioGroup legend="Test Group">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });

  it('renders the legend', () => {
    render(
      <RadioGroup legend="My Group">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(screen.getByText('My Group')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <RadioGroup legend="Test Group">
        <RadioOption name="test" label="Option 1" value="1" />
        <RadioOption name="test" label="Option 2" value="2" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup legend="Test Group" className="custom-class">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('hides legend visually when hideLegend is true', () => {
    render(
      <RadioGroup legend="Hidden Legend" hideLegend>
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    const legend = screen.getByText('Hidden Legend');
    expect(legend).toHaveClass('dsn-visually-hidden');
  });

  it('shows legend when hideLegend is false', () => {
    render(
      <RadioGroup legend="Visible Legend" hideLegend={false}>
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    const legend = screen.getByText('Visible Legend');
    expect(legend).not.toHaveClass('dsn-visually-hidden');
  });

  it('forwards ref to fieldset element', () => {
    const ref = React.createRef<HTMLFieldSetElement>();
    render(
      <RadioGroup legend="Test Group" ref={ref}>
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
  });

  it('passes through fieldset attributes', () => {
    const { container } = render(
      <RadioGroup legend="Test Group" disabled aria-describedby="description">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    const fieldset = container.querySelector('fieldset');
    expect(fieldset).toHaveAttribute('disabled');
    expect(fieldset).toHaveAttribute('aria-describedby', 'description');
  });
});
