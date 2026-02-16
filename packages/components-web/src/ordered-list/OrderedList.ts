/**
 * DSN Ordered List Web Component
 *
 * A custom element that provides a styled ordered list with numbered markers.
 * Uses the same CSS classes and design tokens as the HTML and React components.
 *
 * @example
 * ```html
 * <dsn-ordered-list>
 *   <li>First step</li>
 *   <li>Second step</li>
 *   <li>Third step</li>
 * </dsn-ordered-list>
 *
 * <dsn-ordered-list start="5">
 *   <li>Fifth step</li>
 *   <li>Sixth step</li>
 * </dsn-ordered-list>
 * ```
 */

// Auto-generated CSS from shared source — run `node scripts/build-css.js` to regenerate
import { orderedListStyles } from './ordered-list-styles.generated';

export class DsnOrderedList extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['start'];
  }

  private _list: HTMLOListElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the internal list element
    this._list = document.createElement('ol');
    this._list.classList.add('dsn-ordered-list');
    this._list.innerHTML = '<slot></slot>';

    // Create style element with embedded CSS
    const style = document.createElement('style');
    style.textContent = orderedListStyles;

    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this._list);
  }

  connectedCallback(): void {
    this._list.className = 'dsn-ordered-list';
    this._updateStart();
  }

  attributeChangedCallback(name: string): void {
    if (name === 'start') {
      this._updateStart();
    }
  }

  private _updateStart(): void {
    const start = this.getAttribute('start');
    if (start) {
      this._list.setAttribute('start', start);
    } else {
      this._list.removeAttribute('start');
    }
  }

  // Property: start
  get start(): number {
    return parseInt(this.getAttribute('start') || '1', 10);
  }

  set start(value: number) {
    this.setAttribute('start', String(value));
  }
}

// Register the custom element
export function defineOrderedList(tagName = 'dsn-ordered-list'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, DsnOrderedList);
  }
}
