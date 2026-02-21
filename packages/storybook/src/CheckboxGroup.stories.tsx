import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup, CheckboxOption } from '@dsn/components-react';
import DocsPage from './CheckboxGroup.docs.mdx';
import { TEKST, TEKST_AR, rtlDecorator } from './story-helpers';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup>
      <CheckboxOption label={TEKST} value="1" />
      <CheckboxOption label={TEKST} value="2" />
      <CheckboxOption label={TEKST} value="3" />
    </CheckboxGroup>
  ),
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>Default group</h3>
        <CheckboxGroup>
          <CheckboxOption label={TEKST} value="1" />
          <CheckboxOption label={TEKST} value="2" checked readOnly />
          <CheckboxOption label={TEKST} value="3" indeterminate />
        </CheckboxGroup>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With disabled options</h3>
        <CheckboxGroup>
          <CheckboxOption label={TEKST} value="1" />
          <CheckboxOption label={TEKST} value="2" disabled />
          <CheckboxOption label={TEKST} value="3" disabled checked readOnly />
          <CheckboxOption label={TEKST} value="4" />
        </CheckboxGroup>
      </div>
    </div>
  ),
};

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  render: () => (
    <CheckboxGroup>
      <CheckboxOption label={TEKST_AR} value="1" />
      <CheckboxOption label={TEKST_AR} value="2" checked readOnly />
      <CheckboxOption label={TEKST_AR} value="3" />
    </CheckboxGroup>
  ),
};
