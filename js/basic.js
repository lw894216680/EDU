/* 事件加载 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
    	window.onload = func;
    } else {
    	window.onload = function() {
        	oldonload();
        	func();
    	}
  	}
}
/* /事件加载 */



/* 类名相关 */
// 由类名获取节点
function getByClass(clsName,elm){
	var elm = elm ? elm : document;
	if(elm.getElementsByClassName){
		return elm.getElementsByClassName(clsName);
	} else {
		var list = elm.getElementsByTagName('*'),
			result = [];
		for(var i=0,l=list.length;i<l;i++){
			if((' '+ list[i].className + ' ').indexOf(' '+ clsName +' ')!=-1){
				result.push(list[i]);
			}
		}
		return result;
	}
}

// 类名存在判断
function hasClass( elm,clsName ){    
    return !!elm.className.match( new RegExp( "(\\s|^)" + clsName + "(\\s|$)") );   
}


// 添加类名
function addClass(elm, newClsName) {
    if(elm.className == '') {
        elm.className = newClsName;    
    } 
    if(!hasClass(elm,newClsName)) {
        elm.className += ' ' + newClsName;            
    }
}

// 移除类名
function removeClass(elm,oldClsName) {
    if(hasClass(elm,oldClsName)) {
	    var reg = new RegExp('(\\s|^)' + oldClsName + '(\\s|$)');
	    elm.className = elm.className.replace(reg, '');
    }
}

/* /类名相关 */



/* 事件处理封装 */
var eventUtil = {
	// 添加事件
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent) {
			element.attachEvent('on'+type,handler);
		}else {
			element['on'+type] = handler;
		}
	},
	// 移除事件
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent) {
			element.detachEvent('on'+type,handler);
		}else {
			element['on'+type] = null;
		}
	},
	// 取消事件默认动作
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		}else {
			event.returnValue = false;
		}
	},
	// 取消冒泡
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
	},
	// 获取节点
	getElement: function(event) {
		return event.target || event.srcElement;
	}
}

/* /事件处理封装 */




/* Cookie */ 
function getCookie() {
	var cookie = {};
	var all = document.cookie;
	if (all === '') return cookie;
	var list = all.split('; ');
	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i];
		var p = item.indexOf('=');
		var name = item.substring(0, p);
		name = decodeURIComponent(name);
		var value = item.substring(p + 1);		
		value = decodeURIComponent(value);
		cookie[name] = value;
	}
	return cookie;
}

function setCookie(name, value, path, domain, expires, secure) {
	var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
	if (expires) {
		cookie += '; expires=' + expires.toGMTString();
	}
	if (path) {
		cookie += '; path=' + path;
	}
	if (domain) { 
		cookie += '; domain=' + domain;
	}
	if (secure) {
		cookie += '; secure=' + secure;
	}
	document.cookie = cookie;
}

function removeCookie(name) {
	var expires = new Date();
	expires.setTime(expires.getTime() - 1000);
	var value = 1;
	var path = '/';
	var domain = '';
	setCookie(name, value, path, domain, expires);
	// document.cookie = 'name=' + name + '; path=' + path +';domain=' + domain + '; max-age=' + maxAge;
}
/* /Cookie */ 



/* Ajax */

// 请求GET方法
function get(url, options, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				var data = JSON.parse(xhr.responseText);
					callback(data, options);			
			} else {
				console.error('Request was unsuccessful: ' + xhr.status);
			}
		}
	}
	xhr.open('get', url+'?'+serialize(options), true);
	xhr.send(null);
}


// 请求POST方法
function post(url, options, callback) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveObject('Microsoft.XMLHTTP');
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if ((xhr.status >= 200 && xhr.status <300) || xhr.status == 304) {
				callback(xhr.responseText);
			} else {
				console.error('Request was unsuccessful: ' + xhr.status);
			}
		}
	}

	xhr.open('post', url, true);
	xhr.send(serialize(options));
}

function serialize(data) {
	if (!data) return '';
	var pairs = [];
	for (var name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === 'function') continue;
		var value = data[name].toString(),
			name = encodeURIComponent(name),
			value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}

/* /Ajax */

/* 删除节点 */
function remove(elm) {
	elm.parentNode.removeChild(elm);
}


/* 判断IE低版本(IE10以下) */
function isIE(ver) {
	var b = document.createElement('b');
	b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
	return b.getElementsByTagName('i').length === 1;
}
