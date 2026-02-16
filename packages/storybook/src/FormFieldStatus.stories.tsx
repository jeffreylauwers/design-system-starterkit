import type { Meta, StoryObj } from '@storybook/react';
import { FormFieldStatus } from '@dsn/components-react';
import DocsPage from './FormFieldStatus.docs.mdx';

const meta: Meta<typeof FormFieldStatus> = {
  title: 'Components/FormFieldStatus',
  component: FormFieldStatus,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'positive', 'warning'],
    },
    showIcon: { control: 'boolean' },
    id: { control: 'text' },
  },
  args: {
    children: '45 van 100 karakters',
    variant: 'default',
    showIcon: true,
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldStatus>;

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Default variant (subtle, no icon)
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBlockEnd: '1rem',
          }}
        >
          Gebruikt voor neutrale informatie zoals character counters. Altijd
          zichtbaar.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldStatus>45 van 100 karakters</FormFieldStatus>
          <FormFieldStatus>280 karakters over</FormFieldStatus>
          <FormFieldStatus>Minimaal 8 tekens vereist</FormFieldStatus>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Positive variant (success, with check icon)
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBlockEnd: '1rem',
          }}
        >
          Gebruikt voor positieve feedback na validatie. Toont na interactie.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldStatus variant="positive">
            Wachtwoord is sterk genoeg
          </FormFieldStatus>
          <FormFieldStatus variant="positive">
            Gebruikersnaam is beschikbaar
          </FormFieldStatus>
          <FormFieldStatus variant="positive">
            E-mailadres is geverifieerd
          </FormFieldStatus>
          <FormFieldStatus variant="positive">
            Voldoet aan alle eisen
          </FormFieldStatus>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Warning variant (caution, with alert-triangle icon)
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#666',
            marginBlockEnd: '1rem',
          }}
        >
          Gebruikt voor waarschuwingen. Toont na interactie.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldStatus variant="warning">
            Wachtwoord is zwak
          </FormFieldStatus>
          <FormFieldStatus variant="warning">
            Let op: dit veld is openbaar zichtbaar
          </FormFieldStatus>
          <FormFieldStatus variant="warning">
            Gebruikersnaam bevat speciale tekens
          </FormFieldStatus>
          <FormFieldStatus variant="warning">
            Maximale bestandsgrootte bijna bereikt
          </FormFieldStatus>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Without icon (positive and warning)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFieldStatus variant="positive" showIcon={false}>
            Wachtwoord is sterk genoeg
          </FormFieldStatus>
          <FormFieldStatus variant="warning" showIcon={false}>
            Wachtwoord is zwak
          </FormFieldStatus>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Long status messages</h3>
        <div
          style={{
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <FormFieldStatus>
            U heeft 245 van de maximaal 500 toegestane karakters gebruikt. Let
            op dat langere berichten beter leesbaar zijn met witregels.
          </FormFieldStatus>
          <FormFieldStatus variant="positive">
            Uw wachtwoord voldoet aan alle veiligheidseisen: minimaal 8 tekens,
            hoofdletters, kleine letters, cijfers en speciale tekens.
          </FormFieldStatus>
          <FormFieldStatus variant="warning">
            Let op: dit veld wordt publiek getoond op uw profielpagina. Deel
            geen persoonlijke of gevoelige informatie.
          </FormFieldStatus>
        </div>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With ID for aria-describedby</h3>
        <FormFieldStatus id="bio-status">
          280 van 500 karakters gebruikt
        </FormFieldStatus>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Real-world examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontWeight: 'bold',
                marginBlockEnd: '0.5rem',
              }}
              htmlFor="password-demo"
            >
              Wachtwoord
            </label>
            <input
              id="password-demo"
              type="password"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBlockEnd: '0.5rem',
              }}
              placeholder="Voer wachtwoord in"
            />
            <FormFieldStatus variant="warning">
              Wachtwoord is zwak - voeg cijfers toe
            </FormFieldStatus>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontWeight: 'bold',
                marginBlockEnd: '0.5rem',
              }}
              htmlFor="bio-demo"
            >
              Bio
            </label>
            <textarea
              id="bio-demo"
              rows={4}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                marginBlockEnd: '0.5rem',
              }}
              placeholder="Vertel iets over jezelf"
            />
            <FormFieldStatus>220 van 500 karakters</FormFieldStatus>
          </div>
        </div>
      </div>
    </div>
  ),
};
