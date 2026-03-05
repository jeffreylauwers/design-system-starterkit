import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from '@dsn/components-react';
import DocsPage from './Grid.docs.mdx';

/** Placeholder box voor visuele demonstratie van Grid-kolommen */
const Box = ({ label, height }: { label?: string; height?: string }) => (
  <div
    style={{
      padding: '0.75rem 1rem',
      background: 'var(--dsn-color-neutral-bg-default)',
      border: '1px solid var(--dsn-color-neutral-border-subtle)',
      borderRadius: '4px',
      fontSize: '0.875rem',
      color: 'var(--dsn-color-neutral-color-document)',
      fontFamily: 'monospace',
      blockSize: height,
    }}
  >
    {label ?? 'Inhoud'}
  </div>
);

const meta: Meta<typeof Grid> = {
  title: 'Layout Components/Grid',
  component: Grid,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const cls = ['dsn-grid', args.contained && 'dsn-grid--contained']
          .filter(Boolean)
          .join(' ');
        return `<div class="${cls}">\n  <div class="dsn-col-8">Hoofdinhoud</div>\n  <div class="dsn-col-4">Sidebar</div>\n</div>`;
      },
    },
  },
  argTypes: {
    contained: {
      control: 'boolean',
    },
    children: { control: false },
  },
  args: {
    contained: false,
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <GridItem colSpan={8}>
        <Box label="dsn-col-8 — Hoofdinhoud" height="80px" />
      </GridItem>
      <GridItem colSpan={4}>
        <Box label="dsn-col-4 — Sidebar" height="80px" />
      </GridItem>
    </Grid>
  ),
};

export const Contained: Story = {
  name: 'Contained (max-width)',
  render: () => (
    <Grid contained>
      <GridItem colSpan={8}>
        <Box label="dsn-col-8 — Hoofdinhoud" height="80px" />
      </GridItem>
      <GridItem colSpan={4}>
        <Box label="dsn-col-4 — Sidebar" height="80px" />
      </GridItem>
    </Grid>
  ),
};

export const Responsive: Story = {
  name: 'Responsive kolommen',
  render: () => (
    <Grid contained>
      {(['A', 'B', 'C'] as const).map((label) => (
        <GridItem key={label} colSpan={12} colSpanMd={6} colSpanLg={4}>
          <Box
            label={`col-12 → col-md-6 → col-lg-4 — Item ${label}`}
            height="80px"
          />
        </GridItem>
      ))}
    </Grid>
  ),
};

export const FullBleed: Story = {
  name: 'Full-bleed',
  render: () => (
    <Grid contained>
      <GridItem colSpan={8}>
        <Box label="Normale content (col-8)" />
      </GridItem>
      <GridItem fullBleed>
        <div
          style={{
            background: 'var(--dsn-color-neutral-bg-subtle)',
            padding: '1.5rem var(--dsn-grid-margin)',
            borderBlock: '1px solid var(--dsn-color-neutral-border-subtle)',
          }}
        >
          <Box label="Full-bleed sectie — breekt uit tot container-randen" />
        </div>
      </GridItem>
      <GridItem colSpan={8}>
        <Box label="Vervolg content (col-8)" />
      </GridItem>
    </Grid>
  ),
};

export const AllColumns: Story = {
  name: 'All columns (1–12)',
  render: () => (
    <Grid>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((n) => (
        <GridItem key={n} colSpan={n}>
          <Box label={`col-${n}`} />
        </GridItem>
      ))}
    </Grid>
  ),
};

export const InformationDense: Story = {
  name: 'Information-dense gutter',
  render: () => (
    <div className="dsn-density-dense">
      <Grid>
        <GridItem colSpan={4}>
          <Box label="col-4" height="60px" />
        </GridItem>
        <GridItem colSpan={4}>
          <Box label="col-4" height="60px" />
        </GridItem>
        <GridItem colSpan={4}>
          <Box label="col-4" height="60px" />
        </GridItem>
      </Grid>
      <p
        style={{
          marginBlockStart: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--dsn-color-neutral-color-subtle)',
          fontFamily: 'monospace',
        }}
      >
        Gutter: --dsn-space-column-md (8px) via .dsn-density-dense
      </p>
    </div>
  ),
};
