import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders children', () => {
    render(<StatusBadge>Actief</StatusBadge>);
    expect(screen.getByText('Actief')).toBeInTheDocument();
  });

  it('renders as a <strong> element', () => {
    render(<StatusBadge>Status</StatusBadge>);
    expect(screen.getByText('Status').tagName).toBe('STRONG');
  });

  it('always has base dsn-status-badge class', () => {
    render(<StatusBadge>Status</StatusBadge>);
    expect(screen.getByText('Status')).toHaveClass('dsn-status-badge');
  });

  it('does not add variant modifier class for neutral variant (default)', () => {
    render(<StatusBadge>Status</StatusBadge>);
    const el = screen.getByText('Status');
    expect(el).not.toHaveClass('dsn-status-badge--neutral');
  });

  it.each(['positive', 'negative', 'warning', 'info'] as const)(
    'applies variant modifier class for %s variant',
    (variant) => {
      render(<StatusBadge variant={variant}>Status</StatusBadge>);
      expect(screen.getByText('Status')).toHaveClass(
        `dsn-status-badge--${variant}`
      );
    }
  );

  it('does not apply any modifier class for explicit neutral variant', () => {
    render(<StatusBadge variant="neutral">Status</StatusBadge>);
    const el = screen.getByText('Status');
    expect(el).not.toHaveClass('dsn-status-badge--neutral');
  });

  it('applies custom className', () => {
    render(<StatusBadge className="custom">Status</StatusBadge>);
    const el = screen.getByText('Status');
    expect(el).toHaveClass('dsn-status-badge');
    expect(el).toHaveClass('custom');
  });

  it('renders iconStart before children', () => {
    render(
      <StatusBadge iconStart={<svg data-testid="icon" />}>Status</StatusBadge>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders without iconStart when not provided', () => {
    render(<StatusBadge>Status</StatusBadge>);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(<StatusBadge ref={ref}>Status</StatusBadge>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('spreads additional HTML attributes', () => {
    render(
      <StatusBadge id="status-1" data-testid="badge">
        Status
      </StatusBadge>
    );
    const el = screen.getByTestId('badge');
    expect(el).toHaveAttribute('id', 'status-1');
  });

  it('renders status label content', () => {
    render(<StatusBadge>In behandeling</StatusBadge>);
    expect(screen.getByText('In behandeling')).toBeInTheDocument();
  });

  it('renders approval status content', () => {
    render(<StatusBadge variant="positive">Goedgekeurd</StatusBadge>);
    expect(screen.getByText('Goedgekeurd')).toBeInTheDocument();
  });

  it('renders rejection status content', () => {
    render(<StatusBadge variant="negative">Afgewezen</StatusBadge>);
    expect(screen.getByText('Afgewezen')).toBeInTheDocument();
  });
});
