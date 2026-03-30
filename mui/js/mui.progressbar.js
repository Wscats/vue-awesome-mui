'use strict';

(function($, document) {
	const CLASS_PROGRESSBAR = $.className('progressbar');
	const CLASS_PROGRESSBAR_IN = $.className('progressbar-in');
	const CLASS_PROGRESSBAR_OUT = $.className('progressbar-out');
	const CLASS_PROGRESSBAR_INFINITE = $.className('progressbar-infinite');

	const SELECTOR_PROGRESSBAR = $.classSelector('.progressbar');

	const _findProgressbar = function(container) {
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			return container;
		}
		let progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR);
		if (progressbars) {
			for (let i = 0, len = progressbars.length; i < len; i++) {
				let progressbar = progressbars[i];
				if (progressbar.parentNode === container) {
					return progressbar;
				}
			}
		}
	};
	/**
	 * 创建并显示进度条 
	 * @param {Object} container  可选，默认body，支持selector,DOM Node,mui wrapper
	 * @param {Object} progress 可选，undefined表示循环，数字表示具体进度
	 * @param {Object} color 可选，指定颜色样式(目前暂未提供实际样式，可暂时不暴露此参数)
	 */
	let showProgressbar = function(container, progress, color) {
		if (typeof container === 'number') {
			color = progress;
			progress = container;
			container = 'body';
		}
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		var progressbar;
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			progressbar = container;
		} else {
			const progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR + ':not(.' + CLASS_PROGRESSBAR_OUT + ')');
			if (progressbars) {
				for (let i = 0, len = progressbars.length; i < len; i++) {
					const _progressbar = progressbars[i];
					if (_progressbar.parentNode === container) {
						progressbar = _progressbar;
						break;
					}
				}
			}
			if (!progressbar) {
				progressbar = document.createElement('span');
				progressbar.className = CLASS_PROGRESSBAR + ' ' + CLASS_PROGRESSBAR_IN + (typeof progress !== 'undefined' ? '' : (' ' + CLASS_PROGRESSBAR_INFINITE)) + (color ? (' ' + CLASS_PROGRESSBAR + '-' + color) : '');
				if (typeof progress !== 'undefined') {
					progressbar.innerHTML = '<span></span>';
				}
				container.appendChild(progressbar);
			} else {
				progressbar.classList.add(CLASS_PROGRESSBAR_IN);
			}
		}
		if (progress) setProgressbar(container, progress);
		return progressbar;
	};
	/**
	 * 关闭进度条 
	 * @param {Object} container 可选，默认body，支持selector,DOM Node,mui wrapper
	 */
	let hideProgressbar = function(container) {
		let progressbar = _findProgressbar(container);
		if (!progressbar) {
			return;
		}
		const classList = progressbar.classList;
		if (!classList.contains(CLASS_PROGRESSBAR_IN) || classList.contains(CLASS_PROGRESSBAR_OUT)) {
			return;
		}
		classList.remove(CLASS_PROGRESSBAR_IN);
		classList.add(CLASS_PROGRESSBAR_OUT);
		progressbar.addEventListener('webkitAnimationEnd', function() {
			progressbar.parentNode && progressbar.parentNode.removeChild(progressbar);
			progressbar = null;
		});
		return;
	};
	/**
	 * 设置指定进度条进度 
	 * @param {Object} container  可选，默认body，支持selector,DOM Node,mui wrapper
	 * @param {Object} progress 可选，默认0 取值范围[0-100]
	 * @param {Object} speed 进度条动画时间
	 */
	let setProgressbar = function(container, progress, speed) {
		if (typeof container === 'number') {
			speed = progress;
			progress = container;
			container = false;
		}
		let progressbar = _findProgressbar(container);
		if (!progressbar || progressbar.classList.contains(CLASS_PROGRESSBAR_INFINITE)) {
			return;
		}
		if (progress) progress = Math.min(Math.max(progress, 0), 100);
		progressbar.offsetHeight;
		const span = progressbar.querySelector('span');
		if (span) {
			const style = span.style;
			style.webkitTransform = 'translate3d(' + (-100 + progress) + '%,0,0)';
			if (typeof speed !== 'undefined') {
				style.webkitTransitionDuration = speed + 'ms';
			} else {
				style.webkitTransitionDuration = '';
			}
		}
		return progressbar;
	};
	$.fn.progressbar = function(options) {
		const progressbarApis = [];
		options = options || {};
		this.each(function() {
			const self = this;
			let progressbarApi = self.mui_plugin_progressbar;
			if (!progressbarApi) {
				self.mui_plugin_progressbar = progressbarApi = {
					options: options,
					setOptions: function(options) {
						this.options = options;
					},
					show: function() {
						return showProgressbar(self, this.options.progress, this.options.color);
					},
					setProgress: function(progress) {
						return setProgressbar(self, progress);
					},
					hide: function() {
						return hideProgressbar(self);
					}
				};
			} else if (options) {
				progressbarApi.setOptions(options);
			}
			progressbarApis.push(progressbarApi);
		});
		return progressbarApis.length === 1 ? progressbarApis[0] : progressbarApis;
	};
	//	$.setProgressbar = setProgressbar;
	//	$.showProgressbar = showProgressbar;
	//	$.hideProgressbar = hideProgressbar;
})(mui, document);