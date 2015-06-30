tinyDOM.ready = function(fn) {
    document.addEventListener("DOMContentLoaded", fn);
};

tinyDOM.isElement = function (node) {
    var is = false;
    try {
        is = node instanceof HTMLElement;
    } catch (e) {
        is = node.nodeType && node.nodeType === 1;
    }
    return is;
};

tinyDOM.exists = function (obj) {
    return obj !== null && typeof (obj) !== 'undefined';
};

tinyDOM.byID = function (id) {
    return tinyDOM(document.getElementById(id));
};

tinyDOM.triggerOn = function (target, eventName, data, bubbles, cancelable) {
    bubbles = tinyDOM.exists(bubbles) ? bubbles : true;
    cancelable = tinyDOM.exists(cancelable) ? cancelable : true;
    target.dispatchEvent(new CustomEvent(eventName, data, bubbles, cancelable));
};
