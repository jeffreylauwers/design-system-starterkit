import type { Meta, StoryObj } from '@storybook/react';
import {
  Link,
  Logo,
  PageFooter,
  Paragraph,
  UnorderedList,
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

const contentSlot = (
  <Paragraph>
    Dit is een voorbeeldorganisatie. <Link href="/about">Meer informatie</Link>.
  </Paragraph>
);

const linksSlot = (
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

const meta: Meta<typeof PageFooter> = {
  title: 'Components/PageFooter',
  component: PageFooter,
  parameters: {
    layout: 'fullscreen',
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (_args: any) => {
        const isInverse = _args.colorScheme === 'inverse';
        return `<footer class="dsn-page-footer${isInverse ? ' dsn-page-footer--inverse' : ''}">
  <div class="dsn-page-footer__inner">
    <div class="dsn-grid">
      <div class="dsn-col-12 dsn-col-lg-3">
        <a href="/">
          <svg class="dsn-logo" aria-hidden="true"><!-- Logo SVG --></svg>
          <span class="dsn-visually-hidden">Starter Kit — terug naar homepage</span>
        </a>
      </div>
      <div class="dsn-col-12 dsn-col-lg-3 dsn-page-footer__empty-slot">
        <!-- leeg tussenslot -->
      </div>
      <div class="dsn-col-12 dsn-col-lg-3">
        <p class="dsn-paragraph">
          Dit is een voorbeeldorganisatie.
          <a class="dsn-link" href="/about">Meer informatie</a>.
        </p>
      </div>
      <div class="dsn-col-12 dsn-col-lg-3">
        <ul class="dsn-unordered-list">
          <li><a class="dsn-link" href="/privacy">Privacyverklaring</a></li>
          <li><a class="dsn-link" href="/accessibility">Toegankelijkheid</a></li>
          <li><a class="dsn-link" href="/cookies">Cookies</a></li>
          <li><a class="dsn-link" href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>`;
      },
    },
  },
  args: {
    logoSlot,
    contentSlot,
    linksSlot,
  },
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['default', 'inverse'],
      description:
        'Kleurschema: `default` (accent-1) of `inverse` (accent-1-inverse)',
    },
    logoSlot: { control: false },
    secondarySlot: { control: false },
    contentSlot: { control: false },
    linksSlot: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof PageFooter>;

// =============================================================================
// STORIES
// =============================================================================

export const Default: Story = {
  name: 'Default',
};

export const Inverse: Story = {
  name: 'Inverse',
  args: {
    colorScheme: 'inverse',
  },
  parameters: {
    docs: {
      description: {
        story:
          'De inverse kleurvariant (`colorScheme="inverse"`) gebruikt de `accent-1-inverse` achtergrond. Tekst- en linkkleuren schakelen automatisch via CSS custom property overrides voor voldoende contrast.',
      },
    },
  },
};

export const WithSecondarySlot: Story = {
  name: 'Met secondarySlot',
  args: {
    secondarySlot: (
      <Paragraph>Slot 2 — beschikbaar voor toekomstige inhoud.</Paragraph>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Het optionele `secondarySlot` (slot 2) vult de ruimte tussen het logo en de inhoud. Als het leeg is, is het verborgen via `:empty { display: none }` zodat geen onnodige ruimte wordt ingenomen op mobiel.',
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'Alle varianten',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <PageFooter
        logoSlot={logoSlot}
        contentSlot={contentSlot}
        linksSlot={linksSlot}
      />
      <PageFooter
        colorScheme="inverse"
        logoSlot={logoSlot}
        contentSlot={contentSlot}
        linksSlot={linksSlot}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Overzicht van beide kleurvarianten: `default` (accent-1) en `inverse` (accent-1-inverse).',
      },
    },
  },
};
