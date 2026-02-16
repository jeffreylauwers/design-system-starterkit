import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@dsn/components-react';
import DocsPage from './Heading.docs.mdx';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    appearance: {
      control: 'select',
      options: ['heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6'],
    },
  },
  args: {
    level: 2,
    children: 'This is a heading',
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Heading level={1}>Heading Level 1</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: 3xl (40px-53px fluid), typically used once per page
        </p>
      </div>

      <div>
        <Heading level={2}>Heading Level 2</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: 2xl (32px-41px fluid), for major sections
        </p>
      </div>

      <div>
        <Heading level={3}>Heading Level 3</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: xl (24px-31px fluid), for subsections
        </p>
      </div>

      <div>
        <Heading level={4}>Heading Level 4</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: lg (20px-24.5px fluid), for smaller sections
        </p>
      </div>

      <div>
        <Heading level={5}>Heading Level 5</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: md (16px-20.5px fluid), for minor headings
        </p>
      </div>

      <div>
        <Heading level={6}>Heading Level 6</Heading>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
          Font size: sm (14px-17px fluid), for the smallest headings
        </p>
      </div>
    </div>
  ),
};

export const SemanticVsVisual: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBlockEnd: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Semantic h2, visual heading-1 (larger appearance):
        </p>
        <Heading level={2} appearance="heading-1">
          This is an h2 that looks like h1
        </Heading>
      </div>

      <div>
        <p style={{ marginBlockEnd: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Semantic h3, visual heading-5 (smaller appearance):
        </p>
        <Heading level={3} appearance="heading-5">
          This is an h3 that looks like h5
        </Heading>
      </div>

      <div>
        <p style={{ marginBlockEnd: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Use this pattern to maintain document structure while achieving desired visual hierarchy.
        </p>
      </div>
    </div>
  ),
};
