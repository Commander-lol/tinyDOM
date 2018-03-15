tinyDOM.fn = TinyDOMFunction.prototype = {
    each: function (fn) {
        var l = this.length;
        while (l--) {
            fn(l, this[l], this);
        }
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
    parent: function (selector) {
        var e = this[0].parentNode, stn = true;
        if (tinyDOM.exists(selector)) {
            while (e !== null && e !== document) {
                if (e.matches(selector)) {
                    stn = false;
                    break;
                } else {
                    e = e.parentNode;
                }
            }
            e = stn ? null : e;
        }
        return tinyDOM(e);
    },
    children: function (selector) {
        var n = this[0].childNodes,
            a = [],
            i;
        for (i = 0; i < n.length; i++) {
            if (tinyDOM.isElement(n[i])) {
                if (mu.exists(selector)) {
                    if(n[i].matches(selector)) {
                        a.push(n[i]);
                    }
                } else {
                    a.push(n[i]);
                }
            }
        }
        return tinyDOM(a);
    },
    data: function (key, value) {
        if (typeof (value) !== 'undefined') {
            this.each(function(i, e){
                e.setAttribute('data-' + key, value);
            });
            return this;
        } else {
            return this[0].getAttribute('data-' + key);
        }
    },
    attr: function (key, value) {
        if (value === null) {
			this.each(function(i, e){
				e.removeAttribute(key);
			});
            return this;
        } else if (typeof (value) !== 'undefined') {
			this.each(function(i, e){
				e.setAttribute(key, value);
			});
			return this;
		} else {
            return this[0].getAttribute(key);
        }
    },
    class: function(classname, addremove){
        if(tinyDOM.exists(addremove)){
            this.each(function(i, e){
                e.classList.toggle(classname, addremove);
            });
        } else {
            this.each(function(i, e){
                e.classList.toggle(classname);
            });
        }
        return this;
    },
    clear: function() {
        this.each(function(i, e) {
            while(e.firstChild) {
                e.removeChild(e.firstChild);
            }
        });
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
