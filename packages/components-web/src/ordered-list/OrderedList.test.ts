import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { DsnOrderedList, defineOrderedList } from './OrderedList';

// Register the custom element once for all tests
beforeAll(() => {
  defineOrderedList();
});

function createElement(attrs: Record<string, string> = {}): DsnOrderedList {
  const el = document.createElement('dsn-ordered-list') as DsnOrderedList;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

function getInternalList(el: DsnOrderedList): HTMLOListElement {
  return el.shadowRoot!.querySelector('ol')!;
}

describe('DsnOrderedList', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('creates a shadow root', () => {
      const el = createElement();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an internal ol element', () => {
      const el = createElement();
      const list = getInternalList(el);
      expect(list).toBeInstanceOf(HTMLOListElement);
    });

    it('renders a style element in shadow DOM', () => {
      const el = createElement();
      const style = el.shadowRoot!.querySelector('style');
      expect(style).not.toBeNull();
      expect(style!.textContent).toContain('.dsn-ordered-list');
    });

    it('renders a default slot for content projection', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).not.toBeNull();
    });

    it('applies dsn-ordered-list class to internal list', () => {
      const el = createElement();
      const list = getInternalList(el);
      expect(list.classList.contains('dsn-ordered-list')).toBe(true);
    });
  });

  describe('start attribute', () => {
    it('sets start on internal ol', () => {
      const el = createElement({ start: '5' });
      const list = getInternalList(el);
      expect(list.getAttribute('start')).toBe('5');
    });

    it('defaults to no start attribute', () => {
      const el = createElement();
      const list = getInternalList(el);
      expect(list.hasAttribute('start')).toBe(false);
    });

    it('updates internal ol when start changes', () => {
      const el = createElement({ start: '3' });
      const list = getInternalList(el);
      expect(list.getAttribute('start')).toBe('3');

      el.start = 10;
      expect(list.getAttribute('start')).toBe('10');
    });

    it('returns 1 from start property when no attribute set', () => {
      const el = createElement();
      expect(el.start).toBe(1);
    });
  });
});

describe('defineOrderedList', () => {
  it('does not throw when called with an already-registered tag', () => {
    expect(() => defineOrderedList('dsn-ordered-list')).not.toThrow();
  });

  it('registers a custom element with the default tag name', () => {
    const el = document.createElement('dsn-ordered-list');
    expect(el).toBeInstanceOf(DsnOrderedList);
  });
});
