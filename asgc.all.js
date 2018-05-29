//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
var Asgc = {};
window.Asgc = Asgc;
//--------------------------------------------------------------------
//基本信息
//--------------------------------------------------------------------
Asgc.title = 'Asgc JS';
Asgc.version = '1.0.0';
Asgc.filename = 'asgc.all.js';
Asgc.releaseDate = '2018-05-24';
Asgc.logo = '                                        \n' +
'              _____     _____     _____  \n' +
'    /\\       / ____|   / ____|   / ____|\n' + 
'   /  \\     | (___    | |  __   | |     \n' +
'  / /\\ \\     \\___ \\   | | |_ |  | |     \n' +
' / ____ \\    ____) |  | |__| |  | |____ \n' + 
'/_/    \\_\\  |_____/    \\_____|   \\_____|\n' ;

//--------------------------------------------------------------------
//作者信息
//--------------------------------------------------------------------
Asgc.author = {
	nickname: '傲世孤尘',
	blog: 'http://blog.aoshiguchen.com',
	qq: '1052045476',
	email: '1052045476@qq.com',
	group: '527393872'
};

Asgc.showBaseInfo = function(){
	console.log('%c' + Asgc.logo,'color:green');
	console.log('%c ' + Asgc.title + ' ' + Asgc.version,'color:green');
	console.log('%c 作者：' + Asgc.author.nickname,'color:green');
	console.log('%c 博客：' + Asgc.author.blog,'color:green');
	console.log('%c QQ：' + Asgc.author.qq,'color:green');
	console.log('%c email：' + Asgc.author.email,'color:green');
	console.log('%c QQ群：' + Asgc.author.group,'color:green');
};

Asgc.showBaseInfo();

//--------------------------------------------------------------------
//正则表达式
//--------------------------------------------------------------------
Asgc.RegExp = (function(){
	var Consts = {
		VAR_NAME: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
		VAL1: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(\[([0-9]+)\])?$/,
		VAL2: /^([a-zA-Z_$][a-zA-Z0-9_$]*)?$/
	};

	function analysisVal1(str){
		if(!str) return null;

		var tmp = Consts.VAL1.exec(str);
		if(!tmp) return null;

		var ret = {};

		ret.name = tmp[1];
		ret.index = tmp[3];

		return ret;
	}

	return {
		Consts: Consts,
		analysisVal1: analysisVal1
	};
})();

//--------------------------------------------------------------------
//类型判断
//--------------------------------------------------------------------
Asgc.types = (function(){ 
	var types = {};

	types.getType = function(val){
		var typeStrig = toString.call(val);

		return typeStrig.slice(8,typeStrig.length - 1);
	}

	types.isType = function(val,type){

		return types.getType(val) === type;
	}

	types.isString = function(val){

		return types.isType(val,'String');
	}

	types.isNull = function(val){

		return types.isType(val,'Null');
	}

	types.isNumber = function(val){

		return types.isType(val,'Number');
	}

	types.isBoolean = function(val){

		return types.isType(val,'Boolean');
	}

	types.isUndefined = function (val){

		return types.isType(val,'Undefined');
	}

	types.isArray = function(val){

		return types.isType(val,'Array');
	}

	types.isObject = function(val){

		return types.isType(val,'Object');
	}

	types.isRegExp = function(val){

		return types.isType(val,'RegExp');
	}

	types.isFunction = function(val){

		return types.isType(val,'Function');
	}

	types.isWindow = function(val){

		return types.isType(val,'Window');
	}

	types.isArguments = function(val){

		return '[object Arguments]' == toString.call(val);
	}

	types.toString = function(val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	types.toNumber = function(val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	return types;
})();

//--------------------------------------------------------------------
//缓存
//--------------------------------------------------------------------
Asgc.cache = (function(){
	var storage = window.localStorage;

	return {
	    set: function(k,v){
	      storage.setItem(k,v);
	      return this;
	    },

	    get: function(k){
	      return storage.getItem(k) || '';
	    },

	    clear: function(){
	    	storage.clear();

	    	return this;
	    },

	    switchLocalStorage: function(){
	    	storage = window.localStorage;
	    	return this;
	    },

	    switchSessionStorage: function(){
	    	storage = window.sessionStorage;
	    	return this;
	    },

	    setJson: function(k,v){
	      storage.setItem(k,JSON.stringify(v));
	      return this;
	    },

	    getJson: function(k){

	      var val = storage.getItem(k);

	      if(!val) return {};
	      else return JSON.parse(val);
	    },

	    setJsonProperty: function(k,property,v){
	    	var data = this.getJson(k);
	    	data[property] = v;
	    	this.setJson(k,data);
	    	return this;
	    },

	    getJsonProperty: function(k,property){
	    	var data = this.getJson(k);

	    	return data[property];
	    },

	    getString: function(k){
	    	return this.get(k);
	    },

	    getInt: function(k){
	    	return parseInt(this.get(k));
	    },

	    getFloat: function(k){
	    	return parseFloat(this.get(k));
	    },

	    getNumber: function(k){
	    	return new Number(this.get(k));
	    },

	    getBoolean: function(k){
	    	return this.get(k) === 'true';
	    },

	    getDate: function(k){
	    	return new Date(this.get(k));
	    },

	    //超级设值
	    //如：s('a.b.c',10); => a:{b:{c:10}}
	    //暂不支持数组下标
	    s: function(k,v){
	    	if(!k) return this;

	    	var ks = k.split('.');

	    	if(ks.length === 1) return this.set(k,v);

	    	var data = this.getJson(ks[0]);

	    	function solve(data,ks,n){
	    		if(n === ks.length - 1){
	    			data[ks[n]] = v;
	    			return;
	    		}

    			if(!data[ks[n]]) data[ks[n]] = {};
    			if(!Asgc.types.isObject(data[ks[n]])){
	    			console.error('错误的引用! k:' + k);
	    			return;
	    		}
    			solve(data[ks[n]],ks,n+1);
					    		
	    	}

	    	solve(data,ks,1);

	    	this.setJson(ks[0],data);

	    	return this;
	    },
	    //超级取值
	    //如：a:{b:{c:10}} g('a.b.c') => 10
	    //暂不支持数组下标
	    g: function(k){
	    	if(!k) return '';
	    	var ks = k.split('.');

	    	if(ks.length === 1) return this.get(k);

	    	var data = this.getJson(ks[0]);

	    	function solve(data,ks,n){
	    		if(n === ks.length - 1){
	    			return data[ks[n]];
	    		}

	    		if(!data[ks[n]]) return '';
	    		if(!Asgc.types.isObject(data[ks[n]])){
	    			console.error('错误的引用! k:' + k);
	    			return '';
	    		}

	    		return solve(data[ks[n]],ks,n+1);

	    	}

	    	return JSON.stringify(solve(data,ks,1));
	    },

	    sJson: function(k,v){
	      this.s(k,JSON.stringify(v));

	      return this;
	    },

	    gJson: function(k){

	      var val = this.g(k);

	      if(!val) return {};
	      else return JSON.parse(val);
	    },

	    gString: function(k){
	    	return this.g(k);
	    },

	    gInt: function(k){
	    	return parseInt(this.g(k));
	    },

	    gFloat: function(k){
	    	return parseFloat(this.g(k));
	    },

	    gNumber: function(k){
	    	return new Number(this.g(k));
	    },

	    gBoolean: function(k){
	    	return this.g(k) === 'true';
	    },

	    gDate: function(k){
	    	return new Date(this.g(k));
	    },

   };
})();

//--------------------------------------------------------------------
//常用工具
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
						callback();
					}
				};
			} else {
				el.onload = function () {
					callback();
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
						callback();
					}
				};
			} else {
				el.onload = function () {
					callback();
				};
			}
		}

		el.href = url;
		document.head.appendChild(el);
	};

	//加载文件
	function loadFile(url,callback){
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

		function load(index){
			loadFile(urls[index],function(){
				if(index >= urls.length - 1){
					if(typeof(callback) === 'function'){
						callback();
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
	function getAsgcScriptUrl(){
		var url = '';

		for(var script of document.scripts){
			if(getFileName(script.src) === Asgc.filename){
				return getFilePath(script.src);
			}

		}

		return url;
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

    //是否支持触摸
    function isSupportTouch(){
    	return 'ontouchstart' in document ? true : false;
    }

    //是否支持鼠标
    function isSupportMouse(){
    	return 'onmouseup' in document ? true : false;
    }

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
		getAsgcScriptUrl: getAsgcScriptUrl,
		clone: clone,
		merge: merge,
		mergeNew: mergeNew,
		rndNum: rndNum,
		innerArea: innerArea,
		deepClone: deepClone,
		isPC: isPC,
		isSupportTouch: isSupportTouch,
		isSupportMouse: isSupportMouse
	};
})();

//--------------------------------------------------------------------
//日志
//--------------------------------------------------------------------
Asgc.Logger = function(name){

	var LEVEL = {
		all: {
			v: 0
		},
		debug: {
			v: 1,
			color: 'gray'
		},
		info: {
			v: 2,
			color: 'green'
		},
		warn: {
			v: 3,
			color: 'blue'
		},
		error: {
			v: 4,
			color: 'red'
		},
		off: {
			v: 5
		}
	};

	function out(data){
		var level = data[0];

		if(LEVEL[level].v < LEVEL[this.level].v) return;

		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		var milliSecond =  date.getMilliseconds();

		var info = '%c [Asgc Log][' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + milliSecond + '] [' + name + ' level:' + level + '] ';
		for(var i = 1; i < data.length; i++){
			info += data[i] + ' ';
		}	

		console.log(info,'color:' + LEVEL[level].color);
	}

	return {
		/**
		 * all
		 * debug
		 * info
		 * warn
		 * error
		 * off
		 * */
		 
		level: 'all',
		setLevel: function(level){
			this.level = level;
		},
		setLevelAll: function(){
			this.level = 'all';
		},
		setLevelDebug: function(){
			this.level = 'debug';
		},
		setLevelInfo: function(){
			this.level = 'info';
		},
		setLevelWarn: function(){
			this.level = 'warn';
		},
		setLevelError: function(){
			this.level = 'error';
		},
		setLevelOff: function(){
			this.level = 'off';
		},
		debug: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('debug');
			out.call(this,params);
		},
		info: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('info');
			out.call(this,params);
		},
		warn: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('warn');
			out.call(this,params);
		},
		error: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('error');
			out.call(this,params);
		}
	};
};