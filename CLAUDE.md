# Design System Starter Kit: Claude Instructions

Dit bestand wordt automatisch gelezen aan het begin van elke Claude-sessie.
Het bevat de projectregels, architectuurpatronen en navigatiekaart naar de volledige documentatie.

---

## Documentatie: waar staat wat?

| Vraag                                              | Lees dit                             |
| -------------------------------------------------- | ------------------------------------ |
| Hoe is het project opgebouwd?                      | `docs/01-architecture.md`            |
| Welke tokens bestaan er en wat zijn de waarden?    | `docs/02-design-tokens-reference.md` |
| Welke componenten bestaan er en wat zijn de specs? | `docs/03-components.md`              |
| Hoe werkt het development workflow / git / CI?     | `docs/04-development-workflow.md`    |
| Hoe werken CSS-klassen en token-namen?             | `docs/06-css-naming-conventions.md`  |
| Hoe werkt Storybook?                               | `docs/05-storybook-configuration.md` |
| Wat is er recent veranderd?                        | `docs/changelog.md`                  |

**Voor een nieuw component:** lees altijd `docs/06-css-naming-conventions.md` en `docs/03-components.md` eerst.

---

## Twee-lagen implementatiepatroon: ALTIJD

Elk component in dit design system heeft **altijd twee lagen**. Geen uitzonderingen.

| Laag         | Wat                                       | Voorbeeld                                     |
| ------------ | ----------------------------------------- | --------------------------------------------- |
| **HTML/CSS** | De kern: layout en stijllogica            | `<div class="dsn-stack dsn-stack--space-md">` |
| **React**    | De wrapper: genereert de HTML/CSS klassen | `<Stack space="md">`                          |

- De CSS-klassen zijn de bron van waarheid
- React is gemak bovenop de HTML/CSS-laag
- Bij elk nieuw component: **beide** lagen uitwerken en documenteren
- Storybook-docs tonen altijd zowel de HTML/CSS-variant als de React-variant

---

## Kritieke regels: nooit overtreden

### 1. Button accessible naming: NOOIT `aria-label`

Gebruik **altijd** een `dsn-button__label` span. `dsn-button--icon-only` verbergt hem visueel maar houdt hem beschikbaar voor screenreaders.

```html
<!-- ✅ Standaard icon-only button -->
<button
  type="button"
  class="dsn-button dsn-button--subtle dsn-button--size-small dsn-button--icon-only"
>
  <svg class="dsn-icon" aria-hidden="true"><!-- icon --></svg>
  <span class="dsn-button__label">Instellingen</span>
</button>

<!-- ✅ Icon-only met rij-context (tabelacties) -->
<button
  type="button"
  class="dsn-button dsn-button--subtle dsn-button--size-small dsn-button--icon-only"
>
  <svg class="dsn-icon" aria-hidden="true"><!-- dots-vertical --></svg>
  <span class="dsn-button__label">
    Toon acties
    <span class="dsn-visually-hidden"> voor product: Laptop Pro</span>
  </span>
</button>

<!-- ❌ NOOIT -->
<button aria-label="Instellingen">...</button>
```

### 2. Tokens: nooit hardcoded waarden in CSS

```css
/* ❌ */
color: #1b59a4;
padding: 8px;
transition: 0.2s ease;

/* ✅ */
color: var(--dsn-color-accent-1-color-default);
padding: var(--dsn-space-block-md);
transition: var(--dsn-transition-duration-normal)
  var(--dsn-transition-easing-default);
```

### 3. BEM naming: zie `docs/06-css-naming-conventions.md`

Kernregels:

- Prefix altijd `dsn-`
- Modifier altijd naast basis-klasse: `class="dsn-note dsn-note--info"`
- Grootte altijd via `--size-{naam}`: `dsn-button--size-small`
- Geen geneste element-namen: `dsn-alert__content__text` ❌
- HTML-toestanden via pseudo-klassen: `.dsn-button:disabled` ✅

### 4. Token-hiërarchie: altijd op de juiste laag aanpassen

Tokens zijn gelaagd: `base.json` (gedeelde primitieven) → component-token JSON → CSS custom property → component CSS. Pas altijd aan op de **hoogste laag die de waarde definieert**, zodat de delegatieketen intact blijft.

```json
// ❌ Omzeilen van de delegatieketen in text-input.json
"padding-block-start": { "value": "{dsn.space.block.md}" }

// ✅ Aanpassen op de juiste laag: in base.json onder form-control
"padding-block-start": { "value": "{dsn.space.block.md}" }
// text-input.json blijft delegeren naar {dsn.form-control.padding-block-start}
```

**Werkwijze bij een token-wijziging:**

1. Zoek via `Grep` welk token de waarde _uiteindelijk_ definieert (vaak in `base.json` of een theme-bestand)
2. Pas dáár de waarde aan
3. Controleer of de delegatieketen in component-JSONs ongewijzigd blijft

### 5. TypeScript moet volledig schoon zijn

`pnpm --filter storybook exec tsc --noEmit` geeft **0 fouten en 0 warnings**. Nieuwe code mag geen nieuwe fouten of warnings introduceren.

---

## Nieuw component bouwen: checklist

### Bestanden aanmaken

Elk nieuw component vereist exact deze bestanden:

```
packages/components-html/src/{component-name}/
  └── {component-name}.css              # HTML/CSS implementatie

packages/components-react/src/{ComponentName}/
  ├── {ComponentName}.tsx               # React wrapper
  ├── {ComponentName}.test.tsx          # Tests
  └── {ComponentName}.css              # @import van components-html CSS

packages/storybook/src/
  ├── {ComponentName}.stories.tsx       # Storybook stories
  ├── {ComponentName}.docs.mdx          # Storybook docs page (MDX)
  └── {ComponentName}.docs.md           # Docs content (Markdown)
```

### Exports en registraties

- `packages/components-react/src/index.ts`: export toevoegen
- `packages/storybook/src/Introduction.mdx`: datum updaten + component in de lijst

### Token-bestanden (indien nieuwe tokens nodig)

```
packages/design-tokens/src/tokens/components/{component-name}.json
packages/design-tokens/src/tokens/themes/start/colors-light.json  (indien kleur-tokens)
packages/design-tokens/src/tokens/themes/start/colors-dark.json   (altijd simultaan)
packages/design-tokens/src/tokens/themes/start/base.json          (indien structurele tokens)
```

### Kwaliteitscontrole voor PR

```bash
pnpm test                                        # alle tests groen
pnpm --filter storybook exec tsc --noEmit        # 0 nieuwe TypeScript-fouten
pnpm lint                                        # 0 lint-fouten
```

---

## Storybook-docs structuur

Elk component heeft een `.docs.md` met vaste secties in deze volgorde:

1. **Titel + korte beschrijving** (één zin)
2. **Doel**: wat doet het component en wanneer gebruik je het?
3. **Use when**: bulletlijst
4. **Don't use when**: bulletlijst
5. **Best practices**: subsecties per onderwerp
6. **Design tokens**: tabel met alle `--dsn-{component}-*` tokens
7. **Accessibility**: toegankelijkheidsaandachtspunten

Bekijk `packages/storybook/src/Button.docs.md` als referentie voor toon en opmaak.

---

## Storybook stories: naamgeving en canonieke teksten

### Story namen: altijd Engels

Story `name` waarden zijn altijd Engelstalig. Gebruik de Engelse variant van bekende patronen:

| Patroon             | ✅ Correct             | ❌ Niet doen               |
| ------------------- | ---------------------- | -------------------------- |
| Overzicht           | `'All States'`         | `'Alle states'`            |
| Lange tekst         | `'Long Text'`          | `'Lange tekst'`            |
| Korte tekst         | `'Short Text'`         | `'Korte tekst'`            |
| Met iets            | `'With Image Preview'` | `'Met afbeeldingspreview'` |
| Interactief variant | `'Interactive'`        | `'Interactief'`            |
| RTL                 | `'RTL'`                | —                          |
| Bestandslijst       | `'File List'`          | `'Bestandslijst'`          |

### Canonieke teksten uit `story-helpers.tsx`

Voor lange tekst in stories, gebruik altijd de gedeelde constanten uit `packages/storybook/src/story-helpers.tsx`. Importeer ze nooit opnieuw als losse string.

```tsx
import {
  VEEL_TEKST,
  WEINIG_TEKST,
  TEKST,
  VEEL_TEKST_AR,
} from './story-helpers';

// ✅ Lange bestandsnaam
args: {
  fileName: `${VEEL_TEKST}.pdf`;
}

// ✅ Lange labeltekst
args: {
  label: VEEL_TEKST;
}

// ❌ Nooit een eigen lange string verzinnen
args: {
  fileName: 'dit-is-een-heel-lange-naam-die-afgekapt-moet-worden.pdf';
}
```

| Constante       | Waarde (samenvatting)                                              |
| --------------- | ------------------------------------------------------------------ |
| `TEKST`         | `'Tekst'`                                                          |
| `WEINIG_TEKST`  | `'A'`                                                              |
| `VEEL_TEKST`    | Nederlandstalige zin over meerdere regels (voor long-text stories) |
| `VEEL_TEKST_AR` | Arabische variant van `VEEL_TEKST` (voor RTL stories)              |

---

## Git-workflow

```bash
git checkout -b feature/naam          # altijd een feature branch
# ... implementatie ...
pnpm test && pnpm lint                # altijd testen voor commit
git add [specifieke bestanden]        # nooit git add -A of git add .
git commit -m "feat(Component): ..."  # conventional commits
gh pr create                          # PR aanmaken
gh pr merge --merge                   # na CI-groen en review
```

Commit-prefixes: `feat` / `fix` / `docs` / `chore` / `refactor` / `test`

---

## Huidige staat: zie MEMORY.md

De actuele staat van het project (welke componenten af zijn, recente PRs, openstaande issues) staat in MEMORY.md. CLAUDE.md bevat de permanente projectregels; MEMORY.md bevat de actuele sessie-context.
