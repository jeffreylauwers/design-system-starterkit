/**
 * DSN Unordered List Web Component
 *
 * A custom element that provides a styled unordered list with accent-colored bullet markers.
 * Uses the same CSS classes and design tokens as the HTML and React components.
 *
 * @example
 * ```html
 * <dsn-unordered-list>
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </dsn-unordered-list>
 * ```
 */

// Auto-generated CSS from shared source — run `node scripts/build-css.js` to regenerate
import { unorderedListStyles } from './unordered-list-styles.generated';

export class DsnUnorderedList extends HTMLElement {
  private _list: HTMLUListElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the internal list element
    this._list = document.createElement('ul');
    this._list.classList.add('dsn-unordered-list');
    this._list.innerHTML = '<slot></slot>';

    // Create style element with embedded CSS
    const style = document.createElement('style');
    style.textContent = unorderedListStyles;

    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this._list);
  }

  connectedCallback(): void {
    this._list.className = 'dsn-unordered-list';
  }
}

// Register the custom element
export function defineUnorderedList(tagName = 'dsn-unordered-list'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, DsnUnorderedList);
  }
}
