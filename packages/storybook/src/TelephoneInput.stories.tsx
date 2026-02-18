import type { Meta, StoryObj } from '@storybook/react';
import { TelephoneInput } from '@dsn/components-react';
import DocsPage from './TelephoneInput.docs.mdx';

const meta: Meta<typeof TelephoneInput> = {
  title: 'Components/TelephoneInput',
  component: TelephoneInput,
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
    width: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
  args: {
    placeholder: '06 12345678',
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof TelephoneInput>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: '06 12345678',
  },
};

export const International: Story = {
  name: 'International format',
  args: {
    defaultValue: '+31 6 12345678',
    placeholder: '+31 6 12345678',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '06 12345678',
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    readOnly: true,
    value: '06 12345678',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'geen nummer',
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TelephoneInput width="xs" placeholder="xs" />
      <TelephoneInput width="sm" placeholder="sm" />
      <TelephoneInput width="md" placeholder="md" />
      <TelephoneInput width="lg" placeholder="lg" />
      <TelephoneInput width="xl" placeholder="xl" />
      <TelephoneInput width="full" placeholder="full" />
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
        <TelephoneInput placeholder="06 12345678" />
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
        <TelephoneInput defaultValue="06 12345678" />
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
        <TelephoneInput disabled value="06 12345678" />
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
        <TelephoneInput readOnly value="06 12345678" />
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
        <TelephoneInput invalid value="geen nummer" />
      </div>
    </div>
  ),
};
