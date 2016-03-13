// 事件加载
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

// 由类名获取元素节点
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

// 事件处理封装
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
	}
}