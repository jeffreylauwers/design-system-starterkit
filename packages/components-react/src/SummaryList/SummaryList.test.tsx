import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  SummaryList,
  SummaryListRow,
  SummaryListKey,
  SummaryListValue,
  SummaryListActions,
} from './SummaryList';

// =============================================================================
// SummaryList
// =============================================================================

describe('SummaryList', () => {
  it('renders as a <dl> element', () => {
    const { container } = render(<SummaryList />);
    expect(container.firstChild?.nodeName).toBe('DL');
  });

  it('always has base dsn-summary-list class', () => {
    const { container } = render(<SummaryList />);
    expect(container.firstChild).toHaveClass('dsn-summary-list');
  });

  it('does not apply --no-border class by default', () => {
    const { container } = render(<SummaryList />);
    expect(container.firstChild).not.toHaveClass('dsn-summary-list--no-border');
  });

  it('applies --no-border class when noBorder is true', () => {
    const { container } = render(<SummaryList noBorder />);
    expect(container.firstChild).toHaveClass('dsn-summary-list--no-border');
  });

  it('applies custom className', () => {
    const { container } = render(<SummaryList className="custom" />);
    expect(container.firstChild).toHaveClass('dsn-summary-list');
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders children', () => {
    render(
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Naam</SummaryListKey>
          <SummaryListValue>Sarah</SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
    expect(screen.getByText('Sarah')).toBeInTheDocument();
  });

  it('forwards ref to the dl element', () => {
    const ref = { current: null as HTMLDListElement | null };
    render(<SummaryList ref={ref} />);
    expect(ref.current?.tagName).toBe('DL');
  });

  it('spreads additional HTML attributes', () => {
    render(<SummaryList data-testid="my-list" />);
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
  });
});

// =============================================================================
// SummaryListRow
// =============================================================================

describe('SummaryListRow', () => {
  it('renders as a <div> element', () => {
    const { container } = render(
      <dl>
        <SummaryListRow />
      </dl>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('always has base dsn-summary-list__row class', () => {
    const { container } = render(
      <dl>
        <SummaryListRow />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass('dsn-summary-list__row');
  });

  it('does not apply --no-actions class by default', () => {
    const { container } = render(
      <dl>
        <SummaryListRow />
      </dl>
    );
    expect(container.querySelector('div')).not.toHaveClass(
      'dsn-summary-list__row--no-actions'
    );
  });

  it('applies --no-actions class when noActions is true', () => {
    const { container } = render(
      <dl>
        <SummaryListRow noActions />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass(
      'dsn-summary-list__row--no-actions'
    );
  });

  it('applies custom className', () => {
    const { container } = render(
      <dl>
        <SummaryListRow className="custom-row" />
      </dl>
    );
    expect(container.querySelector('div')).toHaveClass('custom-row');
  });

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <dl>
        <SummaryListRow ref={ref} />
      </dl>
    );
    expect(ref.current?.tagName).toBe('DIV');
  });
});

// =============================================================================
// SummaryListKey
// =============================================================================

describe('SummaryListKey', () => {
  it('renders as a <dt> element', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListKey>Naam</SummaryListKey>
        </div>
      </dl>
    );
    expect(container.querySelector('dt')).toBeInTheDocument();
  });

  it('always has base dsn-summary-list__key class', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListKey>Naam</SummaryListKey>
        </div>
      </dl>
    );
    expect(container.querySelector('dt')).toHaveClass('dsn-summary-list__key');
  });

  it('renders children', () => {
    render(
      <dl>
        <div>
          <SummaryListKey>Naam</SummaryListKey>
        </div>
      </dl>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
  });

  it('forwards ref to the dt element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <SummaryListKey ref={ref}>Naam</SummaryListKey>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DT');
  });
});

// =============================================================================
// SummaryListValue
// =============================================================================

describe('SummaryListValue', () => {
  it('renders as a <dd> element', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListValue>Sarah</SummaryListValue>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toBeInTheDocument();
  });

  it('always has base dsn-summary-list__value class', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListValue>Sarah</SummaryListValue>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass(
      'dsn-summary-list__value'
    );
  });

  it('renders children', () => {
    render(
      <dl>
        <div>
          <SummaryListValue>Sarah Hendricks</SummaryListValue>
        </div>
      </dl>
    );
    expect(screen.getByText('Sarah Hendricks')).toBeInTheDocument();
  });

  it('forwards ref to the dd element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <SummaryListValue ref={ref}>Sarah</SummaryListValue>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DD');
  });
});

// =============================================================================
// SummaryListActions
// =============================================================================

describe('SummaryListActions', () => {
  it('renders as a <dd> element', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListActions>
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toBeInTheDocument();
  });

  it('always has base dsn-summary-list__actions class', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListActions>
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass(
      'dsn-summary-list__actions'
    );
  });

  it('renders a single action without a list wrapper', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListActions>
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('ul')).not.toBeInTheDocument();
    expect(screen.getByText('Wijzig')).toBeInTheDocument();
  });

  it('wraps multiple actions in a <ul> with list items', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListActions>
            <a href="#">Wijzig</a>
            <button type="button">Verwijder</button>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('ul')).toHaveClass(
      'dsn-summary-list__actions-list'
    );
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(2);
    items.forEach((item) => {
      expect(item).toHaveClass('dsn-summary-list__actions-list-item');
    });
  });

  it('forwards ref to the dd element', () => {
    const ref = { current: null as HTMLElement | null };
    render(
      <dl>
        <div>
          <SummaryListActions ref={ref}>
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(ref.current?.tagName).toBe('DD');
  });

  it('applies custom className', () => {
    const { container } = render(
      <dl>
        <div>
          <SummaryListActions className="custom-actions">
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </div>
      </dl>
    );
    expect(container.querySelector('dd')).toHaveClass('custom-actions');
  });
});

// =============================================================================
// Composition
// =============================================================================

describe('SummaryList composition', () => {
  it('renders a complete summary list with key and value', () => {
    render(
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Naam</SummaryListKey>
          <SummaryListValue>Sarah Hendricks</SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    );
    expect(screen.getByText('Naam').tagName).toBe('DT');
    expect(screen.getByText('Sarah Hendricks').tagName).toBe('DD');
  });

  it('renders a complete summary list with actions', () => {
    render(
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Naam</SummaryListKey>
          <SummaryListValue>Sarah Hendricks</SummaryListValue>
          <SummaryListActions>
            <a href="#">Wijzig</a>
          </SummaryListActions>
        </SummaryListRow>
      </SummaryList>
    );
    expect(screen.getByText('Wijzig')).toBeInTheDocument();
  });

  it('renders multiple rows', () => {
    render(
      <SummaryList>
        <SummaryListRow>
          <SummaryListKey>Naam</SummaryListKey>
          <SummaryListValue>Sarah</SummaryListValue>
        </SummaryListRow>
        <SummaryListRow>
          <SummaryListKey>Leeftijd</SummaryListKey>
          <SummaryListValue>34</SummaryListValue>
        </SummaryListRow>
      </SummaryList>
    );
    expect(screen.getByText('Naam')).toBeInTheDocument();
    expect(screen.getByText('Leeftijd')).toBeInTheDocument();
  });
});
