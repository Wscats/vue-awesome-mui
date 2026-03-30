'use strict';

(function($) {
	let initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	let Class = function() {};
	Class.extend = function(prop) {
		let _super = this.prototype;
		initializing = true;
		let prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] === "function" &&
				typeof _super[name] === "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						const tmp = this._super;

						this._super = _super[name];

						const ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
	$.Class = Class;
})(mui);