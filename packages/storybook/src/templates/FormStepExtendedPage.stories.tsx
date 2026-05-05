import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ActionGroup,
  Body,
  Button,
  DateInputGroup,
  DateInputGroupValue,
  EmailInput,
  FormField,
  FormFieldset,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  LinkButton,
  ModalDialog,
  ModalDialogBody,
  ModalDialogFooter,
  ModalDialogHeader,
  ModalDialogHeading,
  NumberInput,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  Paragraph,
  SkipLink,
  Stack,
  TelephoneInput,
  TextArea,
  TextInput,
} from '@dsn/components-react';
import {
  logoSlot,
  footerSlot1,
  footerSlot2,
  footerSlot3,
  footerSlot4,
} from './templateSharedContent';

// =============================================================================
// GEDEELDE CONTENT
// =============================================================================

const mainStyle: React.CSSProperties = {
  paddingBlock: 'var(--dsn-space-block-6xl)',
};

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

type ActiveModal = 'save' | 'stop' | null;

function FormModals({
  activeModal,
  onClose,
}: {
  activeModal: ActiveModal;
  onClose: () => void;
}) {
  return (
    <>
      <ModalDialog isOpen={activeModal === 'save'} onClose={onClose}>
        <ModalDialogHeader>
          <ModalDialogHeading>Opslaan en later verder</ModalDialogHeading>
        </ModalDialogHeader>
        <ModalDialogBody>
          <Stack space="md">
            <Paragraph>
              Vul uw e-mailadres in. Er wordt een unieke link naar uw
              e-mailadres verstuurd. Hiermee kunt u dit formulier op een later
              moment afmaken.
            </Paragraph>
            <FormField label="E-mailadres" htmlFor="modal-email">
              <EmailInput id="modal-email" autoComplete="email" width="xl" />
            </FormField>
          </Stack>
        </ModalDialogBody>
        <ModalDialogFooter>
          <ActionGroup>
            <Button variant="strong">Opslaan</Button>
            <Button variant="default" onClick={onClose}>
              Annuleren
            </Button>
          </ActionGroup>
        </ModalDialogFooter>
      </ModalDialog>
      <ModalDialog isOpen={activeModal === 'stop'} onClose={onClose}>
        <ModalDialogHeader>
          <ModalDialogHeading>Stoppen met het formulier</ModalDialogHeading>
        </ModalDialogHeader>
        <ModalDialogBody>
          <Paragraph>
            Weet u zeker dat u wilt stoppen met het formulier? Uw gegevens
            worden niet opgeslagen.
          </Paragraph>
        </ModalDialogBody>
        <ModalDialogFooter>
          <ActionGroup>
            <Button variant="strong">Stoppen</Button>
            <Button variant="default" onClick={onClose}>
              Annuleren
            </Button>
          </ActionGroup>
        </ModalDialogFooter>
      </ModalDialog>
    </>
  );
}

function ExtendedDetailsPage() {
  const [activeModal, setActiveModal] = React.useState<ActiveModal>(null);
  const [geboortedatum, setGeboortedatum] = useState<DateInputGroupValue>({
    day: '',
    month: '',
    year: '',
  });

  return (
    <Body>
      <SkipLink href="#main-content" />
      <PageLayout>
        <PageHeader
          logoSlot={logoSlot}
          layout="compact"
          hideMenuButton
          hideSearchButton
        />
        <PageBody>
          <main id="main-content" tabIndex={-1} style={mainStyle}>
            <Grid style={{ '--dsn-grid-margin': '0' } as React.CSSProperties}>
              <GridItem colSpan={12} colStartLg={3} colEndLg={11}>
                <Stack space="3xl">
                  <Heading level={1}>Titel formulier</Heading>

                  <Link href="#" iconStart={<Icon name="arrow-left" />}>
                    Vorige stap
                  </Link>

                  <Stack space="sm">
                    <h2 className="dsn-heading dsn-heading--heading-2">
                      Uw gegevens
                    </h2>

                    <Paragraph>
                      Vul alles in. Als iets niet verplicht is, staat dat erbij.
                    </Paragraph>
                  </Stack>

                  <form noValidate>
                    <Stack space="3xl">
                      <FormField label="Voornaam" htmlFor="voornaam">
                        <TextInput id="voornaam" autoComplete="given-name" />
                      </FormField>

                      <FormField label="Achternaam" htmlFor="achternaam">
                        <TextInput id="achternaam" autoComplete="family-name" />
                      </FormField>

                      <FormField label="Straat" htmlFor="straat">
                        <TextInput
                          id="straat"
                          width="xl"
                          autoComplete="address-line1"
                        />
                      </FormField>

                      <FormField label="Huisnummer" htmlFor="huisnummer">
                        <NumberInput
                          id="huisnummer"
                          width="xs"
                          autoComplete="address-line2"
                        />
                      </FormField>

                      <FormField
                        label="Toevoeging"
                        htmlFor="toevoeging"
                        labelSuffix="(niet verplicht)"
                      >
                        <TextInput
                          id="toevoeging"
                          width="xs"
                          autoComplete="address-line2"
                        />
                      </FormField>

                      <FormField label="Postcode" htmlFor="postcode">
                        <TextInput
                          id="postcode"
                          width="xs"
                          autoComplete="postal-code"
                        />
                      </FormField>

                      <FormField label="Woonplaats" htmlFor="woonplaats">
                        <TextInput
                          id="woonplaats"
                          width="xl"
                          autoComplete="address-level2"
                        />
                      </FormField>

                      <FormFieldset
                        legend="Geboortedatum"
                        description="Bijvoorbeeld: 15 3 1990"
                      >
                        <DateInputGroup
                          id="geboortedatum"
                          value={geboortedatum}
                          onChange={setGeboortedatum}
                        />
                      </FormFieldset>

                      <FormField label="E-mailadres" htmlFor="email">
                        <EmailInput
                          id="email"
                          autoComplete="email"
                          width="xl"
                        />
                      </FormField>

                      <FormField
                        label="Telefoonnummer"
                        htmlFor="telefoonnummer"
                        labelSuffix="(niet verplicht)"
                      >
                        <TelephoneInput
                          id="telefoonnummer"
                          autoComplete="tel"
                          width="md"
                        />
                      </FormField>

                      <FormField
                        label="Opmerkingen"
                        htmlFor="opmerkingen"
                        labelSuffix="(niet verplicht)"
                      >
                        <TextArea id="opmerkingen" />
                      </FormField>

                      <ActionGroup
                        direction="vertical"
                        style={{
                          marginBlockStart: 'var(--dsn-space-block-3xl)',
                        }}
                      >
                        <Button variant="strong" type="submit">
                          Volgende stap
                        </Button>
                        <LinkButton onClick={() => setActiveModal('save')}>
                          Opslaan en later verder
                        </LinkButton>
                        <LinkButton onClick={() => setActiveModal('stop')}>
                          Stoppen met het formulier
                        </LinkButton>
                      </ActionGroup>
                    </Stack>
                  </form>
                </Stack>
              </GridItem>
            </Grid>
          </main>
        </PageBody>
        <PageFooter
          slot1={footerSlot1}
          slot2={footerSlot2}
          slot3={footerSlot3}
          slot4={footerSlot4}
        />
      </PageLayout>
      <FormModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </Body>
  );
}

// =============================================================================
// META
// =============================================================================

const meta: Meta = {
  title: 'Templates/Form flow/Form step: Extended details',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

// =============================================================================
// STORIES
// =============================================================================

export const Example: Story = {
  name: 'Form step: Extended details',
  render: () => <ExtendedDetailsPage />,
};
