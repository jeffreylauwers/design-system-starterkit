import type { Meta, StoryObj } from '@storybook/react';
import { OptionLabel } from '@dsn/components-react';
import DocsPage from './OptionLabel.docs.mdx';

const meta: Meta<typeof OptionLabel> = {
  title: 'Components/OptionLabel',
  component: OptionLabel,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Option label',
  },
};

export default meta;
type Story = StoryObj<typeof OptionLabel>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default state</h3>
        <OptionLabel>Option label text</OptionLabel>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled state</h3>
        <OptionLabel disabled>Disabled option label</OptionLabel>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long text</h3>
        <div style={{ maxWidth: '400px' }}>
          <OptionLabel>
            This is a longer option label that demonstrates how the text wraps when it exceeds the available width. The label should maintain proper line height and readability.
          </OptionLabel>
        </div>
      </div>
    </div>
  ),
};
