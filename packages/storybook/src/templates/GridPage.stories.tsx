import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Body,
  BreakoutSection,
  Button,
  Container,
  Grid,
  GridItem,
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
  Stack,
  UnorderedList,
} from '@dsn/components-react';

// =============================================================================
// GEDEELDE CONTENT (identiek aan BasePage stories)
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
          <MenuLink href="/level-2b" level={2}>
            Level 2b
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

const mainStyle: React.CSSProperties = {
  paddingBlock: 'var(--dsn-space-block-6xl)',
};

const breakoutSectionStyle: React.CSSProperties = {
  backgroundColor: 'var(--dsn-color-accent-1-bg-default)',
};

const breakoutInnerStyle: React.CSSProperties = {
  maxInlineSize: 'var(--dsn-page-max-inline-size)',
  marginInline: 'auto',
  paddingInline: 'var(--dsn-page-body-padding-inline)',
  paddingBlock: 'var(--dsn-space-block-4xl)',
};

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Templates/GridPage',
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
  name: 'Grid Page',
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
            <Stack space="2xl">
              {/* Rij 1: volle breedte */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12}>
                  <Container>
                    <Paragraph>Rij 1 — volle breedte (12 kolommen)</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* Rij 2: 2 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 1 van 2</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 2 van 2</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* Rij 3: 3 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 1 van 3</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 2 van 3</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 3 van 3</Paragraph>
                  </Container>
                </GridItem>
              </Grid>
            </Stack>
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

export const FullWidth: Story = {
  name: 'Grid Page: Full Width',
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
            <Stack space="2xl">
              {/* Rij 1: volle breedte */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12}>
                  <Container>
                    <Paragraph>Rij 1 — volle breedte (12 kolommen)</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* Rij 2: 2 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 1 van 2</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 2 van 2</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* Rij 3: 3 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 1 van 3</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 2 van 3</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={4}>
                  <Container>
                    <Paragraph>Rij 3 — kolom 3 van 3</Paragraph>
                  </Container>
                </GridItem>
              </Grid>
            </Stack>
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

export const WithBreakoutSection: Story = {
  name: 'Grid Page: with BreakoutSection',
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
            <Stack space="2xl">
              {/* Rij 1: volle breedte */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12}>
                  <Container>
                    <Paragraph>Rij 1 — volle breedte (12 kolommen)</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* BreakoutSection: breekt buiten de grid-container */}
              <BreakoutSection style={breakoutSectionStyle}>
                <div style={breakoutInnerStyle}>
                  <Heading level={2}>Uitgeslagen sectie</Heading>
                  <Paragraph>
                    Deze sectie breekt buiten de beperkte paginabreedte. De
                    inhoud erin is herbeperkt via een inner wrapper.
                  </Paragraph>
                </div>
              </BreakoutSection>

              {/* Rij 2: 2 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 1 van 2</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 2 van 2</Paragraph>
                  </Container>
                </GridItem>
              </Grid>
            </Stack>
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

export const FullWidthWithBreakoutSection: Story = {
  name: 'Grid Page: Full Width + BreakoutSection',
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
            <Stack space="2xl">
              {/* Rij 1: volle breedte */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12}>
                  <Container>
                    <Paragraph>Rij 1 — volle breedte (12 kolommen)</Paragraph>
                  </Container>
                </GridItem>
              </Grid>

              {/* BreakoutSection in full-width paginalayout */}
              <BreakoutSection style={breakoutSectionStyle}>
                <div
                  style={{
                    paddingBlock: 'var(--dsn-space-block-4xl)',
                    paddingInline: 'var(--dsn-page-body-padding-inline)',
                  }}
                >
                  <Heading level={2}>Uitgeslagen sectie</Heading>
                  <Paragraph>
                    Ook in full-width paginalayout breekt BreakoutSection
                    correct uit en beslaat de volledige breedte.
                  </Paragraph>
                </div>
              </BreakoutSection>

              {/* Rij 2: 2 kolommen vanaf md */}
              <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 1 van 2</Paragraph>
                  </Container>
                </GridItem>
                <GridItem colSpan={12} colSpanMd={6}>
                  <Container>
                    <Paragraph>Rij 2 — kolom 2 van 2</Paragraph>
                  </Container>
                </GridItem>
              </Grid>
            </Stack>
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
