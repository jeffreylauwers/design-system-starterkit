import type { Meta, StoryObj } from '@storybook/react';
import { Link, Icon } from '@dsn/components-react';
import type { IconName } from '@dsn/components-react/icon-registry.generated';
import DocsPage from './Link.docs.mdx';

const iconOptions: (IconName | undefined)[] = [
  undefined,
  'alert-triangle',
  'archive',
  'arrow-down',
  'arrow-left',
  'arrow-narrow-down',
  'arrow-narrow-up',
  'arrow-right',
  'arrow-up',
  'bell',
  'calendar-event',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'circle-check',
  'clock',
  'dots-vertical',
  'download',
  'edit',
  'exclamation-circle',
  'external-link',
  'eye',
  'file-description',
  'folder',
  'heart-filled',
  'heart',
  'home',
  'info-circle',
  'loader',
  'mail',
  'menu',
  'message-circle',
  'minus',
  'paperclip',
  'plus',
  'search',
  'selector',
  'settings',
  'star-filled',
  'star',
  'trash',
  'upload',
  'user',
  'x',
];

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    disabled: { control: 'boolean' },
    current: { control: 'boolean' },
    external: { control: 'boolean' },
    iconStart: {
      control: 'select',
      options: iconOptions,
      mapping: iconOptions.reduce((acc, icon) => {
        acc[icon ?? 'undefined'] = icon ? <Icon name={icon} /> : undefined;
        return acc;
      }, {} as Record<string, React.ReactNode>),
    },
    iconEnd: {
      control: 'select',
      options: iconOptions,
      mapping: iconOptions.reduce((acc, icon) => {
        acc[icon ?? 'undefined'] = icon ? <Icon name={icon} /> : undefined;
        return acc;
      }, {} as Record<string, React.ReactNode>),
    },
  },
  args: {
    href: '#',
    children: 'This is a link',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Link href="#" size="small">
          Small link
        </Link>
      </div>
      <div>
        <Link href="#" size="default">
          Default link
        </Link>
      </div>
      <div>
        <Link href="#" size="large">
          Large link
        </Link>
      </div>
      <div>
        <p style={{ margin: 0 }}>
          Link without explicit size:{' '}
          <Link href="#">inherits surrounding font size</Link> seamlessly.
        </p>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default states</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="#">Normal link (hover to see effect)</Link>
          <Link href="#" current>
            Current page link
          </Link>
          <Link href="#" disabled>
            Disabled link
          </Link>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>External link</h3>
        <Link href="https://example.com" external>
          External site
        </Link>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockStart: '0.5rem' }}>
          Automatically adds target="_blank" and "(opens in new tab)" text
        </p>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With icons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="#" iconStart={<Icon name="download" />}>
            Download file
          </Link>
          <Link href="#" iconEnd={<Icon name="arrow-right" />}>
            Next page
          </Link>
          <Link href="#" iconStart={<Icon name="external-link" />} iconEnd={<Icon name="arrow-right" />}>
            With both icons
          </Link>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Icon sizes per link size</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="#" size="small" iconStart={<Icon name="check" />}>
            Small link with icon
          </Link>
          <Link href="#" size="default" iconStart={<Icon name="check" />}>
            Default link with icon
          </Link>
          <Link href="#" size="large" iconStart={<Icon name="check" />}>
            Large link with icon
          </Link>
        </div>
      </div>
    </div>
  ),
};
