import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { DsnUnorderedList, defineUnorderedList } from './UnorderedList';

// Register the custom element once for all tests
beforeAll(() => {
  defineUnorderedList();
});

function createElement(): DsnUnorderedList {
  const el = document.createElement('dsn-unordered-list') as DsnUnorderedList;
  document.body.appendChild(el);
  return el;
}

function getInternalList(el: DsnUnorderedList): HTMLUListElement {
  return el.shadowRoot!.querySelector('ul')!;
}

describe('DsnUnorderedList', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('creates a shadow root', () => {
      const el = createElement();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an internal ul element', () => {
      const el = createElement();
      const list = getInternalList(el);
      expect(list).toBeInstanceOf(HTMLUListElement);
    });

    it('renders a style element in shadow DOM', () => {
      const el = createElement();
      const style = el.shadowRoot!.querySelector('style');
      expect(style).not.toBeNull();
      expect(style!.textContent).toContain('.dsn-unordered-list');
    });

    it('renders a default slot for content projection', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).not.toBeNull();
    });

    it('applies dsn-unordered-list class to internal list', () => {
      const el = createElement();
      const list = getInternalList(el);
      expect(list.classList.contains('dsn-unordered-list')).toBe(true);
    });
  });
});

describe('defineUnorderedList', () => {
  it('does not throw when called with an already-registered tag', () => {
    expect(() => defineUnorderedList('dsn-unordered-list')).not.toThrow();
  });

  it('registers a custom element with the default tag name', () => {
    const el = document.createElement('dsn-unordered-list');
    expect(el).toBeInstanceOf(DsnUnorderedList);
  });
});
