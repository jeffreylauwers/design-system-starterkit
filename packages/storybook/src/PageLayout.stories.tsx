import type { Meta, StoryObj } from '@storybook/react';
import {
  Logo,
  Link,
  Menu,
  MenuLink,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  SkipLink,
  UnorderedList,
} from '@dsn/components-react';

// =============================================================================
// META
// =============================================================================

const logoLink = (
  <a href="/">
    <Logo aria-hidden={true} />
    <span className="dsn-visually-hidden">
      Starter Kit — terug naar homepage
    </span>
  </a>
);

const primaryNav = (
  <Menu orientation="vertical">
    <MenuLink href="/" level={1} current>
      Home
    </MenuLink>
    <MenuLink href="/over-ons" level={1}>
      Over ons
    </MenuLink>
    <MenuLink href="/nieuws" level={1}>
      Nieuws
    </MenuLink>
    <MenuLink href="/contact" level={1}>
      Contact
    </MenuLink>
  </Menu>
);

const primaryNavLarge = (
  <Menu orientation="horizontal">
    <MenuLink href="/" level={1} current>
      Home
    </MenuLink>
    <MenuLink href="/over-ons" level={1}>
      Over ons
    </MenuLink>
    <MenuLink href="/nieuws" level={1}>
      Nieuws
    </MenuLink>
    <MenuLink href="/contact" level={1}>
      Contact
    </MenuLink>
  </Menu>
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
      <Link href="/contact">Contact</Link>
    </li>
  </UnorderedList>
);

const meta: Meta<typeof PageLayout> = {
  title: 'Components/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    dsn: {
      htmlTemplate:
        () => `<a href="#main-content" class="dsn-skip-link">Ga direct naar de hoofdinhoud</a>
<div class="dsn-page-layout">
  <header class="dsn-page-header"><!-- PageHeader --></header>
  <div class="dsn-page-body">
    <main id="main-content" tabindex="-1">
      <!-- paginainhoud -->
    </main>
  </div>
  <footer class="dsn-page-footer"><!-- PageFooter --></footer>
</div>`,
    },
  },
  argTypes: {
    className: { control: false },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof PageLayout>;

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  name: 'Default',
  render: () => (
    <>
      <SkipLink href="#main-content" />
      <PageLayout>
        <PageHeader
          logoSlot={logoLink}
          primaryNavigation={primaryNav}
          primaryNavigationLarge={primaryNavLarge}
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={{ padding: '2rem' }}>
            <p>
              Paginainhoud staat hier. De footer staat altijd onderaan de
              viewport.
            </p>
          </main>
        </PageBody>
        <PageFooter slot1={logoLink} slot3={footerSlot3} slot4={footerSlot4} />
      </PageLayout>
    </>
  ),
};
