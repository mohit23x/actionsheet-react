import * as React from 'react';
import { ReactNode } from 'react';
export interface ActionSheetProps {
    onHide: () => void;
    children?: ReactNode;
    borderRadius?: number;
    bgStyle?: React.CSSProperties;
    sheetStyle?: React.CSSProperties;
    mouseEnable?: boolean;
    touchEnable?: boolean;
    threshold?: number;
    opacity?: number;
}
export interface ActionSheetRef {
    open(): void;
    close(): void;
}
declare const ActionSheet: React.ForwardRefExoticComponent<ActionSheetProps & React.RefAttributes<ActionSheetRef>>;
export default ActionSheet;
