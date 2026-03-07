import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  // ===========================
  // Rendering
  // ===========================

  it('renders as a <table> element', () => {
    render(
      <Table caption="Productoverzicht">
        <tbody>
          <tr>
            <td>Inhoud</td>
          </tr>
        </tbody>
      </Table>
    );
    expect(document.querySelector('table')).toBeInTheDocument();
  });

  it('renders the caption text', () => {
    render(<Table caption="Productoverzicht" />);
    expect(screen.getByText('Productoverzicht')).toBeInTheDocument();
  });

  it('renders children (thead, tbody, tfoot)', () => {
    render(
      <Table caption="Test">
        <thead>
          <tr>
            <th scope="col">Naam</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laptop</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Totaal</td>
          </tr>
        </tfoot>
      </Table>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Totaal')).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<Table caption="Lege tabel" />);
    expect(screen.getByText('Lege tabel')).toBeInTheDocument();
    expect(document.querySelector('table')).toBeInTheDocument();
  });

  // ===========================
  // Classes
  // ===========================

  it('always has base dsn-table class', () => {
    render(<Table caption="Test" />);
    expect(document.querySelector('table')).toHaveClass('dsn-table');
  });

  it('applies custom className to the table element', () => {
    render(<Table caption="Test" className="custom-table" />);
    const table = document.querySelector('table');
    expect(table).toHaveClass('dsn-table');
    expect(table).toHaveClass('custom-table');
  });

  it('applies dsn-table__caption class to the caption element', () => {
    render(<Table caption="Test" />);
    expect(document.querySelector('caption')).toHaveClass('dsn-table__caption');
  });

  // ===========================
  // Caption ID
  // ===========================

  it('auto-generates an id on the caption element', () => {
    render(<Table caption="Test" />);
    const caption = document.querySelector('caption');
    expect(caption?.id).toBeTruthy();
  });

  it('uses a custom captionId when provided', () => {
    render(<Table caption="Test" captionId="mijn-tabel-caption" />);
    const caption = document.querySelector('caption');
    expect(caption).toHaveAttribute('id', 'mijn-tabel-caption');
  });

  // ===========================
  // scrollable=false (standaard)
  // ===========================

  it('renders without scroll-wrapper by default', () => {
    render(<Table caption="Test" />);
    expect(
      document.querySelector('.dsn-table-wrapper')
    ).not.toBeInTheDocument();
  });

  it('renders table directly (not nested in wrapper) when scrollable=false', () => {
    const { container } = render(<Table caption="Test" />);
    expect(container.firstChild?.nodeName).toBe('TABLE');
  });

  // ===========================
  // scrollable=true
  // ===========================

  it('renders scroll-wrapper when scrollable=true', () => {
    render(<Table caption="Test" scrollable />);
    expect(document.querySelector('.dsn-table-wrapper')).toBeInTheDocument();
  });

  it('wrapper has role="region"', () => {
    render(<Table caption="Test" scrollable />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('wrapper has tabIndex=0', () => {
    render(<Table caption="Test" scrollable />);
    const wrapper = document.querySelector('.dsn-table-wrapper');
    expect(wrapper).toHaveAttribute('tabindex', '0');
  });

  it('wrapper aria-labelledby matches the caption id', () => {
    render(<Table caption="Test" captionId="tabel-id" scrollable />);
    const wrapper = document.querySelector('.dsn-table-wrapper');
    expect(wrapper).toHaveAttribute('aria-labelledby', 'tabel-id');
  });

  it('auto-generated caption id matches wrapper aria-labelledby', () => {
    render(<Table caption="Test" scrollable />);
    const caption = document.querySelector('caption');
    const wrapper = document.querySelector('.dsn-table-wrapper');
    const captionId = caption?.id;
    expect(captionId).toBeTruthy();
    expect(wrapper).toHaveAttribute('aria-labelledby', captionId);
  });

  it('table element is nested inside wrapper when scrollable=true', () => {
    render(<Table caption="Test" scrollable />);
    const wrapper = document.querySelector('.dsn-table-wrapper');
    expect(wrapper?.querySelector('table')).toBeInTheDocument();
  });

  // ===========================
  // Ref + HTML attributes
  // ===========================

  it('forwards ref to the <table> element', () => {
    const ref = { current: null as HTMLTableElement | null };
    render(<Table ref={ref} caption="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('forwards ref to the <table> element when scrollable=true', () => {
    const ref = { current: null as HTMLTableElement | null };
    render(<Table ref={ref} caption="Test" scrollable />);
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('spreads additional HTML attributes onto the table element', () => {
    render(<Table caption="Test" data-testid="mijn-tabel" id="tabel-1" />);
    const el = screen.getByTestId('mijn-tabel');
    expect(el).toHaveAttribute('id', 'tabel-1');
    expect(el.tagName).toBe('TABLE');
  });

  // ===========================
  // Realistisch gebruik
  // ===========================

  it('renders a product table with row headers and footer', () => {
    render(
      <Table caption="Productoverzicht" scrollable>
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Prijs</th>
            <th scope="col">Voorraad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Laptop</th>
            <td>€999</td>
            <td>12</td>
          </tr>
          <tr>
            <th scope="row">Muis</th>
            <td>€29</td>
            <td>84</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Totaal</th>
            <td>—</td>
            <td>96</td>
          </tr>
        </tfoot>
      </Table>
    );

    expect(screen.getByText('Productoverzicht')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Muis')).toBeInTheDocument();
    expect(screen.getByText('Totaal')).toBeInTheDocument();
    expect(screen.getByRole('region')).toBeInTheDocument();
  });
});
