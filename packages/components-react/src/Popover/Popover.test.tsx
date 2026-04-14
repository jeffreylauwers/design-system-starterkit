import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  Popover,
  PopoverHeader,
  PopoverHeading,
  PopoverBody,
  PopoverFooter,
} from './Popover';

// jsdom heeft geen volledige Popover API implementatie.
// Mock showPopover, hidePopover en het popover attribuut voor alle tests.
beforeEach(() => {
  HTMLElement.prototype.showPopover = vi.fn();
  HTMLElement.prototype.hidePopover = vi.fn();
});

// Helper: standaard popover met alle subcomponenten
function DefaultPopover({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef} type="button">
        Trigger
      </button>
      <Popover isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
        <PopoverHeader>
          <PopoverHeading>Popover titel</PopoverHeading>
        </PopoverHeader>
        <PopoverBody>
          <p>Popover inhoud</p>
        </PopoverBody>
        <PopoverFooter>
          <button type="button">Actie</button>
        </PopoverFooter>
      </Popover>
    </>
  );
}

describe('Popover', () => {
  // ===========================
  // Rendering
  // ===========================

  it('renders as a div element', () => {
    const { container } = render(<DefaultPopover />);
    const popover = container.querySelector('.dsn-popover');
    expect(popover).toBeInTheDocument();
    expect(popover?.tagName).toBe('DIV');
  });

  it('renders children content', () => {
    render(<DefaultPopover />);
    expect(screen.getByText('Popover inhoud')).toBeInTheDocument();
  });

  it('applies dsn-popover class', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('.dsn-popover')).toBeInTheDocument();
  });

  it('applies placement modifier class (default: bottom)', () => {
    const { container } = render(<DefaultPopover />);
    expect(
      container.querySelector('.dsn-popover--placement-bottom')
    ).toBeInTheDocument();
  });

  it('applies custom placement modifier class', () => {
    const triggerRef = { current: document.createElement('button') };
    const { container } = render(
      <Popover
        isOpen={true}
        triggerRef={triggerRef}
        placement="top"
        label="Test"
      >
        <PopoverBody>Inhoud</PopoverBody>
      </Popover>
    );
    expect(
      container.querySelector('.dsn-popover--placement-top')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const triggerRef = { current: document.createElement('button') };
    const { container } = render(
      <Popover
        isOpen={true}
        triggerRef={triggerRef}
        className="custom-popover"
        label="Test"
      >
        <PopoverBody>Inhoud</PopoverBody>
      </Popover>
    );
    expect(container.querySelector('.custom-popover')).toBeInTheDocument();
  });

  // ===========================
  // role / aria-modal
  // ===========================

  it('has role="dialog"', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('[role="dialog"]')).toBeInTheDocument();
  });

  it('has aria-modal="false"', () => {
    const { container } = render(<DefaultPopover />);
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-modal', 'false');
  });

  // ===========================
  // aria-labelledby / aria-label
  // ===========================

  it('uses aria-labelledby linking to PopoverHeading id when no label prop', () => {
    render(<DefaultPopover />);
    const dialog = document.querySelector('[role="dialog"]')!;
    const labelledById = dialog.getAttribute('aria-labelledby');
    expect(labelledById).toBeTruthy();
    const heading = document.getElementById(labelledById!);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Popover titel');
  });

  it('uses aria-label when label prop is provided', () => {
    const triggerRef = { current: document.createElement('button') };
    render(
      <Popover isOpen={true} triggerRef={triggerRef} label="Acties">
        <PopoverBody>Inhoud</PopoverBody>
      </Popover>
    );
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-label', 'Acties');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  // ===========================
  // showPopover / hidePopover
  // ===========================

  it('calls showPopover when isOpen is true', () => {
    render(<DefaultPopover isOpen={true} />);
    expect(HTMLElement.prototype.showPopover).toHaveBeenCalled();
  });

  it('does not call showPopover when isOpen is false', () => {
    render(<DefaultPopover isOpen={false} />);
    expect(HTMLElement.prototype.showPopover).not.toHaveBeenCalled();
  });

  // ===========================
  // aria-expanded op trigger
  // ===========================

  it('sets aria-expanded="true" on trigger when isOpen is true', () => {
    const { getByText } = render(<DefaultPopover isOpen={true} />);
    const trigger = getByText('Trigger').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-expanded="false" on trigger when isOpen is false', () => {
    const { getByText } = render(<DefaultPopover isOpen={false} />);
    const trigger = getByText('Trigger').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  // ===========================
  // onClose callback
  // ===========================

  it('calls onClose when close button in header is clicked', async () => {
    const onClose = vi.fn();
    render(<DefaultPopover onClose={onClose} />);
    const closeButton = screen.getByText('Sluiten').closest('button')!;
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  // ===========================
  // Sub-components rendering
  // ===========================

  it('renders header with dsn-popover__header class', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('.dsn-popover__header')).toBeInTheDocument();
  });

  it('renders body with dsn-popover__body class', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('.dsn-popover__body')).toBeInTheDocument();
  });

  it('renders footer with dsn-popover__footer class', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('.dsn-popover__footer')).toBeInTheDocument();
  });

  it('renders heading with dsn-popover-heading class', () => {
    const { container } = render(<DefaultPopover />);
    expect(container.querySelector('.dsn-popover-heading')).toBeInTheDocument();
  });

  // ===========================
  // PopoverHeading levels
  // ===========================

  it('renders heading as h2 by default', () => {
    render(
      <>
        <button>Trigger</button>
        <Popover isOpen={true} triggerRef={{ current: null }}>
          <PopoverHeader>
            <PopoverHeading>Titel</PopoverHeading>
          </PopoverHeader>
          <PopoverBody>Inhoud</PopoverBody>
        </Popover>
      </>
    );
    expect(
      document.querySelector('h2.dsn-popover-heading')
    ).toBeInTheDocument();
  });

  it('renders heading at specified level', () => {
    render(
      <>
        <button>Trigger</button>
        <Popover isOpen={true} triggerRef={{ current: null }}>
          <PopoverHeader>
            <PopoverHeading level={3}>Titel</PopoverHeading>
          </PopoverHeader>
          <PopoverBody>Inhoud</PopoverBody>
        </Popover>
      </>
    );
    expect(
      document.querySelector('h3.dsn-popover-heading')
    ).toBeInTheDocument();
  });

  // ===========================
  // Ref forwarding
  // ===========================

  it('forwards ref to the div element', () => {
    const ref = { current: null as HTMLDivElement | null };
    const triggerRef = { current: null };
    render(
      <Popover ref={ref} isOpen={true} triggerRef={triggerRef} label="Test">
        <PopoverBody>Inhoud</PopoverBody>
      </Popover>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('DIV');
  });

  // ===========================
  // HTML attributes
  // ===========================

  it('spreads additional HTML attributes', () => {
    const triggerRef = { current: null };
    render(
      <Popover
        isOpen={true}
        triggerRef={triggerRef}
        label="Test"
        data-testid="mijn-popover"
      >
        <PopoverBody>Inhoud</PopoverBody>
      </Popover>
    );
    expect(screen.getByTestId('mijn-popover')).toBeInTheDocument();
  });

  // ===========================
  // PopoverBody only (geen header/footer)
  // ===========================

  it('renders without header and footer (alleen body)', () => {
    const triggerRef = { current: null };
    const { container } = render(
      <Popover isOpen={true} triggerRef={triggerRef} label="Acties">
        <PopoverBody>
          <p>Alleen body</p>
        </PopoverBody>
      </Popover>
    );
    expect(
      container.querySelector('.dsn-popover__header')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('.dsn-popover__footer')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Alleen body')).toBeInTheDocument();
  });
});
