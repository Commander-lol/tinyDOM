/*global Element, CustomEvent */
/*jslint plusplus: true */
/*jslint nomen: true*/

(function () {
    'use strict';

    var proto,
        TinyDOMFunction,
        tinyDOM,
        td_prop = {
            isHidden: false
        };

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
		if (selector === null || typeof (selector) === 'undefined') {
			this.length = 0;
		} else if (typeof (selector) === 'string') {
			var elements = document.querySelectorAll(selector), i, e;

			this.length = elements.length;
			for (i = 0; i < elements.length; i++) {
				e = elements.item(i);
				if (typeof (e.td_prop) === 'undefined') {
					e = tinyDOM.merge(e, td_prop);
				}
				this[i] = e;
			}
		} else if (selector.length) {
            var i, e;
            for (i = 0; i < selector.length; i++) {
                e = selector[i];
				if (typeof (e.td_prop) === 'undefined') {
					e = tinyDOM.merge(e, td_prop);
				}
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

	tinyDOM.fn = TinyDOMFunction.prototype = {
		each: function (fn) {
			var l = this.length;
			while (l--) {
				fn(l, this[l], this);
			}
			return this;
		},
		hide: function () {
			this.each(function (i, e) {
				if (!e.td_prop.isHidden) {
					e.style.td_previousDisplay = e.style.display;
					e.style.display = 'none';
					e.td_prop.isHidden = true;
				}
			});
			return this;
		},
		show: function () {
			this.each(function (i, e) {
				if (e.td_prop.isHidden === true) {
					if (typeof (e.style.td_previousDisplay) !== 'undefined') {
						e.style.display = e.style.td_previousDisplay;
					} else {
						e.style.display = 'block';
					}
					e.td_prop.isHidden = false;
				}
			});
			return this;
		},
		on: function (ev, del, fn) {
			if (typeof (del) === 'string') {
				this.each(function (i, e) {
					e.addEventListener(ev, function (firedevent) {
						var target = firedevent.target,
                            matched = false;
						do {
							if (target && target.matches(del)) {
								fn.call(target, firedevent);
								matched = true;
							} else {
								target = target.parentNode;
								if (!target || !target.matches || target === e) {
									matched = true;
								}
							}
						} while (matched !== true);

					});
				});
			} else {
				fn = del;
				this.each(function (i, e) {
					e.addEventListener(ev, fn);
				});
			}
			return this;
		},
		first: function () {
			if (typeof (this[0]) !== 'undefined') {
				return tinyDOM(this[0]);
			} else {
				return null;
			}
		},
        parent: function() {
            return tinyDOM(this[0].parentNode);
        },
        children: function() {
            var n = this[0].childNodes,
                a = [], i;
            for (i = 0; i < n.length; i++) {
                if (tinyDOM.isElement(n[i])) {
                   a.push(n[i]);
                }
            }
            return tinyDOM(a);
        },
		data: function (key, value) {
			var e = this[0];
			if (typeof (value) !== 'undefined') {
				e.setAttribute('data-' + key, value);
				return this;
			} else {
				return e.getAttribute('data-' + key);
			}
		},
        attr: function (key, value) {
			var e = this[0];
			if (typeof (value) !== 'undefined') {
				e.setAttribute(key, value);
				return this;
			} else {
				return e.getAttribute(key);
			}
		},
        trigger: function (eventName, data, bubbles, cancelable) {
            bubbles = tinyDOM.exists(bubbles) ? bubbles : true;
            cancelable = tinyDOM.exists(cancelable) ? cancelable : true;

            var event = new CustomEvent(eventName, data, bubbles, cancelable);
            this.each(function (i, e) {
                e.dispatchEvent(event);
            });
            return this;
        }
	};

    tinyDOM.isElement = function(node) {
        var is = false;
        try {
            is = node instanceof HTMLElement;
        } catch(e) {
            is = node.nodeType && node.nodeType === 1;
        }
        return is;
    };

    tinyDOM.isJson = function (obj) {
        try {
            JSON.parse(obj);
            return obj !== null && typeof obj !== "undefined";
        } catch (e) {
            return false;
        }
    };

	tinyDOM.exists = function (obj) {
		return obj !== null && typeof (obj) !== 'undefined';
	};

	tinyDOM.merge = function (json1, json2) {
		if (!this.exists(json1) || !this.exists(json2)) {
			return null;
		} else {
            var prop;
			for (prop in json2) {
				if (json2.hasOwnProperty(prop)) {
					json1[prop] = json2[prop];
				}
			}
			return json1;
		}
	};

    tinyDOM.byID = function (id) {
        return tinyDOM(document.getElementById(id));
    };

    tinyDOM.triggerOn = function (target, eventName, data, bubbles, cancelable) {
        bubbles = tinyDOM.exists(bubbles) ? bubbles : true;
        cancelable = tinyDOM.exists(cancelable) ? cancelable : true;
        target.dispatchEvent(new CustomEvent(eventName, data, bubbles, cancelable));
    };

	tinyDOM.ajax = function (options) {
		var req = new XMLHttpRequest(),
            _this = this,
            ev,
            i,
            params = {
                method: 'GET',
                url: '',
                async: true,
                user: null,
                password: null,
                responseType: 'text',
                data: null,
                headers: [],
                callbacks: {}
            },
            makeListener = function (callback) {
                return function (data) {
                    callback(data.currentTarget.response, data);
                };
            };

		this.merge(params, options);

		req.responseType = params.responseType;

		if (this.exists(params.callbacks)) {
			for (ev in params.callbacks) {
				if (params.callbacks.hasOwnProperty(ev)) {
					req.addEventListener(ev, makeListener(params.callbacks[ev]));
				}
			}
		}

		req.open(
			params.method,
			params.url,
			params.async,
			params.user,
			params.password
		);

		for (i = 0; i < params.headers.length; i++) {
			req.setRequestHeader(params.headers[i].header, params.headers[i].value);
		}

		req.send(params.data);
		return req;
	};

	if (!window.μ) {
		window.μ = tinyDOM;
	}

	if (!window.mu) {
		window.mu = tinyDOM;
	}
}());
