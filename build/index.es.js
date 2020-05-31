import { forwardRef, useState, useRef, useImperativeHandle, useEffect, createElement, Fragment } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Comp = (function (_a, ref) {
    var onHide = _a.onHide, children = _a.children, sheetStyle = _a.sheetStyle, bgStyle = _a.bgStyle, _b = _a.mouseEnable, mouseEnable = _b === void 0 ? true : _b, _c = _a.touchEnable, touchEnable = _c === void 0 ? true : _c, _d = _a.threshold, threshold = _d === void 0 ? 50 : _d, _e = _a.opacity, opacity = _e === void 0 ? 1 : _e;
    var _f = useState(false), show = _f[0], setShow = _f[1];
    var _g = useState(false), pressed = _g[0], setPressed = _g[1];
    var sheetRef = useRef(null);
    var animationRef = useRef(0);
    var masterOffset = useRef(0);
    var startY = useRef(0);
    useImperativeHandle(ref, function () { return ({
        open: function () {
            setShow(true);
        },
        close: function () {
            setShow(false);
        }
    }); });
    useEffect(function () {
        if (show) {
            requestSheetUp();
        }
        else {
            requestSheetDown();
        }
    }, [show]);
    var BgClick = function () {
        setShow(false);
        if (onHide)
            onHide();
    };
    var requestSheetDown = function () {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = "translate3d(0, 101%, 0)";
            return true;
        }
        return false;
    };
    var requestSheetUp = function () {
        if (null !== sheetRef.current) {
            sheetRef.current.style.transform = "translate3d(0, 0%, 0)";
            return true;
        }
        return false;
    };
    var onSwipeMove = function (event) {
        if (pressed) {
            var offset = event.touches[0].clientY - startY.current;
            move(offset);
        }
    };
    var onMouseMove = function (event) {
        if (pressed) {
            var offset = event.clientY - startY.current;
            move(offset);
        }
    };
    var move = function (offset) {
        if (offset > 0) {
            masterOffset.current = offset;
            animationRef.current = requestAnimationFrame(updatePosition);
            return true;
        }
        return false;
    };
    var updatePosition = function () {
        if (animationRef.current !== undefined) {
            if (null !== sheetRef.current) {
                sheetRef.current.style.transform = "translate3d(0, " + masterOffset.current + "px, 0)";
                return true;
            }
            return false;
        }
        return false;
    };
    var onSwipeStart = function (event) {
        startY.current = event.touches[0].clientY;
        changePressed(true);
    };
    var onMouseStart = function (event) {
        startY.current = event.clientY;
        changePressed(true);
    };
    var changePressed = function (x) {
        setPressed(x);
    };
    var onSwipeEnd = function () {
        cancelAnimationFrame(animationRef.current);
        setPressed(false);
        if (masterOffset.current > threshold) {
            setShow(false);
            if (onHide)
                onHide();
        }
        else {
            requestSheetUp();
        }
        masterOffset.current = 0;
    };
    return (createElement(Fragment, null,
        createElement("div", { onClick: BgClick, style: __assign(__assign({ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.8)", transition: "all 0.5s ease", backfaceVisibility: "hidden" }, bgStyle), { opacity: show ? opacity : 0, zIndex: show ? 998 : -1 }) }),
        createElement("div", { ref: sheetRef, style: __assign(__assign({ overflowX: "hidden", position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 999, backgroundColor: '#fbfbfb', borderTopLeftRadius: 16, borderTopRightRadius: 16, transform: "translate3d(0, 101%, 0)" }, sheetStyle), { transition: pressed ? "all 0.05s linear" : "all 0.3s ease-in-out" }), onMouseDown: mouseEnable ? onMouseStart : undefined, onMouseMove: mouseEnable ? onMouseMove : undefined, onMouseUp: mouseEnable ? onSwipeEnd : undefined, onTouchStart: touchEnable ? onSwipeStart : undefined, onTouchMove: touchEnable ? onSwipeMove : undefined, onTouchEnd: touchEnable ? onSwipeEnd : undefined }, children ? children : createElement("div", { style: { height: 100 } }))));
});
var ActionSheet = forwardRef(Comp);

export default ActionSheet;
//# sourceMappingURL=index.es.js.map
