import React from 'react';
import { classNames } from '@dsn/core';
import { Button } from '../Button';
import { Icon } from '../Icon';
import './Drawer.css';

// =============================================================================
// Context
// =============================================================================

interface DrawerContextValue {
  headingId: string;
  onClose?: () => void;
}

const DrawerContext = React.createContext<DrawerContextValue>({
  headingId: '',
});

// =============================================================================
// Drawer (root)
// =============================================================================

export interface DrawerProps extends Omit<
  React.HTMLAttributes<HTMLDialogElement>,
  'children'
> {
  /**
   * Bepaalt of het zijpaneel getoond wordt.
   */
  isOpen: boolean;

  /**
   * Callback die wordt aangeroepen wanneer het zijpaneel sluit
   * (sluitknop, Escape-toets).
   */
  onClose?: () => void;

  /**
   * Modaal of non-modaal gedrag.
   * - `true` (standaard): opent via `.showModal()` — achtergrond geblokkeerd,
   *   natieve focus-trap, Escape sluit via `cancel`-event.
   * - `false`: opent via `.show()` — achtergrond blijft interactief,
   *   Escape sluit via `keydown`-listener.
   * @default true
   */
  modal?: boolean;

  /**
   * De kant van de viewport vanwaar het zijpaneel inschuift.
   * @default "right"
   */
  side?: 'right' | 'left';

  /**
   * De subcomponenten van het zijpaneel:
   * `DrawerHeader`, `DrawerBody`, `DrawerFooter`
   */
  children?: React.ReactNode;
}

/**
 * Drawer component
 * Zijpaneel dat vanuit links of rechts de viewport inschuift.
 *
 * Gebruik `modal={true}` (standaard) voor gefocuste taken waarbij de achtergrond
 * geblokkeerd moet worden. Gebruik `modal={false}` als de gebruiker de achtergrondpagina
 * nodig heeft voor context.
 *
 * @example
 * ```tsx
 * <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <DrawerHeader>
 *     <DrawerHeading>Filteropties</DrawerHeading>
 *   </DrawerHeader>
 *   <DrawerBody>
 *     <Paragraph>Inhoud van het zijpaneel</Paragraph>
 *   </DrawerBody>
 *   <DrawerFooter>
 *     <ActionGroup>
 *       <Button variant="strong" onClick={() => setIsOpen(false)}>Toepassen</Button>
 *       <Button variant="default" onClick={() => setIsOpen(false)}>Annuleren</Button>
 *     </ActionGroup>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 */
export const Drawer = React.forwardRef<HTMLDialogElement, DrawerProps>(
  (
    {
      className,
      isOpen,
      onClose,
      modal = true,
      side = 'right',
      children,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLDialogElement>(null);
    const dialogRef =
      (ref as React.RefObject<HTMLDialogElement>) ?? internalRef;
    const headingId = React.useId();

    React.useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen && !dialog.open) {
        if (modal) {
          dialog.showModal();
        } else {
          dialog.show();
        }
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }, [isOpen, modal, dialogRef]);

    // Non-modaal: handmatige Escape-afhandeling via keydown
    React.useEffect(() => {
      if (modal) return;
      const dialog = dialogRef.current;
      if (!dialog || !isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
      };

      dialog.addEventListener('keydown', handleKeyDown);
      return () => dialog.removeEventListener('keydown', handleKeyDown);
    }, [modal, isOpen, onClose, dialogRef]);

    // Modaal: native cancel-event (Escape via browser)
    const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      onClose?.();
    };

    const classes = classNames(
      'dsn-drawer',
      side === 'left' ? 'dsn-drawer--side-left' : 'dsn-drawer--side-right',
      className
    );

    return (
      <DrawerContext.Provider value={{ headingId, onClose }}>
        <dialog
          ref={dialogRef}
          className={classes}
          aria-labelledby={headingId}
          onCancel={handleCancel}
          {...props}
        >
          {children}
        </dialog>
      </DrawerContext.Provider>
    );
  }
);

Drawer.displayName = 'Drawer';

// =============================================================================
// DrawerHeader
// =============================================================================

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Inhoud van de header — doorgaans een `DrawerHeading`
   */
  children?: React.ReactNode;
}

/**
 * DrawerHeader
 * De headerstrook van het zijpaneel met heading en sluitknop.
 */
export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { onClose } = React.useContext(DrawerContext);

    return (
      <div
        ref={ref}
        className={classNames('dsn-drawer__header', className)}
        {...props}
      >
        {children}
        <Button
          variant="subtle"
          size="small"
          iconOnly
          onClick={onClose}
          iconStart={<Icon name="x" aria-hidden />}
        >
          Sluiten
        </Button>
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// =============================================================================
// DrawerHeading
// =============================================================================

export interface DrawerHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantisch heading-niveau. Kies op basis van documenthiërarchie, niet visuele grootte.
   * @default 2
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * De zichtbare heading-tekst
   */
  children?: React.ReactNode;
}

/**
 * DrawerHeading
 * De heading van het zijpaneel. ID wordt automatisch gegenereerd voor aria-labelledby.
 */
export const DrawerHeading = React.forwardRef<
  HTMLHeadingElement,
  DrawerHeadingProps
>(({ className, level = 2, children, ...props }, ref) => {
  const { headingId } = React.useContext(DrawerContext);
  const Tag = `h${level}` as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={headingId}
      className={classNames('dsn-drawer-heading', className)}
      {...props}
    >
      {children}
    </Tag>
  );
});

DrawerHeading.displayName = 'DrawerHeading';

// =============================================================================
// DrawerBody
// =============================================================================

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * De hoofdinhoud van het zijpaneel
   */
  children?: React.ReactNode;
}

/**
 * DrawerBody
 * De scrollbare inhoudssectie van het zijpaneel met scroll-affordance schaduw.
 */
export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-drawer__body', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

// =============================================================================
// DrawerFooter
// =============================================================================

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * De acties van het zijpaneel — doorgaans een `ActionGroup` met knoppen
   */
  children?: React.ReactNode;
}

/**
 * DrawerFooter
 * De voettekst van het zijpaneel met actieknoppen.
 */
export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-drawer__footer', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';
