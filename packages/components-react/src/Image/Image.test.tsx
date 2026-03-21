import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  // ===========================
  // Rendering
  // ===========================

  it('renders a <figure> element as root', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.firstChild?.nodeName).toBe('FIGURE');
  });

  it('renders an <img> element inside figure', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.querySelector('img')).toBeInTheDocument();
  });

  it('renders with correct src, alt, width and height', () => {
    render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    const img = screen.getByRole('img', { name: 'Beschrijving' });
    expect(img).toHaveAttribute('src', '/foto.jpg');
    expect(img).toHaveAttribute('alt', 'Beschrijving');
    expect(img).toHaveAttribute('width', '800');
    expect(img).toHaveAttribute('height', '600');
  });

  it('renders caption when provided', () => {
    render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        caption="Bijschrift bij de afbeelding"
      />
    );
    expect(
      screen.getByText('Bijschrift bij de afbeelding')
    ).toBeInTheDocument();
  });

  it('renders caption inside <figcaption>', () => {
    const { container } = render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        caption="Bijschrift"
      />
    );
    const figcaption = container.querySelector('figcaption');
    expect(figcaption).toBeInTheDocument();
    expect(figcaption).toHaveClass('dsn-image__caption');
    expect(figcaption?.textContent).toBe('Bijschrift');
  });

  it('does not render figcaption when caption is not provided', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
  });

  // ===========================
  // Classes
  // ===========================

  it('always has base dsn-image class on figure', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.firstChild).toHaveClass('dsn-image');
  });

  it('always has dsn-image__img class on img', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.querySelector('img')).toHaveClass('dsn-image__img');
  });

  it('applies custom className to figure', () => {
    const { container } = render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        className="custom-image"
      />
    );
    expect(container.firstChild).toHaveClass('dsn-image');
    expect(container.firstChild).toHaveClass('custom-image');
  });

  it('applies dsn-image--ratio-16-9 class for ratio="16:9"', () => {
    const { container } = render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={1600}
        height={900}
        ratio="16:9"
      />
    );
    expect(container.firstChild).toHaveClass('dsn-image--ratio-16-9');
  });

  it('applies dsn-image--ratio-4-3 class for ratio="4:3"', () => {
    const { container } = render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        ratio="4:3"
      />
    );
    expect(container.firstChild).toHaveClass('dsn-image--ratio-4-3');
  });

  it('applies dsn-image--ratio-1-1 class for ratio="1:1"', () => {
    const { container } = render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={400}
        height={400}
        ratio="1:1"
      />
    );
    expect(container.firstChild).toHaveClass('dsn-image--ratio-1-1');
  });

  it('does not apply a ratio class when ratio is not provided', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.firstChild).not.toHaveClass('dsn-image--ratio-16-9');
    expect(container.firstChild).not.toHaveClass('dsn-image--ratio-4-3');
    expect(container.firstChild).not.toHaveClass('dsn-image--ratio-1-1');
  });

  it('applies dsn-image--object-fit-contain class for objectFit="contain"', () => {
    const { container } = render(
      <Image
        src="/logo.png"
        alt="Logo"
        width={400}
        height={300}
        ratio="4:3"
        objectFit="contain"
      />
    );
    expect(container.firstChild).toHaveClass('dsn-image--object-fit-contain');
  });

  it('does not apply object-fit-contain class for default objectFit', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.firstChild).not.toHaveClass(
      'dsn-image--object-fit-contain'
    );
  });

  // ===========================
  // Loading attributes
  // ===========================

  it('applies loading="lazy" and decoding="async" by default', () => {
    render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('applies loading="eager" and fetchpriority="high" when priority is true', () => {
    render(
      <Image src="/hero.jpg" alt="Hero" width={1600} height={900} priority />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('decoding', 'async');
  });

  it('does not apply fetchpriority when priority is false', () => {
    render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    const img = screen.getByRole('img');
    expect(img).not.toHaveAttribute('fetchpriority');
  });

  // ===========================
  // srcSet and sizes pass-through
  // ===========================

  it('passes srcSet to img element', () => {
    render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        srcSet="/foto-400.jpg 400w, /foto-800.jpg 800w"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'srcset',
      '/foto-400.jpg 400w, /foto-800.jpg 800w'
    );
  });

  it('passes sizes to img element', () => {
    render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
  });

  // ===========================
  // Accessibility — decoratieve afbeeldingen
  // ===========================

  it('adds aria-hidden="true" to figure when alt is empty string', () => {
    const { container } = render(
      <Image src="/decoratief.jpg" alt="" width={800} height={600} />
    );
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not add aria-hidden when alt has text content', () => {
    const { container } = render(
      <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
    );
    expect(container.firstChild).not.toHaveAttribute('aria-hidden');
  });

  it('decorative image keeps alt="" on img element', () => {
    render(<Image src="/decoratief.jpg" alt="" width={800} height={600} />);
    const img = screen.getByRole('presentation', { hidden: true });
    expect(img).toHaveAttribute('alt', '');
  });

  // ===========================
  // Ref + HTML attributes
  // ===========================

  it('forwards ref to the figure element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <Image
        ref={ref}
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FIGURE');
  });

  it('spreads additional HTML attributes to figure', () => {
    render(
      <Image
        src="/foto.jpg"
        alt="Beschrijving"
        width={800}
        height={600}
        id="image-1"
        data-testid="my-image"
      />
    );
    const el = screen.getByTestId('my-image');
    expect(el).toHaveAttribute('id', 'image-1');
  });
});
