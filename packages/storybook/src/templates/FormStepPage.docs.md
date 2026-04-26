# Form Step Page

Paginatemplate voor een stap-voor-stap formulierflow met gecentreerde content en een vereenvoudigde header.

## Doel

Het Form Step Page template is bedoeld voor meerstappenformulieren waarbij de gebruiker gefocust door een reeks stappen wordt geleid. De header toont alleen het logo — navigatie en zoekveld worden weggelaten om afleiding te minimaliseren. De formulierinhoud wordt op grote viewports gecentreerd via `colStartLg` en `colEndLg` op het `GridItem`.

Templates zijn Storybook-only composities van bestaande componenten. Ze bevatten geen eigen CSS of React component.

<!-- VOORBEELD -->

## Grid-structuur

```html
<!-- Klein viewport: volle breedte -->
<div class="dsn-col-12 dsn-col-start-lg-3 dsn-col-end-lg-11">
  ...formulierinhoud...
</div>
```

```tsx
{
  /* Klein: 12 kolommen — groot: kolommen 3 t/m 10 */
}
<GridItem colSpan={12} colStartLg={3} colEndLg={11}>
  ...formulierinhoud...
</GridItem>;
```

| Viewport      | Kolommen              |
| ------------- | --------------------- |
| Klein (< lg)  | 12/12 (volle breedte) |
| Groot (>= lg) | kolommen 3 t/m 10     |

## Inhoudsstructuur

De `<main>` bevat een `Stack` met de volgende elementen in volgorde:

1. `Heading` level 1 — formuliertitel (bijv. naam van het formulier)
2. `Link` met `arrow-left` icoon — "Vorige stap"
3. `Heading` level 1 — staptitel (bijv. "Stap 2: Uw gegevens")
4. `Paragraph` — instructietekst
5. `<form>` met:
   - `FormField` voor een tekstveld
   - `FormFieldset` met een `CheckboxGroup`
   - `FormField` met `labelSuffix="(niet verplicht)"`
   - `ActionGroup` met drie acties

## ActionGroup

```tsx
<ActionGroup>
  <Button variant="strong" type="submit">
    Volgende stap
  </Button>
  <LinkButton>Opslaan en later verder</LinkButton>
  <LinkButton>Stoppen met het formulier</LinkButton>
</ActionGroup>
```

## Use when

- Je een meerstappenformulier bouwt waarbij de gebruiker stap voor stap door een aanvraag of invoerflow wordt geleid.
- Je de gebruiker wilt focussen op de taak door navigatie weg te laten.

## Don't use when

- Je een informatieve pagina toont: gebruik dan het Base Page of Grid Page template.
- Het formulier uit slechts één stap bestaat zonder stap-voor-stap navigatie.

## Accessibility

- De `<main>` heeft `id="main-content"` zodat de skip-link werkt voor toetsenbordgebruikers.
- Het `<form>`-element heeft `noValidate` om de browser-validatie te onderdrukken; valideer in plaats daarvan via de design system form-componenten.
- De formuliertitel en staptitel zijn beide `<h1>` — zorg dat de pagina per stap opnieuw geladen of gefocust wordt zodat screenreaders de nieuwe stap aankondigen.
