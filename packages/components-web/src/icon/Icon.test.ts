import { describe, it, expect, beforeEach } from 'vitest';
import { DsnIcon, defineIcon } from './Icon';

// Register the custom element for tests
defineIcon();

function createElement(attrs: Record<string, string> = {}): DsnIcon {
  const el = document.createElement('dsn-icon') as DsnIcon;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

describe('DsnIcon', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('registration', () => {
    it('should be registered as dsn-icon', () => {
      expect(customElements.get('dsn-icon')).toBe(DsnIcon);
    });

    it('should be an instance of HTMLElement', () => {
      const el = createElement({ name: 'check' });
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it('should have a shadow root', () => {
      const el = createElement({ name: 'check' });
      expect(el.shadowRoot).not.toBeNull();
    });
  });

  describe('rendering', () => {
    it('should render an SVG when name is set', () => {
      const el = createElement({ name: 'check' });
      const svg = el.shadowRoot!.querySelector('svg');
      expect(svg).not.toBeNull();
    });

    it('should not render an SVG when name is empty', () => {
      const el = createElement();
      const svg = el.shadowRoot!.querySelector('svg');
      expect(svg).toBeNull();
    });

    it('should not render an SVG for unknown icon names', () => {
      const el = createElement({ name: 'nonexistent-icon' });
      const svg = el.shadowRoot!.querySelector('svg');
      expect(svg).toBeNull();
    });

    it('should render path elements inside the SVG', () => {
      const el = createElement({ name: 'check' });
      const paths = el.shadowRoot!.querySelectorAll('svg path');
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should have correct SVG attributes', () => {
      const el = createElement({ name: 'check' });
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(svg.getAttribute('fill')).toBe('none');
      expect(svg.getAttribute('stroke')).toBe('currentColor');
      expect(svg.getAttribute('stroke-width')).toBe('2');
      expect(svg.getAttribute('stroke-linecap')).toBe('round');
      expect(svg.getAttribute('stroke-linejoin')).toBe('round');
    });

    it('should update SVG when name attribute changes', () => {
      const el = createElement({ name: 'check' });
      const pathsBefore = el.shadowRoot!.querySelectorAll('svg path');

      el.setAttribute('name', 'plus');
      const pathsAfter = el.shadowRoot!.querySelectorAll('svg path');

      // plus has 2 paths, check has 1
      expect(pathsAfter.length).toBe(2);
      expect(pathsBefore.length).toBe(1);
    });

    it('should remove SVG when name is set to unknown', () => {
      const el = createElement({ name: 'check' });
      expect(el.shadowRoot!.querySelector('svg')).not.toBeNull();

      el.setAttribute('name', 'invalid');
      expect(el.shadowRoot!.querySelector('svg')).toBeNull();
    });
  });

  describe('sizes', () => {
    it('should default to md size', () => {
      const el = createElement({ name: 'check' });
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.classList.contains('dsn-icon')).toBe(true);
      // md is default, no modifier class needed
      expect(svg.classList.contains('dsn-icon--md')).toBe(false);
    });

    it.each(['sm', 'lg', 'xl', '2xl', '3xl', '4xl'] as const)(
      'should apply dsn-icon--%s class for size="%s"',
      (size) => {
        const el = createElement({ name: 'check', size });
        const svg = el.shadowRoot!.querySelector('svg')!;
        expect(svg.classList.contains(`dsn-icon--${size}`)).toBe(true);
      }
    );

    it('should update size class when size attribute changes', () => {
      const el = createElement({ name: 'check', size: 'sm' });
      let svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.classList.contains('dsn-icon--sm')).toBe(true);

      el.setAttribute('size', 'lg');
      svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.classList.contains('dsn-icon--lg')).toBe(true);
      expect(svg.classList.contains('dsn-icon--sm')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should be aria-hidden when no label is provided', () => {
      const el = createElement({ name: 'check' });
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have role=img and aria-label when label is provided', () => {
      const el = createElement({ name: 'check', label: 'Checkmark' });
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('role')).toBe('img');
      expect(svg.getAttribute('aria-label')).toBe('Checkmark');
    });

    it('should not have aria-hidden when label is provided', () => {
      const el = createElement({ name: 'check', label: 'Checkmark' });
      const svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should update accessibility when label changes', () => {
      const el = createElement({ name: 'check' });
      let svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).toBe('true');

      el.setAttribute('label', 'Done');
      svg = el.shadowRoot!.querySelector('svg')!;
      expect(svg.getAttribute('role')).toBe('img');
      expect(svg.getAttribute('aria-label')).toBe('Done');
    });
  });

  describe('properties', () => {
    it('should reflect name property to attribute', () => {
      const el = createElement();
      el.name = 'star';
      expect(el.getAttribute('name')).toBe('star');
    });

    it('should reflect size property to attribute', () => {
      const el = createElement({ name: 'check' });
      el.size = 'lg';
      expect(el.getAttribute('size')).toBe('lg');
    });

    it('should reflect label property to attribute', () => {
      const el = createElement({ name: 'check' });
      el.label = 'Done';
      expect(el.getAttribute('label')).toBe('Done');
    });

    it('should remove label attribute when set to empty string', () => {
      const el = createElement({ name: 'check', label: 'Done' });
      el.label = '';
      expect(el.hasAttribute('label')).toBe(false);
    });

    it('should return correct default values for properties', () => {
      const el = createElement({ name: 'check' });
      expect(el.name).toBe('check');
      expect(el.size).toBe('md');
      expect(el.label).toBe('');
    });
  });

  describe('icons', () => {
    const iconNames = [
      'arrow-left',
      'arrow-right',
      'check',
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-up',
      'download',
      'edit',
      'heart',
      'home',
      'menu',
      'minus',
      'plus',
      'search',
      'settings',
      'star',
      'trash',
      'user',
      'x',
    ];

    it.each(iconNames)('should render icon "%s"', (name) => {
      const el = createElement({ name });
      const svg = el.shadowRoot!.querySelector('svg');
      expect(svg).not.toBeNull();
      const paths = svg!.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe('defineIcon', () => {
    it('should not throw when called multiple times', () => {
      expect(() => defineIcon()).not.toThrow();
      expect(() => defineIcon()).not.toThrow();
    });
  });
});
