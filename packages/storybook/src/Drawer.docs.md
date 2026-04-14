# Drawer

Zijpaneel dat vanuit links of rechts de viewport inschuift voor subtaken en contextuele inhoud.

## Doel

Het Drawer component toont een zijpaneel dat over de pagina-inhoud schuift. In tegenstelling tot het ModalDialog blijft de achtergrondpagina zichtbaar naast het paneel, waardoor de gebruiker de context kan behouden. Een Drawer kan modaal zijn (achtergrond geblokkeerd) of non-modaal (achtergrond interactief). Het is gebaseerd op het native `<dialog>` element.

<!-- VOORBEELD -->

## Use when

- De gebruiker rij- of itemdetails naast een lijst wil bekijken of bewerken.
- Een filterpaneel live de resultaten op de achtergrondpagina moet bijwerken (non-modal).
- Een subtaak uitgevoerd moet worden terwijl de context van de onderliggende pagina zichtbaar blijft.
- Aanvullende navigatie- of instellingenopties getoond moeten worden naast de huidige pagina.

## Don't use when

- De gebruiker de achtergrondpagina _niet_ nodig heeft — gebruik dan **ModalDialog**.
- Een onomkeerbare actie bevestigd moet worden (bijv. verwijderen) — gebruik dan **ModalDialog**.
- De inhoud een volwaardige werkstroom is die een eigen URL rechtvaardigt — gebruik dan een aparte pagina.

## Best practices

### Drawer vs. ModalDialog

| Situatie                                              | Component          |
| ----------------------------------------------------- | ------------------ |
| Korte, gefocuste actie (bevestigen, kleine keuze)     | ModalDialog        |
| Bevestigen van permanent verwijderen                  | ModalDialog        |
| Gebruiker heeft achtergrondpagina nodig voor context  | Drawer             |
| Rij- of itemdetails bekijken/bewerken naast een lijst | Drawer             |
| Filterpaneel met live-bijwerkende resultaten          | Drawer (non-modal) |
| Inhoud verdient een eigen URL                         | Aparte pagina      |

### Modal vs. non-modal

- **Modal** (`modal={true}`, standaard): achtergrond geblokkeerd via de native `::backdrop`. Gebruik dit wanneer de gebruiker de subtaak volledig moet afronden voordat hij terugkeert naar de pagina.
- **Non-modal** (`modal={false}`): achtergrond blijft interactief. Gebruik dit voor filtervensters of infovensters waarbij de gebruiker de pagina naast het paneel wil bedienen.

### Sluitgedrag

- **Sluitknop** in de header sluit het zijpaneel altijd — altijd aanwezig.
- **Escape-toets** sluit het zijpaneel (modaal via het native `cancel`-event; non-modaal via `keydown`-listener).
- **Primaire actie** (bijv. Toepassen) sluit het paneel en voert de actie uit.
- **Secundaire actie** (bijv. Annuleren) sluit het paneel zonder actie.

### Positie

- Gebruik `side="right"` (standaard) voor de meeste subtaken — consistent met platformconventies.
- Gebruik `side="left"` voor navigatiepanelen die logisch aan de linker kant horen.

### Heading-niveau

- Gebruik `level={2}` (standaard) als de paginatitel `<h1>` is.
- Kies het niveau op basis van de documenthiërarchie — het visuele uiterlijk is altijd gelijk.

### Lange inhoud

- De `DrawerBody` scrollt automatisch bij lange inhoud (scroll-affordance schaduw).
- Header en footer blijven sticky zichtbaar tijdens scrollen.

## Design tokens

| Token                                     | Beschrijving                                            |
| ----------------------------------------- | ------------------------------------------------------- |
| `--dsn-drawer-background-color`           | Achtergrondkleur (bg-elevated)                          |
| `--dsn-drawer-border-width`               | Randbreedte van de scheidingslijn met de pagina         |
| `--dsn-drawer-border-color`               | Randkleur van de scheidingslijn (neutral.border-subtle) |
| `--dsn-drawer-box-shadow`                 | Schaduw (box-shadow.lg — hoogste elevatie)              |
| `--dsn-drawer-max-width`                  | Maximale breedte (25rem / 400px)                        |
| `--dsn-drawer-min-gap`                    | Minimale zichtbare achtergrondruimte (3rem / 48px)      |
| `--dsn-drawer-heading-font-family`        | Lettertype van de heading                               |
| `--dsn-drawer-heading-font-weight`        | Vetgedrukt van de heading                               |
| `--dsn-drawer-heading-font-size`          | Tekstgrootte van de heading                             |
| `--dsn-drawer-heading-line-height`        | Regelafstand van de heading                             |
| `--dsn-drawer-heading-color`              | Kleur van de heading                                    |
| `--dsn-drawer-header-padding-block-start` | Bovenkant padding van de header (16px)                  |
| `--dsn-drawer-header-padding-block-end`   | Onderkant padding van de header (16px)                  |
| `--dsn-drawer-header-padding-inline`      | Horizontale padding van de header (16px)                |
| `--dsn-drawer-body-padding-block`         | Verticale padding van de body (24px)                    |
| `--dsn-drawer-body-padding-inline`        | Horizontale padding van de body (16px)                  |
| `--dsn-drawer-footer-padding-block-start` | Bovenkant padding van de footer (16px)                  |
| `--dsn-drawer-footer-padding-block-end`   | Onderkant padding van de footer (16px)                  |
| `--dsn-drawer-footer-padding-inline`      | Horizontale padding van de footer (16px)                |

## Accessibility

- Het zijpaneel gebruikt het native `<dialog>` element met impliciete `role="dialog"` semantiek.
- `.showModal()` (modal variant) activeert automatisch de native focus-trap, `aria-modal`-gedrag en `inert`-attribuut op de achtergrond.
- `.show()` (non-modal variant) toont het paneel zonder focus-trap — de gebruiker kan via Tab navigeren tussen het paneel en de achtergrond.
- `aria-labelledby` koppelt het zijpaneel automatisch aan de `DrawerHeading` — geen handmatige ID nodig.
- De sluitknop gebruikt `dsn-button__label` met de tekst "Sluiten" — nooit `aria-label`.
- Escape sluit het zijpaneel (modaal via het native `cancel`-event; non-modaal via `keydown`-listener).
- Animaties zijn uitgeschakeld bij `prefers-reduced-motion: reduce`.
