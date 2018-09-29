(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//组件
	global.Class.define('com.asgc.ui.win10.Component',function(options){

		this.config = Asgc.util.deepClone({},options);

		this.isLoad = false;
		this.isShow = false;
		this.isCreate = false;
		this.isRender = false;
		this.isInit = false;
		this.isBindEvent = false;
		this.ele = undefined;

		this.onShow = options.onShow || function(){};
		this.onHide = options.onHide || function(){};
		this.onLoad = options.onLoad || function(){};
		this.onUnLoad = options.onUnLoad || function(){};
		this.onRefresh = options.onRefresh || function(){};
		this.onClose = new Asgc.Callback(options.callback || options.onClose || function(){});

		this.width = options.width;
		this.height = options.height;
		this.minWidth = options.minWidth;
		this.minHeight = options.minHeight;
		this.maxWidth = options.maxWidth;
		this.maxHeight = options.maxHeight;
		this.left = options.left;
		this.top = options.top;
		this.display = options.display || 'block';
		this.type = options.type || '';

		var self = options.self;

		//API
		this.show = function(){
			if(this.isShow) return;
			this.isShow = true;

			if(!this.isLoad){
				this.isLoad = true;
				this.load();
			}

			this.onShow();
			this.showBefore();
			this.ele.style.setProperty('display',this.display);
			this.showAfter();
		};

		//API
		this.hide = function(){
			if(!this.isShow) return;
			this.isShow = false;
			this.onHide();
			this.hideBefore();
			this.ele.style.setProperty('display','none');
			this.hideAfter();
		};

		//API
		this.refresh = function(){
			if(!this.isShow) return;
			this.update();
			this.onRefresh();
		};

		//API
		this.load = function(){
			if(!this.isCreate){
				this.isCreate = true;
				this.create();
			}
			
			if(!this.isInit){
				this.isInit = true;
				this.init();
			}

			if(!this.isRender){
				this.isRender = true;
				this.render();
			}

			if(!this.isBindEvent){
				this.isBindEvent = true;
				this.bindEvent();
			}

			document.body.appendChild(this.ele);
			this.onLoad();
		};

		//API
		this.unLoad = function(){
			if(!this.isLoad) return;
			this.unLoadBefore();
			this.isLoad = false;
			this.isShow = false;
			this.isCreate = false;
			this.isRender = false;
			this.ele.remove();
			component[this.id] = undefined;
			this.onUnLoad();
			this.unLoadAfter();
		};

		//API
		this.create = function(){
			this.id = this.getId();
			component[this.id] = self; 
			this.ele = document.createElement('div');//默认用div包裹
			this.ele.setAttribute('id',this.id);
		};

		this.close = function(res){
			this.unLoad();
			this.onClose.invoked(res);
			logger.info(logInfo + 'component id:' + this.id,' close finished.');
		};

		this.setStyle = function(names){
			if(!names || !this.config.dom) return;

			if(Asgc.types.isString(names)){
				names = [names];
			}

			for(var name of names){
				var ele = this[name];
				if(!ele || !this.config.dom[name] || !this.config.dom[name].style) continue;

				for(var key in this.config.dom[name].style){
					ele.style.setProperty(key,this.config.dom[name].style[key]);
				}
			}

		};

		//需后代实现
		this.init = function(){

		};

		this.render = function(){

		};

		this.update = function(){

		};

		this.bindEvent = function(){

		};

		this.showBefore = function(){

		};

		this.showAfter = function(){

		};

		this.hideBefore = function(){

		};

		this.hideAfter = function(){

		};

		this.unLoadBefore = function(){

		};

		this.unLoadAfter = function(){

		};

		this.getId = function(){
			return Asgc.util.getUuid();
		};
	});
})();