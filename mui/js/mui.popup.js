'use strict';

/**
 * Popup(alert,confirm,prompt)  
 * @param {Object} $
 * @param {Object} window
 * @param {Object} document
 */
(function($, window, document) {
    const CLASS_POPUP = $.className('popup');
    let CLASS_POPUP_BACKDROP = $.className('popup-backdrop');
    const CLASS_POPUP_IN = $.className('popup-in');
    const CLASS_POPUP_OUT = $.className('popup-out');
    const CLASS_POPUP_INNER = $.className('popup-inner');
    const CLASS_POPUP_TITLE = $.className('popup-title');
    const CLASS_POPUP_TEXT = $.className('popup-text');
    const CLASS_POPUP_INPUT = $.className('popup-input');
    const CLASS_POPUP_BUTTONS = $.className('popup-buttons');
    const CLASS_POPUP_BUTTON = $.className('popup-button');
    const CLASS_POPUP_BUTTON_BOLD = $.className('popup-button-bold');
    const CLASS_POPUP_BACKDROP = $.className('popup-backdrop');
    const CLASS_ACTIVE = $.className('active');

    const popupStack = [];
    const backdrop = (function() {
        const element = document.createElement('div');
        element.classList.add(CLASS_POPUP_BACKDROP);
        element.addEventListener($.EVENT_MOVE, $.preventDefault);
        element.addEventListener('webkitTransitionEnd', function() {
            if (!this.classList.contains(CLASS_ACTIVE)) {
                element.parentNode && element.parentNode.removeChild(element);
            }
        });
        return element;
    }());

    const createInput = function(placeholder) {
        return '<div class="' + CLASS_POPUP_INPUT + '"><input type="text" autofocus placeholder="' + (placeholder || '') + '"/></div>';
    };
    const createInner = function(message, title, extra) {
        return '<div class="' + CLASS_POPUP_INNER + '"><div class="' + CLASS_POPUP_TITLE + '">' + title + '</div><div class="' + CLASS_POPUP_TEXT + '">' + message.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") + '</div>' + (extra || '') + '</div>';
    };
    const createButtons = function(btnArray) {
        const length = btnArray.length;
        let btns = [];
        for (let i = 0; i < length; i++) {
            btns.push('<span class="' + CLASS_POPUP_BUTTON + (i === length - 1 ? (' ' + CLASS_POPUP_BUTTON_BOLD) : '') + '">' + btnArray[i] + '</span>');
        }
        return '<div class="' + CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
    };

    const createPopup = function(html, callback) {
        let popupElement = document.createElement('div');
        popupElement.className = CLASS_POPUP;
        popupElement.innerHTML = html;
        const removePopupElement = function() {
            popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
            popupElement = null;
        };
        popupElement.addEventListener($.EVENT_MOVE, $.preventDefault);
        popupElement.addEventListener('webkitTransitionEnd', function(e) {
            if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
                removePopupElement();
            }
        });
        popupElement.style.display = 'block';
        document.body.appendChild(popupElement);
        popupElement.offsetHeight;
        popupElement.classList.add(CLASS_POPUP_IN);

        if (!backdrop.classList.contains(CLASS_ACTIVE)) {
            backdrop.style.display = 'block';
            document.body.appendChild(backdrop);
            backdrop.offsetHeight;
            backdrop.classList.add(CLASS_ACTIVE);
        }
        const btns = $.qsa('.' + CLASS_POPUP_BUTTON, popupElement);
        const input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
        const popup = {
            element: popupElement,
            close: function(index, animate) {
                if (popupElement) {
                    const result = callback && callback({
                        index: index || 0,
                        value: input && input.value || ''
                    });
                    if (result === false) { //返回false则不关闭当前popup
                        return;
                    }
                    if (animate !== false) {
                        popupElement.classList.remove(CLASS_POPUP_IN);
                        popupElement.classList.add(CLASS_POPUP_OUT);
                    } else {
                        removePopupElement();
                    }
                    popupStack.pop();
                    //如果还有其他popup，则不remove backdrop
                    if (popupStack.length) {
                        popupStack[popupStack.length - 1]['show'](animate);
                    } else {
                        backdrop.classList.remove(CLASS_ACTIVE);
                    }
                }
            }
        };
        const handleEvent = function(e) {
            popup.close(btns.indexOf(e.target));
        };
        $(popupElement).on('tap', '.' + CLASS_POPUP_BUTTON, handleEvent);
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['hide']();
        }
        popupStack.push({
            close: popup.close,
            show: function(animate) {
                popupElement.style.display = 'block';
                popupElement.offsetHeight;
                popupElement.classList.add(CLASS_POPUP_IN);
            },
            hide: function() {
                popupElement.style.display = 'none';
                popupElement.classList.remove(CLASS_POPUP_IN);
            }
        });
        return popup;
    };
    const createAlert = function(message, title, btnValue, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnValue;
                title = null;
                btnValue = null;
            } else if (typeof btnValue === 'function') {
                type = callback;
                callback = btnValue;
                btnValue = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示') + createButtons([btnValue || '确定']), callback);
        }
        return plus.nativeUI.alert(message, callback, title || '提示', btnValue || '确定');
    };
    const createConfirm = function(message, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示') + createButtons(btnArray || ['取消', '确认']), callback);
        }
        return plus.nativeUI.confirm(message, callback, title, btnArray || ['取消', '确认']);
    };
    const createPrompt = function(message, placeholder, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof placeholder === 'function') {
                callback = placeholder;
                type = title;
                placeholder = null;
                title = null;
                btnArray = null;
            } else if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '提示', createInput(placeholder)) + createButtons(btnArray || ['取消', '确认']), callback);
        }
        return plus.nativeUI.prompt(message, callback, title || '提示', placeholder, btnArray || ['取消', '确认']);
    };
    let closePopup = function() {
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
            return true;
        } else {
            return false;
        }
    };
    let closePopups = function() {
        while (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
        }
    };

    $.closePopup = closePopup;
    $.closePopups = closePopups;
    $.alert = createAlert;
    $.confirm = createConfirm;
    $.prompt = createPrompt;
})(mui, window, document);