import { describe, it, expect } from 'vitest';
import { classNames, bem, bemModifiers } from './classNames';

describe('classNames', () => {
  it('joins string arguments', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(classNames('a', null, undefined, false, 'b')).toBe('a b');
  });

  it('handles object arguments', () => {
    expect(classNames('btn', { 'btn--active': true, 'btn--disabled': false })).toBe('btn btn--active');
  });

  it('handles mixed arguments', () => {
    expect(classNames('btn', null, { 'btn--active': true }, 'extra')).toBe('btn btn--active extra');
  });

  it('returns empty string when no valid classes', () => {
    expect(classNames(null, undefined, false)).toBe('');
  });

  it('returns empty string when called with no arguments', () => {
    expect(classNames()).toBe('');
  });
});

describe('bem', () => {
  it('returns block name only', () => {
    expect(bem('button')).toBe('button');
  });

  it('returns block__element', () => {
    expect(bem('button', 'icon')).toBe('button__icon');
  });

  it('returns block--modifier', () => {
    expect(bem('button', null, 'primary')).toBe('button--primary');
  });

  it('returns block__element--modifier', () => {
    expect(bem('button', 'icon', 'large')).toBe('button__icon--large');
  });

  it('ignores null element', () => {
    expect(bem('button', null)).toBe('button');
  });

  it('ignores null modifier', () => {
    expect(bem('button', 'icon', null)).toBe('button__icon');
  });
});

describe('bemModifiers', () => {
  it('returns block with modifiers', () => {
    expect(bemModifiers('button', ['primary', 'large'])).toBe('button button--primary button--large');
  });

  it('filters out falsy modifiers', () => {
    expect(bemModifiers('button', ['primary', null, undefined, false, 'large'])).toBe('button button--primary button--large');
  });

  it('returns only block when no valid modifiers', () => {
    expect(bemModifiers('button', [null, undefined, false])).toBe('button');
  });

  it('returns only block when modifiers array is empty', () => {
    expect(bemModifiers('button', [])).toBe('button');
  });
});
