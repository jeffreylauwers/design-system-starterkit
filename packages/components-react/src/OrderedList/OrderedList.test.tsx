import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderedList } from './OrderedList';

describe('OrderedList', () => {
  it('renders children', () => {
    render(
      <OrderedList>
        <li>Step one</li>
      </OrderedList>
    );
    expect(screen.getByText('Step one')).toBeInTheDocument();
  });

  it('renders as an ol element', () => {
    render(
      <OrderedList data-testid="list">
        <li>Step</li>
      </OrderedList>
    );
    expect(screen.getByTestId('list').tagName).toBe('OL');
  });

  it('applies base dsn-ordered-list class', () => {
    render(
      <OrderedList data-testid="list">
        <li>Step</li>
      </OrderedList>
    );
    expect(screen.getByTestId('list')).toHaveClass('dsn-ordered-list');
  });

  it('applies custom className', () => {
    render(
      <OrderedList data-testid="list" className="custom">
        <li>Step</li>
      </OrderedList>
    );
    expect(screen.getByTestId('list')).toHaveClass('dsn-ordered-list', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLOListElement | null };
    render(
      <OrderedList ref={ref}>
        <li>Step</li>
      </OrderedList>
    );
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });

  it('passes start attribute', () => {
    render(
      <OrderedList data-testid="list" start={5}>
        <li>Step five</li>
      </OrderedList>
    );
    expect(screen.getByTestId('list')).toHaveAttribute('start', '5');
  });

  it('spreads additional props', () => {
    render(
      <OrderedList data-testid="list" aria-label="Steps">
        <li>Step</li>
      </OrderedList>
    );
    expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Steps');
  });

  it('renders multiple list items', () => {
    render(
      <OrderedList>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </OrderedList>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
