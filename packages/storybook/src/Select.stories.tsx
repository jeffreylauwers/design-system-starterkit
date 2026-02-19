import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@dsn/components-react';
import DocsPage from './Select.docs.mdx';

const OPTIONS = (
  <>
    <option value="">Kies een optie</option>
    <option value="nl">Nederland</option>
    <option value="be">België</option>
    <option value="de">Duitsland</option>
    <option value="fr">Frankrijk</option>
    <option value="gb">Verenigd Koninkrijk</option>
  </>
);

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    width: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
  args: {
    disabled: false,
    invalid: false,
    required: false,
    children: OPTIONS,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: 'nl',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'nl',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select width="xs">{OPTIONS}</Select>
      <Select width="sm">{OPTIONS}</Select>
      <Select width="md">{OPTIONS}</Select>
      <Select width="lg">{OPTIONS}</Select>
      <Select width="xl">{OPTIONS}</Select>
      <Select width="full">{OPTIONS}</Select>
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
        <Select>{OPTIONS}</Select>
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
        <Select defaultValue="nl">{OPTIONS}</Select>
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
        <Select disabled defaultValue="nl">
          {OPTIONS}
        </Select>
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
        <Select invalid>{OPTIONS}</Select>
      </div>
    </div>
  ),
};
