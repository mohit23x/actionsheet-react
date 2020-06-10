'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

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
    var onClose = _a.onClose, children = _a.children, sheetStyle = _a.sheetStyle, bgStyle = _a.bgStyle, _b = _a.mouseEnable, mouseEnable = _b === void 0 ? true : _b, _c = _a.touchEnable, touchEnable = _c === void 0 ? true : _c, _d = _a.threshold, threshold = _d === void 0 ? 50 : _d, _e = _a.opacity, opacity = _e === void 0 ? 1 : _e, _f = _a.zIndex, zIndex = _f === void 0 ? 998 : _f, _g = _a.closeOnBgTap, closeOnBgTap = _g === void 0 ? true : _g, _h = _a.bgTransition, bgTransition = _h === void 0 ? "all 0.5s ease-in-out" : _h, _j = _a.sheetTransition, sheetTransition = _j === void 0 ? "all 0.3s ease-in-out" : _j;
    var _k = React.useState(false), show = _k[0], setShow = _k[1];
    var _l = React.useState(false), pressed = _l[0], setPressed = _l[1];
    var sheetRef = React.useRef(null);
    var animationRef = React.useRef(0);
    var masterOffset = React.useRef(0);
    var startY = React.useRef(0);
    React.useImperativeHandle(ref, function () { return ({
        open: function () {
            setShow(true);
        },
        close: function () {
            setShow(false);
        }
    }); });
    React.useEffect(function () {
        if (show) {
            requestSheetUp();
        }
        else {
            requestSheetDown();
        }
    }, [show]);
    var BgClick = function () {
        setShow(false);
        if (onClose)
            onClose();
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
            if (onClose)
                onClose();
        }
        else {
            requestSheetUp();
        }
        masterOffset.current = 0;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: closeOnBgTap ? BgClick : undefined, style: __assign(__assign({ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.8)", backfaceVisibility: "hidden" }, bgStyle), { transition: bgTransition, opacity: show ? opacity : 0, zIndex: show ? zIndex : -1 }) }),
        React.createElement("div", { ref: sheetRef, style: __assign(__assign({ overflowX: "hidden", position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: '#fbfbfb', borderTopLeftRadius: 16, borderTopRightRadius: 16, transform: "translate3d(0, 101%, 0)" }, sheetStyle), { zIndex: zIndex + 1, transition: pressed ? "all 0.05s linear" : sheetTransition }), onMouseDown: mouseEnable ? onMouseStart : undefined, onMouseMove: mouseEnable ? onMouseMove : undefined, onMouseUp: mouseEnable ? onSwipeEnd : undefined, onTouchStart: touchEnable ? onSwipeStart : undefined, onTouchMove: touchEnable ? onSwipeMove : undefined, onTouchEnd: touchEnable ? onSwipeEnd : undefined }, children ? children : React.createElement("div", { style: { height: 150 } }))));
});
var ActionSheet = React.forwardRef(Comp);

exports.default = ActionSheet;
//# sourceMappingURL=index.js.map
