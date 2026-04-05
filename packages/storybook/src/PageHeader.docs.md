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

- De navigatie permanent zichtbaar is op de huidige viewport (large viewport) — gebruik in dat geval de nog te bouwen large-viewport variant.

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

### Zoekpaneel

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
| `--dsn-page-header-search-panel-background-color` | `{dsn.color.neutral.bg-subtle}`      | Achtergrond zoekpaneel                     |
| `--dsn-page-header-search-panel-padding-block`    | `{dsn.space.block.md}`               | Verticale padding zoekpaneel               |
| `--dsn-page-header-search-panel-padding-inline`   | `{dsn.space.inline.xl}`              | Horizontale padding zoekpaneel             |

## Accessibility

- `<header>` heeft impliciete `role="banner"` — geen extra ARIA nodig.
- De menuknop en zoekknop gebruiken altijd een `dsn-button__label` span voor de toegankelijke naam — nooit `aria-label`.
- Zoekknop heeft `aria-expanded` (false/true) en `aria-controls` gericht op het zoekpaneel-ID.
- Bij openen zoekpaneel: focus verplaatst automatisch naar het `<input>` van de `SearchInput`.
- Bij sluiten zoekpaneel: focus keert terug naar de zoek-/sluitknop.
- Elke `<nav>` in de Drawer heeft een unieke toegankelijke naam via `aria-labelledby` + visueel verborgen `<h3>`.
- Drawer-focusbeheer wordt verzorgd door het bestaande `Drawer`-component.
