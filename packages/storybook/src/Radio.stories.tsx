import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@dsn/components-react';
import DocsPage from './Radio.docs.mdx';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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
  },
  args: {
    'aria-label': 'Radio',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default states</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Radio aria-label="Unchecked" name="demo-1" value="unchecked" />
            <span style={{ fontSize: '0.75rem' }}>Unchecked</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Radio checked aria-label="Checked" name="demo-1" value="checked" readOnly />
            <span style={{ fontSize: '0.75rem' }}>Checked</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled states</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Radio disabled aria-label="Disabled unchecked" name="demo-2" value="disabled-unchecked" />
            <span style={{ fontSize: '0.75rem' }}>Disabled</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Radio checked disabled aria-label="Disabled checked" name="demo-2" value="disabled-checked" readOnly />
            <span style={{ fontSize: '0.75rem' }}>Disabled checked</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Invalid state</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Radio invalid aria-label="Invalid" name="demo-3" value="invalid" />
            <span style={{ fontSize: '0.75rem' }}>Invalid</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Hover, focus (tab), and click to see interaction states
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Radio aria-label="Interactive option A" name="demo-4" value="a" defaultChecked />
          <Radio aria-label="Interactive option B" name="demo-4" value="b" />
          <Radio aria-label="Interactive option C" name="demo-4" value="c" />
        </div>
      </div>
    </div>
  ),
};
