'use strict';

/**
 * TODO mui active
 */
(function(window) {
	var active;
	window.addEventListener($.EVENT_START, function(event) {
		let target = event.target;
		let isCellDisabled = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList) {
				const classList = target.classList;
				if (classList.contains(CLASS_DISABLED)) { //normal
					isCellDisabled = true;
				} else if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN)) {
					isCellDisabled = true;
				}
				if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
					if (!isCellDisabled) {
						active = target;
						const link = cell.querySelector('a');
						if (link && link.parentNode === cell) { //li>a
							active = link;
						}
					}
					break;
				}
			}
		}
	});
})(window);