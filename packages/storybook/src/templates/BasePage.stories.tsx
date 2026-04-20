import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Body,
  Button,
  Heading,
  Link,
  Logo,
  Menu,
  MenuLink,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  Paragraph,
  SearchInput,
  SkipLink,
  UnorderedList,
} from '@dsn/components-react';

// =============================================================================
// GEDEELDE CONTENT (identiek aan PageLayout/PageHeader/PageFooter stories)
// =============================================================================

const logoSlot = (
  <a href="/">
    <Logo aria-hidden={true} />
    <span className="dsn-visually-hidden">
      Starter Kit — terug naar homepage
    </span>
  </a>
);

function PrimaryNavigation() {
  const [exp1b, setExp1b] = React.useState(false);
  const [exp2b, setExp2b] = React.useState(false);
  const [exp3b, setExp3b] = React.useState(false);

  return (
    <Menu orientation="vertical">
      <MenuLink href="/level-1a" level={1} current>
        Level 1a
      </MenuLink>
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
      <MenuLink href="/level-1c" level={1}>
        Level 1c
      </MenuLink>
      <MenuLink href="/level-1d" level={1}>
        Level 1d
      </MenuLink>
    </Menu>
  );
}

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

const secondaryNavigation = (
  <Menu orientation="vertical">
    <MenuLink href="/english" level={1}>
      English
    </MenuLink>
    <MenuLink href="/mijn-omgeving" level={1}>
      Mijn omgeving
    </MenuLink>
  </Menu>
);

const secondaryNavigationLarge = (
  <Menu orientation="horizontal">
    <MenuLink href="/english" level={1}>
      English
    </MenuLink>
    <MenuLink href="/mijn-omgeving" level={1}>
      Mijn omgeving
    </MenuLink>
  </Menu>
);

const searchSlot = (
  <>
    <SearchInput placeholder="Zoeken…" aria-label="Zoekopdracht" />
    <Button variant="strong">Zoeken</Button>
  </>
);

const footerSlot1 = (
  <a href="/">
    <Logo aria-hidden={true} />
    <span className="dsn-visually-hidden">
      Starter Kit — terug naar homepage
    </span>
  </a>
);

const footerSlot2 = (
  <Paragraph>
    Dit is een voorbeeldorganisatie. <Link href="/about">Meer informatie</Link>.
  </Paragraph>
);

const footerSlot3 = (
  <UnorderedList>
    <li>
      <Link href="/nieuws">Nieuws</Link>
    </li>
    <li>
      <Link href="/over-ons">Over ons</Link>
    </li>
    <li>
      <Link href="/werken-bij">Werken bij</Link>
    </li>
    <li>
      <Link href="/klachten">Klachten</Link>
    </li>
  </UnorderedList>
);

const footerSlot4 = (
  <UnorderedList>
    <li>
      <Link href="/privacy">Privacyverklaring</Link>
    </li>
    <li>
      <Link href="/accessibility">Toegankelijkheid</Link>
    </li>
    <li>
      <Link href="/cookies">Cookies</Link>
    </li>
    <li>
      <Link href="/contact">Contact</Link>
    </li>
  </UnorderedList>
);

// Padding op <main>: 64px boven/onder (--dsn-space-block-6xl),
// Template-specifiek: bewust niet via Container of een herbruikbare klasse —
// andere templates kiezen zelf hun eigen spacing.
const mainStyle: React.CSSProperties = {
  paddingBlock: 'var(--dsn-space-block-6xl)',
};

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Templates/BasePage',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  name: 'Base Page',
  render: () => (
    <Body>
      <SkipLink href="#main-content" />
      <PageLayout>
        <PageHeader
          logoSlot={logoSlot}
          primaryNavigation={<PrimaryNavigation />}
          primaryNavigationLarge={primaryNavigationLarge}
          secondaryNavigation={secondaryNavigation}
          secondaryNavigationLarge={secondaryNavigationLarge}
          searchSlot={searchSlot}
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={mainStyle}>
            <Heading level={1}>Paginatitel</Heading>
            <Paragraph>
              Dit is de basisstructuur van een pagina in het design system. De
              footer staat altijd onderaan de viewport, ongeacht de hoeveelheid
              inhoud.
            </Paragraph>
            <Paragraph>
              Voeg hier de paginaspecifieke inhoud toe:{' '}
              <Link href="#">tekst</Link>, formulieren, tabellen of andere
              componenten.
            </Paragraph>
          </main>
        </PageBody>
        <PageFooter
          slot1={footerSlot1}
          slot2={footerSlot2}
          slot3={footerSlot3}
          slot4={footerSlot4}
        />
      </PageLayout>
    </Body>
  ),
};

export const Inverse: Story = {
  name: 'Base Page: Inverse',
  render: () => (
    <Body>
      <SkipLink href="#main-content" />
      <PageLayout>
        <PageHeader
          logoSlot={logoSlot}
          colorScheme="inverse"
          primaryNavigation={<PrimaryNavigation />}
          primaryNavigationLarge={primaryNavigationLarge}
          secondaryNavigation={secondaryNavigation}
          secondaryNavigationLarge={secondaryNavigationLarge}
          searchSlot={searchSlot}
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={mainStyle}>
            <Heading level={1}>Paginatitel</Heading>
            <Paragraph>
              De inverse variant: PageHeader en PageFooter met
              colorScheme=&quot;inverse&quot;. De accent-1-inverse achtergrond
              geeft de pagina een prominente huisstijlkleur.
            </Paragraph>
          </main>
        </PageBody>
        <PageFooter
          colorScheme="inverse"
          slot1={footerSlot1}
          slot2={footerSlot2}
          slot3={footerSlot3}
          slot4={footerSlot4}
        />
      </PageLayout>
    </Body>
  ),
};

export const FullWidth: Story = {
  name: 'Base Page: Full Width',
  render: () => (
    <Body>
      <SkipLink href="#main-content" />
      <PageLayout
        style={{ '--dsn-page-max-inline-size': 'none' } as React.CSSProperties}
      >
        <PageHeader
          logoSlot={logoSlot}
          primaryNavigation={<PrimaryNavigation />}
          primaryNavigationLarge={primaryNavigationLarge}
          secondaryNavigation={secondaryNavigation}
          secondaryNavigationLarge={secondaryNavigationLarge}
          searchSlot={searchSlot}
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={mainStyle}>
            <Heading level={1}>Paginatitel</Heading>
            <Paragraph>
              Dit is de basisstructuur van een pagina in het design system. De
              footer staat altijd onderaan de viewport, ongeacht de hoeveelheid
              inhoud.
            </Paragraph>
            <Paragraph>
              Voeg hier de paginaspecifieke inhoud toe:{' '}
              <Link href="#">tekst</Link>, formulieren, tabellen of andere
              componenten.
            </Paragraph>
          </main>
        </PageBody>
        <PageFooter
          slot1={footerSlot1}
          slot2={footerSlot2}
          slot3={footerSlot3}
          slot4={footerSlot4}
        />
      </PageLayout>
    </Body>
  ),
};
