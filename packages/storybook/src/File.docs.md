# File

Toont meta-informatie over een bestand (naam, type, grootte) samen met contextafhankelijke acties.

## Doel

File geeft feedback aan de gebruiker over een geselecteerd of geüpload bestand. Het component toont inline-start een gekleurd media-vlak met een bestandsicoon of afbeeldingspreview, gevolgd door de bestandsnaam en meta-informatie (type, grootte). Inline-end staan contextafhankelijke acties: een verwijderknop, een laadindicator, of een bevestigingsicoon.

File ondersteunt vier upload-states (`default`, `loading`, `uploaded`, `error`) en een interactieve variant voor gebruik op controle- of detailpagina's.

<!-- VOORBEELD -->

## Use when

- De gebruiker een bestand heeft geselecteerd of geüpload binnen een formulier, en feedback nodig heeft over de status.
- Een eerder geüpload bestand getoond wordt op een controlepagina van een meerstappenformulier, met de mogelijkheid het te bekijken of te downloaden.
- Een downloadbaar bestand aangeboden wordt op een detailpagina.

## Don't use when

- Je enkel een link naar een bestand wilt tonen zonder visueel onderscheid of acties. Gebruik in dat geval een gewone `Link`.

## Best practices

### Bestandsnaam zonder extensie

De bestandsnaam wordt visueel **zonder extensie** getoond. De extensie staat al in het type-veld in de meta (`PDF · 1,2 MB`). De volledige bestandsnaam inclusief extensie wordt gebruikt in de visueel verborgen tekst van de verwijderknop en de `aria-live` aankondiging.

### Verwijderknop — nooit `aria-label`

De verwijderknop bevat altijd de volledige bestandsnaam als visueel verborgen tekst, zodat screenreaders de context begrijpen. Gebruik nooit `aria-label` op de knop.

```html
<button
  type="button"
  class="dsn-button dsn-button--subtle dsn-button--size-small"
>
  <svg class="dsn-icon" aria-hidden="true"><!-- trash.svg --></svg>
  <span class="dsn-button__label">
    Verwijder
    <span class="dsn-visually-hidden"> document.pdf</span>
  </span>
</button>
```

### States

| State      | Wanneer                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `default`  | Bestand is geselecteerd of eerder geüpload. Toont naam als link (indien `href` aanwezig) en verwijderknop.                        |
| `loading`  | Upload is in uitvoering. Toont naam als tekst (geen link), Spinner in actions.                                                    |
| `uploaded` | Upload geslaagd. Toont naam als link, check-icoon in actions, `aria-live` aankondiging. Keert na 2 seconden terug naar `default`. |
| `error`    | Upload mislukt. Toont rode randkleur, foutmelding onder de meta, verwijderknop.                                                   |

### Interactieve variant

Wanneer `href` aanwezig is en `onDelete` ontbreekt, schakelt het component automatisch over naar de interactieve variant. De bestandsnaam wordt een stretched link die de gehele component klikbaar maakt. De CTA-link in de actions heeft `aria-hidden="true"` en `tabindex="-1"` om een dubbele tabstop te vermijden.

```html
<div class="dsn-file dsn-file--interactive">
  <div class="dsn-file__media" aria-hidden="true">
    <svg class="dsn-icon" aria-hidden="true"><!-- file-description.svg --></svg>
  </div>
  <div class="dsn-file__content">
    <a
      class="dsn-file__name dsn-file__name--stretched"
      href="/bestanden/document.pdf"
      target="_blank"
      rel="noopener noreferrer"
      >document</a
    >
    <span class="dsn-file__meta">PDF · 1,2 MB</span>
  </div>
  <div class="dsn-file__actions">
    <a
      class="dsn-link"
      href="/bestanden/document.pdf"
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden="true"
      tabindex="-1"
      >Bekijken</a
    >
  </div>
  <span
    class="dsn-visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></span>
</div>
```

### FileList

Gebruik `FileList` als wrapper wanneer je meerdere `File` componenten toont. De lijst rendert een `<ul role="list">` met `<li>` wrappers — nodig omdat CSS-resets lijstsemantiek verwijderen.

```html
<ul class="dsn-file-list" role="list">
  <li><!-- File --></li>
  <li><!-- File --></li>
</ul>
```

## Design tokens

| Token                                | Beschrijving                                 |
| ------------------------------------ | -------------------------------------------- |
| `--dsn-file-background-color`        | Achtergrondkleur standaard                   |
| `--dsn-file-background-color-hover`  | Achtergrondkleur bij hover (interactief)     |
| `--dsn-file-background-color-active` | Achtergrondkleur bij active (interactief)    |
| `--dsn-file-border-radius`           | Afgeronde hoeken                             |
| `--dsn-file-border-width`            | Randbreedte                                  |
| `--dsn-file-border-color`            | Randkleur standaard                          |
| `--dsn-file-border-color-hover`      | Randkleur bij hover (interactief)            |
| `--dsn-file-border-color-active`     | Randkleur bij active (interactief)           |
| `--dsn-file-border-color-error`      | Randkleur in error state                     |
| `--dsn-file-box-shadow`              | Schaduw standaard (geen)                     |
| `--dsn-file-box-shadow-hover`        | Schaduw bij hover (interactief)              |
| `--dsn-file-padding-block`           | Verticale padding                            |
| `--dsn-file-padding-inline`          | Horizontale padding                          |
| `--dsn-file-gap`                     | Ruimte tussen media-vlak, content en actions |
| `--dsn-file-content-gap`             | Verticale ruimte in het content-gebied       |
| `--dsn-file-name-color`              | Kleur van de bestandsnaam                    |
| `--dsn-file-name-font-weight`        | Gewicht van de bestandsnaam (bold)           |
| `--dsn-file-meta-color`              | Kleur van de meta-tekst                      |
| `--dsn-file-meta-font-size`          | Tekstgrootte van de meta                     |
| `--dsn-file-media-min-block-size`    | Minimale hoogte van het media-vlak (48px)    |
| `--dsn-file-media-min-inline-size`   | Minimale breedte van het media-vlak (48px)   |
| `--dsn-file-media-border-radius`     | Afgeronde hoeken van het media-vlak          |
| `--dsn-file-media-background-color`  | Achtergrondkleur van het media-vlak          |
| `--dsn-file-media-icon-color`        | Kleur van het icoon in het media-vlak        |
| `--dsn-file-media-icon-size`         | Grootte van het icoon in het media-vlak      |
| `--dsn-file-status-icon-color`       | Kleur van het check-icoon (uploaded state)   |
| `--dsn-file-status-icon-size`        | Grootte van het check-icoon                  |

## Accessibility

- `dsn-file__media` heeft altijd `aria-hidden="true"`: het icoon en de preview zijn decoratief.
- `<img class="dsn-file__preview" alt="">` heeft een lege `alt` — de media-container is toch `aria-hidden`.
- De verwijderknop bevat de bestandsnaam inclusief extensie als visueel verborgen tekst. Gebruik nooit `aria-label`.
- Elk `File` component bevat een visueel verborgen `<span aria-live="polite" aria-atomic="true">`. Bij de `uploaded` state wordt deze gevuld met de bevestigingstekst; bij terugkeer naar `default` wordt hij leeggemaakt.
- In de interactieve variant heeft de CTA-link `aria-hidden="true"` en `tabindex="-1"` — de stretched link is het enige focuspunt.
- `FileList` rendert `<ul role="list">` met `<li>` wrappers om lijstsemantiek te bewaren bij CSS-resets.
