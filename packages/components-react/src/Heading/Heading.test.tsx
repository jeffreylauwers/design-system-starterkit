import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading>Hello world</Heading>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('defaults to h2 element', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByText('Title').tagName).toBe('H2');
  });

  it('renders correct heading level', () => {
    render(<Heading level={1}>H1</Heading>);
    expect(screen.getByText('H1').tagName).toBe('H1');
  });

  it('renders h3 when level is 3', () => {
    render(<Heading level={3}>H3</Heading>);
    expect(screen.getByText('H3').tagName).toBe('H3');
  });

  it('renders h4 when level is 4', () => {
    render(<Heading level={4}>H4</Heading>);
    expect(screen.getByText('H4').tagName).toBe('H4');
  });

  it('renders h5 when level is 5', () => {
    render(<Heading level={5}>H5</Heading>);
    expect(screen.getByText('H5').tagName).toBe('H5');
  });

  it('renders h6 when level is 6', () => {
    render(<Heading level={6}>H6</Heading>);
    expect(screen.getByText('H6').tagName).toBe('H6');
  });

  it('defaults appearance to match level', () => {
    render(<Heading level={3}>Match</Heading>);
    expect(screen.getByText('Match')).toHaveClass('dsn-heading--heading-3');
  });

  it('allows appearance independent of level', () => {
    render(
      <Heading level={2} appearance="heading-4">
        Mixed
      </Heading>
    );
    const el = screen.getByText('Mixed');
    expect(el.tagName).toBe('H2');
    expect(el).toHaveClass('dsn-heading--heading-4');
  });

  it('always has base dsn-heading class', () => {
    render(<Heading>Base</Heading>);
    expect(screen.getByText('Base')).toHaveClass('dsn-heading');
  });

  it('applies custom className', () => {
    render(<Heading className="custom">Custom</Heading>);
    const el = screen.getByText('Custom');
    expect(el).toHaveClass('dsn-heading');
    expect(el).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLHeadingElement | null };
    render(<Heading ref={ref}>Ref</Heading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Heading id="main-title" data-testid="heading">
        Content
      </Heading>
    );
    const el = screen.getByTestId('heading');
    expect(el).toHaveAttribute('id', 'main-title');
  });
});
