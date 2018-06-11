//--------------------------------------------------------------------
//Asgc JS 0.0.1
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.util = (function(){

	//加载js文件
	function loadJs(url,callback){
		var el = document.createElement('script');
		el.type = 'text/javascript';

		if(typeof(callback) === 'function'){
			if (el.readyState) {
				el.onreadystatechange = function () {
					if (el.readyState == "loaded" || el.readyState == "complete") {
						el.onreadystatechange = null;
						callback(url);
					}
				};
			} else {
				el.onload = function () {
					callback(url);
				};
			}
		}

		el.src = url;
		document.head.appendChild(el);
	};

	//加载css文件
	function loadCss(url,callback){
		var el = document.createElement("link");
		el.rel = 'stylesheet';

		if(typeof(callback) === 'function'){
			if (el.readyState) {
				script.onreadystatechange = function () {
					if (el.readyState == "loaded" || el.readyState == "complete") {
						el.onreadystatechange = null;
						callback(url);
					}
				};
			} else {
				el.onload = function () {
					callback(url);
				};
			}
		}

		el.href = url;
		document.head.appendChild(el);
	};

	//加载文件
	function loadFile(url,callback){

		if(url.startsWith('core://')){
			url = Asgc.path + '/' + url.substr(7);
		}
		url = Asgc.el(url);
		
		var suffix = getFileSuffix(url);
		if('.js' === suffix){
			loadJs(url,callback);
		}else if('.css' === suffix){
			loadCss(url,callback);
		}
	}

	//加载文件列表（按先后顺序）
	/*Asgc.util.loadFiles(['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js',
	'http://apps.bdimg.com/libs/Faker/0.7.2/MinFaker.js',
	'http://apps.bdimg.com/libs/headjs/1.0.3/head.core.js',
	'http://apps.bdimg.com/libs/lightbox/2.6/css/lightbox.css',
	'http://apps.bdimg.com/libs/draggabilly/1.0.2/draggabilly.pkgd.min.js'],()=> console.log('加载完成'));*/
	function loadFiles(urls,callback){
		if(!urls) return;

		var fileList = [];
		function load(index){
			loadFile(urls[index],function(url){
				fileList.push(url);
				if(index >= urls.length - 1){
					if(typeof(callback) === 'function'){
						callback(fileList);
					}
				}else{
					load(index + 1);
				}
			});
		}

		load(0);
	}

	//获取文件后缀,兼容带参数的情况
	function getFileSuffix(url){
		if(!url) return '';

		var t1 = url.lastIndexOf('?');
		if(t1 >= 0) url = url.substr(0,t1);

		var index = url.lastIndexOf('.');

		if(index >= 0){
			return url.substr(index);
		}

		return '';
	}

	function isDom(obj) {
        return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
    }

	//获取文件名（不包含路径，包含后缀）
	function getFileName(url){
		if(!url) return '';

		var t1 = url.lastIndexOf('?');
		if(t1 >= 0) url = url.substr(0,t1);

		var t2 = url.lastIndexOf('/');
		var t3 = url.lastIndexOf('\\');

		var index = Math.max(t2,t3);

		if(index >= 0){
			return url.substr(index + 1);
		}

		return url;
	}

	function fillString(src,len,fill){
		var ret = src + '';

		if(!fill) return ret;

		while(ret.length < len){
			ret = fill + ret;
		}

		return ret;
	}

	function sequence(name,min = 0,max = 9999999999){
		var map = {};
		if(!map[name]) map[name] = min;

		return {
			next: function(){
				var v = map[name];
				map[name] = v + 1;

				if(map[name] > max){
					map[name] = min;
				}

				return v;
			}
		};
	}

	/**
	 * UUID(32)
	 * yyyyMMddhhmmss(14) + rndNum(10) + sequence(8)
	 */
	var _getSequence = sequence('_uuid_sequence',1,99999999);
	function getUuid(){
		return Asgc.util.dateFormat(new Date(),'yyyyMMddhhmmss') + Asgc.util.rndNum(10) + fillString(_getSequence.next(),8,'0');
	}

	//获取文件路径
	function getFilePath(url){
		if(!url) return '';

		var t1 = url.lastIndexOf('?');
		if(t1 >= 0) url = url.substr(0,t1);

		var t2 = url.lastIndexOf('/');
		var t3 = url.lastIndexOf('\\');

		var index = Math.max(t2,t3);

		if(index >= 0){
			return url.substr(0,index);
		}

		return '';
	}

	function rndNum(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

	//获取时间戳
	function timestamp(){
		var date = new Date();
		return date.getTime();
	}

	//暂停
	function sleep(numberMillis) { 
		var now = new Date(); 
		var exitTime = now.getTime() + numberMillis; 
		while (true) { 
			now = new Date(); 
			if (now.getTime() > exitTime) 
				return; 
		} 
	}

	//获取当前js文件的路径（不是引入js文件的html的路径）
	function getAsgcUIScriptUrl(){
		var url = '';

		for(var script of document.scripts){
			if(getFileName(script.src) === Asgc.filename){
				return getFilePath(script.src);
			}

		}

		return url;
	}

	function arrayIndexOf(array,item){
		var ret = -1;

		for(var i in array){
			if(array[i] === item){
				return i;
			}
		}

		return ret;
	}

	//日期格式化
	function dateFormat(date,fmt) { 
		//默认格式
		fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss';

	    var o = { 
	        "M+" : date.getMonth()+1,                 //月份 
	        "d+" : date.getDate(),                    //日 
	        "h+" : date.getHours(),                   //小时 
	        "m+" : date.getMinutes(),                 //分 
	        "s+" : date.getSeconds(),                 //秒 
	        "q+" : Math.floor((date.getMonth()+3)/3), //季度 
	        "S"  : date.getMilliseconds()             //毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	     for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	         }
	     }
	    return fmt; 
	}  

	//克隆（不能克隆函数）
	function clone(val){
        if(Asgc.types.isObject(val) || Asgc.types.isArray(val)){
        	 return JSON.parse(JSON.stringify(val));
        }

        return val;
	}

	//深度克隆
    function deepClone() {
    	_clone = function self(destination, source) {
	        var property;
	        for (property in destination) {
	            if (destination.hasOwnProperty(property)) {
	                if (Asgc.types.isObject(destination[property]) && Asgc.types.isObject(source[property])) {
	                    self(destination[property], source[property]);
	                }
	                if (source.hasOwnProperty(property)) {
	                    continue;
	                } else {
	                    source[property] = destination[property];
	                }
	            }
	        }
	    }

        var arr = arguments,
            result = {},
            i;
        if (!arr.length)
            return {};
        for (i = arr.length - 1; i >= 0; i--) {
            if (Asgc.types.isObject(arr[i])) {
                _clone(arr[i], result);
            }
        }
        arr[0] = result;
        return result;
    }

	//json合并，将后面的json合并到第一个json中
	function merge(){

		function _merge(a,b){
			if(arguments.length === 0) return {};
			if(arguments.length === 1) return arguments[0];

			a = a || {};
			b = b || {};

			for(var key in b){
				a[key] = b[key];
			}

			return a;
		}

		if(arguments.length === 0) return {};
		if(arguments.length === 1) return arguments[0];

		var ret = arguments[0];

		for(var i = 1; i < arguments.length; i++){
			ret = _merge(ret,arguments[i]);
		}

		return ret;
	}

	function innerArea() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

	//json合并为一个新的json
	function mergeNew(){
		function _merge(a,b){
			if(arguments.length === 0) return {};
			if(arguments.length === 1) return arguments[0];

			a = a || {};
			b = b || {};

			for(var key in b){
				if(Asgc.types.isObject(a[key]) && Asgc.types.isObject(b[key])){
					_merge(a[key],b[key]);
				}else{
					a[key] = b[key];
				}
				
			}

			return a;
		}

		if(arguments.length === 0) return {};

		var ret = clone(arguments[0]);

		if(arguments.length === 1) return ret;

		for(var i = 1; i < arguments.length; i++){
			ret = _merge(ret,arguments[i]);
		}

		return ret;
	}

	//--------------------------------------------------------------------
	//侵入式增加便捷功能
	//--------------------------------------------------------------------

	// //数组头部插入元素
	Array.prototype.insertFirst = function (item) {
	  if(Asgc.types.isArray(item)){
	  	for(var i = item.length - 1; i >= 0; i--){
	  		this.splice(0, 0, item[i]);
	  	}
	  }else{
	  	this.splice(0, 0, item);
	  }

	  return this;
	};

	//日期格式化
	Date.prototype.format = function(fmt) { 
		//默认格式
		fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss';

	    var o = { 
	        "M+" : this.getMonth()+1,                 //月份 
	        "d+" : this.getDate(),                    //日 
	        "h+" : this.getHours(),                   //小时 
	        "m+" : this.getMinutes(),                 //分 
	        "s+" : this.getSeconds(),                 //秒 
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	        "S"  : this.getMilliseconds()             //毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	     for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	         }
	     }
	    return fmt; 
	};     

	String.prototype.toFirstUpperCase = function () {
        return this.replace(/^\S/, function (s) {
            return s.toUpperCase();
        });
    };


	function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    };

    function isSupportTouch(){
    	return "ontouchstart" in document ? true : false;
    }

    function isSupportMouse(){
    	return "onmouseup" in document ? true : false;
    }

    function compilebubbleDirection(direction, target, width, height) {
        var bubbleDirectionOptions = ['top', 'bottom', 'left', 'right'];
        var targetPos = getElementPos(target);
        var bubbleSize = 11;
        var pos = {
            top: 0,
            left: 0
        };

        direction = bubbleDirectionOptions.indexOf(direction) > -1 ? direction : 'bottom';

        switch (direction) {
            case "bottom":
                pos.top = targetPos.y + target.offsetHeight + bubbleSize;
                pos.left = targetPos.x;
                break;
            case "top":
                pos.top = targetPos.y - (height + bubbleSize);
                pos.left = targetPos.x;
                break;
            case "right":
                pos.top = targetPos.y;
                pos.left = targetPos.x + target.offsetWidth + bubbleSize;
                break;
            case "left":
                pos.top = targetPos.y;
                pos.left = targetPos.x - (width + bubbleSize);
                break;
        }

        return pos;
    };

    function compilePosition(width, height, position) {
        var postionOptions = ['ct', 'lt', 'rt', 'lb', 'rb', 'lc', 'tc', 'rc', 'bc'];
        var innerArea = Asgc.util.innerArea();
        var pos = {
            top: 0,
            left: 0
        };

        if (Asgc.types.isArray(position) && position.length === 2) {
            pos.top = Asgc.types.isNumber(position[0]) ? position[0] : compilePosition(width, height, position[0]).top;
            pos.left = Asgc.types.isNumber(position[1]) ? position[1] : compilePosition(width, height, position[1]).left;
        } else {
            position = postionOptions.indexOf(position.toString()) > -1 ? position.toString() : 'ct';
            switch (position) {
                case 'ct':
                    pos.top = (innerArea.height - height) / 2;
                    pos.left = (innerArea.width - width) / 2;
                    break;
                case 'lt':
                    pos.top = 0;
                    pos.left = 0;
                    break;
                case 'rt':
                    pos.top = 0;
                    pos.left = innerArea.width - width;
                    break;
                case 'lb':
                    pos.top = innerArea.height - height;
                    pos.left = 0;
                    break;
                case 'rb':
                    pos.top = innerArea.height - height;
                    pos.left = innerArea.width - width;
                    break;
                case 'lc':
                    pos.left = 0;
                    pos.top = (innerArea.height - height) / 2;
                    break;
                case 'tc':
                    pos.top = 0;
                    pos.left = (innerArea.width - width) / 2;
                    break;
                case 'rc':
                    pos.left = innerArea.width - width;
                    pos.top = (innerArea.height - height) / 2;
                    break;
                case 'bc':
                    pos.top = innerArea.height - height;
                    pos.left = (innerArea.width - width) / 2;
                    break;
            }
        }
        return pos;
    };

    function compileWidthOrHeight(type, widthOrHeight, errorValue) {
        var innerArea = Asgc.util.innerArea();
        if (/(^[1-9]\d*$)/.test(widthOrHeight)) {
            return Number(widthOrHeight);
        }
        if (/^(100|[1-9]?\d(\.\d\d?)?)%$/.test(widthOrHeight)) {
            var value = Number(widthOrHeight.toString().replace('%', ''));
            if (type === "width") {
                return innerArea.width * (value / 100);
            }
            if (type === "height") {
                return innerArea.height * (value / 100);
            }
        }
        return errorValue;
    };

    function getNodeByClassName(node, className, parentWindow) {
        parentWindow = parentWindow || window;
        if (node === parentWindow.document.body) {
            return null;
        }
        var cls = node.classList;
        if (cls.contains(className)) {
            return node;
        } else {
            return getNodeByClassName(node.parentNode, className);
        }
    };

    function getMousePosition(e) {
        e = e || window.event;
        if (e.touches) {
            if (isPC()) {
                var button = e.button || e.which;
                if (button == 1 && e.shiftKey == false) {
                    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                    var x = e.pageX || e.clientX + scrollX;
                    var y = e.pageY || e.clientY + scrollY;
                    return {
                        x: x,
                        y: y
                    };
                }
            }
            return {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        } else {
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            return {
                x: x,
                y: y
            };
        }
    };

    function getElementPos(el) {
        var ua = navigator.userAgent.toLowerCase();
        var isOpera = (ua.indexOf('opera') != -1);
        var isIE = (ua.indexOf('msie') != -1 && !isOpera);
        if (el.parentNode === null || el.style.display == 'none') {
            return false;
        }
        var parent = null;
        var pos = [];
        var box;
        if (el.getBoundingClientRect) {
            box = el.getBoundingClientRect();
            var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop
            };
        } else if (document.getBoxObjectFor) {
            box = document.getBoxObjectFor(el);
            var borderLeft = (el.style.borderLeftWidth) ? parseInt(el.style.borderLeftWidth) : 0;
            var borderTop = (el.style.borderTopWidth) ? parseInt(el.style.borderTopWidth) : 0;
            pos = [box.x - borderLeft, box.y - borderTop];
        } else {
            pos = [el.offsetLeft, el.offsetTop];
            parent = el.offsetParent;
            if (parent != el) {
                while (parent) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            if (ua.indexOf('opera') != -1 || (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
            }
        }
        if (el.parentNode) {
            parent = el.parentNode;
        } else {
            parent = null;
        }
        while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') {
            pos[0] -= parent.scrollLeft;
            pos[1] -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            } else {
                parent = null;
            }
        }
        return {
            x: pos[0],
            y: pos[1]
        };
    };

	return {
		loadJs: loadJs,
		loadCss: loadCss,
		loadFile: loadFile,
		loadFiles: loadFiles,
		timestamp: timestamp,
		sleep: sleep,
		dateFormat: dateFormat,
		getFileSuffix: getFileSuffix,
		getFileName: getFileName,
		getFilePath: getFilePath,
		getAsgcUIScriptUrl: getAsgcUIScriptUrl,
		clone: clone,
		merge: merge,
		mergeNew: mergeNew,
		rndNum: rndNum,
		innerArea: innerArea,
		isDom: isDom,
		deepClone: deepClone,
		isPC: isPC,
		isSupportTouch: isSupportTouch,
		isSupportMouse: isSupportMouse,
		compilebubbleDirection: compilebubbleDirection,
		compilePosition: compilePosition,
		compileWidthOrHeight: compileWidthOrHeight,
		getNodeByClassName: getNodeByClassName,
		getMousePosition: getMousePosition,
		getElementPos: getElementPos,
		fillString: fillString,
		sequence: sequence,
		getUuid: getUuid,
		arrayIndexOf: arrayIndexOf
	};
})();