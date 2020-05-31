import * as React from 'react';
import { ReactNode, useState, useRef, useEffect, useImperativeHandle, Fragment } from 'react';

export interface ActionSheetProps {
    onClose?: () => void
    children?: ReactNode
    bgStyle?: React.CSSProperties
    sheetStyle?: React.CSSProperties
    mouseEnable?: boolean
    touchEnable?: boolean
    threshold?: number
    opacity?: number
    zIndex?: number
    closeOnBgTap?: boolean
}

export interface ActionSheetRef {
    open (): void
    close (): void
}

const Comp: React.RefForwardingComponent<ActionSheetRef, ActionSheetProps> = (({ onClose, children, sheetStyle, bgStyle, mouseEnable=true, touchEnable=true, threshold=50, opacity=1, zIndex=998, closeOnBgTap=true }, ref):JSX.Element => {
    const [show, setShow] = useState(false);
    const [pressed, setPressed] = useState(false)
    const sheetRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const masterOffset = useRef<number>(0);
    const startY = useRef<number>(0);

    useImperativeHandle(ref, () => ({
        open():void{
            setShow(true);
        },
        close():void{
            setShow(false);
        }
    }));

    useEffect(() => {
        if(show){
            requestSheetUp();
        }else{
            requestSheetDown();
        }
    }, [show]);

    const BgClick = ():void => {
        setShow(false);
        if(onClose) onClose();
    }

    const requestSheetDown = ():boolean => {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = `translate3d(0, 101%, 0)`;
            return true;
        }
        return false;
    }

    const requestSheetUp = ():boolean => {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = `translate3d(0, 0%, 0)`;
            return true;
        }
        return false;
    }

    const onSwipeMove = (event:React.TouchEvent<HTMLDivElement>):void => {
        if(pressed){
            const offset = event.touches[0].clientY - startY.current;
            move(offset);     
        }
    }

    const onMouseMove = (event:React.MouseEvent<HTMLDivElement, MouseEvent>):void => {
        if(pressed){
            const offset = event.clientY - startY.current;
           move(offset);     
        }
    }

    const move = (offset:number):boolean => {
        if(offset > 0){
            masterOffset.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true
        }
        return false;
    }

    const updatePosition = ():boolean => {
        if(animationRef.current !== undefined){
            if (null !== sheetRef.current) {
                sheetRef.current.style.transform = `translate3d(0, ${masterOffset.current}px, 0)`;
                return true;
            }
            return false;
        }
        return false;
    }

    const onSwipeStart = (event:React.TouchEvent<HTMLDivElement>):void => {
        startY.current = event.touches[0].clientY;
        changePressed(true);
    }

    const onMouseStart = (event:React.MouseEvent<HTMLDivElement, MouseEvent>):void => {
        startY.current = event.clientY;
        changePressed(true);
    }

    const changePressed = (x:boolean):void => {
        setPressed(x);
    }

    const onSwipeEnd = ():void => {
        cancelAnimationFrame(animationRef.current);
        setPressed(false);
        if(masterOffset.current > threshold){
            setShow(false);
            if(onClose) onClose();
        }else{
            requestSheetUp();
        }
        masterOffset.current = 0;
    }

    return (
        <Fragment>
        <div
            onClick={closeOnBgTap? BgClick : undefined}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.8)",
                transition: "all 0.5s ease",
                backfaceVisibility: "hidden",
                ...bgStyle,
                opacity: show ? opacity : 0,
                zIndex: show ? zIndex : -1}}>
        </div>
        <div
            ref={sheetRef}
            style={{
                overflowX: "hidden",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: '#fbfbfb',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                transform: "translate3d(0, 101%, 0)",
                ...sheetStyle,
                zIndex: zIndex + 1,
                transition: pressed ? "all 0.05s linear" : "all 0.3s ease-in-out" }}
            onMouseDown={mouseEnable? onMouseStart : undefined}
            onMouseMove={mouseEnable? onMouseMove : undefined}
            onMouseUp={mouseEnable ? onSwipeEnd: undefined}
            onTouchStart={touchEnable? onSwipeStart: undefined}
            onTouchMove={touchEnable? onSwipeMove: undefined}
            onTouchEnd={touchEnable? onSwipeEnd: undefined}>
                {children? children : <div style={{height: 100}} />}
        </div>
        </Fragment>
    )
});

const ActionSheet = React.forwardRef(Comp);
export default ActionSheet;
