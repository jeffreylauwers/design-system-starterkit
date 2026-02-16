# SearchInput

Een invoerveld specifiek voor zoekfunctionaliteit met een zoek-icoon.

## Doel

De SearchInput component is een gespecialiseerd invoerveld voor zoekfunctionaliteit. Het toont een zoek-icoon aan de linkerkant van het veld en gebruikt `type="search"` voor browser-specifieke functionaliteit zoals een ingebouwde clear-knop. Het veld is visueel duidelijk als zoekveld door het icoon en is geoptimaliseerd voor gebruik in headers, toolbars en dedicated zoekpagina's.

<!-- VOORBEELD -->

## Use when

- Je een zoekveld nodig hebt in de header, toolbar of op een zoekpagina.
- Je wilt dat gebruikers direct herkennen dat het om zoeken gaat.
- Je zoekfunctionaliteit wilt toevoegen aan een lijst, tabel of catalogus.

## Don't use when

- Het om filtering gaat zonder echte zoekfunctionaliteit — gebruik dan [TextInput](/docs/components-textinput--docs).
- Je een complexe zoekinterface bouwt met filters en facetten — combineer dan met andere componenten.

## Best practices

- **Gebruik een duidelijke placeholder.** Geef aan wat gebruikers kunnen zoeken (bijv. "Zoek producten...", "Zoek in artikelen...").
- **Implementeer live search of debouncing.** Update resultaten tijdens het typen, maar niet bij elke toetsaanslag.
- **Toon zoekresultaten duidelijk.** Gebruik een dropdown of dedicated resultaten sectie.
- **Geef feedback bij geen resultaten.** Toon "Geen resultaten gevonden voor 'zoekterm'" met suggesties.
- **Bewaar recente zoekopdrachten.** Toon een lijst met recente zoekopdrachten bij focus (optioneel).
- **Maak het toegankelijk.** Gebruik `role="search"` op een wrapper element voor betere screen reader ondersteuning.
- **Overweeg autocomplete suggesties.** Help gebruikers sneller te vinden wat ze zoeken.
- **Plaats prominent.** Zoekvelden horen vaak in de header of prominent boven content.

## Anatomy

Een SearchInput bestaat uit:

- **Wrapper div** voor icoon positionering
- **Zoek-icoon** links in het veld
- **Input element** met `type="search"`
- **Extra padding links** om ruimte te maken voor het icoon

## States

- **Default**: Leeg, klaar voor invoer
- **Filled**: Bevat een zoekterm
- **Focus**: Actief, gebruiker typt
- **Hover**: Muis over het veld
- **Disabled**: Niet beschikbaar voor invoer
- **Read-only**: Waarde is zichtbaar maar niet aanpasbaar
- **Invalid**: Validatiefout (bijv. te korte zoekterm)

## Design tokens

| Token                                     | Beschrijving                          |
| ----------------------------------------- | ------------------------------------- |
| `--dsn-search-input-icon-size`            | Grootte van het zoek-icoon            |
| `--dsn-search-input-icon-color`           | Kleur van het zoek-icoon              |
| `--dsn-search-input-padding-inline-start` | Extra padding links voor icoon ruimte |

SearchInput erft verder alle tokens van [TextInput](/docs/components-textinput--docs):

| Token                                        | Beschrijving              |
| -------------------------------------------- | ------------------------- |
| `--dsn-text-input-font-family`               | Lettertypefamilie         |
| `--dsn-text-input-font-size`                 | Font size                 |
| `--dsn-text-input-font-weight`               | Font weight               |
| `--dsn-text-input-line-height`               | Line height               |
| `--dsn-text-input-color`                     | Tekstkleur                |
| `--dsn-text-input-background-color`          | Achtergrondkleur          |
| `--dsn-text-input-border-color`              | Borderkleur default state |
| `--dsn-text-input-border-width`              | Dikte van de border       |
| `--dsn-text-input-border-radius`             | Border radius             |
| `--dsn-text-input-padding-block-start`       | Padding boven             |
| `--dsn-text-input-padding-block-end`         | Padding onder             |
| `--dsn-text-input-hover-border-color`        | Borderkleur hover state   |
| `--dsn-text-input-focus-border-color`        | Borderkleur focus state   |
| `--dsn-text-input-disabled-background-color` | Achtergrondkleur disabled |
| `--dsn-text-input-disabled-color`            | Tekstkleur disabled       |
| `--dsn-text-input-invalid-border-color`      | Borderkleur invalid state |
| `--dsn-text-input-placeholder-color`         | Placeholder tekstkleur    |
