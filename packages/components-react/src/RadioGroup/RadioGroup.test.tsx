import React from 'react';
import { render, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';
import { RadioOption } from '../RadioOption';

describe('RadioGroup', () => {
  it('renders a div element', () => {
    const { container } = render(
      <RadioGroup>
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(container.querySelector('div.dsn-radio-group')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <RadioGroup>
        <RadioOption name="test" label="Option 1" value="1" />
        <RadioOption name="test" label="Option 2" value="2" />
      </RadioGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup className="custom-class">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <RadioGroup ref={ref}>
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through div attributes', () => {
    const { container } = render(
      <RadioGroup aria-describedby="description" data-testid="radio-group">
        <RadioOption name="test" label="Option 1" value="1" />
      </RadioGroup>
    );
    const div = container.querySelector('.dsn-radio-group');
    expect(div).toHaveAttribute('aria-describedby', 'description');
    expect(div).toHaveAttribute('data-testid', 'radio-group');
  });
});
