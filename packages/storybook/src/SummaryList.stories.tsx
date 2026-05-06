import type { Meta, StoryObj } from '@storybook/react';
import {
  SummaryList,
  SummaryListRow,
  SummaryListKey,
  SummaryListValue,
  SummaryListActions,
  Link,
  LinkButton,
} from '@dsn/components-react';
import DocsPage from './SummaryList.docs.mdx';
import { VEEL_TEKST } from './story-helpers';

const meta: Meta<typeof SummaryList> = {
  title: 'Components/SummaryList',
  component: SummaryList,
  parameters: {
    docs: { page: DocsPage },
  },
  argTypes: {
    noBorder: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    noBorder: false,
  },
};

export default meta;
type Story = StoryObj<typeof SummaryList>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <SummaryList {...args}>
      <SummaryListRow>
        <SummaryListKey>Naam</SummaryListKey>
        <SummaryListValue>Sarah Hendricks</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Geboortedatum</SummaryListKey>
        <SummaryListValue>5 januari 1990</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Adres</SummaryListKey>
        <SummaryListValue>Kerkstraat 12, 1234 AB Amsterdam</SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  ),
};

// =============================================================================
// VARIANTEN
// =============================================================================

export const WithActions: Story = {
  name: 'With Actions',
  render: () => (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>Naam</SummaryListKey>
        <SummaryListValue>Sarah Hendricks</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Geboortedatum</SummaryListKey>
        <SummaryListValue>5 januari 1990</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Adres</SummaryListKey>
        <SummaryListValue>Kerkstraat 12, 1234 AB Amsterdam</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> adres</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
    </SummaryList>
  ),
};

export const WithMultipleActions: Story = {
  name: 'With Multiple Actions',
  render: () => (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>Naam</SummaryListKey>
        <SummaryListValue>Sarah Hendricks</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
          <LinkButton onClick={() => {}}>
            Verwijder<span className="dsn-visually-hidden"> naam</span>
          </LinkButton>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Geboortedatum</SummaryListKey>
        <SummaryListValue>5 januari 1990</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
          <LinkButton onClick={() => {}}>
            Verwijder<span className="dsn-visually-hidden"> geboortedatum</span>
          </LinkButton>
        </SummaryListActions>
      </SummaryListRow>
    </SummaryList>
  ),
};

export const MixedRows: Story = {
  name: 'Mixed Rows',
  render: () => (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>Naam</SummaryListKey>
        <SummaryListValue>Sarah Hendricks</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> naam</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Geboortedatum</SummaryListKey>
        <SummaryListValue>5 januari 1990</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> geboortedatum</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow noActions>
        <SummaryListKey>Referentienummer</SummaryListKey>
        <SummaryListValue>ABC-123-XYZ</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow noActions>
        <SummaryListKey>Aanvraagdatum</SummaryListKey>
        <SummaryListValue>6 mei 2026</SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  ),
};

export const NoBorder: Story = {
  name: 'No Border',
  render: () => (
    <SummaryList noBorder>
      <SummaryListRow>
        <SummaryListKey>Status</SummaryListKey>
        <SummaryListValue>Actief</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Type</SummaryListKey>
        <SummaryListValue>Particulier</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>Regio</SummaryListKey>
        <SummaryListValue>Noord-Holland</SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  ),
};

// =============================================================================
// OVERZICHTSSTORIES
// =============================================================================

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Basic</p>
        <SummaryList>
          <SummaryListRow>
            <SummaryListKey>Naam</SummaryListKey>
            <SummaryListValue>Sarah Hendricks</SummaryListValue>
          </SummaryListRow>
          <SummaryListRow>
            <SummaryListKey>Geboortedatum</SummaryListKey>
            <SummaryListValue>5 januari 1990</SummaryListValue>
          </SummaryListRow>
        </SummaryList>
      </div>

      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>With Actions</p>
        <SummaryList>
          <SummaryListRow>
            <SummaryListKey>Naam</SummaryListKey>
            <SummaryListValue>Sarah Hendricks</SummaryListValue>
            <SummaryListActions>
              <Link href="#">
                Wijzig<span className="dsn-visually-hidden"> naam</span>
              </Link>
            </SummaryListActions>
          </SummaryListRow>
          <SummaryListRow>
            <SummaryListKey>Geboortedatum</SummaryListKey>
            <SummaryListValue>5 januari 1990</SummaryListValue>
            <SummaryListActions>
              <Link href="#">
                Wijzig
                <span className="dsn-visually-hidden"> geboortedatum</span>
              </Link>
            </SummaryListActions>
          </SummaryListRow>
        </SummaryList>
      </div>

      <div>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>No Border</p>
        <SummaryList noBorder>
          <SummaryListRow>
            <SummaryListKey>Status</SummaryListKey>
            <SummaryListValue>Actief</SummaryListValue>
          </SummaryListRow>
          <SummaryListRow>
            <SummaryListKey>Type</SummaryListKey>
            <SummaryListValue>Particulier</SummaryListValue>
          </SummaryListRow>
        </SummaryList>
      </div>
    </div>
  ),
};

// =============================================================================
// TEKST VARIANTEN
// =============================================================================

export const ShortText: Story = {
  name: 'Short Text',
  render: () => (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>A</SummaryListKey>
        <SummaryListValue>B</SummaryListValue>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>C</SummaryListKey>
        <SummaryListValue>D</SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  ),
};

export const LongText: Story = {
  name: 'Long Text',
  render: () => (
    <SummaryList>
      <SummaryListRow>
        <SummaryListKey>{VEEL_TEKST}</SummaryListKey>
        <SummaryListValue>{VEEL_TEKST}</SummaryListValue>
        <SummaryListActions>
          <Link href="#">
            Wijzig<span className="dsn-visually-hidden"> {VEEL_TEKST}</span>
          </Link>
        </SummaryListActions>
      </SummaryListRow>
      <SummaryListRow>
        <SummaryListKey>{VEEL_TEKST}</SummaryListKey>
        <SummaryListValue>{VEEL_TEKST}</SummaryListValue>
      </SummaryListRow>
    </SummaryList>
  ),
};
