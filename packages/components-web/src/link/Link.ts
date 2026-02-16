/**
 * DSN Link Web Component
 *
 * A custom element that provides a styled anchor link with icon support.
 * Uses the same CSS classes and design tokens as the HTML and React link components.
 *
 * @example
 * ```html
 * <dsn-link href="/about">About us</dsn-link>
 * <dsn-link href="https://example.com" external>External (opens in new tab)</dsn-link>
 * <dsn-link href="/dashboard" current>Dashboard</dsn-link>
 * <dsn-link disabled>Unavailable</dsn-link>
 * <dsn-link size="small" href="/small">Small link</dsn-link>
 * <dsn-link size="large" href="/large">Large link</dsn-link>
 * ```
 */

export type LinkSize = 'small' | 'default' | 'large';

// Auto-generated CSS from shared source — run `node scripts/build-css.js` to regenerate
import { linkStyles } from './link-styles.generated';

export class DsnLink extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['href', 'target', 'rel', 'disabled', 'current', 'size', 'external'];
  }

  private _anchor: HTMLAnchorElement;
  private _hintNode: Text | null = null;
  private _hrefBackup: string | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the internal anchor element
    this._anchor = document.createElement('a');
    this._anchor.classList.add('dsn-link');
    this._anchor.innerHTML = '<slot name="icon-start"></slot><slot></slot><slot name="icon-end"></slot>';

    // Create style element with embedded CSS
    const style = document.createElement('style');
    style.textContent = linkStyles;

    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(this._anchor);
  }

  connectedCallback(): void {
    this._updateClasses();
    this._updateHref();
    this._updateTarget();
    this._updateRel();
    this._updateDisabled();
    this._updateCurrent();
    this._updateExternal();
  }

  attributeChangedCallback(name: string): void {
    switch (name) {
      case 'href':
        this._updateHref();
        break;
      case 'target':
        this._updateTarget();
        break;
      case 'rel':
        this._updateRel();
        break;
      case 'disabled':
        this._updateDisabled();
        break;
      case 'current':
        this._updateCurrent();
        break;
      case 'size':
        this._updateClasses();
        break;
      case 'external':
        this._updateExternal();
        break;
    }
  }

  private _updateClasses(): void {
    const classes = ['dsn-link'];

    // Only add size class when explicitly set via attribute.
    // Without a size attribute, the link inherits font from its parent,
    // which is the expected behavior for inline usage in paragraphs.
    if (this.hasAttribute('size')) {
      classes.push(`dsn-link--size-${this.size}`);
    }

    this._anchor.className = classes.join(' ');
  }

  private _updateHref(): void {
    if (this.disabled) return;
    const href = this.getAttribute('href');
    if (href) {
      this._anchor.setAttribute('href', href);
    } else {
      this._anchor.removeAttribute('href');
    }
  }

  private _updateTarget(): void {
    const target = this.getAttribute('target');
    if (target) {
      this._anchor.setAttribute('target', target);
    } else {
      this._anchor.removeAttribute('target');
    }
  }

  private _updateRel(): void {
    const rel = this.getAttribute('rel');
    if (rel) {
      this._anchor.setAttribute('rel', rel);
    } else {
      this._anchor.removeAttribute('rel');
    }
  }

  private _updateDisabled(): void {
    if (this.disabled) {
      this._hrefBackup = this._anchor.getAttribute('href');
      this._anchor.removeAttribute('href');
      this._anchor.setAttribute('aria-disabled', 'true');
      this._anchor.setAttribute('tabindex', '-1');
    } else {
      this._anchor.removeAttribute('aria-disabled');
      this._anchor.removeAttribute('tabindex');
      // Restore href
      if (this._hrefBackup) {
        this._anchor.setAttribute('href', this._hrefBackup);
        this._hrefBackup = null;
      } else {
        this._updateHref();
      }
    }
  }

  private _updateCurrent(): void {
    if (this.current) {
      this._anchor.setAttribute('aria-current', 'page');
    } else {
      this._anchor.removeAttribute('aria-current');
    }
  }

  private _updateExternal(): void {
    if (this.external) {
      // Set target and rel if not explicitly provided
      if (!this.getAttribute('target')) {
        this._anchor.setAttribute('target', '_blank');
      }
      if (!this.getAttribute('rel')) {
        this._anchor.setAttribute('rel', 'noopener noreferrer');
      }
      // Add visible hint text
      if (!this._hintNode) {
        this._hintNode = document.createTextNode(' (opens in new tab)');
      }
      this._anchor.appendChild(this._hintNode);
    } else {
      if (this._hintNode && this._hintNode.parentNode) {
        this._hintNode.remove();
      }
      // Restore target/rel to attribute values
      this._updateTarget();
      this._updateRel();
    }
  }

  // Property: href
  get href(): string | null {
    return this.getAttribute('href');
  }

  set href(value: string | null) {
    if (value) {
      this.setAttribute('href', value);
    } else {
      this.removeAttribute('href');
    }
  }

  // Property: target
  get target(): string | null {
    return this.getAttribute('target');
  }

  set target(value: string | null) {
    if (value) {
      this.setAttribute('target', value);
    } else {
      this.removeAttribute('target');
    }
  }

  // Property: rel
  get rel(): string | null {
    return this.getAttribute('rel');
  }

  set rel(value: string | null) {
    if (value) {
      this.setAttribute('rel', value);
    } else {
      this.removeAttribute('rel');
    }
  }

  // Property: disabled
  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  // Property: current
  get current(): boolean {
    return this.hasAttribute('current');
  }

  set current(value: boolean) {
    if (value) {
      this.setAttribute('current', '');
    } else {
      this.removeAttribute('current');
    }
  }

  // Property: external
  get external(): boolean {
    return this.hasAttribute('external');
  }

  set external(value: boolean) {
    if (value) {
      this.setAttribute('external', '');
    } else {
      this.removeAttribute('external');
    }
  }

  // Property: size
  get size(): LinkSize {
    return (this.getAttribute('size') as LinkSize) || 'default';
  }

  set size(value: LinkSize) {
    this.setAttribute('size', value);
  }

  // Focus delegation
  focus(options?: FocusOptions): void {
    this._anchor.focus(options);
  }

  blur(): void {
    this._anchor.blur();
  }

  click(): void {
    this._anchor.click();
  }
}

// Register the custom element
export function defineLink(tagName = 'dsn-link'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, DsnLink);
  }
}
