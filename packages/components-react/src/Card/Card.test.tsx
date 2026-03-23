import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardHeading,
  CardFooter,
  CardGroup,
} from './Card';

// =============================================================================
// Card
// =============================================================================

describe('Card', () => {
  it('renders an <article> element as root', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe('ARTICLE');
  });

  it('always has base dsn-card class', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('dsn-card');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom">Content</Card>);
    expect(container.firstChild).toHaveClass('dsn-card');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the article element', () => {
    const ref = { current: null as HTMLElement | null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ARTICLE');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Card id="card-1" data-testid="my-card">
        Content
      </Card>
    );
    const el = screen.getByTestId('my-card');
    expect(el).toHaveAttribute('id', 'card-1');
  });

  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});

// =============================================================================
// CardHeader
// =============================================================================

describe('CardHeader', () => {
  it('renders a <div> element as root', () => {
    const { container } = render(<CardHeader />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-card__header class', () => {
    const { container } = render(<CardHeader />);
    expect(container.firstChild).toHaveClass('dsn-card__header');
  });

  it('renders placeholder when no children provided', () => {
    const { container } = render(<CardHeader />);
    expect(
      container.querySelector('.dsn-card__image-placeholder')
    ).toBeInTheDocument();
  });

  it('placeholder has aria-hidden="true"', () => {
    const { container } = render(<CardHeader />);
    const placeholder = container.querySelector('.dsn-card__image-placeholder');
    expect(placeholder).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render placeholder when children provided', () => {
    const { container } = render(
      <CardHeader>
        <img src="/foto.jpg" alt="Foto" />
      </CardHeader>
    );
    expect(
      container.querySelector('.dsn-card__image-placeholder')
    ).not.toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <CardHeader>
        <img src="/foto.jpg" alt="Afbeelding" />
      </CardHeader>
    );
    expect(screen.getByAltText('Afbeelding')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<CardHeader className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-card__header');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardHeader ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// CardBody
// =============================================================================

describe('CardBody', () => {
  it('renders a <div> element as root', () => {
    const { container } = render(<CardBody>Content</CardBody>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-card__body class', () => {
    const { container } = render(<CardBody>Content</CardBody>);
    expect(container.firstChild).toHaveClass('dsn-card__body');
  });

  it('renders children', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardBody className="custom">Content</CardBody>
    );
    expect(container.firstChild).toHaveClass('dsn-card__body');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardBody ref={ref}>Content</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// CardHeading
// =============================================================================

describe('CardHeading', () => {
  it('renders an <h2> element by default', () => {
    const { container } = render(<CardHeading>Titel</CardHeading>);
    expect(container.firstChild?.nodeName).toBe('H2');
  });

  it('renders <h3> when level={3}', () => {
    const { container } = render(<CardHeading level={3}>Titel</CardHeading>);
    expect(container.firstChild?.nodeName).toBe('H3');
  });

  it('renders <h4> when level={4}', () => {
    const { container } = render(<CardHeading level={4}>Titel</CardHeading>);
    expect(container.firstChild?.nodeName).toBe('H4');
  });

  it('always has base dsn-card-heading class', () => {
    const { container } = render(<CardHeading>Titel</CardHeading>);
    expect(container.firstChild).toHaveClass('dsn-card-heading');
  });

  it('renders children as plain text without link when no href in context', () => {
    const { container } = render(<CardHeading>Titel</CardHeading>);
    expect(container.querySelector('a')).not.toBeInTheDocument();
    expect(screen.getByText('Titel')).toBeInTheDocument();
  });

  it('renders a link when Card provides href via context', () => {
    render(
      <Card href="/artikel/slug">
        <CardHeading>Artikel titel</CardHeading>
      </Card>
    );
    const link = screen.getByRole('link', { name: 'Artikel titel' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/artikel/slug');
    expect(link).toHaveClass('dsn-card-heading__link');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardHeading className="custom">Titel</CardHeading>
    );
    expect(container.firstChild).toHaveClass('dsn-card-heading');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the heading element', () => {
    const ref = { current: null as HTMLHeadingElement | null };
    render(<CardHeading ref={ref}>Titel</CardHeading>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

// =============================================================================
// CardFooter
// =============================================================================

describe('CardFooter', () => {
  it('renders a <div> element as root', () => {
    const { container } = render(<CardFooter>Content</CardFooter>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-card__footer class', () => {
    const { container } = render(<CardFooter>Content</CardFooter>);
    expect(container.firstChild).toHaveClass('dsn-card__footer');
  });

  it('renders children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardFooter className="custom">Content</CardFooter>
    );
    expect(container.firstChild).toHaveClass('dsn-card__footer');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardFooter ref={ref}>Content</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

// =============================================================================
// CardGroup
// =============================================================================

describe('CardGroup', () => {
  it('renders a <ul> element by default', () => {
    const { container } = render(
      <CardGroup>
        <li>Item</li>
      </CardGroup>
    );
    expect(container.firstChild?.nodeName).toBe('UL');
  });

  it('renders a <div> when as="div"', () => {
    const { container } = render(
      <CardGroup as="div">
        <div>Item</div>
      </CardGroup>
    );
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('always has base dsn-card-group class', () => {
    const { container } = render(
      <CardGroup>
        <li>Item</li>
      </CardGroup>
    );
    expect(container.firstChild).toHaveClass('dsn-card-group');
  });

  it('adds role="list" when rendered as ul', () => {
    const { container } = render(
      <CardGroup>
        <li>Item</li>
      </CardGroup>
    );
    expect(container.firstChild).toHaveAttribute('role', 'list');
  });

  it('does not add role="list" when rendered as div', () => {
    const { container } = render(
      <CardGroup as="div">
        <div>Item</div>
      </CardGroup>
    );
    expect(container.firstChild).not.toHaveAttribute('role', 'list');
  });

  it('renders children', () => {
    render(
      <CardGroup>
        <li>Card 1</li>
        <li>Card 2</li>
      </CardGroup>
    );
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CardGroup className="custom">
        <li>Item</li>
      </CardGroup>
    );
    expect(container.firstChild).toHaveClass('dsn-card-group');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('forwards ref to the root element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <CardGroup ref={ref}>
        <li>Item</li>
      </CardGroup>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('UL');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <CardGroup data-testid="my-group">
        <li>Item</li>
      </CardGroup>
    );
    const el = screen.getByTestId('my-group');
    expect(el).toBeInTheDocument();
  });
});

// =============================================================================
// Integratie — volledige Card met alle sub-componenten
// =============================================================================

describe('Card — integratie', () => {
  it('rendert een volledige card met header, body en footer', () => {
    render(
      <Card href="/artikel/slug">
        <CardHeader />
        <CardBody>
          <CardHeading level={2}>Artikeltitel</CardHeading>
          <p>Korte beschrijving.</p>
        </CardBody>
        <CardFooter>
          <a href="/artikel/slug" aria-hidden tabIndex={-1}>
            Lees meer
          </a>
        </CardFooter>
      </Card>
    );

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Artikeltitel' })).toHaveAttribute(
      'href',
      '/artikel/slug'
    );
    expect(screen.getByText('Korte beschrijving.')).toBeInTheDocument();
  });

  it('cards in CardGroup: meerdere cards worden gerenderd', () => {
    render(
      <CardGroup>
        <li>
          <Card href="/1">
            <CardBody>
              <CardHeading>Kaart 1</CardHeading>
            </CardBody>
          </Card>
        </li>
        <li>
          <Card href="/2">
            <CardBody>
              <CardHeading>Kaart 2</CardHeading>
            </CardBody>
          </Card>
        </li>
      </CardGroup>
    );

    expect(screen.getByRole('link', { name: 'Kaart 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Kaart 2' })).toBeInTheDocument();
  });
});
