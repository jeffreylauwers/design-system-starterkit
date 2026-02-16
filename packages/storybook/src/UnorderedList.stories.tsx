import type { Meta, StoryObj } from '@storybook/react';
import { UnorderedList } from '@dsn/components-react';
import DocsPage from './UnorderedList.docs.mdx';

const meta: Meta<typeof UnorderedList> = {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  args: {
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof UnorderedList>;

export const Default: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Simple list</h3>
        <UnorderedList>
          <li>Apples</li>
          <li>Bananas</li>
          <li>Oranges</li>
        </UnorderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>List with longer content</h3>
        <UnorderedList>
          <li>
            First item with a longer description that spans multiple lines to
            demonstrate how the list handles text wrapping and line height.
          </li>
          <li>
            Second item also has extended text to show consistent spacing and
            alignment across items of varying lengths.
          </li>
          <li>Third item with shorter text</li>
        </UnorderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Nested lists</h3>
        <UnorderedList>
          <li>
            Parent item 1
            <UnorderedList>
              <li>Child item 1.1</li>
              <li>Child item 1.2</li>
              <li>
                Child item 1.3
                <UnorderedList>
                  <li>Grandchild item 1.3.1</li>
                  <li>Grandchild item 1.3.2</li>
                </UnorderedList>
              </li>
            </UnorderedList>
          </li>
          <li>
            Parent item 2
            <UnorderedList>
              <li>Child item 2.1</li>
              <li>Child item 2.2</li>
            </UnorderedList>
          </li>
          <li>Parent item 3</li>
        </UnorderedList>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>List with inline elements</h3>
        <UnorderedList>
          <li>
            Item with <strong>bold text</strong> and <em>italic text</em>
          </li>
          <li>
            Item with a <a href="#">link to another page</a>
          </li>
          <li>
            Item with <code>inline code</code> formatting
          </li>
        </UnorderedList>
      </div>
    </div>
  ),
};
