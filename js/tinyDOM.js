//Prevent pollution of global namespace with closure
(function(){
	var tinyDOM = function(selector){
		return new tinyDOMFunction(selector);
	}

	var tinyDOMFunction = function(selector) {
		var elements = document.querySelectorAll(selector);

		this.length = elements.length;
		for(var i = 0; i < elements.length; i++){
			var e = elements.item(i);
			if(typeof(e.td_prop) === 'undefined'){
				e.td_prop = {
					isHidden: false
				};
			}
			this[i] = elements.item(i);
		}

		return this;
	}

	tinyDOM.fn = tinyDOMFunction.prototype = {
		each: function(fn) {
			var l = this.length;
			while(l--){
				fn(l, this[l], this);
			}
			return this;
		},
		hide: function(){
			this.each(function(i, e){
				if(!e.td_prop.isHidden){
					e.style.td_previousDisplay = e.style.display;
					e.style.display = 'none';
					e.td_prop.isHidden = true;
				}
			});
			return this;
		},
		show: function(){
			this.each(function(i, e){
				if(e.td_prop.isHidden === true){
					if(typeof(e.style.td_previousDisplay) !== 'undefined'){
						e.style.display = e.style.td_previousDisplay;
					} else {
						e.style.display = 'block';
					}
					e.td_prop.isHidden = false;
				}
			});
			return this;
		},
		on: function(ev, fn){
			this.each(function(i, e){
				e.addEventListener(ev, fn);
			});
			return this;
		},
		first: function(){
			if(typeof(this[0]) !== 'undefined'){
				return this[0];
			} else {
				return null;
			}
		},
		data: function(key, value){
			var e = this[0];
			if(typeof(value) !== 'undefined'){
				e.setAttribute('data-'+key, value);
				return this;
			} else {
				return e.getAttribute('data-'+key);
			}
		}
	}

	if(!window.μ){
		window.μ = tinyDOM;
	}
	if(!window.mu){
		window.mu = tinyDOM;
	}
})();
