import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '@dsn/components-react';
import DocsPage from './TextInput.docs.mdx';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    width: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full', undefined],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Enter text...',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: 'Sample text',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Type your name here...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled text',
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    readOnly: true,
    value: 'Read-only text',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'Invalid input',
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Required field',
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextInput width="xs" placeholder="xs — 10ch (postcode, CVV)" />
      <TextInput width="sm" placeholder="sm — 14ch (tijdstip, korte codes)" />
      <TextInput width="md" placeholder="md — 20ch (datum, telefoonnummer)" />
      <TextInput width="lg" placeholder="lg — 32ch (naam, email)" />
      <TextInput width="xl" placeholder="xl — 48ch (URL)" />
      <TextInput width="full" placeholder="full — 100% (responsive)" />
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
        <TextInput placeholder="Enter text..." />
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
        <TextInput defaultValue="Sample text" />
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
        <TextInput disabled value="Disabled text" />
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
        <TextInput readOnly value="Read-only text" />
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
        <TextInput invalid value="Invalid input" />
      </div>
    </div>
  ),
};
