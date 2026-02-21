import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  TextInput,
  TextArea,
  CheckboxGroup,
  CheckboxOption,
} from '@dsn/components-react';
import DocsPage from './FormField.docs.mdx';
import { TEKST, VEEL_TEKST, TEKST_AR, rtlDecorator } from './story-helpers';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    label: { control: 'text' },
    labelSuffix: { control: 'text' },
    htmlFor: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    status: { control: 'text' },
    statusVariant: {
      control: 'select',
      options: ['default', 'positive', 'warning'],
    },
  },
  args: {
    label: TEKST,
    htmlFor: 'demo-field',
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: TEKST,
    htmlFor: 'input-1',
  },
  render: (args) => (
    <FormField {...args}>
      <TextInput id="input-1" placeholder={TEKST} />
    </FormField>
  ),
};

export const WithDescription: Story = {
  name: 'With description',
  render: (args) => (
    <FormField {...args} label={TEKST} htmlFor="input-desc" description={TEKST}>
      <TextInput id="input-desc" placeholder={TEKST} />
    </FormField>
  ),
};

export const WithError: Story = {
  name: 'With error',
  render: (args) => (
    <FormField {...args} label={TEKST} htmlFor="input-err" error={TEKST}>
      <TextInput id="input-err" invalid placeholder={TEKST} />
    </FormField>
  ),
};

export const WithStatus: Story = {
  name: 'With status',
  render: (args) => (
    <FormField {...args} label={TEKST} htmlFor="input-status" status={TEKST}>
      <TextInput id="input-status" placeholder={TEKST} />
    </FormField>
  ),
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>Basic</h3>
        <FormField label={TEKST} htmlFor="s1">
          <TextInput id="s1" placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With description</h3>
        <FormField label={TEKST} htmlFor="s2" description={TEKST}>
          <TextInput id="s2" placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With optional suffix</h3>
        <FormField label={TEKST} htmlFor="s3" labelSuffix="(niet verplicht)">
          <TextInput id="s3" placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With error</h3>
        <FormField label={TEKST} htmlFor="s4" error={TEKST}>
          <TextInput id="s4" invalid placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With status (positive)</h3>
        <FormField
          label={TEKST}
          htmlFor="s5"
          status={TEKST}
          statusVariant="positive"
        >
          <TextInput id="s5" placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With status (warning)</h3>
        <FormField
          label={TEKST}
          htmlFor="s6"
          status={TEKST}
          statusVariant="warning"
        >
          <TextInput id="s6" placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With TextArea</h3>
        <FormField label={TEKST} htmlFor="s7" description={TEKST}>
          <TextArea id="s7" rows={4} placeholder={TEKST} />
        </FormField>
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '0.5rem' }}>With CheckboxGroup</h3>
        <FormField label={TEKST} description={TEKST}>
          <CheckboxGroup>
            <CheckboxOption label={TEKST} value="1" />
            <CheckboxOption label={TEKST} value="2" />
            <CheckboxOption label={TEKST} value="3" />
          </CheckboxGroup>
        </FormField>
      </div>
    </div>
  ),
};

export const LongText: Story = {
  name: 'Long text',
  render: (args) => (
    <FormField
      {...args}
      label={VEEL_TEKST}
      htmlFor="lt-1"
      description={VEEL_TEKST}
    >
      <TextInput id="lt-1" defaultValue={VEEL_TEKST} />
    </FormField>
  ),
};

export const RTL: Story = {
  name: 'RTL',
  decorators: [rtlDecorator],
  render: (args) => (
    <FormField
      {...args}
      label={TEKST_AR}
      htmlFor="rtl-1"
      description={TEKST_AR}
    >
      <TextInput id="rtl-1" defaultValue={TEKST_AR} />
    </FormField>
  ),
};

export const RTLLongText: Story = {
  name: 'RTL long text',
  decorators: [rtlDecorator],
  render: (args) => (
    <FormField
      {...args}
      label={VEEL_TEKST_AR}
      htmlFor="rtl-2"
      description={VEEL_TEKST_AR}
      error={VEEL_TEKST_AR}
    >
      <TextInput id="rtl-2" defaultValue={VEEL_TEKST_AR} invalid />
    </FormField>
  ),
};
