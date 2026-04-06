# PageHeader

Primaire navigatieheader voor een pagina met menuknop, gecentreerd logo en zoekknop.

## Doel

`PageHeader` is de paginabrede navigatiekop aan de bovenkant van een pagina. De mobile-first implementatie toont drie vaste elementen: een menuknop (inline-start) die een `Drawer` opent, een gecentreerd logo (onafhankelijk van de knopbreedte dankzij CSS-grid `1fr auto 1fr`), en een zoekknop (inline-end) die een zoekpaneel direct onder de header laat verschijnen.

De navigatie-inhoud (primair en service) wordt via props doorgegeven en in de `DrawerBody` gewikkeld in een `<Stack space="5xl">` zodat de ruimte tussen beide navigaties consistent is.

<!-- VOORBEELD -->

## Use when

- Je een globale paginaheader nodig hebt voor een website of applicatie.
- Primaire navigatie via een overlay-lade (`Drawer`) wordt aangeboden.
- De pagina een zoekfunctie heeft die inline in de header wordt getriggerd.

## Don't use when

- Je enkel een large viewport layout nodig hebt zonder mobile fallback — `PageHeader` is altijd responsive en toont altijd beide layouts op de juiste viewport.

## Best practices

### Logo-slot

Het `logoSlot` accepteert vrije inhoud: een `<svg>`, een `<img>`, of een `<a>` die een logo omhult. De CSS past `max-block-size` toe op de directe child via `.dsn-page-header__logo > *`:

```html
<!-- <a> met logo (aanbevolen — navigatielink naar homepage) -->
<div class="dsn-page-header__logo">
  <a href="/">
    <svg class="dsn-logo" aria-hidden="true"><!-- paden --></svg>
    <span class="dsn-visually-hidden"
      >Naam organisatie — terug naar homepage</span
    >
  </a>
</div>
```

### Sticky gedrag

Kies het scrollgedrag via de `sticky`-prop:

```html
<!-- Sticky -->
<header class="dsn-page-header dsn-page-header--sticky">...</header>

<!-- Auto-hide: JS beheert data-hidden; CSS-transitie animeert -->
<header class="dsn-page-header dsn-page-header--auto-hide" data-hidden="false">
  ...
</header>
```

Bij `auto-hide` detecteert de React-component de scrollrichting via een `scroll`-eventlistener en schakelt `data-hidden` om.

### Navigatielade

De navigatielade is een `<Drawer side="left">` die altijd in de DOM aanwezig is. De inhoud wordt via `primaryNavigation` en `secondaryNavigation` meegegeven:

```tsx
<PageHeader
  logoSlot={...}
  primaryNavigation={
    <Menu orientation="vertical">
      <MenuLink href="/home" level={1}>Home</MenuLink>
    </Menu>
  }
  secondaryNavigation={
    <Menu orientation="vertical">
      <MenuLink href="/contact" level={1}>Contact</MenuLink>
    </Menu>
  }
/>
```

### Large viewport layout

Boven `64em` (~1024px) toont de header automatisch een tweebandige layout via CSS `display: none`:

- **Masthead** — neutrale achtergrond met logo (inline-start), servicemenu en inline zoekveld (inline-end)
- **Navigatiebalk** — accent-1 achtergrond met de primaire navigatie

De mobile layout (hamburger + drawer) valt via `display: none` volledig uit de accessibility tree.

```html
<header class="dsn-page-header">
  <!-- Small viewport (verborgen boven 64em) -->
  <div class="dsn-page-header__small-layout">
    <!-- bestaande mobile markup -->
  </div>

  <!-- Large viewport (zichtbaar boven 64em) -->
  <div class="dsn-page-header__large-layout">
    <div class="dsn-page-header__masthead">
      <div class="dsn-page-header__masthead-inner">
        <div class="dsn-page-header__logo">
          <a href="/"><!-- Logo --></a>
        </div>
        <div class="dsn-page-header__secondary-nav">
          <nav aria-labelledby="service-menu-id">
            <h2 id="service-menu-id" class="dsn-visually-hidden">
              Servicemenu
            </h2>
            <ul class="dsn-menu dsn-menu--horizontal">
              <li><a class="dsn-menu-link" href="/contact">Contact</a></li>
            </ul>
          </nav>
          <div class="dsn-page-header__searchbox">
            <!-- SearchInput + Zoeken-knop -->
          </div>
        </div>
      </div>
    </div>
    <div class="dsn-page-header__navbar">
      <div class="dsn-page-header__navbar-inner">
        <nav aria-labelledby="primary-nav-id">
          <h2 id="primary-nav-id" class="dsn-visually-hidden">Hoofdmenu</h2>
          <ul class="dsn-menu dsn-menu--horizontal">
            <li><a class="dsn-menu-link" href="/home">Home</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</header>
```

```tsx
<PageHeader
  logoSlot={
    <a href="/">
      <Logo aria-hidden={true} />
      <span className="dsn-visually-hidden">Terug naar homepage</span>
    </a>
  }
  primaryNavigation={
    <Menu orientation="horizontal">
      <MenuLink href="/home" level={1}>
        Home
      </MenuLink>
    </Menu>
  }
  secondaryNavigation={
    <Menu orientation="horizontal">
      <MenuLink href="/contact" level={1}>
        Contact
      </MenuLink>
    </Menu>
  }
  searchSlot={
    <>
      <SearchInput placeholder="Zoeken…" aria-label="Zoekopdracht" />
      <Button variant="strong">Zoeken</Button>
    </>
  }
/>
```

**Tab-volgorde op large viewport** (visuele leesvolgorde = DOM-volgorde = focus-volgorde):

1. Logo (link naar homepage)
2. Servicemenu items
3. Inline zoekveld + Zoeken-knop
4. Primaire navigatie items

### Zoekpaneel (small viewport)

Het zoekpaneel verschijnt direct onder de header-binnenbalk. Het paneel bevat een `SearchInput` en een zoekknop:

```html
<div class="dsn-page-header__search-panel" id="search-panel" hidden>
  <div class="dsn-page-header__search-inner">
    <div class="dsn-search-input-wrapper">
      <input
        type="search"
        class="dsn-text-input dsn-search-input"
        placeholder="Zoeken…"
        aria-label="Zoekopdracht"
      />
    </div>
    <button type="button" class="dsn-button dsn-button--strong">
      <span class="dsn-button__label">Zoeken</span>
    </button>
  </div>
</div>
```

## Design tokens

| Token                                             | Standaard                            | Omschrijving                               |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------------ |
| `--dsn-page-header-background-color`              | `{dsn.color.neutral.bg-document}`    | Achtergrondkleur                           |
| `--dsn-page-header-border-block-end-width`        | `{dsn.border.width.thick}`           | Breedte onderkantrand (4px)                |
| `--dsn-page-header-border-block-end-color`        | `{dsn.color.accent-1.color-default}` | Kleur onderkantrand (merkkleur)            |
| `--dsn-page-header-padding-block`                 | `{dsn.space.block.md}`               | Verticale padding binnenbalk               |
| `--dsn-page-header-padding-inline`                | `{dsn.space.inline.xl}`              | Horizontale padding binnenbalk             |
| `--dsn-page-header-z-index`                       | `300`                                | Z-index voor sticky — onder backdrop (400) |
| `--dsn-page-header-logo-max-block-size`           | `2rem`                               | Maximale hoogte logo (32px)                |
| `--dsn-page-header-search-panel-background-color` | `{dsn.color.accent-1.bg-default}`    | Achtergrond zoekpaneel (small)             |
| `--dsn-page-header-search-panel-padding-block`    | `{dsn.space.block.md}`               | Verticale padding zoekpaneel (small)       |
| `--dsn-page-header-search-panel-padding-inline`   | `{dsn.space.inline.xl}`              | Horizontale padding zoekpaneel (small)     |
| `--dsn-page-header-masthead-background-color`     | `{dsn.color.neutral.bg-document}`    | Masthead achtergrond (large)               |
| `--dsn-page-header-masthead-padding-block`        | `{dsn.space.block.xl}`               | Verticale padding masthead (large)         |
| `--dsn-page-header-masthead-padding-inline`       | `{dsn.space.inline.xl}`              | Horizontale padding masthead (large)       |
| `--dsn-page-header-navbar-background-color`       | `{dsn.color.accent-1.bg-default}`    | Navigatiebalk achtergrond (large)          |
| `--dsn-page-header-navbar-padding-inline`         | `{dsn.space.inline.xl}`              | Horizontale padding navigatiebalk (large)  |
| `--dsn-page-header-secondary-nav-gap`             | `{dsn.space.column.3xl}`             | Gap servicemenu ↔ zoekveld (large)         |

## Accessibility

- `<header>` heeft impliciete `role="banner"` — geen extra ARIA nodig.
- De menuknop en zoekknop gebruiken altijd een `dsn-button__label` span voor de toegankelijke naam — nooit `aria-label`.
- Zoekknop heeft `aria-expanded` (false/true) en `aria-controls` gericht op het zoekpaneel-ID.
- Bij openen zoekpaneel: focus verplaatst automatisch naar het `<input>` van de `SearchInput`.
- Bij sluiten zoekpaneel: focus keert terug naar de zoek-/sluitknop.
- Elke `<nav>` in de Drawer heeft een unieke toegankelijke naam via `aria-labelledby` + visueel verborgen `<h3>`.
- Drawer-focusbeheer wordt verzorgd door het bestaande `Drawer`-component.
- Op large viewport: `dsn-page-header__small-layout` en `dsn-page-header__large-layout` worden geswitcht met `display: none` — de inactieve sectie valt automatisch uit de accessibility tree.
- Op large viewport: beide `<nav>` elementen gebruiken `<h2>` met `aria-labelledby` ("Servicemenu", "Hoofdmenu") — unieke IDs gegenereerd via `useId()`.
