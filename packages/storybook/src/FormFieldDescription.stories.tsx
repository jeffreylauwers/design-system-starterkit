import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldDescription, UnorderedList } from '@dsn/components-react';
import DocsPage from './FormFieldDescription.docs.mdx';
import {
  TEKST,
  WEINIG_TEKST,
  VEEL_TEKST,
  TEKST_AR,
  VEEL_TEKST_AR,
  rtlDecorator,
} from './story-helpers';

const meta: Meta<typeof FormFieldDescription> = {
  title: 'Components/FormFieldDescription',
  component: FormFieldDescription,
  parameters: {
    docs: {
      page: DocsPage,
    },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const idAttr = args.id ? ` id="${args.id}"` : '';
        return `<p class="dsn-form-field-description"${idAttr}>${args.children ?? 'Tekst'}</p>`;
      },
    },
  },
  argTypes: {
    id: { control: 'text' },
  },
  args: {
    children: TEKST,
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldDescription>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {};

// =============================================================================
// TEKST VARIANTEN
// =============================================================================

export const ShortText: Story = {
  name: 'Short text',
  args: { children: WEINIG_TEKST },
};

export const LongText: Story = {
  name: 'Long text',
  args: { children: VEEL_TEKST },
};

// =============================================================================
// MET LIJST
// =============================================================================

export const WithList: Story = {
  name: 'With list',
  render: () => (
    <FormFieldDescription as="div" id="upload-desc">
      Toegestane bestandstypen:
      <UnorderedList>
        <li>PDF (max. 5 MB per bestand)</li>
        <li>Word-documenten (.docx)</li>
        <li>Afbeeldingen (.jpg, .png)</li>
      </UnorderedList>
    </FormFieldDescription>
  ),
};

// =============================================================================
// RTL
// =============================================================================

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  args: { children: TEKST_AR },
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  args: { children: VEEL_TEKST_AR },
};
