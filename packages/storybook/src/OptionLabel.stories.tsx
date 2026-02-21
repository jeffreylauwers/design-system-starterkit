import type { Meta, StoryObj } from '@storybook/react';
import { OptionLabel } from '@dsn/components-react';
import DocsPage from './OptionLabel.docs.mdx';
import {
  TEKST,
  WEINIG_TEKST,
  VEEL_TEKST,
  TEKST_AR,
  VEEL_TEKST_AR,
  rtlDecorator,
  largeTextDecorator,
  highContrastDecorator,
} from './story-helpers';

const meta: Meta<typeof OptionLabel> = {
  title: 'Components/OptionLabel',
  component: OptionLabel,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    children: TEKST,
  },
};

export default meta;
type Story = StoryObj<typeof OptionLabel>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, children: TEKST },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OptionLabel>{TEKST}</OptionLabel>
      <OptionLabel disabled>{TEKST}</OptionLabel>
    </div>
  ),
};

export const ShortText: Story = {
  name: 'Short text',
  args: { children: WEINIG_TEKST },
};

export const LongText: Story = {
  name: 'Long text',
  args: { children: VEEL_TEKST },
};

export const LargeText: Story = {
  name: 'Large text (200%)',
  decorators: [largeTextDecorator],
  args: { children: TEKST },
};

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  args: { children: TEKST_AR },
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  args: { children: VEEL_TEKST_AR },
};

export const HighContrast: Story = {
  name: 'High contrast',
  decorators: [highContrastDecorator],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <OptionLabel>{TEKST}</OptionLabel>
      <OptionLabel disabled>{TEKST}</OptionLabel>
    </div>
  ),
};
