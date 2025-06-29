import { ReactNode, CSSProperties } from "react";
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
declare const ActionSheet: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ActionSheetProps & import("react").RefAttributes<ActionSheetRef>>>;
export default ActionSheet;
//# sourceMappingURL=index.d.ts.map