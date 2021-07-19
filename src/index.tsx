import * as React from "react";
import {
  ReactNode,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  Fragment,
} from "react";

export interface ActionSheetProps {
  onClose?: () => void;
  children?: ReactNode;
  bgStyle?: React.CSSProperties;
  sheetStyle?: React.CSSProperties;
  mouseEnable?: boolean;
  touchEnable?: boolean;
  threshold?: number;
  opacity?: number;
  zIndex?: number;
  closeOnBgTap?: boolean;
  bgTransition?: string;
  className?: string;
  sheetTransition?: string;
  reverse?: boolean;
}

export interface ActionSheetRef {
  open(): void;
  close(): void;
}

const ActionSheet = React.forwardRef<
  ActionSheetRef | undefined,
  ActionSheetProps
>(
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
      bgTransition = "opacity 0.5s ease-in-out, z-index 0.5s ease-in-out",
      className="action-sheet",
      sheetTransition = "transform 0.3s ease-in-out",
      reverse = false,
    },
    ref
  ): JSX.Element => {
    const [show, setShow] = useState(false);
    const [pressed, setPressed] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef(0);
    const masterOffset = useRef(0);
    const startY = useRef(0);

    useImperativeHandle(ref, () => ({
      open(): void {
        setShow(true);
      },
      close(): void {
        setShow(false);
      },
    }));

    const BgClick = (): void => {
      setShow(false);
      if (onClose) onClose();
    };

    const requestSheetDown = React.useCallback((): boolean => {
      if (null !== sheetRef.current) {
        sheetRef.current.style.transform = reverse
          ? "translate3d(0, -101%, 0)"
          : "translate3d(0, 101%, 0)";
        return true;
      }
      return false;
    }, [reverse]);

    const requestSheetUp = React.useCallback((): boolean => {
      if (null !== sheetRef.current) {
        sheetRef.current.style.transform = `translate3d(0, 0%, 0)`;
        return true;
      }
      return false;
    }, []);

    useEffect(() => {
      if (show) {
        requestSheetUp();
      } else {
        requestSheetDown();
      }
    }, [requestSheetDown, requestSheetUp, show]);

    const onSwipeMove = (event: React.TouchEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      if (pressed) {
        const offset = event.touches[0].clientY - startY.current;
        move(offset);
      }
    };

    const onMouseMove = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      event.stopPropagation();
      if (pressed) {
        if (reverse) {
          const offset = event.clientY - startY.current;
          move(offset);
        } else {
          const offset = event.clientY - startY.current;
          move(offset);
        }
      }
    };

    const move = (offset: number): boolean => {
      if (!reverse && offset > 0) {
        masterOffset.current = offset;
        animationRef.current = requestAnimationFrame(updatePosition);
        return true;
      } else if (reverse && offset < 0) {
        masterOffset.current = offset;
        animationRef.current = requestAnimationFrame(updatePosition);
        return true;
      }
      return false;
    };

    const updatePosition = (): boolean => {
      if (animationRef.current !== undefined) {
        if (null !== sheetRef.current) {
          sheetRef.current.style.transform = `translate3d(0, ${masterOffset.current}px, 0)`;
          return true;
        }
        return false;
      }
      return false;
    };

    const onSwipeStart = (event: React.TouchEvent<HTMLDivElement>): void => {
      startY.current = event.touches[0].clientY;
      changePressed(true);
    };

    const onMouseStart = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      startY.current = event.clientY;
      changePressed(true);
    };

    const changePressed = (x: boolean): void => {
      setPressed(x);
    };

    const onSwipeEnd = (): void => {
      cancelAnimationFrame(animationRef.current);
      setPressed(false);
      if (Math.abs(masterOffset.current) > threshold) {
        setShow(false);
        if (onClose) onClose();
      } else {
        requestSheetUp();
      }
      masterOffset.current = 0;
    };

    return (
      <Fragment>
        <div
          onClick={closeOnBgTap ? BgClick : undefined}
          className={className}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backfaceVisibility: "hidden",
            ...bgStyle,
            transition: bgTransition,
            opacity: show ? opacity : 0,
            zIndex: show ? zIndex : -1,
          }}
        ></div>
        <div
          ref={sheetRef}
          style={{
            overflowX: "hidden",
            position: "fixed",
            ...(reverse
              ? {
                  top: 0,
                  transform: "translate3d(0, -101%, 0)",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }
              : {
                  bottom: 0,
                  transform: "translate3d(0, 101%, 0)",
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }),
            left: 0,
            width: "100%",
            backgroundColor: "#fbfbfb",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            ...sheetStyle,
            zIndex: zIndex + 1,
            transition: pressed ? "transform 0.05s linear" : sheetTransition,
          }}
          onMouseDown={mouseEnable ? onMouseStart : () => undefined}
          onMouseMove={mouseEnable ? onMouseMove : () => undefined}
          onMouseUp={mouseEnable ? onSwipeEnd : () => undefined}
          onTouchStart={touchEnable ? onSwipeStart : () => undefined}
          onTouchMove={touchEnable ? onSwipeMove : () => undefined}
          onTouchEnd={touchEnable ? onSwipeEnd : () => undefined}
        >
          {children ? children : <div style={{ height: 150 }} />}
        </div>
      </Fragment>
    );
  }
);

export default ActionSheet;
