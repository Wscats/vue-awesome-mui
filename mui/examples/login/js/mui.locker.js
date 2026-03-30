'use strict';

/**
 * 手势锁屏插件
 * varstion 1.0.5
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, doc) {

	const touchSupport = ('ontouchstart' in document);
	const startEventName = touchSupport ? 'touchstart' : 'mousedown';
	const moveEventName = touchSupport ? 'touchmove' : 'mousemove';
	const endEventName = touchSupport ? 'touchend' : 'mouseup';
	const lockerHolderClassName = $.className('locker-holder');
	const lockerClassName = $.className('locker');

	const styleHolder = doc.querySelector('head') || doc.querySelector('body');
	styleHolder.innerHTML += "<style>.mui-locker-holder{overflow:hidden;position:relative;padding:0px;}.mui-locker-holder canvas{width:100%;height:100%;}</style>";

	const times = 4;

	function getElementLeft(element) {　　　　
		const actualLeft = element.offsetLeft;　　　　
		let current = element.offsetParent;　　　　
		while (current !== null) {　　　　　　
			actualLeft += current.offsetLeft;　　　　　　
			current = current.offsetParent;　　　　
		}　　　　
		return actualLeft;　　
	}　　

	function getElementTop(element) {　　　　
		const actualTop = element.offsetTop;　　　　
		let current = element.offsetParent;　　　　
		while (current !== null) {　　　　　　
			actualTop += current.offsetTop;　　　　　　
			current = current.offsetParent;　　　　
		}　　　　
		return actualTop;　　
	}

	//定义 Locker 类
	let Locker = $.Locker = $.Class.extend({
		R: 26,
		CW: 400,
		CH: 320,
		OffsetX: 30,
		OffsetY: 30,

		/**
		 * 构造函数
		 * */
		init: function(holder, options) {
			let self = this;
			if (!holder) {
				throw "构造 Locker 时缺少容器元素";
			}
			self.holder = holder;
			//避免重复初始化开始
			if (self.holder.__locker_inited) return;
			self.holder.__locker_inited = true;
			//避免重复初始化结束
			//
			self.options = options || {};
			self.options.callback = self.options.callback || self.options.done || $.noop;
			self.holder.innerHTML = '<canvas></canvas>';
			//
			self.holder.classList.add(lockerHolderClassName);
			//初始化
			let canvas = self.canvas = $.qsa('canvas', self.holder)[0];
			canvas.on = canvas.addEventListener || function(name, handler, capture) {
				canvas.attachEvent('on' + name, handler, capture);
			};
			canvas.off = canvas.removeEventListener || function(name, handler, capture) {
				canvas.detachEvent('on' + name, handler, capture);
			};
			//
			if (self.options.width) self.holder.style.width = self.options.width + 'px';
			if (self.options.height) self.holder.style.height = self.options.height + 'px';
			self.CW = self.options.width || self.holder.offsetWidth || self.CW;
			self.CH = self.options.height || self.holder.offsetHeight || self.CH;
			//处理 “宽、高” 等数值, 全部扩大 times 倍
			self.R *= times;
			self.CW *= times;
			self.CH *= times;
			self.OffsetX *= times;
			self.OffsetY *= times;
			//
			canvas.width = self.CW;
			canvas.height = self.CH;
			let cxt = self.cxt = canvas.getContext("2d");
			//两个圆之间的外距离 就是说两个圆心的距离去除两个半径
			const X = (self.CW - 2 * self.OffsetX - self.R * 2 * 3) / 2;
			const Y = (self.CH - 2 * self.OffsetY - self.R * 2 * 3) / 2;
			self.pointLocationArr = self.caculateNinePointLotion(X, Y);
			self.initEvent(canvas, cxt, self.holder);
			//console.log(X);
			self.draw(cxt, self.pointLocationArr, [], null);
			setTimeout(function() {
				self.draw(cxt, self.pointLocationArr, [], null);
			}, 0);
		},

		/**
		 * 计算
		 */
		caculateNinePointLotion: function(diffX, diffY) {
			let self = this;
			const Re = [];
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 3; col++) {
					let Point = {
						X: (self.OffsetX + col * diffX + (col * 2 + 1) * self.R),
						Y: (self.OffsetY + row * diffY + (row * 2 + 1) * self.R)
					};
					Re.push(Point);
				}
			}
			return Re;
		},

		/**
		 * 绘制
		 */
		draw: function(cxt, _PointLocationArr, _LinePointArr, touchPoint) {
			let self = this;
			const R = self.R;
			if (_LinePointArr.length > 0) {
				cxt.beginPath();
				for (let i = 0; i < _LinePointArr.length; i++) {
					const pointIndex = _LinePointArr[i];
					cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
				}
				cxt.lineWidth = 2 * times;
				cxt.strokeStyle = self.options.lineColor || "#999"; //连结线颜色
				cxt.stroke();
				cxt.closePath();
				if (touchPoint !== null) {
					const lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
					const lastPoint = _PointLocationArr[lastPointIndex];
					cxt.beginPath();
					cxt.moveTo(lastPoint.X, lastPoint.Y);
					cxt.lineTo(touchPoint.X, touchPoint.Y);
					cxt.stroke();
					cxt.closePath();
				}
			}
			for (let i = 0; i < _PointLocationArr.length; i++) {
				const Point = _PointLocationArr[i];
				cxt.fillStyle = self.options.ringColor || "#888"; //圆圈边框颜色
				cxt.beginPath();
				cxt.arc(Point.X, Point.Y, R, 0, Math.PI * times, true);
				cxt.closePath();
				cxt.fill();
				cxt.fillStyle = self.options.fillColor || "#f3f3f3"; //圆圈填充颜色
				cxt.beginPath();
				cxt.arc(Point.X, Point.Y, R - (2 * times), 0, Math.PI * times, true);
				cxt.closePath();
				cxt.fill();
				if (_LinePointArr.indexOf(i) >= 0) {
					cxt.fillStyle = self.options.pointColor || "#777"; //圆圈中心点颜色
					cxt.beginPath();
					cxt.arc(Point.X, Point.Y, R - (16 * times), 0, Math.PI * times, true);
					cxt.closePath();
					cxt.fill();
				}
			}
		},

		isPointSelect: function(touches, linePoint) {
			let self = this;
			for (let i = 0; i < self.pointLocationArr.length; i++) {
				const currentPoint = self.pointLocationArr[i];
				const xdiff = Math.abs(currentPoint.X - touches.elementX);
				const ydiff = Math.abs(currentPoint.Y - touches.elementY);
				const dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
				if (dir < self.R) {
					if (linePoint.indexOf(i) < 0) {
						linePoint.push(i);
					}
					break;
				}
			}
		},

		initEvent: function(canvas, cxt, holder) {
			let self = this;
			let linePoint = [];
			let isDown = false; //针对鼠标事件
			//start
			self._startHandler = function(e) {
				e.point = event.changedTouches ? event.changedTouches[0] : event;
				e.point.elementX = (e.point.pageX - getElementLeft(holder)) * times;
				e.point.elementY = (e.point.pageY - getElementTop(holder)) * times;
				self.isPointSelect(e.point, linePoint);
				isDown = true;
			};
			canvas.on(startEventName, self._startHandler, false);
			//move
			self._moveHanlder = function(e) {
				if (!isDown) return;
				e.preventDefault();
				e.point = event.changedTouches ? event.changedTouches[0] : event;
				e.point.elementX = (e.point.pageX - getElementLeft(holder)) * times;
				e.point.elementY = (e.point.pageY - getElementTop(holder)) * times;
				const touches = e.point;
				self.isPointSelect(touches, linePoint);
				cxt.clearRect(0, 0, self.CW, self.CH);
				self.draw(cxt, self.pointLocationArr, linePoint, {
					X: touches.elementX,
					Y: touches.elementY
				});
			};
			canvas.on(moveEventName, self._moveHanlder, false);
			//end
			self._endHandler = function(e) {
				e.point = event.changedTouches ? event.changedTouches[0] : event;
				e.point.elementX = (e.point.pageX - getElementLeft(holder)) * times;
				e.point.elementY = (e.point.pageY - getElementTop(holder)) * times;
				cxt.clearRect(0, 0, self.CW, self.CH);
				self.draw(cxt, self.pointLocationArr, linePoint, null);
				//事件数据
				const eventData = {
					sender: self,
					points: linePoint
				};
				/*
				 * 回调完成事件
				 *
				 * 备注:
				 * 比较理想的做法是为 Locker 的实例启用事件机制，比如 locker.on('done',handler);
				 * 在 mui 没有完整的公共事件模块前，此版本中 locker 实例暂通过 options.callback 处理
				 */
				self.options.callback(eventData);
				//触发声明的DOM的自定义事件(暂定 done 为事件名，可以考虑更有针对的事件名 )
				$.trigger(self.holder, 'done', eventData);
				//-
				linePoint = [];
				isDown = false;
			};
			canvas.on(endEventName, self._endHandler, false);
		},

		pointLocationArr: [],

		/**
		 * 清除图形
		 * */
		clear: function() {
			let self = this;
			//self.pointLocationArr = [];
			if (self.cxt) {
				self.cxt.clearRect(0, 0, self.CW, self.CH);
				self.draw(self.cxt, self.pointLocationArr, [], {
					X: 0,
					Y: 0
				});
			}
		},

		/**
		 * 释放资源
		 * */
		dispose: function() {
			const self = this;
			self.cxt = null;
			self.canvas.off(startEventName, self._startHandler);
			self.canvas.off(moveEventName, self._moveHandler);
			self.canvas.off(endEventName, self._endHandler);
			self.holder.innerHTML = '';
			self.canvas = null;
		}
	});

	//添加 locker 插件
	$.fn.locker = function(options) {
		//遍历选择的元素
		this.each(function(i, element) {
			if (options) {
				new Locker(element, options);
			} else {
				const optionsText = element.getAttribute('data-locker-options');
				const options = optionsText ? JSON.parse(optionsText) : {};
				options.lineColor = element.getAttribute('data-locker-line-color') || options.lineColor;
				options.ringColor = element.getAttribute('data-locker-ring-color') || options.ringColor;
				options.fillColor = element.getAttribute('data-locker-fill-color') || options.fillColor;
				options.pointColor = element.getAttribute('data-locker-point-color') || options.pointColor;
				options.width = element.getAttribute('data-locker-width') || options.width;
				options.height = element.getAttribute('data-locker-height') || options.height;
				new Locker(element, options);
			}
		});
		return this;
	};

	//自动处理 class='mui-locker' 的 dom
	try {
		$('.' + lockerClassName).locker();
	} catch (ex) {}
	$.ready(function() {
		$('.' + lockerClassName).locker();
	});

}(mui, document));