import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldLabel } from '@dsn/components-react';
import DocsPage from './FormFieldLabel.docs.mdx';

const meta: Meta<typeof FormFieldLabel> = {
  title: 'Components/FormFieldLabel',
  component: FormFieldLabel,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    suffix: { control: 'text' },
    htmlFor: { control: 'text' },
  },
  args: {
    children: 'Label text',
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldLabel>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Default (no suffix)</h3>
        <FormFieldLabel htmlFor="name">Naam</FormFieldLabel>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With "(niet verplicht)" suffix</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Gebruik dit wanneer de meeste velden verplicht zijn en je de enkele optionele velden wilt markeren.
        </p>
        <FormFieldLabel htmlFor="middlename" suffix="(niet verplicht)">
          Tussenvoegsel
        </FormFieldLabel>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With "(verplicht)" suffix</h3>
        <p style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: '1rem' }}>
          Gebruik dit wanneer de meeste velden optioneel zijn en je de verplichte velden wilt markeren.
        </p>
        <FormFieldLabel htmlFor="email" suffix="(verplicht)">
          E-mailadres
        </FormFieldLabel>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Examples with different content</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldLabel htmlFor="firstname">Voornaam</FormFieldLabel>
          <FormFieldLabel htmlFor="lastname">Achternaam</FormFieldLabel>
          <FormFieldLabel htmlFor="phone" suffix="(niet verplicht)">
            Telefoonnummer
          </FormFieldLabel>
          <FormFieldLabel htmlFor="company" suffix="(niet verplicht)">
            Bedrijfsnaam
          </FormFieldLabel>
          <FormFieldLabel htmlFor="message">Bericht</FormFieldLabel>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long label text</h3>
        <div style={{ maxWidth: '400px' }}>
          <FormFieldLabel htmlFor="long" suffix="(niet verplicht)">
            Dit is een langere label tekst die demonstreert hoe het label en de suffix zich gedragen wanneer de tekst over meerdere regels loopt
          </FormFieldLabel>
        </div>
      </div>
    </div>
  ),
};
