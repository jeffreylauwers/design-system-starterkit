import type { Meta, StoryObj } from '@storybook/react';
import { Button, Icon } from '@dsn/components-react';
import type { IconName } from '@dsn/components-react/icon-registry.generated';

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

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'strong',
        'default',
        'subtle',
        'link',
        'strong-negative',
        'default-negative',
        'subtle-negative',
        'strong-positive',
        'default-positive',
        'subtle-positive',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
    children: 'Button',
    variant: 'strong',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Strong: Story = {
  args: { variant: 'strong', children: 'Strong' },
};

export const DefaultVariant: Story = {
  name: 'Default variant',
  args: { variant: 'default', children: 'Default' },
};

export const Subtle: Story = {
  args: { variant: 'subtle', children: 'Subtle' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link button' },
};

export const Small: Story = {
  args: { size: 'small', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'large', children: 'Large' },
};

export const Loading: Story = {
  args: { loading: true, children: 'Saving...' },
};

export const LoadingWithIcon: Story = {
  name: 'Loading with icon',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="strong" loading iconStart={<Icon name="check" />}>
        Saving...
      </Button>
      <Button variant="default" loading iconStart={<Icon name="edit" />}>
        Updating...
      </Button>
      <Button variant="subtle" loading>
        Loading...
      </Button>
    </div>
  ),
};

export const LoadingSizes: Story = {
  name: 'Loading sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button size="small" loading>Small</Button>
      <Button size="default" loading>Default</Button>
      <Button size="large" loading>Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full width' },
};

export const NegativeSentiment: Story = {
  name: 'Negative sentiment',
  args: { variant: 'strong-negative', children: 'Delete' },
};

export const PositiveSentiment: Story = {
  name: 'Positive sentiment',
  args: { variant: 'strong-positive', children: 'Confirm' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="strong">Strong</Button>
        <Button variant="default">Default</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="link">Link</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="strong-negative">Strong negative</Button>
        <Button variant="default-negative">Default negative</Button>
        <Button variant="subtle-negative">Subtle negative</Button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="strong-positive">Strong positive</Button>
        <Button variant="default-positive">Default positive</Button>
        <Button variant="subtle-positive">Subtle positive</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const WithIconStart: Story = {
  name: 'With icon start',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="strong" iconStart={<Icon name="check" />}>
        Save
      </Button>
      <Button variant="default" iconStart={<Icon name="edit" />}>
        Edit
      </Button>
      <Button variant="subtle" iconStart={<Icon name="download" />}>
        Download
      </Button>
      <Button variant="strong-negative" iconStart={<Icon name="trash" />}>
        Delete
      </Button>
    </div>
  ),
};

export const WithIconEnd: Story = {
  name: 'With icon end',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="strong" iconEnd={<Icon name="arrow-right" />}>
        Next
      </Button>
      <Button variant="default" iconEnd={<Icon name="arrow-right" />}>
        Open
      </Button>
      <Button variant="subtle" iconEnd={<Icon name="chevron-down" />}>
        More
      </Button>
    </div>
  ),
};

export const WithIconStartAndEnd: Story = {
  name: 'With icon start and end',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button variant="strong" iconStart={<Icon name="check" />} iconEnd={<Icon name="arrow-right" />}>
        Confirm & continue
      </Button>
      <Button variant="default" iconStart={<Icon name="edit" />} iconEnd={<Icon name="chevron-down" />}>
        Edit options
      </Button>
    </div>
  ),
};

export const IconSizes: Story = {
  name: 'Icon sizes per button size',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button size="small" iconStart={<Icon name="check" />}>
        Small
      </Button>
      <Button size="default" iconStart={<Icon name="check" />}>
        Default
      </Button>
      <Button size="large" iconStart={<Icon name="check" />}>
        Large
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  name: 'Icon only',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Button variant="strong" iconOnly aria-label="Add">
        <Icon name="plus" />
      </Button>
      <Button variant="default" iconOnly aria-label="Settings">
        <Icon name="settings" />
      </Button>
      <Button variant="subtle" iconOnly aria-label="Close">
        <Icon name="x" />
      </Button>
      <Button variant="strong-negative" iconOnly aria-label="Delete">
        <Icon name="trash" />
      </Button>
    </div>
  ),
};
