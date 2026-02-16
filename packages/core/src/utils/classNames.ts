/**
 * Combines class names conditionally
 * Similar to the popular 'classnames' package
 *
 * @example
 * classNames('btn', 'btn--primary') // 'btn btn--primary'
 * classNames('btn', { 'btn--active': true, 'btn--disabled': false }) // 'btn btn--active'
 * classNames('btn', null, undefined, 'btn--large') // 'btn btn--large'
 */
export function classNames(
  ...args: (string | Record<string, boolean> | null | undefined | false)[]
): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(' ');
}

/**
 * BEM (Block Element Modifier) class name helper
 *
 * @example
 * bem('button') // 'button'
 * bem('button', 'icon') // 'button__icon'
 * bem('button', null, 'primary') // 'button--primary'
 * bem('button', 'icon', 'large') // 'button__icon--large'
 */
export function bem(
  block: string,
  element?: string | null,
  modifier?: string | null
): string {
  let className = block;

  if (element) {
    className += `__${element}`;
  }

  if (modifier) {
    className += `--${modifier}`;
  }

  return className;
}

/**
 * Generates BEM class names with multiple modifiers
 *
 * @example
 * bemModifiers('button', ['primary', 'large'])
 * // 'button button--primary button--large'
 */
export function bemModifiers(
  block: string,
  modifiers: (string | null | undefined | false)[]
): string {
  const classes = [block];

  modifiers.forEach((modifier) => {
    if (modifier) {
      classes.push(`${block}--${modifier}`);
    }
  });

  return classes.join(' ');
}
