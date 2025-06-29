import {
  ReactNode,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
  useMemo,
  forwardRef,
  memo,
  CSSProperties,
  TouchEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";

export interface ActionSheetProps {
  /** Callback fired when the action sheet is closed */
  onClose?: () => void;
  /** Content to render inside the action sheet */
  children?: ReactNode;
  /** Custom styles for the background overlay */
  bgStyle?: CSSProperties;
  /** Custom styles for the sheet container */
  sheetStyle?: CSSProperties;
  /** Enable mouse/pointer interactions for dragging */
  mouseEnable?: boolean;
  /** Enable touch interactions for dragging */
  touchEnable?: boolean;
  /** Threshold in pixels for triggering close action when dragging */
  threshold?: number;
  /** Opacity of the background overlay when visible */
  opacity?: number;
  /** z-index value for the action sheet */
  zIndex?: number;
  /** Allow closing when clicking on the background overlay */
  closeOnBgTap?: boolean;
  /** CSS transition string for background animations */
  bgTransition?: string;
  /** CSS class name for the background overlay */
  className?: string;
  /** CSS transition string for sheet animations */
  sheetTransition?: string;
  /** Position the sheet at the top instead of bottom */
  reverse?: boolean;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA labelledby for accessibility */
  "aria-labelledby"?: string;
}

export interface ActionSheetRef {
  /** Open the action sheet */
  open: () => void;
  /** Close the action sheet */
  close: () => void;
  /** Check if the action sheet is currently open */
  isOpen: () => boolean;
}

const ActionSheet = memo(
  forwardRef<ActionSheetRef, ActionSheetProps>(
    (
      {
        onClose,
        children,
        sheetStyle,
        bgStyle,
        mouseEnable = true,
        touchEnable = true,
        threshold = 50,
        opacity = 1,
        zIndex = 998,
        closeOnBgTap = true,
        bgTransition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        className = "action-sheet",
        sheetTransition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        reverse = false,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
      },
      ref
    ) => {
      const [show, setShow] = useState(false);
      const [isDragging, setIsDragging] = useState(false);
      const pressedRef = useRef(false);
      const sheetRef = useRef<HTMLDivElement>(null);
      const animationRef = useRef<number>(0);
      const masterOffsetRef = useRef(0);
      const startYRef = useRef(0);
      const backgroundRef = useRef<HTMLDivElement>(null);

      useImperativeHandle(
        ref,
        () => ({
          open: () => setShow(true),
          close: () => setShow(false),
          isOpen: () => show,
        }),
        [show]
      );

      const handleClose = useCallback(() => {
        setShow(false);
        onClose?.();
      }, [onClose]);

      const handleBgClick = useCallback(() => {
        if (closeOnBgTap && !isDragging) {
          handleClose();
        }
      }, [closeOnBgTap, isDragging, handleClose]);

      const requestSheetDown = useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet) return false;

        sheet.style.transition = sheetTransition;
        sheet.style.transform = reverse
          ? "translate3d(0, -100%, 0)"
          : "translate3d(0, 100%, 0)";
        return true;
      }, [reverse, sheetTransition]);

      const requestSheetUp = useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet) return false;

        sheet.style.transform = "translate3d(0, 0%, 0)";
        return true;
      }, []);

      const updatePosition = useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet || animationRef.current === 0) return false;

        sheet.style.transform = `translate3d(0, ${masterOffsetRef.current}px, 0)`;
        return true;
      }, []);

      const move = useCallback(
        (offset: number) => {
          if (!reverse && offset > 0) {
            masterOffsetRef.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
          } else if (reverse && offset < 0) {
            masterOffsetRef.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
          }
          return false;
        },
        [reverse, updatePosition]
      );

      const handleStart = useCallback((clientY: number) => {
        const sheet = sheetRef.current;
        if (!sheet) return;

        sheet.style.transition = "none";
        startYRef.current = clientY;
        pressedRef.current = true;
        setIsDragging(true);
      }, []);

      const handleMove = useCallback(
        (clientY: number) => {
          if (!pressedRef.current) return;

          const offset = clientY - startYRef.current;
          move(offset);
        },
        [move]
      );

      const handleEnd = useCallback(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = 0;
        }

        pressedRef.current = false;
        setIsDragging(false);

        if (Math.abs(masterOffsetRef.current) > threshold) {
          handleClose();
        } else {
          requestSheetUp();
        }
        masterOffsetRef.current = 0;
      }, [threshold, handleClose, requestSheetUp]); // Touch event handlers
      const onTouchStart = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
          if (!touchEnable) return;
          event.preventDefault();
          handleStart(event.touches[0].clientY);
        },
        [touchEnable, handleStart]
      );

      const onTouchMove = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
          if (!touchEnable || !pressedRef.current) return;
          event.preventDefault();
          handleMove(event.touches[0].clientY);
        },
        [touchEnable, handleMove]
      );

      const onTouchEnd = useCallback(
        (event: TouchEvent<HTMLDivElement>) => {
          if (!touchEnable) return;
          event.preventDefault();
          handleEnd();
        },
        [touchEnable, handleEnd]
      );

      // Mouse event handlers
      const onMouseDown = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
          if (!mouseEnable) return;
          event.preventDefault();
          handleStart(event.clientY);
        },
        [mouseEnable, handleStart]
      );

      const onMouseMove = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
          if (!mouseEnable || !pressedRef.current) return;
          event.preventDefault();
          handleMove(event.clientY);
        },
        [mouseEnable, handleMove]
      );

      const onMouseUp = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
          if (!mouseEnable) return;
          event.preventDefault();
          handleEnd();
        },
        [mouseEnable, handleEnd]
      );

      // Keyboard event handler for accessibility
      const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            handleClose();
          }
        },
        [handleClose]
      );

      useEffect(() => {
        if (show) {
          requestSheetUp();
          // Focus management for accessibility
          const sheet = sheetRef.current;
          if (sheet) {
            sheet.focus();
          }
        } else {
          requestSheetDown();
        }
      }, [show, requestSheetUp, requestSheetDown]);

      // Cleanup on unmount
      useEffect(() => {
        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        };
      }, []);

      const backgroundStyles = useMemo(
        (): CSSProperties => ({
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transition: bgTransition,
          opacity: show ? opacity : 0,
          visibility: show ? "visible" : "hidden",
          zIndex: show ? zIndex : -1,
          willChange: "opacity, visibility",
          ...bgStyle,
        }),
        [show, opacity, zIndex, bgTransition, bgStyle]
      );

      const sheetStyles = useMemo(
        (): CSSProperties => ({
          position: "fixed",
          left: 0,
          width: "100%",
          maxWidth: "100vw",
          backgroundColor: "#ffffff",
          borderRadius: reverse ? "0 0 16px 16px" : "16px 16px 0 0",
          touchAction: "none",
          zIndex: zIndex + 1,
          outline: "none",
          willChange: "transform",
          transform: show
            ? "translate3d(0, 0%, 0)"
            : reverse
              ? "translate3d(0, -100%, 0)"
              : "translate3d(0, 100%, 0)",
          transition: show ? sheetTransition : "none",
          ...(reverse
            ? {
                top: 0,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }
            : {
                bottom: 0,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }),
          ...sheetStyle,
        }),
        [show, reverse, zIndex, sheetTransition, sheetStyle]
      );

      if (!show && !isDragging) {
        return null;
      }

      return (
        <>
          <div
            ref={backgroundRef}
            className={className}
            style={backgroundStyles}
            onClick={handleBgClick}
            aria-hidden="true"
          />
          <div
            ref={sheetRef}
            style={sheetStyles}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onKeyDown={onKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            tabIndex={-1}
          >
            {children}
          </div>
        </>
      );
    }
  )
);

ActionSheet.displayName = "ActionSheet";

export default ActionSheet;
