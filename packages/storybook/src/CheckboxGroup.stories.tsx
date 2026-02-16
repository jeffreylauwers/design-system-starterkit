import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup, CheckboxOption } from '@dsn/components-react';
import DocsPage from './CheckboxGroup.docs.mdx';

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
      <CheckboxOption label="Option 1" value="1" />
      <CheckboxOption label="Option 2" value="2" />
      <CheckboxOption label="Option 3" value="3" />
    </CheckboxGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default group</h3>
        <CheckboxGroup>
          <CheckboxOption label="Unchecked option" value="1" />
          <CheckboxOption label="Checked option" value="2" checked readOnly />
          <CheckboxOption label="Indeterminate option" value="3" indeterminate />
        </CheckboxGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With some disabled options</h3>
        <CheckboxGroup>
          <CheckboxOption label="Active option" value="1" />
          <CheckboxOption label="Disabled unchecked" value="2" disabled />
          <CheckboxOption label="Disabled checked" value="3" disabled checked readOnly />
          <CheckboxOption label="Another active option" value="4" />
        </CheckboxGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive group</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Multiple checkboxes can be selected at the same time.
        </p>
        <CheckboxGroup>
          <CheckboxOption label="Sport" value="sport" />
          <CheckboxOption label="Muziek" value="music" />
          <CheckboxOption label="Reizen" value="travel" />
          <CheckboxOption label="Lezen" value="reading" />
          <CheckboxOption label="Gaming" value="gaming" />
        </CheckboxGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long labels</h3>
        <div style={{ maxWidth: '500px' }}>
          <CheckboxGroup>
            <CheckboxOption
              label="This is a longer option that demonstrates how the checkbox group handles wrapped text when labels exceed the available width"
              value="1"
            />
            <CheckboxOption
              label="Another long option to show consistent spacing between items even when text wraps to multiple lines"
              value="2"
            />
            <CheckboxOption label="Short option" value="3" />
          </CheckboxGroup>
        </div>
      </div>
    </div>
  ),
};
