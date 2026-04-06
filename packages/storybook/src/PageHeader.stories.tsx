import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Logo,
  Menu,
  MenuLink,
  PageHeader,
  SearchInput,
} from '@dsn/components-react';

// =============================================================================
// META
// =============================================================================

const logoSlot = (
  <a href="/">
    <Logo aria-hidden={true} />
    <span className="dsn-visually-hidden">
      Starter Kit — terug naar homepage
    </span>
  </a>
);

/**
 * Primaire navigatie met alle niveaus (1–4) uitklapbaar.
 *
 * Structuur:
 * - Level 1a (current)
 * - Level 1b
 *   - Level 2a
 *   - Level 2b
 *     - Level 3a
 *     - Level 3b
 *       - Level 4a
 *       - Level 4b
 *     - Level 3c
 *     - Level 3d
 *   - Level 2c
 *   - Level 2d
 * - Level 1c
 * - Level 1d
 */
function PrimaryNavigation() {
  const [exp1b, setExp1b] = React.useState(false);
  const [exp2b, setExp2b] = React.useState(false);
  const [exp3b, setExp3b] = React.useState(false);

  return (
    <Menu orientation="vertical">
      {/* Level 1a */}
      <MenuLink href="/level-1a" level={1} current>
        Level 1a
      </MenuLink>

      {/* Level 1b */}
      <MenuLink
        href="/level-1b"
        level={1}
        subItems
        expanded={exp1b}
        onExpandToggle={() => setExp1b((v) => !v)}
      >
        Level 1b
      </MenuLink>
      {exp1b && (
        <>
          <MenuLink href="/level-2a" level={2}>
            Level 2a
          </MenuLink>
          <MenuLink
            href="/level-2b"
            level={2}
            subItems
            expanded={exp2b}
            onExpandToggle={() => setExp2b((v) => !v)}
          >
            Level 2b
          </MenuLink>
          {exp2b && (
            <>
              <MenuLink href="/level-3a" level={3}>
                Level 3a
              </MenuLink>
              <MenuLink
                href="/level-3b"
                level={3}
                subItems
                expanded={exp3b}
                onExpandToggle={() => setExp3b((v) => !v)}
              >
                Level 3b
              </MenuLink>
              {exp3b && (
                <>
                  <MenuLink href="/level-4a" level={4}>
                    Level 4a
                  </MenuLink>
                  <MenuLink href="/level-4b" level={4}>
                    Level 4b
                  </MenuLink>
                </>
              )}
              <MenuLink href="/level-3c" level={3}>
                Level 3c
              </MenuLink>
              <MenuLink href="/level-3d" level={3}>
                Level 3d
              </MenuLink>
            </>
          )}
          <MenuLink href="/level-2c" level={2}>
            Level 2c
          </MenuLink>
          <MenuLink href="/level-2d" level={2}>
            Level 2d
          </MenuLink>
        </>
      )}

      {/* Level 1c */}
      <MenuLink href="/level-1c" level={1}>
        Level 1c
      </MenuLink>

      {/* Level 1d */}
      <MenuLink href="/level-1d" level={1}>
        Level 1d
      </MenuLink>
    </Menu>
  );
}

const secondaryNavigation = (
  <Menu orientation="vertical">
    <MenuLink href="/contact" level={1}>
      Contact
    </MenuLink>
    <MenuLink href="/english" level={1}>
      English
    </MenuLink>
    <MenuLink href="/mijn-omgeving" level={1}>
      Mijn omgeving
    </MenuLink>
  </Menu>
);

/** Large viewport: horizontale servicemenu zonder verticale hiërarchie */
const secondaryNavigationLarge = (
  <Menu orientation="horizontal">
    <MenuLink href="/contact" level={1}>
      Contact
    </MenuLink>
    <MenuLink href="/english" level={1}>
      English
    </MenuLink>
    <MenuLink href="/mijn-omgeving" level={1}>
      Mijn omgeving
    </MenuLink>
  </Menu>
);

/** Large viewport: alleen Level 1 items horizontaal, geen sub-items toggle */
const primaryNavigationLarge = (
  <Menu orientation="horizontal">
    <MenuLink href="/level-1a" level={1} current>
      Level 1a
    </MenuLink>
    <MenuLink href="/level-1b" level={1}>
      Level 1b
    </MenuLink>
    <MenuLink href="/level-1c" level={1}>
      Level 1c
    </MenuLink>
    <MenuLink href="/level-1d" level={1}>
      Level 1d
    </MenuLink>
  </Menu>
);

const searchSlot = (
  <>
    <SearchInput placeholder="Zoeken…" aria-label="Zoekopdracht" />
    <Button variant="strong">Zoeken</Button>
  </>
);

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (_args: any) => {
        return `<header class="dsn-page-header">
  <div class="dsn-page-header__inner">
    <div class="dsn-page-header__start">
      <button type="button" class="dsn-button dsn-button--subtle">
        <svg class="dsn-icon" aria-hidden="true"><!-- menu icon --></svg>
        <span class="dsn-button__label">Menu</span>
      </button>
    </div>
    <div class="dsn-page-header__logo">
      <a href="/">
        <svg class="dsn-logo" aria-hidden="true"><!-- logo --></svg>
        <span class="dsn-visually-hidden">Naam organisatie — terug naar homepage</span>
      </a>
    </div>
    <div class="dsn-page-header__end">
      <button type="button" class="dsn-button dsn-button--subtle" aria-expanded="false" aria-controls="search-panel">
        <svg class="dsn-icon" aria-hidden="true"><!-- search icon --></svg>
        <span class="dsn-button__label">Zoeken</span>
      </button>
    </div>
  </div>
  <div class="dsn-page-header__search-panel" id="search-panel" hidden>
    <div class="dsn-page-header__search-inner">
      <div class="dsn-search-input-wrapper">
        <input type="search" class="dsn-text-input dsn-search-input" placeholder="Zoeken…" aria-label="Zoekopdracht" />
      </div>
      <button type="button" class="dsn-button dsn-button--strong">
        <span class="dsn-button__label">Zoeken</span>
      </button>
    </div>
  </div>
</header>`;
      },
    },
  },
  argTypes: {
    // ── Gedrag ──────────────────────────────────────────────────────────────
    sticky: {
      control: 'select',
      options: ['none', 'sticky', 'auto-hide'],
      table: { category: 'Gedrag' },
    },
    // ── Slots — ReactNode, niet bewerkbaar via controls ──────────────────────
    logoSlot: {
      control: false,
      table: { category: 'Slots' },
    },
    searchSlot: {
      control: false,
      table: { category: 'Slots' },
    },
    primaryNavigation: {
      control: false,
      table: { category: 'Slots' },
    },
    primaryNavigationLarge: {
      control: false,
      table: { category: 'Slots' },
    },
    secondaryNavigation: {
      control: false,
      table: { category: 'Slots' },
    },
    secondaryNavigationLarge: {
      control: false,
      table: { category: 'Slots' },
    },
    // ── Events ───────────────────────────────────────────────────────────────
    onMenuOpen: {
      control: false,
      table: { category: 'Events' },
    },
    onMenuClose: {
      control: false,
      table: { category: 'Events' },
    },
    onSearchOpen: {
      control: false,
      table: { category: 'Events' },
    },
    onSearchClose: {
      control: false,
      table: { category: 'Events' },
    },
  },
  args: {
    sticky: 'none',
    logoSlot,
    primaryNavigation: <PrimaryNavigation />,
    primaryNavigationLarge,
    secondaryNavigation,
    secondaryNavigationLarge,
    searchSlot,
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// VARIANTEN
// =============================================================================

export const WithStickyHeader: Story = {
  name: 'With sticky header',
  args: {
    sticky: 'sticky',
  },
  parameters: {
    docs: {
      description: {
        story:
          'De header blijft bovenaan de viewport vastgeplakt bij het scrollen. `position: sticky; inset-block-start: 0`.',
      },
    },
  },
};

export const WithAutoHide: Story = {
  name: 'With auto-hide',
  args: {
    sticky: 'auto-hide',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sticky header die verbergt bij scroll-down en terugkomt bij scroll-up. JS beheert `data-hidden` attribuut; CSS-transitie verzorgt de animatie.',
      },
    },
  },
};

export const WithSearchOpen: Story = {
  name: 'With search open',
  render: (args) => {
    return (
      <PageHeader
        {...args}
        onSearchOpen={() => {
          /* search panel opens via internal state */
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Klik op de zoekknop om het zoekpaneel te openen. Focus verplaatst automatisch naar het zoekveld.',
      },
    },
  },
};

export const WithMenuOpen: Story = {
  name: 'With menu open',
  parameters: {
    docs: {
      description: {
        story:
          'Klik op de menuknop om de navigatielade te openen. De Drawer schuift in vanuit links.',
      },
    },
  },
};

// =============================================================================
// OVERZICHTSSTORIES
// =============================================================================

export const LargeViewport: Story = {
  name: 'Large viewport',
  parameters: {
    viewport: { defaultViewport: 'large' },
    docs: {
      description: {
        story:
          'Op viewports ≥ 64em toont de header twee horizontale banden: een Masthead (neutrale achtergrond) met logo, servicemenu en inline zoekveld, en een Navigatiebalk (accent-1 achtergrond) met de primaire navigatie. De mobile layout is verborgen via `display: none`.',
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p
          style={{
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            fontSize: '0.875rem',
          }}
        >
          Default (zoekpaneel gesloten)
        </p>
        <PageHeader
          logoSlot={logoSlot}
          primaryNavigation={<PrimaryNavigation />}
          primaryNavigationLarge={primaryNavigationLarge}
          secondaryNavigation={secondaryNavigation}
          secondaryNavigationLarge={secondaryNavigationLarge}
          searchSlot={searchSlot}
        />
      </div>
    </div>
  ),
};
