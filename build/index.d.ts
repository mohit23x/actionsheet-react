import * as React from 'react';
import { ReactNode } from 'react';
interface ActionSheetProps {
    hideFunction: () => void;
    show: boolean;
    children?: ReactNode;
    borderRadius?: number;
    style?: React.CSSProperties;
    direction?: 'top' | 'down';
}
declare const ActionSheet: ({ show, hideFunction, children, style }: ActionSheetProps) => JSX.Element;
export default ActionSheet;
