'use strict';

/**
 * MUI JSONP
 * varstion 1.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($, win, doc) {

	let callbackIndex = 0;

	//生成回调函数名
	const createCallbackName = function() {
		return 'mui_jsonp_callback_' + (callbackIndex++);
	};

	const container = doc.body;

	//导入 script 元素
	const importScript = function(url) {
		const element = doc.createElement('script');
		element.src = url;
		element.async = true;
		element.defer = true;
		container.appendChild(element);
		return element;
	};

	//转换 URL，JSONP 只支持 get 方式的 queryString ,需将 data 拼入 url
	const convertUrl = function(url, data, jsonpParam, callbacnName) {
		if (jsonpParam) {
			url = url.replace(jsonpParam + '=?', jsonpParam + '=' + callbacnName);
		} else {
			data['callback'] = callbacnName;
		}
		const buffer = [];
		for (var key in data) {
			buffer.push(key + '=' + encodeURIComponent(data[key]));
		}
		return url + (url.indexOf('?') > -1 ? '&' : '?') + buffer.join('&');
	};

	//获取 QueryString
	const getQueryString = function(url) {
		url = url || location.search;
		const splitIndex = url.indexOf('?');
		const queryString = url.substr(splitIndex + 1);
		const paramArray = queryString.split('&');
		const result = {};
		for (var i in paramArray) {
			const params = paramArray[i].split('=');
			result[params[0]] = params[1];
		}
		return result;
	}

	//获取将传递给服务器的回调函数的请求参数名
	const getJSONPParam = function(url) {
		const query = getQueryString(url);
		for (var name in query) {
			if (query[name] === '?') {
				return name;
			}
		}
		return null;
	};

	/**
	 * @description JSONP 方法
	 * @param {String} url  将请求的地址
	 * @param {Object} data 请求参数数据
	 * @param {Function} callback 请求完成时回调函数
	 * @return {mui} mui 对象自身
	 **/
	$.getJSONP = function(url, data, callback) {
		if (!url) {
			throw "mui.getJSONP URL error!";
		}
		const jsonpParam = getJSONPParam(url);
		const callbackName = createCallbackName();
		data = data || {};
		callback = callback || $.noop;
		url = convertUrl(url, data, jsonpParam, callbackName);
		let scriptElement = null;
		win[callbackName] = function(result) {
			callback(result);
			if (scriptElement) {
				container.removeChild(scriptElement);
			}
			win[callbackName] = null;
			delete win[callbackName];
		};
		scriptElement = importScript(url);
		return $;
	};

	//为原 mui.getJSON 方法添加同 jQuery.getJSON 一样的 JSONP 支持
	$.__getJSON = $.getJSON;
	$.getJSON = function(url, data, callback) {
		const isJSONP = getJSONPParam(url) !== null;
		if (isJSONP) {
			return $.getJSONP(url, data, callback);
		} else {
			return $.__getJSON(url, data, callback);
		}
	};

}(mui, window, document));