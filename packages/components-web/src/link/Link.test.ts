import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { DsnLink, defineLink } from './Link';

// Register the custom element once for all tests
beforeAll(() => {
  defineLink();
});

function createElement(attrs: Record<string, string> = {}): DsnLink {
  const el = document.createElement('dsn-link') as DsnLink;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

function getInternalAnchor(el: DsnLink): HTMLAnchorElement {
  return el.shadowRoot!.querySelector('a')!;
}

describe('DsnLink', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('rendering', () => {
    it('creates a shadow root', () => {
      const el = createElement();
      expect(el.shadowRoot).not.toBeNull();
    });

    it('renders an internal anchor element', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor).toBeInstanceOf(HTMLAnchorElement);
    });

    it('renders a style element in shadow DOM', () => {
      const el = createElement();
      const style = el.shadowRoot!.querySelector('style');
      expect(style).not.toBeNull();
      expect(style!.textContent).toContain('.dsn-link');
    });

    it('renders a default slot for content projection', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot:not([name])');
      expect(slot).not.toBeNull();
    });

    it('renders an icon-start named slot', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot[name="icon-start"]');
      expect(slot).not.toBeNull();
    });

    it('renders an icon-end named slot', () => {
      const el = createElement();
      const slot = el.shadowRoot!.querySelector('slot[name="icon-end"]');
      expect(slot).not.toBeNull();
    });

    it('renders slots in correct order: icon-start, default, icon-end', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      const slots = anchor.querySelectorAll('slot');
      expect(slots).toHaveLength(3);
      expect(slots[0].getAttribute('name')).toBe('icon-start');
      expect(slots[1].getAttribute('name')).toBeNull();
      expect(slots[2].getAttribute('name')).toBe('icon-end');
    });

    it('applies dsn-link class to internal anchor', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor.classList.contains('dsn-link')).toBe(true);
    });
  });

  describe('href attribute', () => {
    it('sets href on internal anchor', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('href')).toBe('/about');
    });

    it('defaults to no href', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor.hasAttribute('href')).toBe(false);
    });

    it('updates internal anchor when href changes', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('href')).toBe('/about');

      el.href = '/contact';
      expect(anchor.getAttribute('href')).toBe('/contact');
    });

    it('removes href from internal anchor when set to null', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('href')).toBe('/about');

      el.href = null;
      expect(anchor.hasAttribute('href')).toBe(false);
    });
  });

  describe('target attribute', () => {
    it('sets target on internal anchor', () => {
      const el = createElement({ href: '/about', target: '_blank' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('target')).toBe('_blank');
    });

    it('defaults to no target', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor.hasAttribute('target')).toBe(false);
    });
  });

  describe('rel attribute', () => {
    it('sets rel on internal anchor', () => {
      const el = createElement({ href: '/about', rel: 'noopener noreferrer' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('defaults to no rel', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor.hasAttribute('rel')).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('sets aria-disabled on internal anchor when disabled', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('aria-disabled')).toBe('true');
    });

    it('removes href from internal anchor when disabled', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.hasAttribute('href')).toBe(false);
    });

    it('sets tabindex to -1 when disabled', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('tabindex')).toBe('-1');
    });

    it('restores href when disabled is removed', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.hasAttribute('href')).toBe(false);

      el.disabled = false;
      expect(anchor.getAttribute('href')).toBe('/about');
    });

    it('removes aria-disabled when disabled is removed', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('aria-disabled')).toBe('true');

      el.disabled = false;
      expect(anchor.hasAttribute('aria-disabled')).toBe(false);
    });

    it('removes tabindex when disabled is removed', () => {
      const el = createElement({ href: '/about', disabled: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('tabindex')).toBe('-1');

      el.disabled = false;
      expect(anchor.hasAttribute('tabindex')).toBe(false);
    });

    it('reflects disabled property to attribute', () => {
      const el = createElement();
      el.disabled = true;
      expect(el.hasAttribute('disabled')).toBe(true);

      el.disabled = false;
      expect(el.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('current state', () => {
    it('sets aria-current="page" on internal anchor when current', () => {
      const el = createElement({ href: '/dashboard', current: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('aria-current')).toBe('page');
    });

    it('removes aria-current when current is removed', () => {
      const el = createElement({ href: '/dashboard', current: '' });
      const anchor = getInternalAnchor(el);
      expect(anchor.getAttribute('aria-current')).toBe('page');

      el.current = false;
      expect(anchor.hasAttribute('aria-current')).toBe(false);
    });

    it('reflects current property to attribute', () => {
      const el = createElement();
      el.current = true;
      expect(el.hasAttribute('current')).toBe(true);

      el.current = false;
      expect(el.hasAttribute('current')).toBe(false);
    });
  });

  describe('size attribute', () => {
    it('does not apply size class by default', () => {
      const el = createElement();
      const anchor = getInternalAnchor(el);
      expect(anchor.className).toBe('dsn-link');
    });

    it('applies size class when size is set to small', () => {
      const el = createElement({ size: 'small' });
      const anchor = getInternalAnchor(el);
      expect(anchor.classList.contains('dsn-link--size-small')).toBe(true);
    });

    it('applies size class when size is set to default', () => {
      const el = createElement({ size: 'default' });
      const anchor = getInternalAnchor(el);
      expect(anchor.classList.contains('dsn-link--size-default')).toBe(true);
    });

    it('applies size class when size is set to large', () => {
      const el = createElement({ size: 'large' });
      const anchor = getInternalAnchor(el);
      expect(anchor.classList.contains('dsn-link--size-large')).toBe(true);
    });

    it('updates class when size changes', () => {
      const el = createElement({ size: 'small' });
      const anchor = getInternalAnchor(el);
      expect(anchor.classList.contains('dsn-link--size-small')).toBe(true);

      el.size = 'large';
      expect(anchor.classList.contains('dsn-link--size-large')).toBe(true);
      expect(anchor.classList.contains('dsn-link--size-small')).toBe(false);
    });

    it('returns default from size property when no attribute set', () => {
      const el = createElement();
      expect(el.size).toBe('default');
    });

    it('reflects size property to attribute', () => {
      const el = createElement();
      el.size = 'large';
      expect(el.getAttribute('size')).toBe('large');
    });
  });

  describe('focus delegation', () => {
    it('delegates focus to internal anchor', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      const focusSpy = vi.spyOn(anchor, 'focus');

      el.focus();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('delegates blur to internal anchor', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      const blurSpy = vi.spyOn(anchor, 'blur');

      el.blur();
      expect(blurSpy).toHaveBeenCalled();
    });

    it('delegates click to internal anchor', () => {
      const el = createElement({ href: '/about' });
      const anchor = getInternalAnchor(el);
      const clickSpy = vi.spyOn(anchor, 'click');

      el.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});

describe('defineLink', () => {
  it('does not throw when called with an already-registered tag', () => {
    expect(() => defineLink('dsn-link')).not.toThrow();
  });

  it('registers a custom element with the default tag name', () => {
    const el = document.createElement('dsn-link');
    expect(el).toBeInstanceOf(DsnLink);
  });
});
