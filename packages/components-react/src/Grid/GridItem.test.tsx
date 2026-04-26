import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { GridItem } from './GridItem';

describe('GridItem', () => {
  it('renders children', () => {
    render(<GridItem>Inhoud</GridItem>);
    expect(screen.getByText('Inhoud')).toBeInTheDocument();
  });

  it('renders as a <div> element', () => {
    const { container } = render(<GridItem />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('has no class when no props are set', () => {
    const { container } = render(<GridItem />);
    expect(container.firstChild).not.toHaveAttribute('class');
  });

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
    'applies dsn-col-%i class for colSpan=%i',
    (colSpan) => {
      const { container } = render(<GridItem colSpan={colSpan} />);
      expect(container.firstChild).toHaveClass(`dsn-col-${colSpan}`);
    }
  );

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
    'applies dsn-col-sm-%i class for colSpanSm=%i',
    (colSpan) => {
      const { container } = render(<GridItem colSpanSm={colSpan} />);
      expect(container.firstChild).toHaveClass(`dsn-col-sm-${colSpan}`);
    }
  );

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
    'applies dsn-col-md-%i class for colSpanMd=%i',
    (colSpan) => {
      const { container } = render(<GridItem colSpanMd={colSpan} />);
      expect(container.firstChild).toHaveClass(`dsn-col-md-${colSpan}`);
    }
  );

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const)(
    'applies dsn-col-lg-%i class for colSpanLg=%i',
    (colSpan) => {
      const { container } = render(<GridItem colSpanLg={colSpan} />);
      expect(container.firstChild).toHaveClass(`dsn-col-lg-${colSpan}`);
    }
  );

  it('applies multiple responsive classes together', () => {
    const { container } = render(
      <GridItem colSpan={12} colSpanMd={6} colSpanLg={4} />
    );
    expect(container.firstChild).toHaveClass('dsn-col-12');
    expect(container.firstChild).toHaveClass('dsn-col-md-6');
    expect(container.firstChild).toHaveClass('dsn-col-lg-4');
  });

  it('applies dsn-full-bleed class when fullBleed is true', () => {
    const { container } = render(<GridItem fullBleed />);
    expect(container.firstChild).toHaveClass('dsn-full-bleed');
  });

  it('does not apply dsn-full-bleed class when fullBleed is false', () => {
    const { container } = render(<GridItem fullBleed={false} />);
    expect(container.firstChild).not.toHaveClass('dsn-full-bleed');
  });

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const)(
    'applies dsn-col-start-%i class for colStart=%i',
    (colStart) => {
      const { container } = render(<GridItem colStart={colStart} />);
      expect(container.firstChild).toHaveClass(`dsn-col-start-${colStart}`);
    }
  );

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const)(
    'applies dsn-col-end-%i class for colEnd=%i',
    (colEnd) => {
      const { container } = render(<GridItem colEnd={colEnd} />);
      expect(container.firstChild).toHaveClass(`dsn-col-end-${colEnd}`);
    }
  );

  it('applies responsive col-start classes', () => {
    const { container } = render(
      <GridItem colStartSm={2} colStartMd={3} colStartLg={4} />
    );
    expect(container.firstChild).toHaveClass('dsn-col-start-sm-2');
    expect(container.firstChild).toHaveClass('dsn-col-start-md-3');
    expect(container.firstChild).toHaveClass('dsn-col-start-lg-4');
  });

  it('applies responsive col-end classes', () => {
    const { container } = render(
      <GridItem colEndSm={10} colEndMd={11} colEndLg={13} />
    );
    expect(container.firstChild).toHaveClass('dsn-col-end-sm-10');
    expect(container.firstChild).toHaveClass('dsn-col-end-md-11');
    expect(container.firstChild).toHaveClass('dsn-col-end-lg-13');
  });

  it('combines colStart and colEnd with colSpan', () => {
    const { container } = render(
      <GridItem colSpan={8} colStart={3} colEnd={11} />
    );
    expect(container.firstChild).toHaveClass('dsn-col-8');
    expect(container.firstChild).toHaveClass('dsn-col-start-3');
    expect(container.firstChild).toHaveClass('dsn-col-end-11');
  });

  it('applies custom className alongside col class', () => {
    const { container } = render(<GridItem colSpan={6} className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-col-6');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the div element', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<GridItem ref={ref} />);
    expect(ref.current).toBe(container.firstChild);
  });

  it('passes additional HTML attributes', () => {
    const { container } = render(
      <GridItem colSpan={8} data-testid="grid-item" aria-label="main content" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'grid-item');
    expect(container.firstChild).toHaveAttribute('aria-label', 'main content');
  });
});
