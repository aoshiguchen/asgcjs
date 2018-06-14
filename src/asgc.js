//--------------------------------------------------------------------
//Asgc JS 0.0.1
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
Asgc.version = '0.0.1';
Asgc.filename = 'asgc.js';
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

//--------------------------------------------------------------------
//外部依赖(前置js、css文件)
//--------------------------------------------------------------------
Asgc.dependentsLib = [
	'core://asgc-consts.js',
	'core://asgc-svg.js',
	'core://asgc-html.js',
	'core://asgc-types.js',
	'core://asgc-class.js',
	'core://asgc-acl.js',
	'core://asgc-regexp.js',
	'core://asgc-util.js',
	'core://asgc-cache.js',
	'core://asgc-logger.js',
	'core://asgc-ui.js'
	];

//--------------------------------------------------------------------
//base
//--------------------------------------------------------------------
Asgc.base = (function(){
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

	function el(str){

		function parse(str){
			var ret = [];

			var regExp = /(\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*)*)\s*\})/ig;
			var r = null;

			while(r = regExp.exec(str)){
				ret.push({
					result: r[2],
					target: r[1]
				});
			}

			return ret;
		}

		function replaceAll(src,oldStr,newStr){
			var index;
			while((index = src.indexOf(oldStr)) >= 0){
				src = src.replace(oldStr,newStr);
			}
			return src;
		}

		function getContextValue(str){
			var arr = str.split('.');
			var ret = undefined;

			var tmp1,tmp2;
			tmp1 = window;
			for(var i in arr){
				if(i == arr.length - 1){
					return tmp1[arr[i]];
				}

				if(toString.call(tmp1) != '[object Object]' && toString.call(tmp1) != '[object Window]'){
					return undefined;
				}

				tmp2 = tmp1[arr[i]];
				tmp1 = tmp2;
			}

			return ret;
		}
		
		var parseResult = parse(str);
		var ret = str;

		for(var p of parseResult){
			var v = getContextValue(p.result);
			if(v != undefined){
				ret = replaceAll(ret,p.target,v);
			}
		}

		if(ret.startsWith('core://')){
			ret = Asgc.path + '/' + ret.substr(7);
		}

		return ret;
	}

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

	return {
		getAsgcUIScriptUrl: getAsgcUIScriptUrl,
		loadFiles: loadFiles,
		el: el

	};
})();


Asgc.isInit = false;
Asgc.el = Asgc.base.el;
Asgc.theme = {
	default: {
		isLoad: false
	},
	win10: {
		isLoad: false
	}
};
Asgc.config = {
	theme: ''
};

Asgc.init = function(dependents = []){
	if(Asgc.isInit) return;
	Asgc.isInit = true;

	Asgc.showBaseInfo();

	Asgc.path = Asgc.base.getAsgcUIScriptUrl();

	//初始化主题的路径
	for(var theme in Asgc.theme){
		Asgc.theme[theme].path = Asgc.path + '/theme/' + theme + '/';
	}
	
	var deps = Asgc.dependentsLib.concat(dependents);

	Asgc.base.loadFiles(deps,function(fileList){
		window.logger = Asgc.Logger('Asgc JS');
		for(var file of fileList){
			logger.info('load ' + file + '  finished.');
		}

		Asgc.UI.setTheme('win10',function(){
			logger.info('Asgc JS inited.')
		});

	});

};









