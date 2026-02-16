import type { Meta, StoryObj } from '@storybook/react';
import {
  FormFieldset,
  CheckboxGroup,
  CheckboxOption,
  RadioGroup,
  RadioOption,
} from '@dsn/components-react';
import DocsPage from './FormFieldset.docs.mdx';

const meta: Meta<typeof FormFieldset> = {
  title: 'Components/FormFieldset',
  component: FormFieldset,
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    legend: { control: 'text' },
    legendSuffix: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    status: { control: 'text' },
    statusVariant: {
      control: 'select',
      options: ['default', 'positive', 'warning'],
    },
  },
  args: {
    legend: 'Interesses',
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldset>;

export const Default: Story = {
  render: (args) => (
    <FormFieldset {...args}>
      <CheckboxGroup>
        <CheckboxOption label="Sport" value="sport" />
        <CheckboxOption label="Muziek" value="music" />
        <CheckboxOption label="Reizen" value="travel" />
      </CheckboxGroup>
    </FormFieldset>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Basic checkbox group</h3>
        <FormFieldset legend="Interesses">
          <CheckboxGroup>
            <CheckboxOption label="Sport" value="sport" />
            <CheckboxOption label="Muziek" value="music" />
            <CheckboxOption label="Reizen" value="travel" />
            <CheckboxOption label="Lezen" value="reading" />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With description</h3>
        <FormFieldset
          legend="Notificatie voorkeuren"
          description="Selecteer hoe je notificaties wilt ontvangen"
        >
          <CheckboxGroup>
            <CheckboxOption label="E-mail" value="email" defaultChecked />
            <CheckboxOption label="SMS" value="sms" />
            <CheckboxOption
              label="Push notificaties"
              value="push"
              defaultChecked
            />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>With optional suffix</h3>
        <FormFieldset legend="Hobby's" legendSuffix="(niet verplicht)">
          <CheckboxGroup>
            <CheckboxOption label="Fotografie" value="photography" />
            <CheckboxOption label="Koken" value="cooking" />
            <CheckboxOption label="Tuinieren" value="gardening" />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With error message (invalid state)
        </h3>
        <FormFieldset
          legend="Privacy instellingen"
          legendSuffix="(verplicht)"
          description="Accepteer minimaal één privacy instelling"
          error="Selecteer minimaal één optie om door te gaan"
        >
          <CheckboxGroup>
            <CheckboxOption
              label="Functionele cookies (verplicht)"
              value="functional"
              disabled
              checked
              readOnly
            />
            <CheckboxOption label="Analytische cookies" value="analytics" />
            <CheckboxOption label="Marketing cookies" value="marketing" />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>Radio group</h3>
        <FormFieldset legend="Geslacht" legendSuffix="(verplicht)">
          <RadioGroup>
            <RadioOption name="gender" label="Man" value="male" />
            <RadioOption name="gender" label="Vrouw" value="female" />
            <RadioOption name="gender" label="Anders" value="other" />
            <RadioOption
              name="gender"
              label="Wil ik niet zeggen"
              value="prefer-not-to-say"
            />
          </RadioGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Radio group with description and error
        </h3>
        <FormFieldset
          legend="Verzendmethode"
          description="Kies hoe je je bestelling wilt ontvangen"
          error="Selecteer een verzendmethode"
        >
          <RadioGroup>
            <RadioOption
              name="shipping"
              label="Standaard verzending (3-5 dagen) - Gratis"
              value="standard"
            />
            <RadioOption
              name="shipping"
              label="Express verzending (1-2 dagen) - €5,95"
              value="express"
            />
            <RadioOption
              name="shipping"
              label="Ophalen in winkel - Gratis"
              value="pickup"
            />
          </RadioGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With status (warning variant)
        </h3>
        <FormFieldset
          legend="Marketingvoorkeuren"
          description="We respecteren je privacy"
          status="Let op: deze instellingen zijn openbaar zichtbaar"
          statusVariant="warning"
        >
          <CheckboxGroup>
            <CheckboxOption label="Nieuwsbrief ontvangen" value="newsletter" />
            <CheckboxOption label="Product updates" value="updates" />
            <CheckboxOption
              label="Promoties en aanbiedingen"
              value="promotions"
            />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          With status (positive variant)
        </h3>
        <FormFieldset
          legend="Vereiste rechten"
          status="Alle vereiste rechten zijn geaccepteerd"
          statusVariant="positive"
        >
          <CheckboxGroup>
            <CheckboxOption
              label="Algemene voorwaarden"
              value="terms"
              defaultChecked
            />
            <CheckboxOption
              label="Privacybeleid"
              value="privacy"
              defaultChecked
            />
            <CheckboxOption
              label="Cookie beleid"
              value="cookies"
              defaultChecked
            />
          </CheckboxGroup>
        </FormFieldset>
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '1rem' }}>
          Complete example (all sub-components)
        </h3>
        <FormFieldset
          legend="Account type"
          legendSuffix="(verplicht)"
          description="Kies het type account dat bij je past"
          error="Selecteer een account type"
          status="Prijzen zijn exclusief BTW"
        >
          <RadioGroup>
            <RadioOption
              name="account"
              label="Gratis - Voor individueel gebruik"
              value="free"
            />
            <RadioOption name="account" label="Pro - €9,99/maand" value="pro" />
            <RadioOption
              name="account"
              label="Business - €29,99/maand"
              value="business"
            />
          </RadioGroup>
        </FormFieldset>
      </div>
    </div>
  ),
};
