(function() {
    'use strict';

	/*
	* Polyfill from https://gist.github.com/elijahmanor/6452535
	*/
	if (Element && !Element.prototype.matches) {
        var proto = Element.prototype;
        proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
	}
	/*
	* End Polyfill
	*/

	var tinyDOM = function(selector){
		return new tinyDOMFunction(selector);
	};

	var tinyDOMFunction = function(selector) {
		if (selector === null || typeof (selector) === 'undefined') {
			this.length = 0;
		} else if(typeof(selector) === 'string') {
			var elements = document.querySelectorAll(selector);

			this.length = elements.length;
			for(var i = 0; i < elements.length; i++) {
				var e = elements.item(i);
				if(typeof(e.td_prop) === 'undefined') {
					e.td_prop = {
						isHidden: false
					};
				}
				this[i] = elements.item(i);
			}
		} else {
			this[0] = selector;
			this.length = 1;
		}

		return this;
	}

	tinyDOM.fn = tinyDOMFunction.prototype = {
		each: function(fn) {
			var l = this.length;
			while(l--) {
				fn(l, this[l], this);
			}
			return this;
		},
		hide: function(){
			this.each(function(i, e) {
				if(!e.td_prop.isHidden) {
					e.style.td_previousDisplay = e.style.display;
					e.style.display = 'none';
					e.td_prop.isHidden = true;
				}
			});
			return this;
		},
		show: function() {
			this.each(function(i, e) {
				if(e.td_prop.isHidden === true) {
					if(typeof(e.style.td_previousDisplay) !== 'undefined') {
						e.style.display = e.style.td_previousDisplay;
					} else {
						e.style.display = 'block';
					}
					e.td_prop.isHidden = false;
				}
			});
			return this;
		},
		on: function(ev, del, fn) {
			if(typeof(del) === 'string') {
				this.each(function(i, e) {
					e.addEventListener(ev, function(firedevent) {
						var target = firedevent.target;
						var matched = false;
						do {
							if(target && target.matches(del)) {
								fn.call(target, firedevent);
								matched = true;
							} else {
								target = target.parentNode;
								if(!target || !target.matches || target === e) {
									matched = true;
								}
							}
						} while(matched !== true);

					});
				});
			} else {
				var fn = del;
				this.each(function(i, e) {
					e.addEventListener(ev, fn);
				});
			}
			return this;
		},
		first: function() {
			if(typeof(this[0]) !== 'undefined') {
				return this[0];
			} else {
				return null;
			}
		},
		data: function(key, value) {
			var e = this[0];
			if(typeof(value) !== 'undefined') {
				e.setAttribute('data-'+key, value);
				return this;
			} else {
				return e.getAttribute('data-'+key);
			}
		}
	}

	tinyDOM.exists = function(obj) {
		return obj !== null && typeof(obj) !== 'undefined';
	}

	tinyDOM.merge = function(json1, json2) {
		if(!this.exists(json1) || !this.exists(json2)) {
			return null;
		} else {
			for(var prop in json2) {
				if(json2.hasOwnProperty(prop)) {
					json1[prop] = json2[prop];
				}
			}
			return json1;
		}
	}

	tinyDOM.ajax = function(options) {
		var req = new XMLHttpRequest();
		var _this = this;

		var params = {
			method: 'GET',
			url: '',
			async: true,
			user: null,
			password: null,
			responseType: 'text',
			data: null,
			headers: [],
			callbacks: {}
		}

		this.merge(params, options);

		req.responseType = params.responseType;

		if(this.exists(params.callbacks)) {
			for(var ev in params.callbacks) {
				if(params.callbacks.hasOwnProperty(ev)) {
					req.addEventListener(ev, params.callbacks[ev]);
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

		for(var i = 0; i < params.headers.length; i++) {
			req.setRequestHeader(params.headers[i].header, params.headers[i].value);
		}

		req.send(params.data);
		return req;
	};

	if(!window.μ) {
		window.μ = tinyDOM;
	}
	if(!window.mu) {
		window.mu = tinyDOM;
	}
})();
