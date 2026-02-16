import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldErrorMessage } from '@dsn/components-react';
import DocsPage from './FormFieldErrorMessage.docs.mdx';

const meta: Meta<typeof FormFieldErrorMessage> = {
  title: 'Components/FormFieldErrorMessage',
  component: FormFieldErrorMessage,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    showIcon: { control: 'boolean' },
    id: { control: 'text' },
  },
  args: {
    children: 'Dit veld is verplicht.',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldErrorMessage>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With icon (default)</h3>
        <FormFieldErrorMessage>Dit veld is verplicht.</FormFieldErrorMessage>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Without icon</h3>
        <FormFieldErrorMessage showIcon={false}>Dit veld is verplicht.</FormFieldErrorMessage>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Different error messages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldErrorMessage>Dit veld is verplicht.</FormFieldErrorMessage>
          <FormFieldErrorMessage>Vul een geldig e-mailadres in.</FormFieldErrorMessage>
          <FormFieldErrorMessage>Het wachtwoord moet minimaal 8 tekens bevatten.</FormFieldErrorMessage>
          <FormFieldErrorMessage>De twee wachtwoorden komen niet overeen.</FormFieldErrorMessage>
          <FormFieldErrorMessage>Selecteer minimaal één optie.</FormFieldErrorMessage>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long error message</h3>
        <div style={{ maxWidth: '500px' }}>
          <FormFieldErrorMessage>
            De ingevoerde waarde is niet geldig. Zorg ervoor dat u een geldig telefoonnummer invoert inclusief
            landcode (bijv. +31 6 12345678). Het nummer moet tussen de 10 en 15 cijfers bevatten.
          </FormFieldErrorMessage>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With ID for aria-describedby</h3>
        <FormFieldErrorMessage id="email-error">
          Het e-mailadres dat u heeft opgegeven is al in gebruik.
        </FormFieldErrorMessage>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Multiple errors</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Bij complexe validatie kunnen meerdere foutmeldingen tegelijk getoond worden.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldErrorMessage>Het wachtwoord moet minimaal 8 tekens bevatten.</FormFieldErrorMessage>
          <FormFieldErrorMessage>Het wachtwoord moet minimaal één cijfer bevatten.</FormFieldErrorMessage>
          <FormFieldErrorMessage>
            Het wachtwoord moet minimaal één speciaal teken bevatten.
          </FormFieldErrorMessage>
        </div>
      </div>
    </div>
  ),
};
