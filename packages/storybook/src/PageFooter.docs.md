# PageFooter

Paginavoettekst met accent-1 achtergrond, dikke topborder en een 4-koloms grid.

## Doel

`PageFooter` is het afsluitende onderdeel van een pagina. Het component draagt de huisstijlkleur (`accent-1`) als achtergrond en heeft een dikke `border-block-start` die visueel aansluit bij de `border-block-end` van de `PageHeader`. Binnenin bevindt zich een 4-koloms grid: logo (slot 1), een optioneel tussenslot (slot 2), een korte paragraaf of contextinhoud (slot 3) en een lijst van standaard footerlinks (slot 4).

Op kleine viewports stapelen alle slots verticaal. Op grote viewports (≥ 64em) staan de vier slots naast elkaar in gelijke kolommen.

<!-- VOORBEELD -->

## Use when

- Je een globale paginavoettekst nodig hebt als huisstijldrager met organisatielogo.
- Juridische en organisatorische links aanwezig moeten zijn op elke pagina (privacyverklaring, cookies, toegankelijkheid, contact).
- Een korte contextuele tekst met verwijzing naar relevante informatie gewenst is.

## Don't use when

- Je een eenvoudige linkenlijst midden op een pagina wilt tonen: gebruik in dat geval een `UnorderedList` of `Menu`.
- Je enkel een footer nodig hebt zonder huisstijlkleuren: pas dan de tokens aan of gebruik een andere container.

## Best practices

### Logo-slot

Het `logoSlot` accepteert vrije inhoud. Wikkel het logo altijd in een `<a>` met een visueel verborgen tekst zodat screenreaders de bestemming voorlezen:

```html
<!-- Aanbevolen: <a> met visueel verborgen label -->
<div class="dsn-page-footer__inner">
  <a href="/">
    <svg class="dsn-logo" aria-hidden="true"><!-- paden --></svg>
    <span class="dsn-visually-hidden"
      >Naam organisatie — terug naar homepage</span
    >
  </a>
</div>
```

### Footerlinks

Slot 4 (`linksSlot`) is bedoeld voor een `<UnorderedList>` met `<Link>`-items. Gebruik beschrijvende linkteksten die buiten context begrijpelijk zijn:

```html
<ul class="dsn-unordered-list">
  <li><a class="dsn-link" href="/privacy">Privacyverklaring</a></li>
  <li><a class="dsn-link" href="/accessibility">Toegankelijkheid</a></li>
  <li><a class="dsn-link" href="/cookies">Cookies</a></li>
  <li><a class="dsn-link" href="/contact">Contact</a></li>
</ul>
```

### Leeg tussenslot

Het `secondarySlot` (slot 2) is standaard leeg. Op mobiel verdwijnt het via CSS `:empty { display: none }` zodat geen onnodige `row-gap` ontstaat. Vul het in als je visuele ruimte of extra inhoud nodig hebt:

```html
<!-- Leeg: slot verborgen op mobiel -->
<div class="dsn-col-12 dsn-col-lg-3 dsn-page-footer__empty-slot"></div>

<!-- Gevuld: zichtbaar op alle viewports -->
<div class="dsn-col-12 dsn-col-lg-3 dsn-page-footer__empty-slot">
  <p class="dsn-paragraph">Extra inhoud</p>
</div>
```

### Inverse colorScheme

De `inverse` kleurvariant schakelt naar de `accent-1-inverse` kleurenschaal voor een donkere footer. Tekst- en linkkleuren worden via CSS custom property overrides automatisch omgeschakeld:

```html
<footer class="dsn-page-footer dsn-page-footer--inverse">
  <!-- zelfde interne structuur -->
</footer>
```

## Design tokens

| Token                                        | Waarde                                | Beschrijving               |
| -------------------------------------------- | ------------------------------------- | -------------------------- |
| `--dsn-page-footer-background-color`         | `{dsn.color.accent-1.bg-default}`     | Achtergrondkleur (default) |
| `--dsn-page-footer-border-block-start-width` | `{dsn.border.width.thick}`            | Breedte topborder (4px)    |
| `--dsn-page-footer-border-block-start-color` | `{dsn.color.accent-1.border-default}` | Kleur topborder (default)  |
| `--dsn-page-footer-padding-block`            | `{dsn.space.block.xl}`                | Verticale padding          |
| `--dsn-page-footer-padding-inline`           | `{dsn.space.inline.xl}`               | Horizontale padding        |
| `--dsn-page-footer-logo-max-block-size`      | `2rem`                                | Maximale logohoogte (32px) |

## Accessibility

### Landmark

Het `<footer>` element als directe afstammeling van `<body>` heeft impliciet `role="contentinfo"`. Screenreadergebruikers kunnen er direct naartoe navigeren via landmark-navigatie. Voeg geen extra `role`-attribuut toe.

### Logo-anker

Het logo-anker in slot 1 heeft een visueel verborgen tekst via `dsn-visually-hidden`. Zo weet een screenreadergebruiker de bestemming van de link ook zonder het logo te zien.

### Linkteksten

Links in slot 3 (paragraaf) en slot 4 (lijst) moeten beschrijvende teksten hebben die buiten context begrijpelijk zijn (WCAG 2.4.6). Vermijd generieke teksten zoals "Klik hier" of "Lees meer".
