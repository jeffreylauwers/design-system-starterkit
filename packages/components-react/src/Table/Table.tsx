import React, { useId } from 'react';
import { classNames } from '@dsn/core';
import './Table.css';

export type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  /**
   * Zichtbaar bijschrift boven de tabel.
   * Dient ook als toegankelijke naam van de tabel voor schermlezers.
   */
  caption: string;
  /**
   * Optionele ID voor de caption.
   * Standaard auto-gegenereerd via `useId()`.
   * Wordt gebruikt voor `aria-labelledby` op de scroll-wrapper.
   */
  captionId?: string;
  /**
   * Wikkelt de tabel in een scroll-container (`role="region"`, `tabIndex={0}`, `aria-labelledby`).
   * Gebruik dit voor tabellen die mogelijk breder zijn dan hun container.
   */
  scrollable?: boolean;
};

/**
 * Tabel component voor het weergeven van tweedimensionale tabeldata.
 *
 * Gebruik altijd `<th scope="col">` voor kolomkoppen en `<th scope="row">` voor rijkoppen.
 * Voeg `<tfoot>` toe via children voor een optionele totaal- of samenvattingsrij.
 *
 * @example
 * <Table caption="Productoverzicht">
 *   <thead>
 *     <tr>
 *       <th scope="col">Product</th>
 *       <th scope="col">Prijs</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <th scope="row">Laptop</th>
 *       <td>€999</td>
 *     </tr>
 *   </tbody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      caption,
      captionId: captionIdProp,
      scrollable = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const captionId = captionIdProp ?? `dsn-table-caption-${autoId}`;

    const table = (
      <table
        ref={ref}
        className={classNames('dsn-table', className)}
        {...props}
      >
        <caption id={captionId} className="dsn-table__caption">
          {caption}
        </caption>
        {children}
      </table>
    );

    if (scrollable) {
      return (
        <div
          className="dsn-table-wrapper"
          role="region"
          aria-labelledby={captionId}
          tabIndex={0}
        >
          {table}
        </div>
      );
    }

    return table;
  }
);

Table.displayName = 'Table';
