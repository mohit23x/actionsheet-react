import { createElement } from 'react';

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

var ActionSheet = function (_a) {
    var show = _a.show, hideFunction = _a.hideFunction, children = _a.children, style = _a.style;
    return (createElement("div", null,
        createElement(Bg, { show: show, hideFunction: hideFunction }),
        createElement(Sheet, { show: show, hideFunction: hideFunction, children: children, style: style })));
};
var Bg = function (_a) {
    var show = _a.show, hideFunction = _a.hideFunction;
    return (createElement("div", { onClick: function () { return hideFunction(); }, style: {
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
        } }));
};
var Sheet = function (_a) {
    var children = _a.children, show = _a.show, _b = _a.borderRadius, borderRadius = _b === void 0 ? 100 : _b, style = _a.style;
    return createElement("div", { style: __assign({ overflowX: 'hidden', position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 99, minHeight: '60vh', maxHeight: '100vh', transition: "all 0.3s ease-in-out", backgroundColor: '#808080', transform: show ? "translate3d(0, 0, 0)" : "translate3d(0, 101%, 0)", borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }, style) }, children);
};

export default ActionSheet;
//# sourceMappingURL=index.es.js.map
