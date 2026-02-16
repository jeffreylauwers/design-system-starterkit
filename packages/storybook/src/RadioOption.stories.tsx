import type { Meta, StoryObj } from '@storybook/react';
import { RadioOption } from '@dsn/components-react';
import DocsPage from './RadioOption.docs.mdx';

const meta: Meta<typeof RadioOption> = {
  title: 'Components/RadioOption',
  component: RadioOption,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Radio option',
    name: 'demo',
  },
};

export default meta;
type Story = StoryObj<typeof RadioOption>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default states</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioOption label="Unchecked option" name="demo-1" value="unchecked" />
          <RadioOption checked label="Checked option" name="demo-1" value="checked" readOnly />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled states</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioOption disabled label="Disabled unchecked" name="demo-2" value="disabled-unchecked" />
          <RadioOption checked disabled label="Disabled checked" name="demo-2" value="disabled-checked" readOnly />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Invalid state</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioOption invalid label="Invalid option" name="demo-3" value="invalid" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive group</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Click anywhere on the label or radio button to select. Only one can be selected at a time.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioOption label="Option A" name="demo-4" value="a" defaultChecked />
          <RadioOption label="Option B" name="demo-4" value="b" />
          <RadioOption label="Option C" name="demo-4" value="c" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long labels</h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <RadioOption
            label="This is a longer label that demonstrates how the radio option handles text wrapping when the label exceeds the available width. The label should maintain proper alignment with the radio button."
            name="demo-5"
            value="long-1"
          />
          <RadioOption
            checked
            label="Another long label that is checked to show how the checked state works with wrapped text. Notice how the radio button stays aligned at the top."
            name="demo-5"
            value="long-2"
            readOnly
          />
        </div>
      </div>
    </div>
  ),
};
