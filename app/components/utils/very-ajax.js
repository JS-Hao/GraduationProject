//    very-ajax.js 1.0.0
//    author JS-HAO

; (function(exports) {
	exports.very = exports.very || {};

	// addClass && removeClass
	exports.very.addClass = addClass;
	exports.very.removeClass = removeClass;
	// ajax
	exports.very.ajax = ajax;

	function ajax(options) {
		options = options || {};
		options.type = (options.type || 'GET').toUpperCase();
		options.dataType = options.dataType || 'json';
		var params = _formatParams(options.data);

		// 创建
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		} else {
			// IE6以下
			var xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}

		// 接受
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				var status = xhr.status;
				if (status >= 200 && status < 300) {
					options.success && options.success(xhr.responseText, xhr.responseXML);
				} else {
					options.fail && options.fail(status);
				}
			}
		}

		// 连接和发送
		if (options.type == 'GET') {
			var url = encodeURI(options.url + '?' + params);
			xhr.open('GET', url, true);
			xhr.send(null);
		} else if (options.type == 'POST') {
			xhr.open('POST', encodeURI(options.url), true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(params);
		}

		function _formatParams(data) {
			var arr = [];
			for (var name in data) {
				arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
			}
			arr.push(('v=' + Math.random()).replace('.', ''));
			return arr.join('&');
		}
	}

	function addClass(obj, name) {
		if (obj.classList) {
			return obj.classList.add(name);
		} else {
			var arr = obj.className.split(' ');
			arr.push(name);
			return obj.className = arr.join(' ');
		}
	}

	function removeClass(obj, name) {
		if (obj.classList) {
			return obj.classList.remove(name);
		} else {
			var arr = obj.className.split(' ');
			var index = arr.indexOf(name);
			if (index !== -1) {
				arr.splice(index, 1);
				return obj.className = arr.join(' ');
			}
		}
	}
}) (module.exports);