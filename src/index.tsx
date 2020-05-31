import * as React from 'react';
import { ReactNode, useState, useRef, useEffect, useImperativeHandle, Fragment } from 'react';
import './index.css';

interface ActionSheetProps {
    onHide: () => void
    children?: ReactNode
    borderRadius?: number
    bgStyle?: React.CSSProperties
    sheetStyle?: React.CSSProperties
    mouseEnable?: boolean
    touchEnable?: boolean
    threshold?: number
    opacity?: number
}

const ActionSheet = React.forwardRef(({ onHide, children, sheetStyle, bgStyle, mouseEnable=true, touchEnable=true, threshold=50, opacity=1 }:ActionSheetProps, ref):JSX.Element => {
    const [show, setShow] = useState(false);
    const [pressed, setPressed] = useState(false)
    const sheetRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const masterOffset = useRef<number>(0);
    const startY = useRef<number>(0);

    useImperativeHandle(ref, () => ({
        show(){
            setShow(true);
        },
        hide(){
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
        if(onHide) onHide();
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
            if(onHide) onHide();
        }else{
            requestSheetUp();
        }
        masterOffset.current = 0;
    }

    return (
        <Fragment>
        <div
            onClick={BgClick}
            className="action-sheet-bg-m23x"
            style={{...bgStyle, opacity: show ? opacity : 0, zIndex: show ? 998 : -1}}>
        </div>
        <div
            ref={sheetRef}
            className={`action-sheet-comp-sheet-m23x ${pressed ? 'action-sheet-transition-fix-m23x' : 'action-sheet-transition-m23x'}`}
            style={{...sheetStyle}}
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


export default ActionSheet;
