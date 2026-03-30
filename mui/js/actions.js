'use strict';

/**
 * actions
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	const CLASS_ACTION = $.className('action');

	const handle = function(event, target) {
		let className = target.className || '';
		if (typeof className !== 'string') { //svg className(SVGAnimatedString)
			className = '';
		}
		if (className && ~className.indexOf(CLASS_ACTION)) {
			if (target.classList.contains($.className('action-back'))) {
				event.preventDefault();
			}
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isContinue: true
	});

})(mui, 'action');