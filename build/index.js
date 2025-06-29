'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const ActionSheet = react.memo(react.forwardRef(({ onClose, children, sheetStyle, bgStyle, mouseEnable = true, touchEnable = true, threshold = 50, opacity = 1, zIndex = 998, closeOnBgTap = true, bgTransition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)", className = "action-sheet", sheetTransition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", reverse = false, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, }, ref) => {
    const [show, setShow] = react.useState(false);
    const [isDragging, setIsDragging] = react.useState(false);
    const pressedRef = react.useRef(false);
    const sheetRef = react.useRef(null);
    const animationRef = react.useRef(0);
    const masterOffsetRef = react.useRef(0);
    const startYRef = react.useRef(0);
    const backgroundRef = react.useRef(null);
    react.useImperativeHandle(ref, () => ({
        open: () => setShow(true),
        close: () => setShow(false),
        isOpen: () => show,
    }), [show]);
    const handleClose = react.useCallback(() => {
        setShow(false);
        onClose?.();
    }, [onClose]);
    const handleBgClick = react.useCallback(() => {
        if (closeOnBgTap && !isDragging) {
            handleClose();
        }
    }, [closeOnBgTap, isDragging, handleClose]);
    const requestSheetDown = react.useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet)
            return false;
        sheet.style.transition = sheetTransition;
        sheet.style.transform = reverse
            ? "translate3d(0, -100%, 0)"
            : "translate3d(0, 100%, 0)";
        return true;
    }, [reverse, sheetTransition]);
    const requestSheetUp = react.useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet)
            return false;
        sheet.style.transform = "translate3d(0, 0%, 0)";
        return true;
    }, []);
    const updatePosition = react.useCallback(() => {
        const sheet = sheetRef.current;
        if (!sheet || animationRef.current === 0)
            return false;
        sheet.style.transform = `translate3d(0, ${masterOffsetRef.current}px, 0)`;
        return true;
    }, []);
    const move = react.useCallback((offset) => {
        if (!reverse && offset > 0) {
            masterOffsetRef.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
        }
        else if (reverse && offset < 0) {
            masterOffsetRef.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
        }
        return false;
    }, [reverse, updatePosition]);
    const handleStart = react.useCallback((clientY) => {
        const sheet = sheetRef.current;
        if (!sheet)
            return;
        sheet.style.transition = "none";
        startYRef.current = clientY;
        pressedRef.current = true;
        setIsDragging(true);
    }, []);
    const handleMove = react.useCallback((clientY) => {
        if (!pressedRef.current)
            return;
        const offset = clientY - startYRef.current;
        move(offset);
    }, [move]);
    const handleEnd = react.useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = 0;
        }
        pressedRef.current = false;
        setIsDragging(false);
        if (Math.abs(masterOffsetRef.current) > threshold) {
            handleClose();
        }
        else {
            requestSheetUp();
        }
        masterOffsetRef.current = 0;
    }, [threshold, handleClose, requestSheetUp]); // Touch event handlers
    const onTouchStart = react.useCallback((event) => {
        if (!touchEnable)
            return;
        event.preventDefault();
        handleStart(event.touches[0].clientY);
    }, [touchEnable, handleStart]);
    const onTouchMove = react.useCallback((event) => {
        if (!touchEnable || !pressedRef.current)
            return;
        event.preventDefault();
        handleMove(event.touches[0].clientY);
    }, [touchEnable, handleMove]);
    const onTouchEnd = react.useCallback((event) => {
        if (!touchEnable)
            return;
        event.preventDefault();
        handleEnd();
    }, [touchEnable, handleEnd]);
    // Mouse event handlers
    const onMouseDown = react.useCallback((event) => {
        if (!mouseEnable)
            return;
        event.preventDefault();
        handleStart(event.clientY);
    }, [mouseEnable, handleStart]);
    const onMouseMove = react.useCallback((event) => {
        if (!mouseEnable || !pressedRef.current)
            return;
        event.preventDefault();
        handleMove(event.clientY);
    }, [mouseEnable, handleMove]);
    const onMouseUp = react.useCallback((event) => {
        if (!mouseEnable)
            return;
        event.preventDefault();
        handleEnd();
    }, [mouseEnable, handleEnd]);
    // Keyboard event handler for accessibility
    const onKeyDown = react.useCallback((event) => {
        if (event.key === "Escape") {
            handleClose();
        }
    }, [handleClose]);
    react.useEffect(() => {
        if (show) {
            requestSheetUp();
            // Focus management for accessibility
            const sheet = sheetRef.current;
            if (sheet) {
                sheet.focus();
            }
        }
        else {
            requestSheetDown();
        }
    }, [show, requestSheetUp, requestSheetDown]);
    // Cleanup on unmount
    react.useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);
    const backgroundStyles = react.useMemo(() => ({
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
    }), [show, opacity, zIndex, bgTransition, bgStyle]);
    const sheetStyles = react.useMemo(() => ({
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
    }), [show, reverse, zIndex, sheetTransition, sheetStyle]);
    if (!show && !isDragging) {
        return null;
    }
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { ref: backgroundRef, className: className, style: backgroundStyles, onClick: handleBgClick, "aria-hidden": "true" }), jsxRuntime.jsx("div", { ref: sheetRef, style: sheetStyles, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onKeyDown: onKeyDown, role: "dialog", "aria-modal": "true", "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, tabIndex: -1, children: children })] }));
}));
ActionSheet.displayName = "ActionSheet";

exports.default = ActionSheet;
//# sourceMappingURL=index.js.map
