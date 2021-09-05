import * as React from "react";
import { ReactNode } from "react";
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
declare const ActionSheet: React.ForwardRefExoticComponent<ActionSheetProps & React.RefAttributes<ActionSheetRef | undefined>>;
export default ActionSheet;
