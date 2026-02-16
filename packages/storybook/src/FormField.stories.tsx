import type { Meta, StoryObj } from '@storybook/react';
import {
  FormField,
  TextInput,
  TextArea,
  CheckboxGroup,
  CheckboxOption,
} from '@dsn/components-react';
import DocsPage from './FormField.docs.mdx';

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
    label: 'Label',
    htmlFor: 'demo-field',
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'E-mailadres',
    htmlFor: 'email',
  },
  render: (args) => (
    <FormField {...args}>
      <TextInput id="email" type="email" placeholder="naam@voorbeeld.nl" />
    </FormField>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Basic text input</h3>
        <FormField label="Naam" htmlFor="name">
          <TextInput id="name" placeholder="Voer je naam in" />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With description</h3>
        <FormField
          label="E-mailadres"
          htmlFor="email-desc"
          description="We gebruiken je e-mailadres alleen voor accountgerelateerde berichten."
        >
          <TextInput
            id="email-desc"
            type="email"
            placeholder="naam@voorbeeld.nl"
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With optional suffix</h3>
        <FormField
          label="Telefoonnummer"
          htmlFor="phone"
          labelSuffix="(niet verplicht)"
        >
          <TextInput
            id="phone"
            type="tel"
            placeholder="06-12345678"
            width="sm"
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With error message</h3>
        <FormField
          label="Wachtwoord"
          htmlFor="password-error"
          error="Wachtwoord moet minimaal 8 tekens bevatten"
        >
          <TextInput
            id="password-error"
            type="password"
            invalid
            placeholder="Voer wachtwoord in"
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With status (default variant - character counter)
        </h3>
        <FormField
          label="Bio"
          htmlFor="bio-status"
          description="Vertel iets over jezelf"
          status="45 van 500 karakters"
        >
          <TextArea
            id="bio-status"
            rows={4}
            placeholder="Vertel iets over jezelf..."
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With status (positive variant)
        </h3>
        <FormField
          label="Wachtwoord"
          htmlFor="password-positive"
          status="Wachtwoord is sterk genoeg"
          statusVariant="positive"
        >
          <TextInput
            id="password-positive"
            type="password"
            value="StrongP@ssw0rd!"
            readOnly
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With status (warning variant)
        </h3>
        <FormField
          label="Gebruikersnaam"
          htmlFor="username-warning"
          description="Kies een unieke gebruikersnaam"
          status="Let op: dit veld is openbaar zichtbaar"
          statusVariant="warning"
        >
          <TextInput id="username-warning" placeholder="gebruikersnaam" />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Complete example (description + error + status)
        </h3>
        <FormField
          label="Nieuw wachtwoord"
          htmlFor="password-complete"
          description="Gebruik minimaal 8 tekens met letters, cijfers en symbolen"
          error="Het wachtwoord moet minimaal één cijfer bevatten"
          status="7 van 8 vereiste karakters"
        >
          <TextInput
            id="password-complete"
            type="password"
            invalid
            value="Weak"
            readOnly
          />
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With CheckboxGroup</h3>
        <FormField
          label="Interesses"
          description="Selecteer minimaal één interesse"
        >
          <CheckboxGroup>
            <CheckboxOption label="Sport" value="sport" />
            <CheckboxOption label="Muziek" value="music" />
            <CheckboxOption label="Reizen" value="travel" />
          </CheckboxGroup>
        </FormField>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Different widths</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <FormField label="Postcode" htmlFor="postcode">
            <TextInput id="postcode" placeholder="1234 AB" width="xs" />
          </FormField>
          <FormField label="Telefoonnummer" htmlFor="phone2">
            <TextInput
              id="phone2"
              type="tel"
              placeholder="06-12345678"
              width="sm"
            />
          </FormField>
          <FormField label="E-mailadres" htmlFor="email2">
            <TextInput
              id="email2"
              type="email"
              placeholder="naam@voorbeeld.nl"
              width="md"
            />
          </FormField>
          <FormField label="Website" htmlFor="website">
            <TextInput
              id="website"
              type="url"
              placeholder="https://voorbeeld.nl"
              width="lg"
            />
          </FormField>
        </div>
      </div>
    </div>
  ),
};
