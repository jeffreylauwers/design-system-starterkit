# Grid

Het Grid component biedt een 12-koloms CSS Grid layout systeem met consistente gutter, margin en optionele max-width. Gebruik het samen met `GridItem` om content op een voorspelbare manier te positioneren.

## Doel

Grid legt een 12-koloms structuur vast als basis voor paginalayouts. Alle children zijn onderdeel van hetzelfde grid, waardoor kolommen altijd op één lijn staan: ook over meerdere rijen heen.

- **`Grid`**: de container die de 12 kolommen definieert
- **`GridItem`**: directe child voor kolomspanning (1–12) met responsive varianten

<!-- VOORBEELD -->

## Use when

- Je een paginabrede layout wilt structureren met kolommen
- Content naast elkaar moet staan (twee kolommen, drie kolommen, etc.)
- Je responsive kolomverdeling nodig hebt via breakpoints
- Je een sectie "edge-to-edge" wilt laten lopen binnen een `contained` grid

## Don't use when

- Je alleen verticale stapeling nodig hebt → gebruik `Stack`
- Je een kleine, component-interne layout wilt → gebruik inline CSS of `display: flex`
- De content geen kolom-gebaseerde structuur heeft

## Best practices

- Gebruik `contained` voor paginalayouts waarbij de maximale breedte bepaald wordt door `--dsn-grid-max-width`
- Gebruik geen `GridItem` als directe child niet nodig is: gewone `<div>` elementen werken ook (ze beslaan standaard de volledige breedte via `grid-column: 1 / -1`)
- Combineer `colSpan` met `colSpanMd` en `colSpanLg` voor responsive layouts die op mobiel stapelen (col-12) en breder uitkomen op grotere schermen
- Gebruik `fullBleed` alleen voor elementen die een achtergrondkleur of -afbeelding edge-to-edge willen tonen
- Nest geen `Grid` in `Grid` tenzij noodzakelijk: de gutter en margin gelden per grid-instantie

## Breakpoints

| Naam | Waarde         | Omschrijving                                    |
| ---- | -------------- | ----------------------------------------------- |
| `sm` | 36em (~576px)  | `colSpanSm` / `dsn-col-sm-*`                    |
| `md` | 44em (~704px)  | `colSpanMd` / `dsn-col-md-*`                    |
| `lg` | 64em (~1024px) | `colSpanLg` / `dsn-col-lg-*`                    |
| `xl` | 74em (~1184px) | Grens waarop `contained` grid max-width bereikt |

De breakpoint-waarden zijn ook beschikbaar als design tokens (`--dsn-breakpoint-sm` t/m `--dsn-breakpoint-xl`) voor gebruik in JavaScript (bijv. `matchMedia`). In CSS media queries zijn ze hardcoded omdat CSS custom properties niet werken in `@media` regels.

## Full-bleed

Een `GridItem` met `fullBleed` (of `<div class="dsn-full-bleed">`) breekt visueel uit tot de buitenrand van de grid container. Het item beslaat de volle breedte inclusief de `--dsn-grid-margin`. Dit is handig voor achtergrondvlakken die "edge-to-edge" lopen.

```html
<div class="dsn-grid dsn-grid--contained">
  <div class="dsn-col-8">Normale content</div>
  <div class="dsn-full-bleed">
    <div
      style="background: var(--dsn-color-neutral-bg-subtle); padding: 1.5rem var(--dsn-grid-margin);"
    >
      Edge-to-edge sectie
    </div>
  </div>
  <div class="dsn-col-8">Vervolg content</div>
</div>
```

## Accessibility

Grid en GridItem zijn puur visuele layout utilities. Ze voegen geen ARIA-attributen of semantische HTML toe. Gebruik passende semantische elementen (`<main>`, `<aside>`, `<section>`) als wrapper of als `className`-drager.

## Design tokens

| Token                  | Standaard waarde                     | Omschrijving                                                        |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------------- |
| `--dsn-grid-gutter`    | `var(--dsn-space-column-xl)` (16px)  | Horizontale ruimte tussen kolommen; 8px in information-dense        |
| `--dsn-grid-margin`    | `var(--dsn-space-column-3xl)` (24px) | Outer padding aan weerszijden van de grid container                 |
| `--dsn-grid-max-width` | `74rem` (~1184px)                    | Maximale breedte bij `contained` variant                            |
| `--dsn-breakpoint-sm`  | `36em`                               | Referentiewaarde small breakpoint (niet te gebruiken in CSS @media) |
| `--dsn-breakpoint-md`  | `44em`                               | Referentiewaarde medium breakpoint                                  |
| `--dsn-breakpoint-lg`  | `64em`                               | Referentiewaarde large breakpoint                                   |
| `--dsn-breakpoint-xl`  | `74em`                               | Referentiewaarde extra large breakpoint                             |
