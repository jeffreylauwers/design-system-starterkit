import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ActionGroup,
  Body,
  Grid,
  GridItem,
  Link,
  Note,
  PageBody,
  PageFooter,
  PageHeader,
  PageLayout,
  Paragraph,
  SkipLink,
  Stack,
  UnorderedList,
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
  title: 'Templates/Form flow/Confirmation page',
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
  name: 'Confirmation page',
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
                  <Note
                    variant="positive"
                    heading="Uw aanvraag is verstuurd"
                    headingLevel={1}
                  >
                    <Paragraph>
                      Uw referentienummer is <strong>AB-2024-123456</strong>.
                      Bewaar dit nummer voor uw administratie.
                    </Paragraph>
                  </Note>

                  <Stack space="md">
                    <h2 className="dsn-heading dsn-heading--heading-4">
                      Dit gaat er nu gebeuren
                    </h2>

                    <UnorderedList>
                      <li>
                        U ontvangt direct een bevestigingsmail op{' '}
                        jeroenvandrouwen@gmail.com.
                      </li>
                      <li>
                        Wij behandelen uw aanvraag. Wij nemen binnen 5 werkdagen
                        contact met u op.
                      </li>
                      <li>
                        U kunt in <Link href="#">Mijn omgeving</Link> de
                        voortgang van uw aanvraag bekijken.
                      </li>
                    </UnorderedList>
                  </Stack>

                  <ActionGroup
                    direction="vertical"
                    style={{
                      marginBlockStart: 'var(--dsn-space-block-3xl)',
                    }}
                  >
                    <Link href="#">Print aanvraag</Link>
                    <Link href="#">Download aanvraag als PDF</Link>
                    <Link href="#">Terug naar voorbeeld.nl</Link>
                  </ActionGroup>
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
