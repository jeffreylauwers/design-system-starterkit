import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@dsn/components-react';
import DocsPage from './PasswordInput.docs.mdx';
import { rtlDecorator } from './story-helpers';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
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
    passwordAutocomplete: {
      control: 'select',
      options: ['current-password', 'new-password', 'off'],
    },
    width: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
  args: {
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
    passwordAutocomplete: 'current-password',
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// VARIANTEN
// =============================================================================

export const NewPassword: Story = {
  name: 'New password (registratie)',
  args: {
    passwordAutocomplete: 'new-password',
  },
};

export const WithPlaceholder: Story = {
  name: 'With placeholder',
  args: { placeholder: 'Wachtwoord' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'geheim123' },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: { readOnly: true, value: 'geheim123' },
};

export const Invalid: Story = {
  args: { invalid: true, value: 'te kort' },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((w) => (
        <div key={w}>
          <p
            style={{
              margin: '0 0 0.25rem',
              fontWeight: 'bold',
              fontSize: '0.875rem',
            }}
          >
            {w}
          </p>
          <PasswordInput width={w} />
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// OVERZICHTSSTORIES
// =============================================================================

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
        <PasswordInput />
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
        <PasswordInput defaultValue="geheim123" />
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
        <PasswordInput disabled value="geheim123" />
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
        <PasswordInput readOnly value="geheim123" />
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
        <PasswordInput invalid value="te kort" />
      </div>
    </div>
  ),
};

// =============================================================================
// LARGE TEXT
// =============================================================================

// =============================================================================
// RTL
// =============================================================================

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  args: { defaultValue: 'geheim123' },
};

// =============================================================================
// HIGH CONTRAST
// =============================================================================
