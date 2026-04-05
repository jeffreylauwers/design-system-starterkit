import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageHeader } from './PageHeader';

const defaultLogo = (
  <a href="/">
    <span>Logo</span>
  </a>
);

describe('PageHeader', () => {
  // ---------------------------------------------------------------------------
  // Structuur
  // ---------------------------------------------------------------------------

  it('rendert een <header>-element', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    expect(container.querySelector('header')).toBeTruthy();
  });

  it('heeft de basis dsn-page-header klasse', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    expect(container.querySelector('header')).toHaveClass('dsn-page-header');
  });

  it('rendert de inner-wrapper met dsn-page-header__inner', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    expect(container.querySelector('.dsn-page-header__inner')).toBeTruthy();
  });

  it('rendert het logo in dsn-page-header__logo', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const logoSlot = container.querySelector('.dsn-page-header__logo');
    expect(logoSlot).toBeTruthy();
    expect(logoSlot?.querySelector('a')).toBeTruthy();
  });

  it('rendert een menuknop in dsn-page-header__start', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const start = container.querySelector('.dsn-page-header__start');
    expect(start?.querySelector('button')).toBeTruthy();
  });

  it('rendert een zoekknop in dsn-page-header__end', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const end = container.querySelector('.dsn-page-header__end');
    expect(end?.querySelector('button')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Zoekpaneel
  // ---------------------------------------------------------------------------

  it('zoekpaneel is standaard verborgen', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const panel = container.querySelector('.dsn-page-header__search-panel');
    expect(panel).toHaveAttribute('hidden');
  });

  it('zoekknop heeft aria-expanded="false" bij gesloten paneel', () => {
    render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    expect(searchButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('zoekpaneel opent bij klik op zoekknop', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    fireEvent.click(searchButton);
    const panel = container.querySelector('.dsn-page-header__search-panel');
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('zoekknop heeft aria-expanded="true" bij geopend paneel', () => {
    render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    fireEvent.click(searchButton);
    expect(searchButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('zoekknop toont "Sluiten" tekst bij geopend paneel', () => {
    render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    fireEvent.click(searchButton);
    expect(screen.getByRole('button', { name: /sluiten/i })).toBeTruthy();
  });

  it('zoekpaneel sluit bij klik op sluitknop', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    fireEvent.click(searchButton);
    const closeButton = screen.getByRole('button', { name: /sluiten/i });
    fireEvent.click(closeButton);
    const panel = container.querySelector('.dsn-page-header__search-panel');
    expect(panel).toHaveAttribute('hidden');
  });

  it('zoekpaneel heeft aria-controls dat verwijst naar het zoekpaneel-id', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const searchButton = screen.getByRole('button', { name: /zoeken/i });
    const panelId = searchButton.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(container.querySelector(`#${CSS.escape(panelId!)}`)).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Drawer
  // ---------------------------------------------------------------------------

  it('drawer is standaard gesloten', () => {
    const { container } = render(<PageHeader logoSlot={defaultLogo} />);
    const drawer = container.querySelector('.dsn-drawer');
    expect(drawer).toBeTruthy();
    expect(drawer).not.toHaveAttribute('open');
  });

  it('rendert primaire navigatie in de drawer', () => {
    render(
      <PageHeader
        logoSlot={defaultLogo}
        primaryNavigation={
          <ul>
            <li>Home</li>
          </ul>
        }
      />
    );
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('rendert service-navigatie in de drawer', () => {
    render(
      <PageHeader
        logoSlot={defaultLogo}
        secondaryNavigation={
          <ul>
            <li>Contact</li>
          </ul>
        }
      />
    );
    expect(screen.getByText('Contact')).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  // Sticky modifiers
  // ---------------------------------------------------------------------------

  it('heeft geen sticky modifier bij sticky="none"', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} sticky="none" />
    );
    const header = container.querySelector('header');
    expect(header).not.toHaveClass('dsn-page-header--sticky');
    expect(header).not.toHaveClass('dsn-page-header--auto-hide');
  });

  it('heeft dsn-page-header--sticky bij sticky="sticky"', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} sticky="sticky" />
    );
    expect(container.querySelector('header')).toHaveClass(
      'dsn-page-header--sticky'
    );
  });

  it('heeft dsn-page-header--auto-hide bij sticky="auto-hide"', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} sticky="auto-hide" />
    );
    expect(container.querySelector('header')).toHaveClass(
      'dsn-page-header--auto-hide'
    );
  });

  it('heeft data-hidden="false" bij sticky="auto-hide"', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} sticky="auto-hide" />
    );
    expect(container.querySelector('header')).toHaveAttribute(
      'data-hidden',
      'false'
    );
  });

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------

  it('roept onSearchOpen aan bij openen zoekpaneel', () => {
    const onSearchOpen = vi.fn();
    render(<PageHeader logoSlot={defaultLogo} onSearchOpen={onSearchOpen} />);
    fireEvent.click(screen.getByRole('button', { name: /zoeken/i }));
    expect(onSearchOpen).toHaveBeenCalledOnce();
  });

  it('roept onSearchClose aan bij sluiten zoekpaneel', () => {
    const onSearchClose = vi.fn();
    render(<PageHeader logoSlot={defaultLogo} onSearchClose={onSearchClose} />);
    fireEvent.click(screen.getByRole('button', { name: /zoeken/i }));
    fireEvent.click(screen.getByRole('button', { name: /sluiten/i }));
    expect(onSearchClose).toHaveBeenCalledOnce();
  });

  // ---------------------------------------------------------------------------
  // className en ref
  // ---------------------------------------------------------------------------

  it('accepteert extra className', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} className="custom" />
    );
    expect(container.querySelector('header')).toHaveClass(
      'dsn-page-header',
      'custom'
    );
  });

  it('stuurt HTML-attributen door', () => {
    const { container } = render(
      <PageHeader logoSlot={defaultLogo} data-testid="ph" />
    );
    expect(container.querySelector('header')).toHaveAttribute(
      'data-testid',
      'ph'
    );
  });
});
