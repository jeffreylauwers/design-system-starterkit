import type { Meta, StoryObj } from '@storybook/react';
import { Icon, StatusBadge } from '@dsn/components-react';
import DocsPage from './StatusBadge.docs.mdx';
import {
  TEKST,
  WEINIG_TEKST,
  VEEL_TEKST,
  TEKST_AR,
  VEEL_TEKST_AR,
  rtlDecorator,
} from './story-helpers';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const variant = args.variant ?? 'neutral';
        const cls = [
          'dsn-status-badge',
          variant !== 'neutral' && `dsn-status-badge--${variant}`,
        ]
          .filter(Boolean)
          .join(' ');
        const iconMap: Record<string, string> = {
          info: 'info-circle',
          positive: 'circle-check',
          negative: 'exclamation-circle',
          warning: 'alert-triangle',
        };
        const iconName = iconMap[variant];
        const hasIcon = args.iconStart !== undefined && iconName;
        const icon = hasIcon
          ? `\n  <svg class="dsn-icon dsn-icon--sm" aria-hidden="true"><!-- ${iconName} --></svg>`
          : '';
        const label = args.children ?? TEKST;
        return `<strong class="${cls}">${icon}\n  ${label}\n</strong>`;
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'positive', 'negative', 'warning', 'info'],
    },
    iconStart: { control: false },
    children: { control: 'text' },
  },
  args: {
    children: TEKST,
    variant: 'neutral',
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {};

export const Info: Story = {
  args: {
    variant: 'info',
    iconStart: <Icon name="info-circle" size="sm" aria-hidden />,
  },
};

export const Positive: Story = {
  args: {
    variant: 'positive',
    iconStart: <Icon name="circle-check" size="sm" aria-hidden />,
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    iconStart: <Icon name="exclamation-circle" size="sm" aria-hidden />,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    iconStart: <Icon name="alert-triangle" size="sm" aria-hidden />,
  },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <StatusBadge>{TEKST}</StatusBadge>
        <StatusBadge
          variant="info"
          iconStart={<Icon name="info-circle" size="sm" aria-hidden />}
        >
          {TEKST}
        </StatusBadge>
        <StatusBadge
          variant="positive"
          iconStart={<Icon name="circle-check" size="sm" aria-hidden />}
        >
          {TEKST}
        </StatusBadge>
        <StatusBadge
          variant="negative"
          iconStart={<Icon name="exclamation-circle" size="sm" aria-hidden />}
        >
          {TEKST}
        </StatusBadge>
        <StatusBadge
          variant="warning"
          iconStart={<Icon name="alert-triangle" size="sm" aria-hidden />}
        >
          {TEKST}
        </StatusBadge>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <StatusBadge>{TEKST}</StatusBadge>
        <StatusBadge variant="info">{TEKST}</StatusBadge>
        <StatusBadge variant="positive">{TEKST}</StatusBadge>
        <StatusBadge variant="negative">{TEKST}</StatusBadge>
        <StatusBadge variant="warning">{TEKST}</StatusBadge>
      </div>
    </div>
  ),
};

export const WithoutIcon: Story = {
  name: 'Without icon',
  args: {
    variant: 'positive',
  },
};

export const ShortText: Story = {
  name: 'Short text',
  args: { children: WEINIG_TEKST },
};

export const LongText: Story = {
  name: 'Long text',
  args: { children: VEEL_TEKST },
};

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  render: () => (
    <div dir="rtl" lang="ar">
      <StatusBadge
        variant="info"
        iconStart={<Icon name="info-circle" size="sm" aria-hidden />}
      >
        {TEKST_AR}
      </StatusBadge>
    </div>
  ),
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  args: { children: VEEL_TEKST_AR },
};
