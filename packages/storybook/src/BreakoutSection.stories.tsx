import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BreakoutSection, Heading, Paragraph } from '@dsn/components-react';
import DocsPage from './BreakoutSection.docs.mdx';

const meta: Meta<typeof BreakoutSection> = {
  title: 'Layout Components/BreakoutSection',
  component: BreakoutSection,
  parameters: {
    layout: 'fullscreen',
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (_args: any) =>
        `<section class="dsn-breakout-section" style="background-color: var(--dsn-color-accent-1-bg-default); padding-block: var(--dsn-space-block-4xl);">\n  <div style="max-inline-size: var(--dsn-page-max-inline-size); margin-inline: auto; padding-inline: var(--dsn-page-body-padding-inline);">\n    <!-- inhoud -->\n  </div>\n</section>`,
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside'],
    },
    children: { control: false },
  },
  args: {
    as: 'section',
  },
};

export default meta;
type Story = StoryObj<typeof BreakoutSection>;

// Wrapper die een beperkte paginabreedte simuleert zodat het uitslaan zichtbaar is
function ConstrainedPage({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxInlineSize: '960px',
        marginInline: 'auto',
        overflowX: 'clip',
        paddingBlock: 'var(--dsn-space-block-4xl)',
      }}
    >
      <div
        style={{
          paddingInline: 'var(--dsn-space-inline-3xl)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <ConstrainedPage>
      <Paragraph>Normale paginainhoud voor de uitgeslagen sectie.</Paragraph>
      <BreakoutSection
        {...args}
        style={{
          backgroundColor: 'var(--dsn-color-accent-1-bg-default)',
          paddingBlock: 'var(--dsn-space-block-4xl)',
        }}
      >
        <div
          style={{
            maxInlineSize: '960px',
            marginInline: 'auto',
            paddingInline: 'var(--dsn-space-inline-3xl)',
          }}
        >
          <Heading level={2}>Uitgeslagen sectie</Heading>
          <Paragraph>
            Deze sectie breekt buiten de beperkte paginabreedte en beslaat de
            volledige viewportbreedte. De inhoud erin is herbeperkt via een
            inner wrapper.
          </Paragraph>
        </div>
      </BreakoutSection>
      <Paragraph>Normale paginainhoud na de uitgeslagen sectie.</Paragraph>
    </ConstrainedPage>
  ),
};

// =============================================================================
// WITHOUT INNER CONSTRAINT
// =============================================================================

export const WithoutInnerConstraint: Story = {
  name: 'Without inner constraint',
  render: (args) => (
    <ConstrainedPage>
      <Paragraph>Normale paginainhoud voor de uitgeslagen sectie.</Paragraph>
      <BreakoutSection
        {...args}
        style={{
          backgroundColor: 'var(--dsn-color-accent-1-bg-default)',
          paddingBlock: 'var(--dsn-space-block-4xl)',
          paddingInline: 'var(--dsn-space-inline-3xl)',
        }}
      >
        <Heading level={2}>Uitgeslagen sectie zonder inner wrapper</Heading>
        <Paragraph>
          Inhoud loopt hier van rand tot rand mee, inclusief de tekst. Dit is
          passend voor visuele elementen zoals afbeeldingen of video, maar
          minder leesbaar voor lopende tekst.
        </Paragraph>
      </BreakoutSection>
      <Paragraph>Normale paginainhoud na de uitgeslagen sectie.</Paragraph>
    </ConstrainedPage>
  ),
};
