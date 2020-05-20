import * as React from 'react';
import { ReactNode } from 'react';

interface ActionSheetProps {
    hideFunction: () => void
    show: boolean
    children?: ReactNode
    borderRadius?: number
    style?: React.CSSProperties
    direction?: 'top'|'down'
}
interface BgProps {
    hideFunction: () => void
    show: boolean
}

const ActionSheet = ({ show, hideFunction, children, style }: ActionSheetProps): JSX.Element => {
    return (
        <div>
            <Bg show={show} hideFunction={hideFunction} />
            <Sheet
                show={show}
                hideFunction={hideFunction}
                children={children}
                style={style}
            />
        </div>
    )
}

const Bg = ({ show, hideFunction }: BgProps): JSX.Element => {
    return (
        <div
            onClick={() => hideFunction()}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backfaceVisibility: 'hidden',
                background: 'rgba(0, 0, 0, 0.8)',
                transition: 'all 0.5s ease',
                opacity: show ? 1 : 0,
                zIndex: show ? 98 : -1,
            }}>
        </div>
    )
};

const Sheet = ({ children, show, borderRadius = 100, hideFunction, style }: ActionSheetProps): JSX.Element => {
    return <div
        style={{
            overflowX: 'hidden',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 99,
            minHeight: '60vh',
            maxHeight: '100vh',
            transition: "all 0.3s ease-in-out",
            backgroundColor: '#808080',
            transform: show ? "translate3d(0, 0, 0)" : "translate3d(0, 101%, 0)",
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            ...style,
        }}>
            {children}
    </div>;
};

export default ActionSheet;
