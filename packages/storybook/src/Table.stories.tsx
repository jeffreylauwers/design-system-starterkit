import type { Meta, StoryObj } from '@storybook/react';
import { Table, Icon } from '@dsn/components-react';
import type { TableProps } from '@dsn/components-react';
import DocsPage from './Table.docs.mdx';

/**
 * Drie sorteericonen in één fragment — de CSS toont er één op basis van
 * aria-sort op de bovenliggende <th>. Gebruik samen met dsn-button--icon-only.
 */
const SortIcons = () => (
  <>
    <Icon
      name="arrows-sort"
      className="dsn-table__sort-icon--none"
      aria-hidden
    />
    <Icon
      name="sort-ascending"
      className="dsn-table__sort-icon--ascending"
      aria-hidden
    />
    <Icon
      name="sort-descending"
      className="dsn-table__sort-icon--descending"
      aria-hidden
    />
  </>
);

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: { page: DocsPage },
    dsn: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlTemplate: (args: any) => {
        const caption = args.caption ?? 'Tabeloverzicht';
        const scrollable = args.scrollable ?? false;

        const tableHtml = `<table class="dsn-table">
  <caption class="dsn-table__caption">${caption}</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Prijs</th>
      <th scope="col">Voorraad</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>€999</td>
      <td>12</td>
    </tr>
    <tr>
      <td>Muis</td>
      <td>€29</td>
      <td>84</td>
    </tr>
  </tbody>
</table>`;

        if (scrollable) {
          return `<div class="dsn-table-wrapper" role="region" aria-labelledby="tabel-caption-id" tabindex="0">
  ${tableHtml.replace('class="dsn-table__caption"', 'id="tabel-caption-id" class="dsn-table__caption"')}
</div>`;
        }

        return tableHtml;
      },
    },
  },
  argTypes: {
    caption: { control: 'text' },
    scrollable: { control: 'boolean' },
    captionId: { control: false },
    children: { control: false },
  },
  args: {
    caption: 'Productoverzicht',
    scrollable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: (args: TableProps) => (
    <Table {...args}>
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Prijs</th>
          <th scope="col">Voorraad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Laptop</td>
          <td>€999</td>
          <td>12</td>
        </tr>
        <tr>
          <td>Muis</td>
          <td>€29</td>
          <td>84</td>
        </tr>
        <tr>
          <td>Toetsenbord</td>
          <td>€79</td>
          <td>34</td>
        </tr>
      </tbody>
    </Table>
  ),
};

export const WithRowHeaders: Story = {
  name: 'With row headers',
  render: (args: TableProps) => (
    <Table {...args} caption="Kwartaalresultaten">
      <thead>
        <tr>
          <th scope="col">Kwartaal</th>
          <th scope="col">Omzet</th>
          <th scope="col">Kosten</th>
          <th scope="col">Winst</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Q1 2025</th>
          <td>€120.000</td>
          <td>€80.000</td>
          <td>€40.000</td>
        </tr>
        <tr>
          <th scope="row">Q2 2025</th>
          <td>€145.000</td>
          <td>€90.000</td>
          <td>€55.000</td>
        </tr>
        <tr>
          <th scope="row">Q3 2025</th>
          <td>€138.000</td>
          <td>€85.000</td>
          <td>€53.000</td>
        </tr>
      </tbody>
    </Table>
  ),
};

export const WithFooter: Story = {
  name: 'With footer (tfoot)',
  render: (args: TableProps) => (
    <Table {...args} caption="Productoverzicht met totaal">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Prijs</th>
          <th scope="col">Voorraad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Laptop</th>
          <td>€999</td>
          <td>12</td>
        </tr>
        <tr>
          <th scope="row">Muis</th>
          <td>€29</td>
          <td>84</td>
        </tr>
        <tr>
          <th scope="row">Toetsenbord</th>
          <td>€79</td>
          <td>34</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Totaal</th>
          <td>—</td>
          <td>130</td>
        </tr>
      </tfoot>
    </Table>
  ),
};

export const Scrollable: Story = {
  name: 'Scrollable (scroll-wrapper)',
  args: {
    scrollable: true,
    caption: 'Brede datatable met scroll',
  },
  render: (args: TableProps) => (
    <Table {...args}>
      <thead>
        <tr>
          <th scope="col">Naam</th>
          <th scope="col">Afdeling</th>
          <th scope="col">Functie</th>
          <th scope="col">Locatie</th>
          <th scope="col">Startdatum</th>
          <th scope="col">Contract</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Anna de Vries</th>
          <td>Engineering</td>
          <td>Senior Frontend Developer</td>
          <td>Amsterdam</td>
          <td>1 maart 2021</td>
          <td>Vast</td>
          <td>Actief</td>
        </tr>
        <tr>
          <th scope="row">Bas Jansen</th>
          <td>Design</td>
          <td>UX Designer</td>
          <td>Utrecht</td>
          <td>15 juni 2022</td>
          <td>Vast</td>
          <td>Actief</td>
        </tr>
        <tr>
          <th scope="row">Claire Bakker</th>
          <td>Product</td>
          <td>Product Manager</td>
          <td>Rotterdam</td>
          <td>1 januari 2020</td>
          <td>Vast</td>
          <td>Verlof</td>
        </tr>
      </tbody>
    </Table>
  ),
};

export const SortableColumns: Story = {
  name: 'Sortable columns (HTML markup demo)',
  render: () => (
    <table className="dsn-table">
      <caption className="dsn-table__caption">
        Medewerkers — gesorteerd op naam (oplopend)
      </caption>
      <thead>
        <tr>
          {/* Gesorteerde kolom: oplopend — icon-only knop met aria-label */}
          <th scope="col" aria-sort="ascending">
            <span className="dsn-table__header-content">
              Naam
              <button
                className="dsn-button dsn-button--size-small dsn-button--subtle dsn-button--icon-only dsn-table__sort-button"
                type="button"
                aria-label="Sorteer op Naam"
              >
                <SortIcons />
              </button>
            </span>
          </th>
          {/* Ongesorteerde sorteerbare kolom */}
          <th scope="col" aria-sort="none">
            <span className="dsn-table__header-content">
              Afdeling
              <button
                className="dsn-button dsn-button--size-small dsn-button--subtle dsn-button--icon-only dsn-table__sort-button"
                type="button"
                aria-label="Sorteer op Afdeling"
              >
                <SortIcons />
              </button>
            </span>
          </th>
          {/* Niet-sorteerbare kolom: geen button, geen aria-sort */}
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Anna de Vries</th>
          <td>Engineering</td>
          <td>Actief</td>
        </tr>
        <tr>
          <th scope="row">Bas Jansen</th>
          <td>Design</td>
          <td>Actief</td>
        </tr>
        <tr>
          <th scope="row">Claire Bakker</th>
          <td>Product</td>
          <td>Verlof</td>
        </tr>
      </tbody>
    </table>
  ),
};

export const AllFeatures: Story = {
  name: 'All features (scrollable + tfoot + sortable)',
  args: {
    scrollable: true,
    caption: 'Volledig uitgerust tableoverzicht',
  },
  render: (args: TableProps) => (
    <Table {...args}>
      <thead>
        <tr>
          <th scope="col" aria-sort="ascending">
            <span className="dsn-table__header-content">
              Product
              <button
                className="dsn-button dsn-button--size-small dsn-button--subtle dsn-button--icon-only dsn-table__sort-button"
                type="button"
                aria-label="Sorteer op Product"
              >
                <SortIcons />
              </button>
            </span>
          </th>
          <th scope="col" aria-sort="none">
            <span className="dsn-table__header-content">
              Prijs
              <button
                className="dsn-button dsn-button--size-small dsn-button--subtle dsn-button--icon-only dsn-table__sort-button"
                type="button"
                aria-label="Sorteer op Prijs"
              >
                <SortIcons />
              </button>
            </span>
          </th>
          <th scope="col">Voorraad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Laptop</th>
          <td>€999</td>
          <td>12</td>
        </tr>
        <tr>
          <th scope="row">Muis</th>
          <td>€29</td>
          <td>84</td>
        </tr>
        <tr>
          <th scope="row">Toetsenbord</th>
          <td>€79</td>
          <td>34</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Totaal</th>
          <td>—</td>
          <td>130</td>
        </tr>
      </tfoot>
    </Table>
  ),
};
