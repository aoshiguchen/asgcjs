/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v1.0.0
 */
Asgc.UI.win10 = (function(){

	var Class = Asgc.Class;
	var component = {};

	//组件
	Class.define('com.asgc.ui.win10.Component',function(options){

		this.isLoad = false;
		this.isShow = false;
		this.isCreate = false;
		this.isRender = false;
		this.isInit = false;
		this.ele = undefined;

		this.onShow = options.onShow || function(){};
		this.onHide = options.onHide || function(){};
		this.onLoad = options.onLoad || function(){};
		this.onUnLoad = options.onUnLoad || function(){};
		this.onRefresh = options.onRefresh || function(){};

		this.width = options.width;
		this.height = options.height;
		this.minWidth = options.minWidth;
		this.minHeight = options.minHeight;
		this.maxWidth = options.maxWidth;
		this.maxHeight = options.maxHeight;
		this.left = options.left;
		this.top = options.top;
		this.display = options.display || 'block';

		//API
		this.show = function(){
			if(this.isShow) return;
			this.create();
			this.init();
			this.render()
			this.load();
			this.onShow();
			this.isShow = true;
			this.ele.style.setProperty('display',this.display);
		};

		//API
		this.hide = function(){
			if(!this.isShow) return;
			this.isShow = false;
			this.onHide();
			this.ele.style.setProperty('display','none');
		};

		//API
		this.refresh = function(){
			if(!this.isShow) return;
			this.update();
			this.onRefresh();
		};

		//API
		this.load = function(){
			if(this.isLoad) return;
			this.isLoad = true;
			document.body.appendChild(this.ele);
			this.onLoad();
		};

		//API
		this.unLoad = function(){
			if(!this.isLoad) return;
			this.isLoad = false;
			this.isShow = false;
			this.isCreate = false;
			this.isRender = false;
			this.ele.remove();
			component[this.id] = undefined;
			this.onUnLoad();
		};

		//API
		this.create = function(){
			if(this.isCreate) return;
			this.isCreate = true;

			this.id = this.getId();
			component[this.id] = this;
			this.ele = document.createElement('div');//默认用div包裹
			this.ele.setAttribute('id',this.id);
		};

		//需后代实现
		this.init = function(){
			if(this.isInit) return;
			this.isInit = true;
		};

		this.render = function(){
			if(this.isRender) return;
			this.isRender = true;
		};

		this.update = function(){

		};

		this.getId = function(){
			return Asgc.util.getUuid();
		};
	});

	//容器
	Class.define('com.asgc.ui.win10.Container',function(options){
		
		this.component = [];

		//API
		this.appendComponent = function(component){
			this.component.push(component);
		};

		//API
		//Override
		this.refresh = function(){
			if(this.isShow) return;

			for(var comp of this.component){
				comp.refresh();
			}

			this.onRefresh();
		};

		//API
		//Override
		this.init = function(){
			if(this.isInit) return;
			this.isInit = true;

			for(var comp of this.component){
				comp.create();

				this.ele.appendChild(comp.ele);
			}
		};

		//Override
		this.render = function(){
			if(this.isRender) return;
			this.isRender = true;

			for(var comp of this.component){
				comp.render();
			}
		};


	},'com.asgc.ui.win10.Component');

	//窗口
	Class.define('com.asgc.ui.win10.Window',function(options){

		this.icon = options.icon;

		this.statusBar = undefined;
		this.menuBar = undefined;

		//API
		this.setStatusBar = function(statusBar){
			this.statusBar = statusBar;
		};

		//API
		this.setMenuBar = function(menuBar){
			this.menuBar = menuBar;
		};

		//API
		//Override
		this.refresh = function(){
			if(this.isShow) return;

			if(this.statusBar) this.statusBar.refresh();
			if(this.menuBar) this.menuBar.refresh();

			for(var comp of this.component){
				comp.refresh();
			}

			this.onRefresh();
		};

		//API
		//Override
		this.create = function(){
			this.super.create();

			var controlBar = document.createElement('div');
			controlBar.style.setProperty('display','inline-block');

			if(this.icon){

			}

		};

		//API
		//Override
		this.init = function(){
			if(this.isInit) return;
			this.isInit = true;

			if(this.menuBar) this.ele.appendChild(this.menuBar);

			for(var comp of this.component){
				comp.create();
				this.ele.appendChild(comp.ele);
			}

			if(this.statusBar) this.ele.appendChild(this.statusBar);
		};

	},'com.asgc.ui.win10.Container');

	//对话框
	Class.define('com.asgc.ui.win10.Dialog',function(){
		
	},'com.asgc.ui.win10.Container');

	//输入框
	Class.define('com.asgc.ui.win10.Text',function(){
		
	},'com.asgc.ui.win10.Container');

	//下拉框
	Class.define('com.asgc.ui.win10.ComboBox',function(){
		
	},'com.asgc.ui.win10.Container');

	//标签
	Class.define('com.asgc.ui.win10.Label',function(options){
		
		this.text = options.text || '';

		this.setText = function(text){
			this.text = text;
		};

		//Override
		this.render = function(){
			if(this.isRender) return;
			this.isRender = true;

			this.ele.innerHTML = this.text;
			this.ele.classList.add('asgc-label');
		};

		//Override
		this.update = function(){
			this.ele.innerHTML = this.text;
		};

	},'com.asgc.ui.win10.Container');

	//列表
	Class.define('com.asgc.ui.win10.List',function(){
		
	},'com.asgc.ui.win10.Container');

	//菜单栏
	Class.define('com.asgc.ui.win10.MenuBar',function(){
		
	},'com.asgc.ui.win10.Container');

	//选项面板
	Class.define('com.asgc.ui.win10.OptionPane',function(){
		
	},'com.asgc.ui.win10.Container');

	//滚动条
	Class.define('com.asgc.ui.win10.ScrollBar',function(){
		
	},'com.asgc.ui.win10.Container');

	//抽象的按钮
	Class.define('com.asgc.ui.win10.AbstractButton',function(options){
		
		this.display = 'inline-block';


	},'com.asgc.ui.win10.Container');

	//点击后会变化的按钮
	Class.define('com.asgc.ui.win10.ToggleButton',function(){
		
	},'com.asgc.ui.win10.AbstractButton');

	//复选框
	Class.define('com.asgc.ui.win10.CheckBox',function(){
		
	},'com.asgc.ui.win10.ToggleButton');

	//单选框
	Class.define('com.asgc.ui.win10.RadioButton',function(){
		
	},'com.asgc.ui.win10.ToggleButton');

	//普通按钮
	Class.define('com.asgc.ui.win10.Button',function(options){

		this.text = options.text || '';

		this.create = function(){
			this.super.create();
			this.ele.innerHTML = this.text;
		};

		this.render = function(){
			this.super.render();

			var ele = this.ele;

			ele.classList.add('asgc-button'); 
		};
		
	},'com.asgc.ui.win10.AbstractButton');

	//菜单项
	Class.define('com.asgc.ui.win10.MenuItem',function(){
		
	},'com.asgc.ui.win10.AbstractButton');

	//跟菜单
	Class.define('com.asgc.ui.win10.Menu',function(){
		
	},'com.asgc.ui.win10.MenuItem');

	//Msg提示信息
	Class.define('com.asgc.ui.win10.Msg',function(options){

		this.content = options.text || '';

		//Override
		this.create = function(){
			this.super.create();
			var content = document.createElement('div');
			content.innerHTML = this.content
			this.ele.appendChild(content);
		}

		//Override
		this.render = function(){
			var ele = this.ele;

			ele.style.setProperty('max-width',options.maxWidth);
			ele.style.setProperty('max-height',options.maxHeight);
			ele.style.setProperty('left',options.left);
			ele.style.setProperty('top',options.top);

			ele.classList.add('asgc-msg');

			this.super.render();
		};

		//Override
		this.update = function(){
			
		};

	},'com.asgc.ui.win10.Window');

	//Msg提示信息
	Class.define('com.asgc.ui.win10.Alert',function(options){

		this.content = options.content || '';

		//Override
		this.create = function(){
			this.super.create();
			var content = document.createElement('div');
			content.innerHTML = this.content;
			this.ele.appendChild(content);

			var btnOk = Button.new({
				text: '确定'
			});
			this.appendComponent(btnOk);
		};

		//Override
		this.render = function(){
			var ele = this.ele;

			ele.style.setProperty('max-width',this.maxWidth);
			ele.style.setProperty('max-height',this.maxHeight);
			ele.style.setProperty('left',this.left);
			ele.style.setProperty('top',this.top);

			ele.classList.add('asgc-alert');

			this.super.render();
		};

	},'com.asgc.ui.win10.Window');

	var UIConsts = Asgc.Consts.UI;
	var Button = Asgc.Class.get('com.asgc.ui.win10.Button');

	var UI = {
		config: {
			common: {
				width: '400px',
				height: '300px',
				left: '100px',
				top: '100px',
				display: 'block'
			},
			alert: {
				width: '200px',
				height: '150px',
				maxWidth: '210px',
				minMenu: UIConsts.Usability.invisible,
				minable: UIConsts.Usability.invisible,
				maxMenu: UIConsts.Usability.invisible,
				maxble: UIConsts.Usability.invisible,
				closeMenu: UIConsts.Usability.invisible,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default //不配置则无图标，default为默认图标，自定义图标则传入图标路径
			},
			msg: {
				width: '100px',
				height: '30px',
				menuBar: false,
				aliveTime: 2000,
				maxWidth: '150px'
			}
		},
		init: function(){

		},
		getInstance: function(_class,options){
			var _Class = Asgc.Class.get('com.asgc.ui.win10.' + _class);
			var obj = _Class.new(options);
			return obj;
		},
		unLoad: function(id){
			if(component[id]) component[id].unLoad();
		},
		hide: function(id){
			if(component[id]) component[id].hide();
		},
		show: function(id){
			if(component[id]) component[id].show();
		},
		msg: function(options){
			var msg = this.getInstance('Msg',options);
			msg.show();

			setTimeout(function(){
				msg.unLoad();
			},options.aliveTime);
		},
		alert: function(options){
			var alert = this.getInstance('Alert',options);
			alert.show();
		}
	};



	return UI;
})();
