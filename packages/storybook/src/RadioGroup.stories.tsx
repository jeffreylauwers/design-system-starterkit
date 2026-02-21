import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioOption } from '@dsn/components-react';
import DocsPage from './RadioGroup.docs.mdx';
import {
  TEKST,
  TEKST_AR,
  rtlDecorator,
  largeTextDecorator,
  highContrastDecorator,
} from './story-helpers';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup>
      <RadioOption name="demo" label={TEKST} value="1" />
      <RadioOption name="demo" label={TEKST} value="2" />
      <RadioOption name="demo" label={TEKST} value="3" />
    </RadioGroup>
  ),
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>Default group</h3>
        <RadioGroup>
          <RadioOption name="demo-1" label={TEKST} value="1" />
          <RadioOption name="demo-1" label={TEKST} value="2" checked readOnly />
          <RadioOption name="demo-1" label={TEKST} value="3" />
        </RadioGroup>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With disabled options</h3>
        <RadioGroup>
          <RadioOption name="demo-2" label={TEKST} value="1" />
          <RadioOption name="demo-2" label={TEKST} value="2" disabled />
          <RadioOption
            name="demo-2"
            label={TEKST}
            value="3"
            disabled
            checked
            readOnly
          />
          <RadioOption name="demo-2" label={TEKST} value="4" />
        </RadioGroup>
      </div>
    </div>
  ),
};

export const LargeText: Story = {
  name: 'Large text (200%)',
  decorators: [largeTextDecorator],
  render: () => (
    <RadioGroup>
      <RadioOption name="lt-1" label={TEKST} value="1" />
      <RadioOption name="lt-1" label={TEKST} value="2" checked readOnly />
      <RadioOption name="lt-1" label={TEKST} value="3" />
    </RadioGroup>
  ),
};

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  render: () => (
    <RadioGroup>
      <RadioOption name="rtl-1" label={TEKST_AR} value="1" />
      <RadioOption name="rtl-1" label={TEKST_AR} value="2" checked readOnly />
      <RadioOption name="rtl-1" label={TEKST_AR} value="3" />
    </RadioGroup>
  ),
};

export const HighContrast: Story = {
  name: 'High contrast',
  decorators: [highContrastDecorator],
  render: () => (
    <RadioGroup>
      <RadioOption name="hc-1" label={TEKST} value="1" />
      <RadioOption name="hc-1" label={TEKST} value="2" checked readOnly />
      <RadioOption name="hc-1" label={TEKST} value="3" disabled />
    </RadioGroup>
  ),
};
