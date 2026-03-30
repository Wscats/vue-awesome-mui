'use strict';

(function($, window, document) {
	const ImageLazyload = $.Lazyload.extend({
		init: function(element, options) {
			this._super(element, options);
		},
		_init: function() {
			this.options.selector = '[data-lazyload]';
			this._super();
		},
		_set: function(element, uri) {
			if (element.tagName === 'IMG') {
				element.src = uri;
			} else {
				element.style.backgroundImage = "url(" + uri + ")";
			}
		},
		_hasPlaceholder: function(element) {
			if (element.offsetWidth) {
				if (element.tagName === 'IMG') {
					return !!element.src;
				} else {
					return !!element.style.backgroundImage;
				}
			}
			return false;
		},
		_addPlaceHolder: function(element) {
			let self = this;
			if (element.tagName === 'IMG') {
				self._counter++;
				element.onload = function() {
					self._counter--;
					self.addCallback(element, self.handle);
					this.onload = null;
				};
				self.onPlaceHolder(function(placeholder) {
					self._set(element, placeholder);
				});
			} else {
				element.style.backgroundImage = "url(" + self.options.placeholder + ")";
			}
		},
		addElement: function(element) {
			let self = this;
			let uri = element.getAttribute('data-lazyload');
			if (uri) {
				if (self._hasPlaceholder(element)) {
					self.addCallback(element, self.handle);
				} else {
					self.onPlaceHolder = self._createLoader(function(callback) {
						let img = new Image();
						const placeholder = self.options.placeholder;
						img.src = placeholder;
						img.onload = img.onerror = function() {
							callback(placeholder);
						};
					});
					self._addPlaceHolder(element);
				}
				return true;
			}
			return false;
		},
		set: function(element, uri) {
			let self = this;
			const img = new Image();
			img.onload = function() {
				self._set(element, uri);
				$.trigger(self.element, 'success', {
					element: element,
					uri: uri
				});
			};
			img.onerror = function() {
				$.trigger(self.element, 'error', {
					element: element,
					uri: uri
				});
			};
			img.src = uri;
			element.removeAttribute('data-lazyload'); //只尝试一次，后续可能支持多次尝试
		},
		handle: function(element, key) {
			const uri = element.getAttribute('data-lazyload');
			if (uri) {
				this.set(element, uri);
				//element.parentNode.parentNode.setAttribute('data-lazyload', 'true'); //debug
			}
		},
		destroy: function() {
			this._super();
			this.element.removeAttribute('data-imageLazyload');
		}

	});
	$.fn.imageLazyload = function(options) {
		const lazyloadApis = [];
		this.each(function() {
			let self = this;
			let lazyloadApi = null;
			if (self === document || self === window) {
				self = document.body;
			}
			let id = self.getAttribute('data-imageLazyload');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = lazyloadApi = new ImageLazyload(self, options);
				self.setAttribute('data-imageLazyload', id);
			} else {
				lazyloadApi = $.data[id];
			}
			lazyloadApis.push(lazyloadApi);
		});
		return lazyloadApis.length === 1 ? lazyloadApis[0] : lazyloadApis;
	}
})(mui, window, document);