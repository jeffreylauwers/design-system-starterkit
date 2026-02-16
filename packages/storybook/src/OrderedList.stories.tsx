import type { Meta, StoryObj } from '@storybook/react';
import { OrderedList } from '@dsn/components-react';
import DocsPage from './OrderedList.docs.mdx';

const meta: Meta<typeof OrderedList> = {
  title: 'Components/OrderedList',
  component: OrderedList,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    start: { control: 'number' },
    reversed: { control: 'boolean' },
  },
  args: {
    children: (
      <>
        <li>First step</li>
        <li>Second step</li>
        <li>Third step</li>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof OrderedList>;

export const Default: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Simple numbered list</h3>
        <OrderedList>
          <li>First step</li>
          <li>Second step</li>
          <li>Third step</li>
        </OrderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>List with longer content</h3>
        <OrderedList>
          <li>
            First step with a longer description that spans multiple lines to
            demonstrate how the list handles text wrapping and line height.
          </li>
          <li>
            Second step also has extended text to show consistent spacing and
            alignment across items of varying lengths.
          </li>
          <li>Third step with shorter text</li>
        </OrderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Starting from a specific number
        </h3>
        <OrderedList start={5}>
          <li>Fifth step (starts at 5)</li>
          <li>Sixth step</li>
          <li>Seventh step</li>
        </OrderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Reversed numbering</h3>
        <OrderedList reversed>
          <li>Third step (shows 3)</li>
          <li>Second step (shows 2)</li>
          <li>First step (shows 1)</li>
        </OrderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Nested ordered lists</h3>
        <OrderedList>
          <li>
            Parent step 1
            <OrderedList>
              <li>Substep 1.1</li>
              <li>Substep 1.2</li>
              <li>
                Substep 1.3
                <OrderedList>
                  <li>Sub-substep 1.3.1</li>
                  <li>Sub-substep 1.3.2</li>
                </OrderedList>
              </li>
            </OrderedList>
          </li>
          <li>
            Parent step 2
            <OrderedList>
              <li>Substep 2.1</li>
              <li>Substep 2.2</li>
            </OrderedList>
          </li>
          <li>Parent step 3</li>
        </OrderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>List with inline elements</h3>
        <OrderedList>
          <li>
            Step with <strong>bold text</strong> and <em>italic text</em>
          </li>
          <li>
            Step with a <a href="#">link to another page</a>
          </li>
          <li>
            Step with <code>inline code</code> formatting
          </li>
        </OrderedList>
      </div>
    </div>
  ),
};
