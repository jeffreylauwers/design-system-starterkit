import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders a <section> element as root', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('always has dsn-hero class', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).toHaveClass('dsn-hero');
  });

  it('renders dsn-hero__inner and dsn-hero__content wrappers', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('.dsn-hero__inner')).toBeInTheDocument();
    expect(container.querySelector('.dsn-hero__content')).toBeInTheDocument();
  });

  it('renders children inside dsn-hero__content', () => {
    const { getByText } = render(<Hero>Welkom</Hero>);
    expect(getByText('Welkom')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Hero className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-hero');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the section element', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<Hero ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });

  it('passes additional HTML attributes', () => {
    const { container } = render(
      <Hero data-testid="hero" aria-labelledby="hero-heading" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'hero');
    expect(container.firstChild).toHaveAttribute(
      'aria-labelledby',
      'hero-heading'
    );
  });

  // Variant tests
  it('has no variant modifier class by default', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).not.toHaveClass('dsn-hero--inverse');
    expect(container.firstChild).not.toHaveClass('dsn-hero--image');
    expect(container.firstChild).not.toHaveClass('dsn-hero--image-blend');
  });

  it('applies dsn-hero--inverse for variant="inverse"', () => {
    const { container } = render(<Hero variant="inverse" />);
    expect(container.firstChild).toHaveClass('dsn-hero--inverse');
  });

  it('applies dsn-hero--image for variant="image"', () => {
    const { container } = render(<Hero variant="image" />);
    expect(container.firstChild).toHaveClass('dsn-hero--image');
    expect(container.firstChild).not.toHaveClass('dsn-hero--image-blend');
  });

  it('applies dsn-hero--image and dsn-hero--image-blend for variant="image-blend"', () => {
    const { container } = render(<Hero variant="image-blend" />);
    expect(container.firstChild).toHaveClass('dsn-hero--image');
    expect(container.firstChild).toHaveClass('dsn-hero--image-blend');
  });

  it('sets --dsn-hero-bg-image inline style when backgroundImage is provided', () => {
    const { container } = render(
      <Hero variant="image" backgroundImage="https://example.com/photo.jpg" />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--dsn-hero-bg-image')).toBe(
      "url('https://example.com/photo.jpg')"
    );
  });

  it('does not set --dsn-hero-bg-image when backgroundImage is not provided', () => {
    const { container } = render(<Hero />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--dsn-hero-bg-image')).toBe('');
  });

  // Align tests
  it('has no align modifier class by default', () => {
    const { container } = render(<Hero />);
    expect(container.firstChild).not.toHaveClass('dsn-hero--align-center');
  });

  it('applies dsn-hero--align-center for align="center"', () => {
    const { container } = render(<Hero align="center" />);
    expect(container.firstChild).toHaveClass('dsn-hero--align-center');
  });

  it('merges backgroundImage style with provided style prop', () => {
    const { container } = render(
      <Hero
        variant="image"
        backgroundImage="https://example.com/photo.jpg"
        style={{ color: 'red' }}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--dsn-hero-bg-image')).toBe(
      "url('https://example.com/photo.jpg')"
    );
    expect(el.style.color).toBe('red');
  });
});
