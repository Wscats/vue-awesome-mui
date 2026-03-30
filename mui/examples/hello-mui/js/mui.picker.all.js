'use strict';

/**
 * 选择列表插件
 * varstion 2.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, window, document, undefined) {

	const MAX_EXCEED = 30;
	const VISIBLE_RANGE = 90;
	const DEFAULT_ITEM_HEIGHT = 40;
	const BLUR_WIDTH = 10;

	let rad2deg = $.rad2deg = function(rad) {
		return rad / (Math.PI / 180);
	};

	let deg2rad = $.deg2rad = function(deg) {
		return deg * (Math.PI / 180);
	};

	const platform = navigator.platform.toLowerCase();
	const userAgent = navigator.userAgent.toLowerCase();
	const isIos = (userAgent.indexOf('iphone') > -1 ||
			userAgent.indexOf('ipad') > -1 ||
			userAgent.indexOf('ipod') > -1) &&
		(platform.indexOf('iphone') > -1 ||
			platform.indexOf('ipad') > -1 ||
			platform.indexOf('ipod') > -1);
	//alert(isIos);

	let Picker = $.Picker = function(holder, options) {
		let self = this;
		self.holder = holder;
		self.options = options || {};
		self.init();
		self.initInertiaParams();
		self.calcElementItemPostion(true);
		self.bindEvent();
	};

	Picker.prototype.findElementItems = function() {
		let self = this;
		self.elementItems = [].slice.call(self.holder.querySelectorAll('li'));
		return self.elementItems;
	};

	Picker.prototype.init = function() {
		let self = this;
		self.list = self.holder.querySelector('ul');
		self.findElementItems();
		self.height = self.holder.offsetHeight;
		self.r = self.height / 2 - BLUR_WIDTH;
		self.d = self.r * 2;
		self.itemHeight = self.elementItems.length > 0 ? self.elementItems[0].offsetHeight : DEFAULT_ITEM_HEIGHT;
		self.itemAngle = parseInt(self.calcAngle(self.itemHeight * 0.8));
		self.hightlightRange = self.itemAngle / 2;
		self.visibleRange = VISIBLE_RANGE;
		self.beginAngle = 0;
		self.beginExceed = self.beginAngle - MAX_EXCEED;
		self.list.angle = self.beginAngle;
		if (isIos) {
			self.list.style.webkitTransformOrigin = "center center " + self.r + "px";
		}
	};

	Picker.prototype.calcElementItemPostion = function(andGenerateItms) {
		let self = this;
		if (andGenerateItms) {
			self.items = [];
		}
		self.elementItems.forEach(function(item) {
			let index = self.elementItems.indexOf(item);
			self.endAngle = self.itemAngle * index;
			item.angle = self.endAngle;
			item.style.webkitTransformOrigin = "center center -" + self.r + "px";
			item.style.webkitTransform = "translateZ(" + self.r + "px) rotateX(" + (-self.endAngle) + "deg)";
			if (andGenerateItms) {
				const dataItem = {};
				dataItem.text = item.innerHTML || '';
				dataItem.value = item.getAttribute('data-value') || dataItem.text;
				self.items.push(dataItem);
			}
		});
		self.endExceed = self.endAngle + MAX_EXCEED;
		self.calcElementItemVisibility(self.beginAngle);
	};

	Picker.prototype.calcAngle = function(c) {
		let self = this;
		const a = b = parseFloat(self.r);
		//直径的整倍数部分直接乘以 180
		c = Math.abs(c); //只算角度不关心正否值
		const intDeg = parseInt(c / self.d) * 180;
		c = c % self.d;
		//余弦
		const cosC = (a * a + b * b - c * c) / (2 * a * b);
		const angleC = intDeg + rad2deg(Math.acos(cosC));
		return angleC;
	};

	Picker.prototype.calcElementItemVisibility = function(angle) {
		let self = this;
		self.elementItems.forEach(function(item) {
			const difference = Math.abs(item.angle - angle);
			if (difference < self.hightlightRange) {
				item.classList.add('highlight');
			} else if (difference < self.visibleRange) {
				item.classList.add('visible');
				item.classList.remove('highlight');
			} else {
				item.classList.remove('highlight');
				item.classList.remove('visible');
			}
		});
	};

	Picker.prototype.setAngle = function(angle) {
		let self = this;
		self.list.angle = angle;
		self.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + angle + "deg)";
		self.calcElementItemVisibility(angle);
	};

	Picker.prototype.bindEvent = function() {
		let self = this;
		let lastAngle = 0;
		let startY = null;
		let isPicking = false;
		self.holder.addEventListener($.EVENT_START, function(event) {
			isPicking = true;
			event.preventDefault();
			self.list.style.webkitTransition = '';
			startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
			lastAngle = self.list.angle;
			self.updateInertiaParams(event, true);
		}, false);
		self.holder.addEventListener($.EVENT_END, function(event) {
			isPicking = false;
			event.preventDefault();
			self.startInertiaScroll(event);
		}, false);
		self.holder.addEventListener($.EVENT_CANCEL, function(event) {
			isPicking = false;
			event.preventDefault();
			self.startInertiaScroll(event);
		}, false);
		self.holder.addEventListener($.EVENT_MOVE, function(event) {
			if (!isPicking) {
				return;
			}
			event.preventDefault();
			const endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
			const dragRange = endY - startY;
			const dragAngle = self.calcAngle(dragRange);
			let newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle;
			if (newAngle > self.endExceed) {
				newAngle = self.endExceed
			}
			if (newAngle < self.beginExceed) {
				newAngle = self.beginExceed
			}
			self.setAngle(newAngle);
			self.updateInertiaParams(event);
		}, false);
		//--
		self.list.addEventListener('tap', function(event) {
			elementItem = event.target;
			if (elementItem.tagName === 'LI') {
				self.setSelectedIndex(self.elementItems.indexOf(elementItem), 200);
			}
		}, false);
	};

	Picker.prototype.initInertiaParams = function() {
		let self = this;
		self.lastMoveTime = 0;
		self.lastMoveStart = 0;
		self.stopInertiaMove = false;
	};

	Picker.prototype.updateInertiaParams = function(event, isStart) {
		let self = this;
		let point = event.changedTouches ? event.changedTouches[0] : event;
		if (isStart) {
			self.lastMoveStart = point.pageY;
			self.lastMoveTime = event.timeStamp || Date.now();
			self.startAngle = self.list.angle;
		} else {
			let nowTime = event.timeStamp || Date.now();
			if (nowTime - self.lastMoveTime > 300) {
				self.lastMoveTime = nowTime;
				self.lastMoveStart = point.pageY;
			}
		}
		self.stopInertiaMove = true;
	};

	Picker.prototype.startInertiaScroll = function(event) {
		let self = this;
		const point = event.changedTouches ? event.changedTouches[0] : event;
		/** 
		 * 缓动代码
		 */
		const nowTime = event.timeStamp || Date.now();
		const v = (point.pageY - self.lastMoveStart) / (nowTime - self.lastMoveTime); //最后一段时间手指划动速度  
		const dir = v > 0 ? -1 : 1; //加速度方向  
		const deceleration = dir * 0.0006 * -1;
		let duration = Math.abs(v / deceleration); // 速度消减至0所需时间  
		const dist = v * duration / 2; //最终移动多少 
		const startAngle = self.list.angle;
		let distAngle = self.calcAngle(dist) * dir;
		//----
		const srcDistAngle = distAngle;
		if (startAngle + distAngle < self.beginExceed) {
			distAngle = self.beginExceed - startAngle;
			duration = duration * (distAngle / srcDistAngle) * 0.6;
		}
		if (startAngle + distAngle > self.endExceed) {
			distAngle = self.endExceed - startAngle;
			duration = duration * (distAngle / srcDistAngle) * 0.6;
		}
		//----
		if (distAngle === 0) {
			self.endScroll();
			return;
		}
		self.scrollDistAngle(nowTime, startAngle, distAngle, duration);
	};

	Picker.prototype.scrollDistAngle = function(nowTime, startAngle, distAngle, duration) {
		let self = this;
		self.stopInertiaMove = false;
		(function(nowTime, startAngle, distAngle, duration) {
			const frameInterval = 13;
			const stepCount = duration / frameInterval;
			let stepIndex = 0;
			(function inertiaMove() {
				if (self.stopInertiaMove) return;
				const newAngle = self.quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
				self.setAngle(newAngle);
				stepIndex++;
				if (stepIndex > stepCount - 1 || newAngle < self.beginExceed || newAngle > self.endExceed) {
					self.endScroll();
					return;
				}
				setTimeout(inertiaMove, frameInterval);
			})();
		})(nowTime, startAngle, distAngle, duration);
	};

	Picker.prototype.quartEaseOut = function(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	};

	Picker.prototype.endScroll = function() {
		let self = this;
		if (self.list.angle < self.beginAngle) {
			self.list.style.webkitTransition = "150ms ease-out";
			self.setAngle(self.beginAngle);
		} else if (self.list.angle > self.endAngle) {
			self.list.style.webkitTransition = "150ms ease-out";
			self.setAngle(self.endAngle);
		} else {
			let index = parseInt((self.list.angle / self.itemAngle).toFixed(0));
			self.list.style.webkitTransition = "100ms ease-out";
			self.setAngle(self.itemAngle * index);
		}
		self.triggerChange();
	};

	Picker.prototype.triggerChange = function(force) {
		let self = this;
		setTimeout(function() {
			const index = self.getSelectedIndex();
			let item = self.items[index];
			if ($.trigger && (index !== self.lastIndex || force === true)) {
				$.trigger(self.holder, 'change', {
					"index": index,
					"item": item
				});
				//console.log('change:' + index);
			}
			self.lastIndex = index;
			typeof force === 'function' && force();
		}, 0);
	};

	Picker.prototype.correctAngle = function(angle) {
		let self = this;
		if (angle < self.beginAngle) {
			return self.beginAngle;
		} else if (angle > self.endAngle) {
			return self.endAngle;
		} else {
			return angle;
		}
	};

	Picker.prototype.setItems = function(items) {
		let self = this;
		self.items = items || [];
		const buffer = [];
		self.items.forEach(function(item) {
			if (item !== null && item !== undefined) {
				buffer.push('<li>' + (item.text || item) + '</li>');
			}
		});
		self.list.innerHTML = buffer.join('');
		self.findElementItems();
		self.calcElementItemPostion();
		self.setAngle(self.correctAngle(self.list.angle));
		self.triggerChange(true);
	};

	Picker.prototype.getItems = function() {
		let self = this;
		return self.items;
	};

	Picker.prototype.getSelectedIndex = function() {
		let self = this;
		return parseInt((self.list.angle / self.itemAngle).toFixed(0));
	};

	Picker.prototype.setSelectedIndex = function(index, duration, callback) {
		let self = this;
		self.list.style.webkitTransition = '';
		const angle = self.correctAngle(self.itemAngle * index);
		if (duration && duration > 0) {
			const distAngle = angle - self.list.angle;
			self.scrollDistAngle(Date.now(), self.list.angle, distAngle, duration);
		} else {
			self.setAngle(angle);
		}
		self.triggerChange(callback);
	};

	Picker.prototype.getSelectedItem = function() {
		let self = this;
		return self.items[self.getSelectedIndex()];
	};

	Picker.prototype.getSelectedValue = function() {
		let self = this;
		return (self.items[self.getSelectedIndex()] || {}).value;
	};

	Picker.prototype.getSelectedText = function() {
		let self = this;
		return (self.items[self.getSelectedIndex()] || {}).text;
	};

	Picker.prototype.setSelectedValue = function(value, duration, callback) {
		let self = this;
		for (var index in self.items) {
			const item = self.items[index];
			if (item.value === value) {
				self.setSelectedIndex(index, duration, callback);
				return;
			}
		}
	};

	if ($.fn) {
		$.fn.picker = function(options) {
			//遍历选择的元素
			this.each(function(i, element) {
				if (element.picker) return;
				if (options) {
					element.picker = new Picker(element, options);
				} else {
					const optionsText = element.getAttribute('data-picker-options');
					const _options = optionsText ? JSON.parse(optionsText) : {};
					element.picker = new Picker(element, _options);
				}
			});
			return this[0] ? this[0].picker : null;
		};

		//自动初始化
		$.ready(function() {
			$('.mui-picker').picker();
		});
	}

})(window.mui || window, window, document, undefined);
//end
/**
 * 弹出选择列表插件
 * 此组件依赖 listpcker ，请在页面中先引入 mui.picker.css + mui.picker.js
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, document) {

	//创建 DOM
	$.dom = function(str) {
		if (typeof(str) !== 'string') {
			if ((str instanceof Array) || (str[0] && str.length)) {
				return [].slice.call(str);
			} else {
				return [str];
			}
		}
		if (!$.__create_dom_div__) {
			$.__create_dom_div__ = document.createElement('div');
		}
		$.__create_dom_div__.innerHTML = str;
		return [].slice.call($.__create_dom_div__.childNodes);
	};

	const panelBuffer = '<div class="mui-poppicker">\
		<div class="mui-poppicker-header">\
			<button class="mui-btn mui-poppicker-btn-cancel">取消</button>\
			<button class="mui-btn mui-btn-blue mui-poppicker-btn-ok">确定</button>\
			<div class="mui-poppicker-clear"></div>\
		</div>\
		<div class="mui-poppicker-body">\
		</div>\
	</div>';

	const pickerBuffer = '<div class="mui-picker">\
		<div class="mui-picker-inner">\
			<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
			<ul class="mui-pciker-list">\
			</ul>\
			<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
		</div>\
	</div>';

	//定义弹出选择器类
	let PopPicker = $.PopPicker = $.Class.extend({
		//构造函数
		init: function(options) {
			let self = this;
			self.options = options || {};
			self.options.buttons = self.options.buttons || ['取消', '确定'];
			self.panel = $.dom(panelBuffer)[0];
			document.body.appendChild(self.panel);
			self.ok = self.panel.querySelector('.mui-poppicker-btn-ok');
			self.cancel = self.panel.querySelector('.mui-poppicker-btn-cancel');
			self.body = self.panel.querySelector('.mui-poppicker-body');
			self.mask = $.createMask();
			self.cancel.innerText = self.options.buttons[0];
			self.ok.innerText = self.options.buttons[1];
			self.cancel.addEventListener('tap', function(event) {
				self.hide();
			}, false);
			self.ok.addEventListener('tap', function(event) {
				if (self.callback) {
					let rs = self.callback(self.getSelectedItems());
					if (rs !== false) {
						self.hide();
					}
				}
			}, false);
			self.mask[0].addEventListener('tap', function() {
				self.hide();
			}, false);
			self._createPicker();
			//防止滚动穿透
			self.panel.addEventListener($.EVENT_START, function(event) {
				event.preventDefault();
			}, false);
			self.panel.addEventListener($.EVENT_MOVE, function(event) {
				event.preventDefault();
			}, false);
		},
		_createPicker: function() {
			let self = this;
			const layer = self.options.layer || 1;
			let width = (100 / layer) + '%';
			self.pickers = [];
			for (let i = 1; i <= layer; i++) {
				const pickerElement = $.dom(pickerBuffer)[0];
				pickerElement.style.width = width;
				self.body.appendChild(pickerElement);
				let picker = $(pickerElement).picker();
				self.pickers.push(picker);
				pickerElement.addEventListener('change', function(event) {
					const nextPickerElement = this.nextSibling;
					if (nextPickerElement && nextPickerElement.picker) {
						const eventData = event.detail || {};
						const preItem = eventData.item || {};
						nextPickerElement.picker.setItems(preItem.children);
					}
				}, false);
			}
		},
		//填充数据
		setData: function(data) {
			let self = this;
			data = data || [];
			self.pickers[0].setItems(data);
		},
		//获取选中的项（数组）
		getSelectedItems: function() {
			let self = this;
			const items = [];
			for (var i in self.pickers) {
				const picker = self.pickers[i];
				items.push(picker.getSelectedItem() || {});
			}
			return items;
		},
		//显示
		show: function(callback) {
			let self = this;
			self.callback = callback;
			self.mask.show();
			document.body.classList.add($.className('poppicker-active-for-page'));
			self.panel.classList.add($.className('active'));
			//处理物理返回键
			self.__back = $.back;
			$.back = function() {
				self.hide();
			};
		},
		//隐藏
		hide: function() {
			let self = this;
			if (self.disposed) return;
			self.panel.classList.remove($.className('active'));
			self.mask.close();
			document.body.classList.remove($.className('poppicker-active-for-page'));
			//处理物理返回键
			$.back=self.__back;
		},
		dispose: function() {
			let self = this;
			self.hide();
			setTimeout(function() {
				self.panel.parentNode.removeChild(self.panel);
				for (var name in self) {
					self[name] = null;
					delete self[name];
				};
				self.disposed = true;
			}, 300);
		}
	});

})(mui, document);
/**
 * 日期时间插件
 * varstion 1.0.5
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, document) {

	//创建 DOM
	$.dom = function(str) {
		if (typeof(str) !== 'string') {
			if ((str instanceof Array) || (str[0] && str.length)) {
				return [].slice.call(str);
			} else {
				return [str];
			}
		}
		if (!$.__create_dom_div__) {
			$.__create_dom_div__ = document.createElement('div');
		}
		$.__create_dom_div__.innerHTML = str;
		return [].slice.call($.__create_dom_div__.childNodes);
	};

	const domBuffer = '<div class="mui-dtpicker" data-type="datetime">\
		<div class="mui-dtpicker-header">\
			<button data-id="btn-cancel" class="mui-btn">取消</button>\
			<button data-id="btn-ok" class="mui-btn mui-btn-blue">确定</button>\
		</div>\
		<div class="mui-dtpicker-title"><h5 data-id="title-y">年</h5><h5 data-id="title-m">月</h5><h5 data-id="title-d">日</h5><h5 data-id="title-h">时</h5><h5 data-id="title-i">分</h5></div>\
		<div class="mui-dtpicker-body">\
			<div data-id="picker-y" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-m" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-d" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-h" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
			<div data-id="picker-i" class="mui-picker">\
				<div class="mui-picker-inner">\
					<div class="mui-pciker-rule mui-pciker-rule-ft"></div>\
					<ul class="mui-pciker-list">\
					</ul>\
					<div class="mui-pciker-rule mui-pciker-rule-bg"></div>\
				</div>\
			</div>\
		</div>\
	</div>';

	//plugin
	let DtPicker = $.DtPicker = $.Class.extend({
		init: function(options) {
			let self = this;
			const _picker = $.dom(domBuffer)[0];
			document.body.appendChild(_picker);
			$('[data-id*="picker"]', _picker).picker();
			let ui = self.ui = {
				picker: _picker,
				mask: $.createMask(),
				ok: $('[data-id="btn-ok"]', _picker)[0],
				cancel: $('[data-id="btn-cancel"]', _picker)[0],
				y: $('[data-id="picker-y"]', _picker)[0],
				m: $('[data-id="picker-m"]', _picker)[0],
				d: $('[data-id="picker-d"]', _picker)[0],
				h: $('[data-id="picker-h"]', _picker)[0],
				i: $('[data-id="picker-i"]', _picker)[0],
				labels: $('[data-id*="title-"]', _picker),
			};
			ui.cancel.addEventListener('tap', function() {
				self.hide();
			}, false);
			ui.ok.addEventListener('tap', function() {
				let rs = self.callback(self.getSelected());
				if (rs !== false) {
					self.hide();
				}
			}, false);
			ui.y.addEventListener('change', function(e) { //目前的change事件容易导致级联触发
				if (self.options.beginMonth || self.options.endMonth) {
					self._createMonth();
				} else {
					self._createDay();
				}
			}, false);
			ui.m.addEventListener('change', function(e) {
				self._createDay();
			}, false);
			ui.d.addEventListener('change', function(e) {
				if (self.options.beginMonth || self.options.endMonth) { //仅提供了beginDate时，触发day,hours,minutes的change
					self._createHours();
				}
			}, false);
			ui.h.addEventListener('change', function(e) {
				if (self.options.beginMonth || self.options.endMonth) {
					self._createMinutes();
				}
			}, false);
			ui.mask[0].addEventListener('tap', function() {
				self.hide();
			}, false);
			self._create(options);
			//防止滚动穿透
			self.ui.picker.addEventListener($.EVENT_START, function(event) {
				event.preventDefault();
			}, false);
			self.ui.picker.addEventListener($.EVENT_MOVE, function(event) {
				event.preventDefault();
			}, false);
		},
		getSelected: function() {
			let self = this;
			let ui = self.ui;
			let type = self.options.type;
			const selected = {
				type: type,
				y: ui.y.picker.getSelectedItem(),
				m: ui.m.picker.getSelectedItem(),
				d: ui.d.picker.getSelectedItem(),
				h: ui.h.picker.getSelectedItem(),
				i: ui.i.picker.getSelectedItem(),
				toString: function() {
					return this.value;
				}
			};
			switch (type) {
				case 'datetime':
					selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value + ':' + selected.i.value;
					selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text + ':' + selected.i.text;
					break;
				case 'date':
					selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value;
					selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text;
					break;
				case 'time':
					selected.value = selected.h.value + ':' + selected.i.value;
					selected.text = selected.h.text + ':' + selected.i.text;
					break;
				case 'month':
					selected.value = selected.y.value + '-' + selected.m.value;
					selected.text = selected.y.text + '-' + selected.m.text;
					break;
				case 'hour':
					selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value;
					selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text;
					break;
			}
			return selected;
		},
		setSelectedValue: function(value) {
			let self = this;
			let ui = self.ui;
			const parsedValue = self._parseValue(value);
			//TODO 嵌套过多，因为picker的change时间是异步(考虑到性能)的，所以为了保证change之后再setSelected，目前使用回调处理
			ui.y.picker.setSelectedValue(parsedValue.y, 0, function() {
				ui.m.picker.setSelectedValue(parsedValue.m, 0, function() {
					ui.d.picker.setSelectedValue(parsedValue.d, 0, function() {
						ui.h.picker.setSelectedValue(parsedValue.h, 0, function() {
							ui.i.picker.setSelectedValue(parsedValue.i, 0);
						});
					});
				});
			});
		},
		isLeapYear: function(year) {
			return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
		},
		_inArray: function(array, item) {
			for (var index in array) {
				const _item = array[index];
				if (_item === item) return true;
			}
			return false;
		},
		getDayNum: function(year, month) {
			let self = this;
			if (self._inArray([1, 3, 5, 7, 8, 10, 12], month)) {
				return 31;
			} else if (self._inArray([4, 6, 9, 11], month)) {
				return 30;
			} else if (self.isLeapYear(year)) {
				return 29;
			} else {
				return 28;
			}
		},
		_fill: function(num) {
			num = num.toString();
			if (num.length < 2) {
				num = 0 + num;
			}
			return num;
		},
		_isBeginYear: function() {
			return this.options.beginYear === parseInt(this.ui.y.picker.getSelectedValue());
		},
		_isBeginMonth: function() {
			return this.options.beginMonth && this._isBeginYear() && this.options.beginMonth === parseInt(this.ui.m.picker.getSelectedValue());
		},
		_isBeginDay: function() {
			return this._isBeginMonth() && this.options.beginDay === parseInt(this.ui.d.picker.getSelectedValue());
		},
		_isBeginHours: function() {
			return this._isBeginDay() && this.options.beginHours === parseInt(this.ui.h.picker.getSelectedValue());
		},
		_isEndYear: function() {
			return this.options.endYear === parseInt(this.ui.y.picker.getSelectedValue());
		},
		_isEndMonth: function() {
			return this.options.endMonth && this._isEndYear() && this.options.endMonth === parseInt(this.ui.m.picker.getSelectedValue());
		},
		_isEndDay: function() {
			return this._isEndMonth() && this.options.endDay === parseInt(this.ui.d.picker.getSelectedValue());
		},
		_isEndHours: function() {
			return this._isEndDay() && this.options.endHours === parseInt(this.ui.h.picker.getSelectedValue());
		},
		_createYear: function(current) {
			let self = this;
			let options = self.options;
			let ui = self.ui;
			//生成年列表
			let yArray = [];
			if (options.customData.y) {
				yArray = options.customData.y;
			} else {
				const yBegin = options.beginYear;
				const yEnd = options.endYear;
				for (let y = yBegin; y <= yEnd; y++) {
					yArray.push({
						text: y + '',
						value: y
					});
				}
			}
			ui.y.picker.setItems(yArray);
			//ui.y.picker.setSelectedValue(current);
		},
		_createMonth: function(current) {
			let self = this;
			let options = self.options;
			let ui = self.ui;

			//生成月列表
			let mArray = [];
			if (options.customData.m) {
				mArray = options.customData.m;
			} else {
				let m = options.beginMonth && self._isBeginYear() ? options.beginMonth : 1;
				const maxMonth = options.endMonth && self._isEndYear() ? options.endMonth : 12;
				for (; m <= maxMonth; m++) {
					let val = self._fill(m);
					mArray.push({
						text: val,
						value: val
					});
				}
			}
			ui.m.picker.setItems(mArray);
			//ui.m.picker.setSelectedValue(current);
		},
		_createDay: function(current) {
			let self = this;
			let options = self.options;
			let ui = self.ui;

			//生成日列表
			let dArray = [];
			if (options.customData.d) {
				dArray = options.customData.d;
			} else {
				let d = self._isBeginMonth() ? options.beginDay : 1;
				const maxDay = self._isEndMonth() ? options.endDay : self.getDayNum(parseInt(this.ui.y.picker.getSelectedValue()), parseInt(this.ui.m.picker.getSelectedValue()));
				for (; d <= maxDay; d++) {
					let val = self._fill(d);
					dArray.push({
						text: val,
						value: val
					});
				}
			}
			ui.d.picker.setItems(dArray);
			current = current || ui.d.picker.getSelectedValue();
			//ui.d.picker.setSelectedValue(current);
		},
		_createHours: function(current) {
			let self = this;
			let options = self.options;
			let ui = self.ui;
			//生成时列表
			let hArray = [];
			if (options.customData.h) {
				hArray = options.customData.h;
			} else {
				let h = self._isBeginDay() ? options.beginHours : 0;
				const maxHours = self._isEndDay() ? options.endHours : 23;
				for (; h <= maxHours; h++) {
					let val = self._fill(h);
					hArray.push({
						text: val,
						value: val
					});
				}
			}
			ui.h.picker.setItems(hArray);
			//ui.h.picker.setSelectedValue(current);
		},
		_createMinutes: function(current) {
			let self = this;
			let options = self.options;
			let ui = self.ui;

			//生成分列表
			let iArray = [];
			if (options.customData.i) {
				iArray = options.customData.i;
			} else {
				let i = self._isBeginHours() ? options.beginMinutes : 0;
				const maxMinutes = self._isEndHours() ? options.endMinutes : 59;
				for (; i <= maxMinutes; i++) {
					const val = self._fill(i);
					iArray.push({
						text: val,
						value: val
					});
				}
			}
			ui.i.picker.setItems(iArray);
			//ui.i.picker.setSelectedValue(current);
		},
		_setLabels: function() {
			let self = this;
			let options = self.options;
			let ui = self.ui;
			ui.labels.each(function(i, label) {
				label.innerText = options.labels[i];
			});
		},
		_setButtons: function() {
			let self = this;
			let options = self.options;
			let ui = self.ui;
			ui.cancel.innerText = options.buttons[0];
			ui.ok.innerText = options.buttons[1];
		},
		_parseValue: function(value) {
			let self = this;
			const rs = {};
			if (value) {
				const parts = value.replace(":", "-").replace(" ", "-").split("-");
				rs.y = parts[0];
				rs.m = parts[1];
				rs.d = parts[2];
				rs.h = parts[3];
				rs.i = parts[4];
			} else {
				let now = new Date();
				rs.y = now.getFullYear();
				rs.m = now.getMonth() + 1;
				rs.d = now.getDate();
				rs.h = now.getHours();
				rs.i = now.getMinutes();
			}
			return rs;
		},
		_create: function(options) {
			let self = this;
			options = options || {};
			options.labels = options.labels || ['年', '月', '日', '时', '分'];
			options.buttons = options.buttons || ['取消', '确定'];
			options.type = options.type || 'datetime';
			options.customData = options.customData || {};
			self.options = options;
			const now = new Date();
			const beginDate = options.beginDate;
			if (beginDate instanceof Date && !isNaN(beginDate.valueOf())) { //设定了开始日期
				options.beginYear = beginDate.getFullYear();
				options.beginMonth = beginDate.getMonth() + 1;
				options.beginDay = beginDate.getDate();
				options.beginHours = beginDate.getHours();
				options.beginMinutes = beginDate.getMinutes();
			}
			const endDate = options.endDate;
			if (endDate instanceof Date && !isNaN(endDate.valueOf())) { //设定了结束日期
				options.endYear = endDate.getFullYear();
				options.endMonth = endDate.getMonth() + 1;
				options.endDay = endDate.getDate();
				options.endHours = endDate.getHours();
				options.endMinutes = endDate.getMinutes();
			}
			options.beginYear = options.beginYear || (now.getFullYear() - 5);
			options.endYear = options.endYear || (now.getFullYear() + 5);
			let ui = self.ui;
			//设定label
			self._setLabels();
			self._setButtons();
			//设定类型
			ui.picker.setAttribute('data-type', options.type);
			//生成
			self._createYear();
			self._createMonth();
			self._createDay();
			self._createHours();
			self._createMinutes();
			//设定默认值
			self.setSelectedValue(options.value);
		},
		//显示
		show: function(callback) {
			let self = this;
			let ui = self.ui;
			self.callback = callback || $.noop;
			ui.mask.show();
			document.body.classList.add($.className('dtpicker-active-for-page'));
			ui.picker.classList.add($.className('active'));
			//处理物理返回键
			self.__back = $.back;
			$.back = function() {
				self.hide();
			};
		},
		hide: function() {
			let self = this;
			if (self.disposed) return;
			const ui = self.ui;
			ui.picker.classList.remove($.className('active'));
			ui.mask.close();
			document.body.classList.remove($.className('dtpicker-active-for-page'));
			//处理物理返回键
			$.back = self.__back;
		},
		dispose: function() {
			const self = this;
			self.hide();
			setTimeout(function() {
				self.ui.picker.parentNode.removeChild(self.ui.picker);
				for (var name in self) {
					self[name] = null;
					delete self[name];
				};
				self.disposed = true;
			}, 300);
		}
	});

})(mui, document);