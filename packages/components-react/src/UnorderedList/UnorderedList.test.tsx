import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UnorderedList } from './UnorderedList';

describe('UnorderedList', () => {
  it('renders children', () => {
    render(
      <UnorderedList>
        <li>Item one</li>
      </UnorderedList>
    );
    expect(screen.getByText('Item one')).toBeInTheDocument();
  });

  it('renders as a ul element', () => {
    render(
      <UnorderedList data-testid="list">
        <li>Item</li>
      </UnorderedList>
    );
    expect(screen.getByTestId('list').tagName).toBe('UL');
  });

  it('applies base dsn-unordered-list class', () => {
    render(
      <UnorderedList data-testid="list">
        <li>Item</li>
      </UnorderedList>
    );
    expect(screen.getByTestId('list')).toHaveClass('dsn-unordered-list');
  });

  it('applies custom className', () => {
    render(
      <UnorderedList data-testid="list" className="custom">
        <li>Item</li>
      </UnorderedList>
    );
    expect(screen.getByTestId('list')).toHaveClass('dsn-unordered-list', 'custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLUListElement | null };
    render(
      <UnorderedList ref={ref}>
        <li>Item</li>
      </UnorderedList>
    );
    expect(ref.current).toBeInstanceOf(HTMLUListElement);
  });

  it('spreads additional props', () => {
    render(
      <UnorderedList data-testid="list" aria-label="Navigation items">
        <li>Item</li>
      </UnorderedList>
    );
    expect(screen.getByTestId('list')).toHaveAttribute('aria-label', 'Navigation items');
  });

  it('renders multiple list items', () => {
    render(
      <UnorderedList>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
      </UnorderedList>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
