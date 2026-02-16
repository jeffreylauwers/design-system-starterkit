/**
 * DSN Heading Web Component
 *
 * A custom element that provides styled headings with independent
 * semantic level and visual appearance.
 *
 * @example
 * ```html
 * <dsn-heading>Default h2 heading</dsn-heading>
 * <dsn-heading level="1">Page Title</dsn-heading>
 * <dsn-heading level="2" appearance="heading-4">Smaller h2</dsn-heading>
 * ```
 */

export type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type HeadingAppearance =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6';

// Auto-generated CSS from shared source — run `node scripts/build-css.js` to regenerate
import { headingStyles } from './heading-styles.generated';

export class DsnHeading extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['level', 'appearance'];
  }

  private _heading: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Default to h2
    this._heading = document.createElement('h2');
    this._heading.innerHTML = '<slot></slot>';

    // Create style element with embedded CSS
    const style = document.createElement('style');
    style.textContent = headingStyles;

    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this._heading);
  }

  connectedCallback(): void {
    this._updateElement();
    this._updateClasses();
  }

  attributeChangedCallback(name: string): void {
    if (name === 'level') {
      this._updateElement();
    }
    this._updateClasses();
  }

  private _updateElement(): void {
    const tag = `h${this.level}`;
    if (this._heading.tagName.toLowerCase() !== tag) {
      const newHeading = document.createElement(tag);
      newHeading.innerHTML = '<slot></slot>';
      newHeading.className = this._heading.className;
      this.shadowRoot!.replaceChild(newHeading, this._heading);
      this._heading = newHeading;
    }
  }

  private _updateClasses(): void {
    const appearance = this.appearance;
    const classes = ['dsn-heading', `dsn-heading--${appearance}`];
    this._heading.className = classes.join(' ');
  }

  // Property: level
  get level(): HeadingLevel {
    return (this.getAttribute('level') as HeadingLevel) || '2';
  }

  set level(value: HeadingLevel) {
    this.setAttribute('level', value);
  }

  // Property: appearance
  get appearance(): HeadingAppearance {
    const attr = this.getAttribute('appearance') as HeadingAppearance;
    return attr || `heading-${this.level}` as HeadingAppearance;
  }

  set appearance(value: HeadingAppearance) {
    this.setAttribute('appearance', value);
  }
}

// Register the custom element
export function defineHeading(tagName = 'dsn-heading'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, DsnHeading);
  }
}
