import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioOption } from '@dsn/components-react';
import DocsPage from './RadioGroup.docs.mdx';

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
      <RadioOption name="demo" label="Option 1" value="1" />
      <RadioOption name="demo" label="Option 2" value="2" />
      <RadioOption name="demo" label="Option 3" value="3" />
    </RadioGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default group</h3>
        <RadioGroup>
          <RadioOption name="demo-1" label="Unchecked option" value="1" />
          <RadioOption name="demo-1" label="Checked option" value="2" checked readOnly />
          <RadioOption name="demo-1" label="Another unchecked option" value="3" />
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With some disabled options</h3>
        <RadioGroup>
          <RadioOption name="demo-2" label="Active option" value="1" />
          <RadioOption name="demo-2" label="Disabled unchecked" value="2" disabled />
          <RadioOption name="demo-2" label="Disabled checked" value="3" disabled checked readOnly />
          <RadioOption name="demo-2" label="Another active option" value="4" />
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive group</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Only one radio button can be selected at a time.
        </p>
        <RadioGroup>
          <RadioOption name="demo-3" label="Man" value="male" defaultChecked />
          <RadioOption name="demo-3" label="Vrouw" value="female" />
          <RadioOption name="demo-3" label="Anders" value="other" />
          <RadioOption name="demo-3" label="Wil ik niet zeggen" value="prefer-not-to-say" />
        </RadioGroup>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long labels</h3>
        <div style={{ maxWidth: '500px' }}>
          <RadioGroup>
            <RadioOption
              name="demo-4"
              label="This is a longer option that demonstrates how the radio group handles wrapped text when labels exceed the available width"
              value="1"
            />
            <RadioOption
              name="demo-4"
              label="Another long option to show consistent spacing between items even when text wraps to multiple lines"
              value="2"
            />
            <RadioOption name="demo-4" label="Short option" value="3" />
          </RadioGroup>
        </div>
      </div>
    </div>
  ),
};
