import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxOption } from '@dsn/components-react';
import DocsPage from './CheckboxOption.docs.mdx';

const meta: Meta<typeof CheckboxOption> = {
  title: 'Components/CheckboxOption',
  component: CheckboxOption,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Checkbox option',
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxOption>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default states</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxOption label="Unchecked option" />
          <CheckboxOption checked label="Checked option" readOnly />
          <CheckboxOption indeterminate label="Indeterminate option" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled states</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxOption disabled label="Disabled unchecked" />
          <CheckboxOption checked disabled label="Disabled checked" readOnly />
          <CheckboxOption indeterminate disabled label="Disabled indeterminate" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Invalid state</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxOption invalid label="Invalid option" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Click anywhere on the label or checkbox to toggle. Hover, focus (tab), and click to see interaction states.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxOption label="Interactive unchecked" />
          <CheckboxOption checked label="Interactive checked" readOnly />
          <CheckboxOption indeterminate label="Interactive indeterminate" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long labels</h3>
        <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CheckboxOption label="This is a longer label that demonstrates how the checkbox option handles text wrapping when the label exceeds the available width. The label should maintain proper alignment with the checkbox." />
          <CheckboxOption
            checked
            label="Another long label that is checked to show how the checked state works with wrapped text. Notice how the checkbox stays aligned at the top."
            readOnly
          />
        </div>
      </div>
    </div>
  ),
};
