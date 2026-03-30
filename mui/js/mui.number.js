'use strict';

/**
 * 数字输入框
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($) {

    const touchSupport = ('ontouchstart' in document);
    const tapEventName = touchSupport ? 'tap' : 'click';
    const changeEventName = 'change';
    const holderClassName = $.className('numbox');
    const plusClassSelector = $.classSelector('.btn-numbox-plus,.numbox-btn-plus');
    const minusClassSelector = $.classSelector('.btn-numbox-minus,.numbox-btn-minus');
    const inputClassSelector = $.classSelector('.input-numbox,.numbox-input');

    let Numbox = $.Numbox = $.Class.extend({
        /**
         * 构造函数
         **/
        init: function(holder, options) {
            let self = this;
            if (!holder) {
                throw "构造 numbox 时缺少容器元素";
            }
            self.holder = holder;
            options = options || {};
            options.step = parseInt(options.step || 1);
            self.options = options;
            self.input = $.qsa(inputClassSelector, self.holder)[0];
            self.plus = $.qsa(plusClassSelector, self.holder)[0];
            self.minus = $.qsa(minusClassSelector, self.holder)[0];
            self.checkValue();
            self.initEvent();
        },
        /**
         * 初始化事件绑定
         **/
        initEvent: function() {
            let self = this;
            self.plus.addEventListener(tapEventName, function(event) {
                let val = parseInt(self.input.value) + self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.minus.addEventListener(tapEventName, function(event) {
                let val = parseInt(self.input.value) - self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.input.addEventListener(changeEventName, function(event) {
                self.checkValue();
                let val = parseInt(self.input.value);
                //触发顶层容器
                $.trigger(self.holder, changeEventName, {
                    value: val
                });
            });
        },
        /**
         * 获取当前值
         **/
        getValue: function() {
            let self = this;
            return parseInt(self.input.value);
        },
        /**
         * 验证当前值是法合法
         **/
        checkValue: function() {
            let self = this;
            let val = self.input.value;
            if (val === null || val === '' || isNaN(val)) {
                self.input.value = self.options.min || 0;
                self.minus.disabled = self.options.min !== null;
            } else {
                let val = parseInt(val);
                if (self.options.max !== null && !isNaN(self.options.max) && val >= parseInt(self.options.max)) {
                    val = self.options.max;
                    self.plus.disabled = true;
                } else {
                    self.plus.disabled = false;
                }
                if (self.options.min !== null && !isNaN(self.options.min) && val <= parseInt(self.options.min)) {
                    val = self.options.min;
                    self.minus.disabled = true;
                } else {
                    self.minus.disabled = false;
                }
                self.input.value = val;
            }
        },
        /**
         * 更新选项
         **/
        setOption: function(name, value) {
            const self = this;
            self.options[name] = value;
        },
        /**
         * 动态设置新值
         **/
        setValue: function(value) {
            this.input.value = value;
            this.checkValue();
        }
    });

    $.fn.numbox = function(options) {
        const instanceArray = [];
        //遍历选择的元素
        this.each(function(i, element) {
            if (element.numbox) {
                return;
            }
            if (options) {
                element.numbox = new Numbox(element, options);
            } else {
                const optionsText = element.getAttribute('data-numbox-options');
                const options = optionsText ? JSON.parse(optionsText) : {};
                options.step = element.getAttribute('data-numbox-step') || options.step;
                options.min = element.getAttribute('data-numbox-min') || options.min;
                options.max = element.getAttribute('data-numbox-max') || options.max;
                element.numbox = new Numbox(element, options);
            }
        });
        return this[0] ? this[0].numbox : null;
    }

    //自动处理 class='mui-locker' 的 dom
    $.ready(function() {
        $('.' + holderClassName).numbox();
    });

}(mui));