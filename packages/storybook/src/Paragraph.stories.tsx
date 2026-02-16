import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@dsn/components-react';
import DocsPage from './Paragraph.docs.mdx';

const meta: Meta<typeof Paragraph> = {
  title: 'Components/Paragraph',
  component: Paragraph,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'lead', 'small-print'],
    },
  },
  args: {
    variant: 'default',
    children: 'This is a paragraph of text. It demonstrates how the paragraph component renders with different variants and content lengths.',
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Lead</h3>
        <Paragraph variant="lead">
          This is a lead paragraph. It's typically used for introductory text that provides context or a summary. Lead paragraphs are larger and have more visual weight than default paragraphs.
        </Paragraph>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default</h3>
        <Paragraph variant="default">
          This is a default paragraph. It's used for regular body text throughout your application. Default paragraphs are designed for optimal readability with a balanced font size and line height.
        </Paragraph>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Small Print</h3>
        <Paragraph variant="small-print">
          This is small print. It's typically used for disclaimers, terms and conditions, copyright notices, or other supplementary information that needs less visual prominence.
        </Paragraph>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Paragraph variant="lead">
        The paragraph component automatically limits line length to 65 characters (65ch) for optimal readability. This is based on research showing that lines between 45-75 characters are easiest to read.
      </Paragraph>

      <Paragraph variant="default">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Paragraph>

      <Paragraph variant="default">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </Paragraph>

      <Paragraph variant="small-print">
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </Paragraph>
    </div>
  ),
};
