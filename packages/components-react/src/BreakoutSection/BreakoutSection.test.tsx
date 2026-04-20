import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { BreakoutSection } from './BreakoutSection';

describe('BreakoutSection', () => {
  it('renders children', () => {
    const { getByText } = render(<BreakoutSection>Inhoud</BreakoutSection>);
    expect(getByText('Inhoud')).toBeInTheDocument();
  });

  it('renders as a <section> element by default', () => {
    const { container } = render(<BreakoutSection />);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('always has dsn-breakout-section class', () => {
    const { container } = render(<BreakoutSection />);
    expect(container.firstChild).toHaveClass('dsn-breakout-section');
  });

  it.each(['div', 'article', 'aside'] as const)(
    'renders as <%s> when as="%s"',
    (as) => {
      const { container } = render(<BreakoutSection as={as} />);
      expect(container.firstChild?.nodeName).toBe(as.toUpperCase());
    }
  );

  it('applies custom className', () => {
    const { container } = render(<BreakoutSection className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-breakout-section');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the element', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<BreakoutSection ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });

  it('passes additional HTML attributes', () => {
    const { container } = render(
      <BreakoutSection data-testid="breakout" aria-label="Uitgeslagen sectie" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'breakout');
    expect(container.firstChild).toHaveAttribute(
      'aria-label',
      'Uitgeslagen sectie'
    );
  });
});
