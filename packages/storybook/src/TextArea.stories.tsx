import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@dsn/components-react';
import DocsPage from './TextArea.docs.mdx';
import {
  TEKST,
  WEINIG_TEKST,
  VEEL_TEKST,
  TEKST_AR,
  VEEL_TEKST_AR,
  rtlDecorator,
} from './story-helpers';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
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
    rows: { control: 'number' },
  },
  args: {
    placeholder: TEKST,
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// VARIANTEN
// =============================================================================

export const WithValue: Story = {
  name: 'With value',
  args: { defaultValue: TEKST, readOnly: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: TEKST },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: { readOnly: true, value: TEKST },
};

export const Invalid: Story = {
  args: { invalid: true, value: TEKST },
};

export const RowVariants: Story = {
  name: 'Row variants',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
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
          2 rijen
        </label>
        <TextArea rows={2} placeholder={TEKST} />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          4 rijen (default)
        </label>
        <TextArea rows={4} placeholder={TEKST} />
      </div>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          8 rijen
        </label>
        <TextArea rows={8} placeholder={TEKST} />
      </div>
    </div>
  ),
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextArea width="sm" placeholder="sm — 16ch" rows={2} />
      <TextArea width="md" placeholder="md — 32ch" rows={2} />
      <TextArea width="lg" placeholder="lg — 48ch" rows={2} />
      <TextArea width="full" placeholder="full — 100%" rows={2} />
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
        <TextArea placeholder={TEKST} rows={3} />
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
        <TextArea defaultValue={TEKST} rows={3} readOnly />
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
        <TextArea disabled value={TEKST} rows={3} />
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
        <TextArea readOnly value={TEKST} rows={3} />
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
        <TextArea invalid value={TEKST} rows={3} />
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

// =============================================================================
// RTL
// =============================================================================

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  args: { defaultValue: TEKST_AR, readOnly: true },
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  args: { defaultValue: VEEL_TEKST_AR, readOnly: true },
};

// =============================================================================
// HIGH CONTRAST
// =============================================================================
