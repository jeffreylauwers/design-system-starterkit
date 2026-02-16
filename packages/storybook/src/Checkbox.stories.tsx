import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@dsn/components-react';
import DocsPage from './Checkbox.docs.mdx';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
  },
  args: {
    'aria-label': 'Checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default states</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox aria-label="Unchecked" />
            <span style={{ fontSize: '0.75rem' }}>Unchecked</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox checked aria-label="Checked" readOnly />
            <span style={{ fontSize: '0.75rem' }}>Checked</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox indeterminate aria-label="Indeterminate" />
            <span style={{ fontSize: '0.75rem' }}>Indeterminate</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled states</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox disabled aria-label="Disabled unchecked" />
            <span style={{ fontSize: '0.75rem' }}>Disabled</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox checked disabled aria-label="Disabled checked" readOnly />
            <span style={{ fontSize: '0.75rem' }}>Disabled checked</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox
              indeterminate
              disabled
              aria-label="Disabled indeterminate"
            />
            <span style={{ fontSize: '0.75rem' }}>Disabled indeterminate</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Invalid state</h3>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Checkbox invalid aria-label="Invalid" />
            <span style={{ fontSize: '0.75rem' }}>Invalid</span>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive</h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBlockEnd: '1rem',
          }}
        >
          Hover, focus (tab), and click to see interaction states
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Checkbox aria-label="Interactive unchecked" />
          <Checkbox checked aria-label="Interactive checked" readOnly />
          <Checkbox indeterminate aria-label="Interactive indeterminate" />
        </div>
      </div>
    </div>
  ),
};
