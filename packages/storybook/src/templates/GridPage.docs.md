# Grid Page

Paginatemplate met een drierijige grid-layout voor content met responsieve kolomverdeling.

## Doel

Het Grid Page template bouwt voort op de Base Page-structuur en voegt een `Grid` met drie rijen toe in de `<main>`. Het template laat zien hoe je met `Grid` en `GridItem` een responsive layout opbouwt waarbij kolommen op kleine viewports de volle breedte innemen en vanaf het medium-breakpoint naast elkaar komen te staan.

Templates zijn Storybook-only composities van bestaande componenten. Ze bevatten geen eigen CSS of React component.

<!-- VOORBEELD -->

## Grid-structuur

```html
<div class="dsn-grid dsn-grid--contained">
  <!-- Rij 1: volle breedte -->
  <div class="dsn-col-12">...</div>

  <!-- Rij 2: 2 kolommen vanaf md -->
  <div class="dsn-col-12 dsn-col-md-6">...</div>
  <div class="dsn-col-12 dsn-col-md-6">...</div>

  <!-- Rij 3: 3 kolommen vanaf md -->
  <div class="dsn-col-12 dsn-col-md-4">...</div>
  <div class="dsn-col-12 dsn-col-md-4">...</div>
  <div class="dsn-col-12 dsn-col-md-4">...</div>
</div>
```

```tsx
<Grid contained>
  {/* Rij 1 */}
  <GridItem colSpan={12}>...</GridItem>

  {/* Rij 2 */}
  <GridItem colSpan={12} colSpanMd={6}>
    ...
  </GridItem>
  <GridItem colSpan={12} colSpanMd={6}>
    ...
  </GridItem>

  {/* Rij 3 */}
  <GridItem colSpan={12} colSpanMd={4}>
    ...
  </GridItem>
  <GridItem colSpan={12} colSpanMd={4}>
    ...
  </GridItem>
  <GridItem colSpan={12} colSpanMd={4}>
    ...
  </GridItem>
</Grid>
```

| Rij | Klein (< md) | Medium en groter (>= md) |
| --- | ------------ | ------------------------ |
| 1   | 12/12        | 12/12                    |
| 2   | 12/12 elk    | 6/12 elk                 |
| 3   | 12/12 elk    | 4/12 elk                 |

## Use when

- Je een pagina indeelt in een kop-sectie gevolgd door twee- of driekoloms content.
- Je een responsive layout nodig hebt die op mobiel stapelt en op grotere schermen naast elkaar toont.

## Don't use when

- Je geen grid-layout nodig hebt: gebruik dan het Base Page template.
- Je meer controle nodig hebt over breakpoints per rij: definieer dan per `GridItem` de juiste `colSpanSm`, `colSpanMd` en `colSpanLg` props.

## Accessibility

De grid zelf voegt geen ARIA-semantiek toe. Zorg dat de inhoud van elke gridcel een logische leesvolgorde heeft in de DOM (van links naar rechts, van boven naar beneden op grote schermen).
