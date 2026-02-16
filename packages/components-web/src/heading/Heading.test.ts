import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { DsnHeading, defineHeading } from './Heading';

// Register the custom element once for all tests
beforeAll(() => {
  defineHeading();
});

function createElement(attrs: Record<string, string> = {}): DsnHeading {
  const el = document.createElement('dsn-heading') as DsnHeading;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

function getInternalHeading(el: DsnHeading): HTMLElement {
  return el.shadowRoot!.querySelector('h1, h2, h3, h4, h5, h6')!;
}

describe('DsnHeading', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('creates a shadow root', () => {
      const el = createElement();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an internal heading element', () => {
      const el = createElement();
      const h = getInternalHeading(el);
      expect(h).not.toBeNull();
    });

    it('renders a style element in shadow DOM', () => {
      const el = createElement();
      const style = el.shadowRoot!.querySelector('style');
      expect(style).not.toBeNull();
      expect(style!.textContent).toContain('.dsn-heading');
    });

    it('renders a slot for content projection', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).not.toBeNull();
    });
  });

  describe('level attribute', () => {
    it('defaults to h2', () => {
      const el = createElement();
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H2');
    });

    it('renders h1 when level is 1', () => {
      const el = createElement({ level: '1' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H1');
    });

    it('renders h3 when level is 3', () => {
      const el = createElement({ level: '3' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H3');
    });

    it('renders h4 when level is 4', () => {
      const el = createElement({ level: '4' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H4');
    });

    it('renders h5 when level is 5', () => {
      const el = createElement({ level: '5' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H5');
    });

    it('renders h6 when level is 6', () => {
      const el = createElement({ level: '6' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H6');
    });

    it('updates element when level changes', () => {
      const el = createElement({ level: '2' });
      expect(getInternalHeading(el).tagName).toBe('H2');

      el.setAttribute('level', '4');
      expect(getInternalHeading(el).tagName).toBe('H4');
    });
  });

  describe('appearance attribute', () => {
    it('defaults appearance to match level', () => {
      const el = createElement({ level: '3' });
      const h = getInternalHeading(el);
      expect(h.className).toContain('dsn-heading--heading-3');
    });

    it('allows appearance independent of level', () => {
      const el = createElement({ level: '2', appearance: 'heading-4' });
      const h = getInternalHeading(el);
      expect(h.tagName).toBe('H2');
      expect(h.className).toContain('dsn-heading--heading-4');
    });

    it('updates classes when appearance changes', () => {
      const el = createElement({ appearance: 'heading-1' });
      const h = getInternalHeading(el);
      expect(h.className).toContain('dsn-heading--heading-1');

      el.setAttribute('appearance', 'heading-5');
      expect(h.className).toContain('dsn-heading--heading-5');
      expect(h.className).not.toContain('dsn-heading--heading-1');
    });
  });

  describe('level property', () => {
    it('returns "2" when no attribute set', () => {
      const el = createElement();
      expect(el.level).toBe('2');
    });

    it('reflects the attribute value', () => {
      const el = createElement({ level: '3' });
      expect(el.level).toBe('3');
    });

    it('sets the attribute when property is set', () => {
      const el = createElement();
      el.level = '5';
      expect(el.getAttribute('level')).toBe('5');
    });
  });

  describe('appearance property', () => {
    it('defaults to heading-2 when no attributes set', () => {
      const el = createElement();
      expect(el.appearance).toBe('heading-2');
    });

    it('reflects the attribute value', () => {
      const el = createElement({ appearance: 'heading-3' });
      expect(el.appearance).toBe('heading-3');
    });

    it('sets the attribute when property is set', () => {
      const el = createElement();
      el.appearance = 'heading-6';
      expect(el.getAttribute('appearance')).toBe('heading-6');
    });
  });

  describe('base class', () => {
    it('always includes dsn-heading base class', () => {
      const el = createElement();
      const h = getInternalHeading(el);
      expect(h.className).toContain('dsn-heading');
    });

    it('includes base class with heading-1 appearance', () => {
      const el = createElement({ appearance: 'heading-1' });
      const h = getInternalHeading(el);
      expect(h.className).toContain('dsn-heading');
      expect(h.className).toContain('dsn-heading--heading-1');
    });
  });

  describe('custom element registration', () => {
    it('is defined as dsn-heading', () => {
      expect(customElements.get('dsn-heading')).toBe(DsnHeading);
    });

    it('does not re-register if already defined', () => {
      // Should not throw
      defineHeading();
      expect(customElements.get('dsn-heading')).toBe(DsnHeading);
    });
  });
});
