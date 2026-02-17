import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '@dsn/components-react';
import DocsPage from './NumberInput.docs.mdx';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    allowDecimals: { control: 'boolean' },
    width: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
  args: {
    placeholder: '0',
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
    allowDecimals: false,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};

export const WithDecimals: Story = {
  name: 'With decimals (allowDecimals)',
  args: {
    allowDecimals: true,
    placeholder: '0,00',
    defaultValue: '1.234,56',
  },
};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: '42',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Bijv. 1.234,56',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '1.234,56',
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    readOnly: true,
    value: '1.234,56',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'abc',
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <NumberInput width="xs" placeholder="xs" />
      <NumberInput width="sm" placeholder="sm" />
      <NumberInput width="md" placeholder="md" />
      <NumberInput width="lg" placeholder="lg" />
      <NumberInput width="xl" placeholder="xl" />
      <NumberInput width="full" placeholder="full" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
      }}
    >
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Default
        </label>
        <NumberInput placeholder="0,00" />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          With value
        </label>
        <NumberInput defaultValue="1.234,56" />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Disabled
        </label>
        <NumberInput disabled value="1.234,56" />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Read-only
        </label>
        <NumberInput readOnly value="1.234,56" />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Invalid
        </label>
        <NumberInput invalid value="abc" />
      </div>
    </div>
  ),
};
