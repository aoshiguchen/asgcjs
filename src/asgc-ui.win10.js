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
		this.ele = undefined;

		this.onShow = options.onShow || function(){};
		this.onHide = options.onHide || function(){};
		this.onLoad = options.onLoad || function(){};
		this.onUnLoad = options.onUnLoad || function(){};
		this.onRefresh = options.onRefresh || function(){};

		this.width = options.width;
		this.height = options.height;
		this.left = options.left;
		this.top = options.top;

		//API
		this.show = function(){
			if(this.isShow) return;
			this.load();
			this.isShow = true;
			this.render()
			this.onShow();
			this.ele.style.setProperty('display','block');
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
			this.create();
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
			this.ele = document.createElement('div');
			this.ele.setAttribute('id',this.id);
		};

		//需后代实现
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
		this.create = function(){
			if(this.isCreate) return;
			this.isCreate = true;

			this.id = this.getId();
			component[this.id] = this;
			this.ele = document.createElement('div');
			this.ele.setAttribute('id',this.id);
		
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
		
		this.controlBar = undefined;
		this.statusBar = undefined;
		this.menuBar = undefined;

		//API
		this.setControlBar = function(controlBar){
			this.controlBar = controlBar;
		};

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

			if(this.controlBar) this.controlBar.refresh();
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
			if(this.isCreate) return;
			this.isCreate = true;

			this.id = this.getId();
			component[this.id] = this;
			this.ele = document.createElement('div');
			this.ele.setAttribute('id',this.id);
		
			if(this.controlBar) this.ele.appendChild(this.controlBar);
			if(this.menuBar) this.ele.appendChild(this.menuBar);

			for(var comp of this.component){
				comp.create();
				this.ele.appendChild(comp.ele);
			}

			if(this.statusBar) this.ele.appendChild(this.statusBar);
		};

		//Override
		this.getId = function(){
			return 'asgc-window-' + Asgc.util.getUuid();
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

		//Override
		this.getId = function(){
			return 'asgc-label-' + Asgc.util.getUuid();
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
	Class.define('com.asgc.ui.win10.AbstractButton',function(){
		
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
	Class.define('com.asgc.ui.win10.Button',function(){
		
	},'com.asgc.ui.win10.AbstractButton');

	//菜单项
	Class.define('com.asgc.ui.win10.MenuItem',function(){
		
	},'com.asgc.ui.win10.AbstractButton');

	//跟菜单
	Class.define('com.asgc.ui.win10.Menu',function(){
		
	},'com.asgc.ui.win10.MenuItem');

	//Msg提示信息
	Class.define('com.asgc.ui.win10.Msg',function(options){
		
		var Label = Asgc.Class.get('com.asgc.ui.win10.Label');
		var label = Label.new({text: options.text || ''});
		this.appendComponent(label);

		//Override
		this.render = function(){
			var ele = this.ele;

			ele.style.setProperty('width',options.width);
			ele.style.setProperty('height',options.height);
			ele.style.setProperty('left',options.left);
			ele.style.setProperty('top',options.top);

			ele.classList.add('asgc-msg');

			if(this.hasSuper) this.super.render();
		};

		//Override
		this.update = function(){
			
		};

		//Override
		this.getId = function(){
			return 'asgc-msg-' + Asgc.util.getUuid();
		};

	},'com.asgc.ui.win10.Window');

	var UI = {
		config: {
			common: {
				width: '400px',
				height: '300px',
				left: '100px',
				top: '100px',
				controlBar: true,
				menuBar: false,
				statusBar: false,
			},
			alert: {
				width: '200px',
				height: '150px',
			},
			msg: {
				width: '100px',
				height: '30px',
				controlBar: false,
				menuBar: false,
				aliveTime: 2000
			}
		},
		init: function(){

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
			var Msg = Asgc.Class.get('com.asgc.ui.win10.Msg');
			var msg = Msg.new(options);
			msg.show();

			setTimeout(function(){
				msg.unLoad();
			},options.aliveTime)
		},
		alert: function(options){

		}
	};



	return UI;
})();
