'use strict';

/**
 * mui fixed requestAnimationFrame
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {
	if (!window.requestAnimationFrame) {
		let lastTime = 0;
		window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(callback, element) {
			const currTime = new Date().getTime();
			const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			const id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {
			clearTimeout(id);
		};
	};
}(window));