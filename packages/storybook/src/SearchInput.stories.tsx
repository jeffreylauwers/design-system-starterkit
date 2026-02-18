import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '@dsn/components-react';
import DocsPage from './SearchInput.docs.mdx';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
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
    placeholder: 'Zoeken...',
    disabled: false,
    readOnly: false,
    invalid: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With value',
  args: {
    defaultValue: 'zoekterm',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Zoek producten, pagina's, documenten...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'zoekterm',
  },
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    readOnly: true,
    value: 'zoekterm',
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    value: 'te kort',
  },
};

export const Widths: Story = {
  name: 'Width variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SearchInput width="xs" placeholder="xs" />
      <SearchInput width="sm" placeholder="sm" />
      <SearchInput width="md" placeholder="md" />
      <SearchInput width="lg" placeholder="lg" />
      <SearchInput width="xl" placeholder="xl" />
      <SearchInput width="full" placeholder="full" />
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
        <SearchInput placeholder="Zoeken..." />
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
        <SearchInput defaultValue="zoekterm" />
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
        <SearchInput disabled value="zoekterm" />
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
        <SearchInput readOnly value="zoekterm" />
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
        <SearchInput invalid value="te kort" />
      </div>
    </div>
  ),
};
