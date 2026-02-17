import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from '@dsn/components-react';
import DocsPage from './EmailInput.docs.mdx';

const meta: Meta<typeof EmailInput> = {
  title: 'Components/EmailInput',
  component: EmailInput,
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
    placeholder: 'naam@voorbeeld.nl',
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: 'jan@voorbeeld.nl',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'jan@voorbeeld.nl',
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    readOnly: true,
    value: 'jan@voorbeeld.nl',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'geen-geldig-email',
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <EmailInput width="xs" placeholder="xs" />
      <EmailInput width="sm" placeholder="sm" />
      <EmailInput width="md" placeholder="md" />
      <EmailInput width="lg" placeholder="lg" />
      <EmailInput width="xl" placeholder="xl" />
      <EmailInput width="full" placeholder="full" />
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
        <EmailInput placeholder="naam@voorbeeld.nl" />
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
        <EmailInput defaultValue="jan@voorbeeld.nl" />
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
        <EmailInput disabled value="jan@voorbeeld.nl" />
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
        <EmailInput readOnly value="jan@voorbeeld.nl" />
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
        <EmailInput invalid value="geen-geldig-email" />
      </div>
    </div>
  ),
};
