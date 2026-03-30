'use strict';

(function($) {
	$.enterfocus = function(selector, callback) {
		const boxArray = [].slice.call(document.querySelectorAll(selector));
		for (var index in boxArray) {
			const box = boxArray[index];
			box.addEventListener('keyup', function(event) {
				if (event.keyCode === 13) {
					const boxIndex = boxArray.indexOf(this);
					if (boxIndex === boxArray.length - 1) {
						if (callback) callback();
					} else {
						//console.log(boxIndex);
						const nextBox = boxArray[++boxIndex];
						nextBox.focus();
					}
				}
			}, false);
		}
	};
}(window.mui = window.mui || {}));