import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@dsn/components-react';
import DocsPage from './Logo.docs.mdx';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const isDecorative =
          args['aria-hidden'] === true || args['aria-hidden'] === 'true';
        const titleAttr = args.title ?? 'Starter Kit';

        if (isDecorative) {
          return `<svg class="dsn-logo" xmlns="http://www.w3.org/2000/svg" width="186" height="48" viewBox="0 0 186 48" fill="none" aria-hidden="true">
  <!-- geen <title> — omringende context levert de accessible name -->
  <path class="dsn-logo__primary" d="M0 0h185.491v48H0z"/>
  <path class="dsn-logo__label" d="M8 8h169.491v32H8z"/>
  <!-- letterpaden... -->
</svg>`;
        }

        return `<svg class="dsn-logo" xmlns="http://www.w3.org/2000/svg" width="186" height="48" viewBox="0 0 186 48" fill="none" role="img" aria-labelledby="dsn-logo-title">
  <title id="dsn-logo-title">${titleAttr}</title>
  <path class="dsn-logo__primary" d="M0 0h185.491v48H0z"/>
  <path class="dsn-logo__label" d="M8 8h169.491v32H8z"/>
  <!-- letterpaden met dsn-logo__primary -->
</svg>`;
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    'aria-hidden': { control: 'boolean' },
  },
  args: {
    title: 'Starter Kit',
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// VARIANTEN
// =============================================================================

export const Decorative: Story = {
  name: 'Decorative (in link)',
  render: () => (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <Logo aria-hidden={true} />
      <span className="dsn-visually-hidden">
        Starter Kit — terug naar homepage
      </span>
    </a>
  ),
};

export const CustomTitle: Story = {
  name: 'Custom title',
  args: {
    title: 'Mijn Organisatie',
  },
};

// =============================================================================
// OVERZICHTSSTORIES
// =============================================================================

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--dsn-color-neutral-color-default)',
            marginBlockEnd: '0.5rem',
          }}
        >
          {'Standalone (role="img" + title)'}
        </p>
        <Logo />
      </div>

      <div>
        <p
          style={{
            fontSize: '0.75rem',
            color: 'var(--dsn-color-neutral-color-default)',
            marginBlockEnd: '0.5rem',
          }}
        >
          {'Decoratief in link (aria-hidden="true")'}
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <Logo aria-hidden={true} />
          <span className="dsn-visually-hidden">
            Starter Kit — terug naar homepage
          </span>
        </a>
      </div>
    </div>
  ),
};
