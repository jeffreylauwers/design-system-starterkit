import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from '@dsn/components-react';
import DocsPage from './EmailInput.docs.mdx';
import {
  WEINIG_TEKST,
  VEEL_TEKST,
  TEKST_AR,
  VEEL_TEKST_AR,
  rtlDecorator,
  largeTextDecorator,
  highContrastDecorator,
} from './story-helpers';

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

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// VARIANTEN
// =============================================================================

export const WithValue: Story = {
  name: 'With value',
  args: { defaultValue: 'jan@voorbeeld.nl' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'jan@voorbeeld.nl' },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: { readOnly: true, value: 'jan@voorbeeld.nl' },
};

export const Invalid: Story = {
  args: { invalid: true, value: 'geen-geldig-email' },
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

// =============================================================================
// TEKST VARIANTEN
// =============================================================================

export const ShortText: Story = {
  name: 'Short text',
  args: { defaultValue: WEINIG_TEKST },
};

export const LongText: Story = {
  name: 'Long text',
  args: { defaultValue: VEEL_TEKST },
};

export const LargeText: Story = {
  name: 'Large text (200%)',
  decorators: [largeTextDecorator],
  args: { defaultValue: 'jan@voorbeeld.nl' },
};

// =============================================================================
// RTL
// =============================================================================

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  args: { defaultValue: TEKST_AR },
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  args: { defaultValue: VEEL_TEKST_AR },
};

// =============================================================================
// HIGH CONTRAST
// =============================================================================

export const HighContrast: Story = {
  name: 'High contrast',
  decorators: [highContrastDecorator],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
      }}
    >
      <EmailInput defaultValue="jan@voorbeeld.nl" />
      <EmailInput disabled value="jan@voorbeeld.nl" />
      <EmailInput invalid value="geen-geldig-email" />
    </div>
  ),
};
