var proto,
    TinyDOMFunction,
    tinyDOM;

/*
* Polyfill from https://gist.github.com/elijahmanor/6452535
*/
if (Element && !Element.prototype.matches) {
    proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector || proto.msMatchesSelector ||
                    proto.oMatchesSelector || proto.webkitMatchesSelector;
}
/*
* End Polyfill
*/

TinyDOMFunction = function (selector) {
    var elements, i, e;

    if (!(this instanceof TinyDOMFunction)) {
        return new TinyDOMFunction(selector);
    }

    if (selector === null || typeof (selector) === 'undefined') {
        this.length = 0;
    } else if (typeof (selector) === 'string') {
        elements = document.querySelectorAll(selector);

        this.length = elements.length;
        for (i = 0; i < elements.length; i++) {
            e = elements.item(i);
            this[i] = e;
        }
    } else if (selector.length) {
        for (i = 0; i < selector.length; i++) {
            e = selector[i];
            this[i] = e;
        }
    } else {
        this[0] = selector;
        this.length = 1;
    }

    return this;
};

tinyDOM = function (selector) {
    return new TinyDOMFunction(selector);
};

if (!window.μ) {
    window.μ = tinyDOM;
}

if (!window.mu) {
    window.mu = tinyDOM;
}
