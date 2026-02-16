import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldDescription } from '@dsn/components-react';
import DocsPage from './FormFieldDescription.docs.mdx';

const meta: Meta<typeof FormFieldDescription> = {
  title: 'Components/FormFieldDescription',
  component: FormFieldDescription,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    id: { control: 'text' },
  },
  args: {
    children: 'Dit is een beschrijving van het invoerveld.',
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldDescription>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Short description</h3>
        <FormFieldDescription>
          Vul hier uw volledige naam in.
        </FormFieldDescription>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Medium description</h3>
        <FormFieldDescription>
          We gebruiken uw e-mailadres alleen voor accountgerelateerde berichten.
          U ontvangt geen marketing e-mails.
        </FormFieldDescription>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long description</h3>
        <div style={{ maxWidth: '500px' }}>
          <FormFieldDescription>
            Vul hier uw telefoonnummer in inclusief landcode. Dit nummer wordt
            gebruikt voor verificatie en belangrijke mededelingen over uw
            account. We delen uw telefoonnummer nooit met derden zonder uw
            toestemming.
          </FormFieldDescription>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With ID for aria-describedby</h3>
        <FormFieldDescription id="password-description">
          Uw wachtwoord moet minimaal 8 tekens lang zijn en een combinatie
          bevatten van letters, cijfers en speciale tekens.
        </FormFieldDescription>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Multiple examples</h3>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <FormFieldDescription>
            Alleen letters en cijfers zijn toegestaan.
          </FormFieldDescription>
          <FormFieldDescription>
            Selecteer minimaal één optie.
          </FormFieldDescription>
          <FormFieldDescription>
            Dit veld is optioneel maar helpt ons om uw ervaring te verbeteren.
          </FormFieldDescription>
          <FormFieldDescription>Maximaal 500 karakters.</FormFieldDescription>
        </div>
      </div>
    </div>
  ),
};
