import * as React from 'react';
import { ReactNode } from 'react';
import './index.css';
interface ActionSheetProps {
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
declare const ActionSheet: React.ForwardRefExoticComponent<ActionSheetProps & React.RefAttributes<unknown>>;
export default ActionSheet;
