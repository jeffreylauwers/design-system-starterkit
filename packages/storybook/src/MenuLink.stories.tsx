import type { Meta, StoryObj } from '@storybook/react';
import { Icon, MenuLink, NumberBadge } from '@dsn/components-react';
import DocsPage from './MenuLink.docs.mdx';

const meta: Meta<typeof MenuLink> = {
  title: 'Components/MenuLink',
  component: MenuLink,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const level =
          args.level && args.level > 1
            ? ` dsn-menu-link--level-${args.level}`
            : '';
        const ariaCurrent = args.current ? ' aria-current="page"' : '';
        return `<ul style="list-style: none; margin: 0; padding: 0;">\n  <li class="dsn-menu-link${level}">\n    <a class="dsn-menu-link__link" href="/pagina"${ariaCurrent}>\n      <span class="dsn-menu-link__label">${args.children ?? 'Dashboard'}</span>\n    </a>\n  </li>\n</ul>`;
      },
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    current: { control: 'boolean' },
    subItems: { control: 'boolean' },
    expanded: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    href: '/dashboard',
    children: 'Dashboard',
    level: 1,
    current: false,
    subItems: false,
    expanded: false,
  },
};

export default meta;
type Story = StoryObj<typeof MenuLink>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink {...args} />
    </ul>
  ),
};

// =============================================================================
// CURRENT (ACTIEVE PAGINA)
// =============================================================================

export const Current: Story = {
  name: 'Current (actieve pagina)',
  args: { current: true, children: 'Rapporten' },
  render: (args) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink {...args} />
    </ul>
  ),
};

// =============================================================================
// MET ICOON
// =============================================================================

export const WithIconStart: Story = {
  name: 'Met icoon (iconStart)',
  args: {
    iconStart: <Icon name="home" aria-hidden />,
    children: 'Dashboard',
  },
  render: (args) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink {...args} />
    </ul>
  ),
};

export const WithNumberBadge: Story = {
  name: 'Met NumberBadge',
  args: {
    href: '/inbox',
    iconStart: <Icon name="mail" aria-hidden />,
    numberBadge: <NumberBadge variant="negative">5</NumberBadge>,
    children: 'Inbox',
  },
  render: (args) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink {...args} />
    </ul>
  ),
};

// =============================================================================
// NIVEAU-HIËRARCHIE
// =============================================================================

export const Levels: Story = {
  name: 'Niveau-hiërarchie (level 1–4)',
  render: () => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink href="/rapporten" current>
        Rapporten
      </MenuLink>
      <MenuLink href="/rapporten/maandelijks" level={2}>
        Maandelijks
      </MenuLink>
      <MenuLink href="/rapporten/maandelijks/januari" level={3}>
        Januari
      </MenuLink>
      <MenuLink href="/rapporten/maandelijks/januari/week-1" level={4}>
        Week 1
      </MenuLink>
    </ul>
  ),
};

// =============================================================================
// UITKLAPBAAR
// =============================================================================

export const WithExpandButton: Story = {
  name: 'Met uitklapknop (subItems)',
  args: {
    href: '/rapporten',
    children: 'Rapporten',
    subItems: true,
    expanded: false,
  },
  render: (args) => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink {...args} />
    </ul>
  ),
};

export const ExpandedWithSubItems: Story = {
  name: "Uitgevouwen met subpagina's",
  render: () => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink
        href="/rapporten"
        iconStart={<Icon name="file-description" aria-hidden />}
        subItems
        expanded
      >
        Rapporten
      </MenuLink>
      <MenuLink href="/rapporten/maandelijks" level={2}>
        Maandelijks
      </MenuLink>
      <MenuLink href="/rapporten/kwartaal" level={2} current>
        Kwartaal
      </MenuLink>
      <MenuLink href="/rapporten/jaarlijks" level={2}>
        Jaarlijks
      </MenuLink>
    </ul>
  ),
};

// =============================================================================
// VOLLEDIG NAVIGATIEMENU
// =============================================================================

export const FullNavigation: Story = {
  name: 'Volledig navigatiemenu',
  render: () => (
    <nav aria-label="Primaire navigatie" style={{ maxWidth: '280px' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <MenuLink
          href="/dashboard"
          iconStart={<Icon name="home" aria-hidden />}
        >
          Dashboard
        </MenuLink>

        <MenuLink
          href="/inbox"
          iconStart={<Icon name="mail" aria-hidden />}
          numberBadge={<NumberBadge variant="negative">5</NumberBadge>}
        >
          Inbox
        </MenuLink>

        <MenuLink
          href="/rapporten"
          iconStart={<Icon name="file-description" aria-hidden />}
          subItems
          expanded
          current
        >
          Rapporten
        </MenuLink>

        <MenuLink href="/rapporten/maandelijks" level={2}>
          Maandelijks
        </MenuLink>

        <MenuLink href="/rapporten/kwartaal" level={2}>
          Kwartaal
        </MenuLink>

        <MenuLink
          href="/instellingen"
          iconStart={<Icon name="settings" aria-hidden />}
        >
          Instellingen
        </MenuLink>
      </ul>
    </nav>
  ),
};

// =============================================================================
// ALLE VARIANTEN
// =============================================================================

export const AllStates: Story = {
  name: 'Alle staten',
  render: () => (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      <MenuLink href="/standaard">Standaard</MenuLink>
      <MenuLink href="/actief" current>
        Actief (current)
      </MenuLink>
      <MenuLink href="/icoon" iconStart={<Icon name="home" aria-hidden />}>
        Met icoon
      </MenuLink>
      <MenuLink
        href="/badge"
        iconStart={<Icon name="mail" aria-hidden />}
        numberBadge={<NumberBadge variant="negative">12</NumberBadge>}
      >
        Met NumberBadge
      </MenuLink>
      <MenuLink href="/uitklap" subItems>
        Met uitklapknop
      </MenuLink>
      <MenuLink href="/level-2" level={2}>
        Level 2
      </MenuLink>
      <MenuLink href="/level-3" level={3}>
        Level 3
      </MenuLink>
      <MenuLink href="/level-4" level={4}>
        Level 4
      </MenuLink>
    </ul>
  ),
};
