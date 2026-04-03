import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuLink } from './MenuLink';

describe('MenuLink', () => {
  // ---------------------------------------------------------------------------
  // Structuur
  // ---------------------------------------------------------------------------

  it('renders een <li> met een <a> erin', () => {
    const { container } = render(<MenuLink href="/test">Pagina</MenuLink>);
    const li = container.firstChild;
    expect(li?.nodeName).toBe('LI');
    const a = li?.firstChild;
    expect(a?.nodeName).toBe('A');
  });

  it('heeft de basis dsn-menu-link klasse op het <li>-element', () => {
    const { container } = render(<MenuLink href="/test">Pagina</MenuLink>);
    expect(container.firstChild).toHaveClass('dsn-menu-link');
  });

  it('heeft de dsn-menu-link__link klasse op het <a>-element', () => {
    render(<MenuLink href="/test">Pagina</MenuLink>);
    const a = document.querySelector('a');
    expect(a).toHaveClass('dsn-menu-link__link');
  });

  it('rendert children in een dsn-menu-link__label span', () => {
    const { container } = render(<MenuLink href="/test">Pagina</MenuLink>);
    const label = container.querySelector('.dsn-menu-link__label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toBe('Pagina');
  });

  it('stuurt href door naar het <a>-element', () => {
    render(<MenuLink href="/dashboard">Dashboard</MenuLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/dashboard');
  });

  // ---------------------------------------------------------------------------
  // Level
  // ---------------------------------------------------------------------------

  it('voegt geen level-modifier toe bij level 1 (default)', () => {
    const { container } = render(<MenuLink href="/test">Pagina</MenuLink>);
    const li = container.firstChild as HTMLElement;
    expect(li.classList.contains('dsn-menu-link--level-1')).toBe(false);
    expect(li.classList.contains('dsn-menu-link--level-2')).toBe(false);
  });

  it.each([2, 3, 4] as const)(
    'voegt dsn-menu-link--level-%i toe bij level %i',
    (level) => {
      const { container } = render(
        <MenuLink href="/test" level={level}>
          Pagina
        </MenuLink>
      );
      expect(container.firstChild).toHaveClass(`dsn-menu-link--level-${level}`);
    }
  );

  // ---------------------------------------------------------------------------
  // Current
  // ---------------------------------------------------------------------------

  it('heeft geen aria-current bij current=false (default)', () => {
    render(<MenuLink href="/test">Pagina</MenuLink>);
    expect(screen.getByRole('link')).not.toHaveAttribute('aria-current');
  });

  it('heeft aria-current="page" bij current=true', () => {
    render(
      <MenuLink href="/test" current>
        Pagina
      </MenuLink>
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  // ---------------------------------------------------------------------------
  // Iconen
  // ---------------------------------------------------------------------------

  it('rendert iconStart voor het label', () => {
    const { container } = render(
      <MenuLink href="/test" iconStart={<svg data-testid="icon-start" />}>
        Pagina
      </MenuLink>
    );
    const a = container.querySelector('a');
    const children = Array.from(a?.children ?? []);
    const iconIndex = children.findIndex(
      (c) => c.getAttribute('data-testid') === 'icon-start'
    );
    const labelIndex = children.findIndex((c) =>
      c.classList.contains('dsn-menu-link__label')
    );
    expect(iconIndex).toBeLessThan(labelIndex);
  });

  it('rendert iconEnd na het label', () => {
    const { container } = render(
      <MenuLink href="/test" iconEnd={<svg data-testid="icon-end" />}>
        Pagina
      </MenuLink>
    );
    const a = container.querySelector('a');
    const children = Array.from(a?.children ?? []);
    const iconIndex = children.findIndex(
      (c) => c.getAttribute('data-testid') === 'icon-end'
    );
    const labelIndex = children.findIndex((c) =>
      c.classList.contains('dsn-menu-link__label')
    );
    expect(iconIndex).toBeGreaterThan(labelIndex);
  });

  it('rendert numberBadge na het label', () => {
    const { container } = render(
      <MenuLink
        href="/test"
        numberBadge={
          <span data-testid="badge" aria-hidden="true">
            5
          </span>
        }
      >
        Pagina
      </MenuLink>
    );
    const a = container.querySelector('a');
    const children = Array.from(a?.children ?? []);
    const badgeIndex = children.findIndex(
      (c) => c.getAttribute('data-testid') === 'badge'
    );
    const labelIndex = children.findIndex((c) =>
      c.classList.contains('dsn-menu-link__label')
    );
    expect(badgeIndex).toBeGreaterThan(labelIndex);
  });

  // ---------------------------------------------------------------------------
  // Expand button
  // ---------------------------------------------------------------------------

  it('toont geen uitklapknop als subItems=false (default)', () => {
    const { container } = render(<MenuLink href="/test">Pagina</MenuLink>);
    expect(container.querySelector('button')).toBeNull();
  });

  it('toont een uitklapknop als subItems=true', () => {
    const { container } = render(
      <MenuLink href="/test" subItems>
        Pagina
      </MenuLink>
    );
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('heeft aria-expanded="false" op de uitklapknop als expanded=false', () => {
    const { container } = render(
      <MenuLink href="/test" subItems expanded={false}>
        Pagina
      </MenuLink>
    );
    expect(container.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('heeft aria-expanded="true" op de uitklapknop als expanded=true', () => {
    const { container } = render(
      <MenuLink href="/test" subItems expanded>
        Pagina
      </MenuLink>
    );
    expect(container.querySelector('button')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('roept onExpandToggle aan bij klik op de uitklapknop', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();
    const { container } = render(
      <MenuLink href="/test" subItems onExpandToggle={handleToggle}>
        Pagina
      </MenuLink>
    );
    await user.click(container.querySelector('button')!);
    expect(handleToggle).toHaveBeenCalledOnce();
  });

  it('toont "Uitklappen voor Pagina" als de children een string is', () => {
    const { container } = render(
      <MenuLink href="/test" subItems>
        Pagina
      </MenuLink>
    );
    const button = container.querySelector('button');
    expect(button?.textContent).toContain('Uitklappen');
    expect(button?.textContent).toContain('voor Pagina');
  });

  it('toont "Inklappen" als expanded=true', () => {
    const { container } = render(
      <MenuLink href="/test" subItems expanded>
        Pagina
      </MenuLink>
    );
    const button = container.querySelector('button');
    expect(button?.textContent).toContain('Inklappen');
  });

  it('heeft dsn-menu-link__expand-button klasse op de uitklapknop', () => {
    const { container } = render(
      <MenuLink href="/test" subItems>
        Pagina
      </MenuLink>
    );
    expect(container.querySelector('button')).toHaveClass(
      'dsn-menu-link__expand-button'
    );
  });

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------

  it('heeft type="button" op de uitklapknop', () => {
    const { container } = render(
      <MenuLink href="/test" subItems>
        Pagina
      </MenuLink>
    );
    expect(container.querySelector('button')).toHaveAttribute('type', 'button');
  });

  // ---------------------------------------------------------------------------
  // className en ref
  // ---------------------------------------------------------------------------

  it('past className toe op het <li>-element', () => {
    const { container } = render(
      <MenuLink href="/test" className="custom">
        Pagina
      </MenuLink>
    );
    expect(container.firstChild).toHaveClass('custom');
    expect(container.firstChild).toHaveClass('dsn-menu-link');
  });

  it('stuurt HTML-attributen door naar het <a>-element', () => {
    render(
      <MenuLink href="/test" data-testid="my-link">
        Pagina
      </MenuLink>
    );
    expect(screen.getByTestId('my-link').nodeName).toBe('A');
  });

  it('forwards ref naar het <a>-element', () => {
    const ref = { current: null as HTMLAnchorElement | null };
    render(
      <MenuLink href="/test" ref={ref}>
        Pagina
      </MenuLink>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});
