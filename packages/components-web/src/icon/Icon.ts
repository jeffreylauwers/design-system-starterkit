/**
 * DSN Icon Web Component
 *
 * A custom element that renders SVG icons from the design system icon set.
 * Icons are inlined as SVG markup for Shadow DOM encapsulation.
 *
 * @example
 * ```html
 * <dsn-icon name="check" size="md"></dsn-icon>
 * <dsn-icon name="settings" size="lg" label="Open settings"></dsn-icon>
 * ```
 */

import { iconStyles } from './icon-styles.generated';
import { iconPaths } from './icon-paths.generated';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type IconName = keyof typeof iconPaths;

export class DsnIcon extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['name', 'size', 'label'];
  }

  private _svg: SVGSVGElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = iconStyles;
    this.shadowRoot!.appendChild(style);
  }

  connectedCallback(): void {
    this._render();
  }

  attributeChangedCallback(): void {
    this._render();
  }

  private _render(): void {
    const name = this.name;
    const size = this.size;
    const label = this.label;

    // Remove existing SVG if any
    if (this._svg) {
      this._svg.remove();
      this._svg = null;
    }

    if (!name || !(name in iconPaths)) {
      return;
    }

    const paths = iconPaths[name as keyof typeof iconPaths];

    // Build SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    // Apply CSS classes
    const classes = ['dsn-icon'];
    if (size !== 'md') {
      classes.push(`dsn-icon--${size}`);
    }
    svg.setAttribute('class', classes.join(' '));

    // Accessibility
    if (label) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', label);
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }

    // Add paths
    for (const d of paths) {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      path.setAttribute('d', d);
      svg.appendChild(path);
    }

    this._svg = svg;
    this.shadowRoot!.appendChild(svg);
  }

  // Property: name
  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  // Property: size
  get size(): IconSize {
    return (this.getAttribute('size') as IconSize) || 'md';
  }

  set size(value: IconSize) {
    this.setAttribute('size', value);
  }

  // Property: label (accessible label)
  get label(): string {
    return this.getAttribute('label') || '';
  }

  set label(value: string) {
    if (value) {
      this.setAttribute('label', value);
    } else {
      this.removeAttribute('label');
    }
  }
}

// Register the custom element
export function defineIcon(tagName = 'dsn-icon'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, DsnIcon);
  }
}
