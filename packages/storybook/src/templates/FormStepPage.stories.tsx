import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ActionGroup,
  Body,
  Button,
  FormField,
  FormFieldset,
  Grid,
  GridItem,
  Heading,
  Icon,
  Link,
  LinkButton,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  Paragraph,
  RadioGroup,
  RadioOption,
  SkipLink,
  Stack,
  TelephoneInput,
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
// META
// =============================================================================

const meta: Meta = {
  title: 'Templates/Form flow/Form step: Example',
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
  name: 'Form step: Example',
  render: () => (
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
                      Titel van de stap
                    </h2>

                    <Paragraph>
                      Vul alles in. Als iets niet verplicht is, staat dat erbij.
                    </Paragraph>
                  </Stack>

                  <form noValidate>
                    <Stack space="3xl">
                      <FormField label="Naam" htmlFor="naam">
                        <TextInput id="naam" autoComplete="name" />
                      </FormField>

                      <FormFieldset legend="Favoriete fruit">
                        <RadioGroup>
                          <RadioOption
                            name="fruit"
                            label="Appel"
                            value="appel"
                          />
                          <RadioOption
                            name="fruit"
                            label="Banaan"
                            value="banaan"
                          />
                          <RadioOption name="fruit" label="Kiwi" value="kiwi" />
                        </RadioGroup>
                      </FormFieldset>

                      <FormField
                        label="Telefoonnummer"
                        htmlFor="telefoon"
                        labelSuffix="(niet verplicht)"
                      >
                        <TelephoneInput id="telefoon" width="md" />
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
                        <LinkButton>Opslaan en later verder</LinkButton>
                        <LinkButton>Stoppen met het formulier</LinkButton>
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
    </Body>
  ),
};
