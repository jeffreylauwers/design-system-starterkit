import React from 'react';
import { render, screen } from '@testing-library/react';
import { CheckboxGroup } from './CheckboxGroup';
import { CheckboxOption } from '../CheckboxOption';

describe('CheckboxGroup', () => {
  it('renders a div element', () => {
    const { container } = render(
      <CheckboxGroup>
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(
      container.querySelector('div.dsn-checkbox-group')
    ).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <CheckboxGroup>
        <CheckboxOption label="Option 1" value="1" />
        <CheckboxOption label="Option 2" value="2" />
      </CheckboxGroup>
    );
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CheckboxGroup className="custom-class">
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('forwards ref to div element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <CheckboxGroup ref={ref}>
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes through div attributes', () => {
    const { container } = render(
      <CheckboxGroup
        aria-describedby="description"
        data-testid="checkbox-group"
      >
        <CheckboxOption label="Option 1" value="1" />
      </CheckboxGroup>
    );
    const div = container.querySelector('.dsn-checkbox-group');
    expect(div).toHaveAttribute('aria-describedby', 'description');
    expect(div).toHaveAttribute('data-testid', 'checkbox-group');
  });
});
