import React from 'react';
import { classNames } from '@dsn/core';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { SearchInput } from '../SearchInput';
import { Drawer, DrawerBody, DrawerHeader, DrawerHeading } from '../Drawer';
import { Stack } from '../Stack';
import './PageHeader.css';

export type PageHeaderSticky = 'none' | 'sticky' | 'auto-hide';

export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'children'
> {
  /**
   * Logo-inhoud — `<svg>`, `<img>`, of een `<a>` die een logo omhult.
   * De CSS past automatisch `max-block-size` toe op de directe child.
   */
  logoSlot: React.ReactNode;

  /**
   * Scrollgedrag van de header.
   * - `none` (standaard): header scrollt mee met de pagina
   * - `sticky`: header blijft bovenaan de viewport vastgeplakt
   * - `auto-hide`: sticky + verbergt bij scroll-down, toont bij scroll-up
   * @default 'none'
   */
  sticky?: PageHeaderSticky;

  /**
   * Primaire navigatie-inhoud in de Drawer (small viewport) — doorgaans een verticale `<Menu>` met
   * `<MenuLink>`-items inclusief uitklapmogelijkheden voor sub-niveaus.
   */
  primaryNavigation?: React.ReactNode;

  /**
   * Primaire navigatie-inhoud in de Navigatiebalk (large viewport) — doorgaans een horizontale
   * `<Menu>` met alleen Level 1 `<MenuLink>`-items. Als niet meegegeven valt de component
   * terug op `primaryNavigation`.
   */
  primaryNavigationLarge?: React.ReactNode;

  /**
   * Servicemenu-inhoud in de Drawer (small viewport) — doorgaans een verticale `<Menu>`.
   */
  secondaryNavigation?: React.ReactNode;

  /**
   * Servicemenu-inhoud in de Masthead (large viewport) — doorgaans een horizontale `<Menu>`.
   * Als niet meegegeven valt de component terug op `secondaryNavigation`.
   */
  secondaryNavigationLarge?: React.ReactNode;

  /**
   * Inline zoekveld voor de Masthead op large viewport (SearchInput + zoekknop).
   * Optioneel — toont geen zoekveld als weggelaten.
   */
  searchSlot?: React.ReactNode;

  /**
   * Callback wanneer de navigatielade opent.
   */
  onMenuOpen?: () => void;

  /**
   * Callback wanneer de navigatielade sluit.
   */
  onMenuClose?: () => void;

  /**
   * Callback wanneer het zoekpaneel opent.
   */
  onSearchOpen?: () => void;

  /**
   * Callback wanneer het zoekpaneel sluit.
   */
  onSearchClose?: () => void;

  className?: string;
}

/**
 * PageHeader component
 * Primaire navigatieheader voor een pagina. Mobile-first implementatie.
 *
 * Op mobile toont de header drie elementen:
 * - Menuknop (inline-start) — opent een `Drawer` met primaire en service-navigatie
 * - Logo (gecentreerd, onafhankelijk van knopbreedte via CSS-grid 1fr auto 1fr)
 * - Zoekknop (inline-end) — opent een zoekpaneel direct onder de header
 *
 * @example
 * ```tsx
 * <PageHeader
 *   logoSlot={
 *     <a href="/">
 *       <Logo aria-hidden={true} />
 *       <span className="dsn-visually-hidden">Starter Kit — terug naar homepage</span>
 *     </a>
 *   }
 *   primaryNavigation={
 *     <Menu orientation="vertical">
 *       <MenuLink href="/home" level={1}>Home</MenuLink>
 *       <MenuLink href="/over" level={1}>Over ons</MenuLink>
 *     </Menu>
 *   }
 *   secondaryNavigation={
 *     <Menu orientation="vertical">
 *       <MenuLink href="/contact" level={1}>Contact</MenuLink>
 *     </Menu>
 *   }
 * />
 * ```
 */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      className,
      logoSlot,
      sticky = 'none',
      primaryNavigation,
      primaryNavigationLarge,
      secondaryNavigation,
      secondaryNavigationLarge,
      searchSlot,
      onMenuOpen,
      onMenuClose,
      onSearchOpen,
      onSearchClose,
      ...props
    },
    ref
  ) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const headerRef = React.useRef<HTMLElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLElement>) ?? headerRef;

    const menuButtonRef = React.useRef<HTMLButtonElement>(null);
    const searchButtonRef = React.useRef<HTMLButtonElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    const searchPanelId = React.useId();
    const primaryNavId = React.useId();
    const serviceNavId = React.useId();
    const primaryNavLargeId = React.useId();
    const serviceNavLargeId = React.useId();

    // Auto-hide: detecteer scrollrichting en toggle data-hidden attribuut
    React.useEffect(() => {
      if (sticky !== 'auto-hide') return;

      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isScrollingDown =
          currentScrollY > lastScrollY && currentScrollY > 100;
        combinedRef.current?.setAttribute(
          'data-hidden',
          String(isScrollingDown)
        );
        lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [sticky, combinedRef]);

    // Focus management: bij openen zoekpaneel → focus naar input
    React.useEffect(() => {
      if (isSearchOpen) {
        searchInputRef.current?.focus();
      }
    }, [isSearchOpen]);

    const handleMenuOpen = () => {
      setIsMenuOpen(true);
      onMenuOpen?.();
    };

    const handleMenuClose = () => {
      setIsMenuOpen(false);
      onMenuClose?.();
      // Focus terug naar menuknop
      menuButtonRef.current?.focus();
    };

    const handleSearchToggle = () => {
      const opening = !isSearchOpen;
      setIsSearchOpen(opening);
      if (opening) {
        onSearchOpen?.();
      } else {
        onSearchClose?.();
        // Focus terug naar zoek/sluit-knop (na state-update, via useEffect werkt ook)
        searchButtonRef.current?.focus();
      }
    };

    const classes = classNames(
      'dsn-page-header',
      sticky === 'sticky' && 'dsn-page-header--sticky',
      sticky === 'auto-hide' && 'dsn-page-header--auto-hide',
      className
    );

    return (
      <>
        <header
          ref={combinedRef}
          className={classes}
          {...(sticky === 'auto-hide' ? { 'data-hidden': 'false' } : {})}
          {...props}
        >
          {/* ----------------------------------------------------------------
              Small viewport layout (verborgen boven 64em via CSS display:none)
              ---------------------------------------------------------------- */}
          <div className="dsn-page-header__small-layout">
            <div className="dsn-page-header__inner">
              {/* Inline-start: menuknop */}
              <div className="dsn-page-header__start">
                <Button
                  ref={menuButtonRef}
                  variant="subtle"
                  onClick={handleMenuOpen}
                  iconStart={<Icon name="menu" aria-hidden />}
                >
                  Menu
                </Button>
              </div>

              {/* Gecentreerd logo */}
              <div className="dsn-page-header__logo">{logoSlot}</div>

              {/* Inline-end: zoekknop / sluitknop */}
              <div className="dsn-page-header__end">
                <Button
                  ref={searchButtonRef}
                  variant="subtle"
                  aria-expanded={isSearchOpen}
                  aria-controls={searchPanelId}
                  onClick={handleSearchToggle}
                  iconStart={
                    <Icon name={isSearchOpen ? 'x' : 'search'} aria-hidden />
                  }
                >
                  {isSearchOpen ? 'Sluiten' : 'Zoeken'}
                </Button>
              </div>
            </div>

            {/* Zoekpaneel */}
            <div
              id={searchPanelId}
              className="dsn-page-header__search-panel"
              hidden={!isSearchOpen}
            >
              <div className="dsn-page-header__search-inner">
                <SearchInput
                  ref={searchInputRef}
                  placeholder="Zoeken…"
                  aria-label="Zoekopdracht"
                />
                <Button variant="strong">Zoeken</Button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------
              Large viewport layout (zichtbaar boven 64em via CSS display:block)
              ---------------------------------------------------------------- */}
          <div className="dsn-page-header__large-layout">
            {/* Masthead: neutrale achtergrond — logo + servicemenu + zoek */}
            <div className="dsn-page-header__masthead">
              <div className="dsn-page-header__masthead-inner">
                <div className="dsn-page-header__logo">{logoSlot}</div>

                <div className="dsn-page-header__secondary-nav">
                  {(secondaryNavigationLarge ?? secondaryNavigation) && (
                    <nav aria-labelledby={serviceNavLargeId}>
                      <h2
                        id={serviceNavLargeId}
                        className="dsn-visually-hidden"
                      >
                        Servicemenu
                      </h2>
                      {secondaryNavigationLarge ?? secondaryNavigation}
                    </nav>
                  )}
                  {searchSlot && (
                    <div className="dsn-page-header__searchbox">
                      {searchSlot}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigatiebalk: accent-1 achtergrond — primaire navigatie (large viewport) */}
            <div className="dsn-page-header__navbar">
              <div className="dsn-page-header__navbar-inner">
                {(primaryNavigationLarge ?? primaryNavigation) && (
                  <nav aria-labelledby={primaryNavLargeId}>
                    <h2 id={primaryNavLargeId} className="dsn-visually-hidden">
                      Hoofdmenu
                    </h2>
                    {primaryNavigationLarge ?? primaryNavigation}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Navigatielade (sibling aan PageHeader, altijd in DOM) */}
        <Drawer isOpen={isMenuOpen} onClose={handleMenuClose} side="left">
          <DrawerHeader>
            <DrawerHeading>Menu</DrawerHeading>
          </DrawerHeader>
          <DrawerBody>
            <Stack space="5xl">
              {primaryNavigation && (
                <nav aria-labelledby={primaryNavId}>
                  <h3 id={primaryNavId} className="dsn-visually-hidden">
                    Hoofdmenu
                  </h3>
                  {primaryNavigation}
                </nav>
              )}
              {secondaryNavigation && (
                <nav aria-labelledby={serviceNavId}>
                  <h3 id={serviceNavId} className="dsn-visually-hidden">
                    Servicemenu
                  </h3>
                  {secondaryNavigation}
                </nav>
              )}
            </Stack>
          </DrawerBody>
        </Drawer>
      </>
    );
  }
);

PageHeader.displayName = 'PageHeader';
