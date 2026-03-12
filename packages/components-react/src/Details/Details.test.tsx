import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Details } from './Details';

describe('Details', () => {
  // ===========================
  // Rendering
  // ===========================

  it('renders summary label', () => {
    render(<Details summary="Meer informatie">Inhoud</Details>);
    expect(screen.getByText('Meer informatie')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Details summary="Label">Aanvullende informatie</Details>);
    expect(screen.getByText('Aanvullende informatie')).toBeInTheDocument();
  });

  it('renders as a <details> element', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.firstChild?.nodeName).toBe('DETAILS');
  });

  it('renders a <summary> element inside details', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.querySelector('summary')).toBeInTheDocument();
  });

  it('wraps children in dsn-details__content div', () => {
    render(
      <Details summary="Label">
        <p>Inhoud</p>
      </Details>
    );
    const content = document.querySelector('.dsn-details__content');
    expect(content).toBeInTheDocument();
    expect(content?.querySelector('p')).toBeInTheDocument();
  });

  // ===========================
  // Classes
  // ===========================

  it('always has base dsn-details class', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.firstChild).toHaveClass('dsn-details');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Details summary="Label" className="custom-details">
        Inhoud
      </Details>
    );
    expect(container.firstChild).toHaveClass('dsn-details');
    expect(container.firstChild).toHaveClass('custom-details');
  });

  it('applies dsn-details__summary class to summary element', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.querySelector('summary')).toHaveClass(
      'dsn-details__summary'
    );
  });

  it('applies dsn-details__summary-label class to label span', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(
      container.querySelector('.dsn-details__summary-label')
    ).toBeInTheDocument();
  });

  it('applies dsn-details__icon class to chevron icon', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.querySelector('.dsn-details__icon')).toBeInTheDocument();
  });

  // ===========================
  // Open state
  // ===========================

  it('is closed by default', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    expect(container.firstChild).not.toHaveAttribute('open');
  });

  it('opens when defaultOpen is true', () => {
    const { container } = render(
      <Details summary="Label" defaultOpen>
        Inhoud
      </Details>
    );
    expect(container.firstChild).toHaveAttribute('open');
  });

  // ===========================
  // onToggle callback
  // ===========================

  it('calls onToggle when toggled', async () => {
    const onToggle = vi.fn();
    render(
      <Details summary="Label" onToggle={onToggle}>
        Inhoud
      </Details>
    );
    const summary = screen.getByText('Label').closest('summary')!;
    await userEvent.click(summary);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('calls onToggle with false when closed after being open', async () => {
    const onToggle = vi.fn();
    render(
      <Details summary="Label" defaultOpen onToggle={onToggle}>
        Inhoud
      </Details>
    );
    const summary = screen.getByText('Label').closest('summary')!;
    await userEvent.click(summary);
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('does not throw when onToggle is not provided', async () => {
    render(<Details summary="Label">Inhoud</Details>);
    const summary = screen.getByText('Label').closest('summary')!;
    await expect(userEvent.click(summary)).resolves.not.toThrow();
  });

  // ===========================
  // Ref + HTML attributes
  // ===========================

  it('forwards ref to the details element', () => {
    const ref = { current: null as HTMLDetailsElement | null };
    render(
      <Details ref={ref} summary="Label">
        Inhoud
      </Details>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('DETAILS');
  });

  it('spreads additional HTML attributes', () => {
    render(
      <Details summary="Label" id="details-1" data-testid="my-details">
        Inhoud
      </Details>
    );
    const el = screen.getByTestId('my-details');
    expect(el).toHaveAttribute('id', 'details-1');
  });

  // ===========================
  // Accessibility
  // ===========================

  it('chevron icon has aria-hidden', () => {
    const { container } = render(<Details summary="Label">Inhoud</Details>);
    const icon = container.querySelector('.dsn-details__icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('summary label text is the accessible name', () => {
    render(<Details summary="Meer informatie">Inhoud</Details>);
    // The summary element should be discoverable by its visible text
    expect(
      screen.getByText('Meer informatie').closest('summary')
    ).toBeInTheDocument();
  });
});
