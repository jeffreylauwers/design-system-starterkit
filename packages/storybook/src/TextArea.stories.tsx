import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@dsn/components-react';
import DocsPage from './TextArea.docs.mdx';

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
    placeholder: 'Enter text...',
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default state</h3>
        <TextArea placeholder="Enter your message..." rows={4} />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With value</h3>
        <TextArea
          value="This is a sample text that spans multiple lines to demonstrate how the textarea component handles longer content."
          rows={4}
          readOnly
        />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Disabled state</h3>
        <TextArea disabled placeholder="Disabled textarea" value="Cannot edit this text" rows={3} />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Read-only state</h3>
        <TextArea readOnly value="Read-only content that cannot be modified" rows={3} />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Invalid state</h3>
        <TextArea invalid placeholder="Invalid textarea" aria-invalid="true" rows={3} />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Interactive (hover, focus)</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Hover over the textarea and click to focus. Notice the border changes. You can resize it vertically.
        </p>
        <TextArea placeholder="Try hovering, focusing, and resizing..." rows={4} />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Different row heights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              2 rows - Short message
            </label>
            <TextArea rows={2} placeholder="Short message" />
          </div>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              4 rows - Default
            </label>
            <TextArea rows={4} placeholder="Default message size" />
          </div>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              8 rows - Long message
            </label>
            <TextArea rows={8} placeholder="Long message or detailed description" />
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Width variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              SM (16ch) - Narrow
            </label>
            <TextArea width="sm" placeholder="Narrow textarea" rows={3} />
          </div>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              MD (32ch) - Medium
            </label>
            <TextArea width="md" placeholder="Medium textarea" rows={3} />
          </div>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              LG (48ch) - Large
            </label>
            <TextArea width="lg" placeholder="Large textarea" rows={3} />
          </div>
          <div>
            <label style={{ display: 'block', marginBlockEnd: '0.5rem', fontSize: '0.875rem' }}>
              Full (100%) - Responsive
            </label>
            <TextArea width="full" placeholder="Full width textarea" rows={3} />
          </div>
        </div>
      </div>
    </div>
  ),
};
