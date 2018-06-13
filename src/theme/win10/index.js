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
		this.isBindEvent = false;
		this.ele = undefined;

		this.onShow = options.onShow || function(){};
		this.onHide = options.onHide || function(){};
		this.onLoad = options.onLoad || function(){};
		this.onUnLoad = options.onUnLoad || function(){};
		this.onRefresh = options.onRefresh || function(){};
		this.onClose = options.callback || function(){};

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
			this.isShow = true;

			if(!this.isLoad){
				this.isLoad = true;
				this.load();
			}

			this.onShow();
			
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
			this.id = this.getId();
			component[this.id] = this;
			this.ele = document.createElement('div');//默认用div包裹
			this.ele.setAttribute('id',this.id);
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
			for(var comp of this.component){
				comp.refresh();
			}

			this.onRefresh();
		};

		//API
		//Override
		this.init = function(){
			for(var comp of this.component){
				comp.create();

				this.ele.appendChild(comp.ele);
			}
		};

		//Override
		this.render = function(){
			for(var comp of this.component){
				comp.render();
			}
		};


	},'com.asgc.ui.win10.Component');

	//窗口
	Class.define('com.asgc.ui.win10.Window',function(options){

		this.iconConf = options.icon;
		this.titleText = options.title || '';
		this.minMenuConf = options.minMenu;
		this.maxMenuConf = options.maxMenu;
		this.closeMenuConf = options.closeMenu;
		this.controlBarConf = options.controlBar;
		this.statusBar = undefined;
		this.menuBar = undefined;
		this.position = options.position;

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

			if(!this.controlBarConf) return;

			var ele = this.ele;
			var controlBar = document.createElement('div');
			var leftBar = document.createElement('div');
			var rightBar = document.createElement('div');
			var title = document.createElement('div');

			if(this.iconConf){
				var icon = document.createElement('div');
				//默认图标
				if(this.iconConf === Asgc.Consts.default){
					icon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-default-icon"></use></svg>';
				}else{
					//TODO 自定义图标
					icon.innerHTML = this.iconConf;
				}
				leftBar.appendChild(icon);
				this.icon = icon;
			}

			if(this.minMenuConf){
				var minMenu = document.createElement('div');
				if(this.minMenuConf === UIConsts.Usability.available){
					minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';
				}
				rightBar.appendChild(minMenu);
				this.minMenu = minMenu;
			}

			if(this.maxMenuConf){
				var maxMenu = document.createElement('div');
				if(this.maxMenuConf === UIConsts.Usability.available){
					maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';
				}
				rightBar.appendChild(maxMenu);
				this.maxMenu = maxMenu;
			}

			if(this.closeMenuConf){
				var closeMenu = document.createElement('div');
				if(this.closeMenuConf === UIConsts.Usability.available){
					closeMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-destroy"></use></svg>';
				}
				rightBar.appendChild(closeMenu);
				this.closeMenu = closeMenu;
			}

			title.innerHTML = this.titleText;

			leftBar.appendChild(title);
			controlBar.appendChild(leftBar);
			controlBar.appendChild(rightBar);
			ele.appendChild(controlBar);

			this.controlBar = controlBar;
			this.leftBar = leftBar;
			this.title = title;
			this.rightBar = rightBar;
		};

		//API
		//Override
		this.init = function(){
			if(this.menuBar) this.ele.appendChild(this.menuBar);

			for(var comp of this.component){
				comp.create();
				this.ele.appendChild(comp.ele);
			}

			if(this.statusBar) this.ele.appendChild(this.statusBar);
		};

		//API
		//Override
		this.render = function(){
			var ele = this.ele;
			var controlBar = this.controlBar;
			var leftBar = this.leftBar;
			var rightBar = this.rightBar;
			var icon = this.icon;
			var title = this.title;
			var minMenu = this.minMenu;
			var maxMenu = this.maxMenu;
			var closeMenu = this.closeMenu;

            ele.style.setProperty('width',this.width);
            ele.style.setProperty('height',this.height);
            ele.style.setProperty('min-width',this.minWidth);
            ele.style.setProperty('min-height',this.minHeight);
            ele.style.setProperty('top',this.top);
            ele.style.setProperty('left',this.left);

            if(controlBar){
            	controlBar.style.setProperty('height','20px');
            }
            
            if(leftBar){
            	leftBar.style.setProperty('display','inline-block');
            }
			
			if(rightBar){
				rightBar.style.setProperty('display','inline-block');
				rightBar.style.setProperty('float','right');
			}

			if(icon){
				icon.style.setProperty('display','inline-block');
				icon.style.setProperty('margin','0px 5px 0px 5px');
			}

			if(title){
				title.style.setProperty('display','inline-block');
				title.style.setProperty('user-select','none');
			}
			
			if(minMenu){
				minMenu.classList.add('asgc-menu-icon');
				minMenu.style.setProperty('margin','0px 5px 0px 0px');
				minMenu.style.setProperty('display','inline-block');
			}

			if(maxMenu){
				maxMenu.classList.add('asgc-menu-icon');
				maxMenu.style.setProperty('margin','0px 5px 0px 0px');
				maxMenu.style.setProperty('display','inline-block');
			}

			if(closeMenu){
				closeMenu.classList.add('asgc-menu-icon');
				closeMenu.style.setProperty('border-radius','0px 5px 0px 0px');
				closeMenu.style.setProperty('margin','0px');
				closeMenu.style.setProperty('padding','5px'); 
				closeMenu.style.setProperty('display','inline-block');
			}
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

		this.create = function(){
			this.super.create();


		};

		//Override
		this.render = function(){
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

		this.contentText = options.text || '';

		//Override
		this.create = function(){
			this.super.create();
			var content = document.createElement('div');
			content.innerHTML = this.contentText
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
		};

		//Override
		this.update = function(){
			
		};
 
	},'com.asgc.ui.win10.Window');

	//Msg提示信息
	Class.define('com.asgc.ui.win10.Alert',function(options){

		this.contentText = options.content || '';
		//Override
		this.create = function(){
			this.super.create();
			
			var ele = this.ele;
			var content = document.createElement('div');
			var bottom = document.createElement('div');
			var btnOk = document.createElement('div');

			content.innerHTML = this.contentText;
			btnOk.innerHTML = '确定';

			ele.appendChild(content);
			bottom.appendChild(btnOk);
			ele.appendChild(bottom);

			this.content = content;
			this.bottom = bottom;
			this.btnOk = btnOk;
		};

		//Override
		this.render = function(){
			this.super.render();

			var ele = this.ele;
			var content = this.content;
			var bottom = this.bottom;
			var btnOk = this.btnOk;

			ele.classList.add('asgc-alert');

			content.style.setProperty('margin','10px auto 10px 10px');
			content.style.setProperty('font-size','14px');
			content.style.setProperty('color','#039');
			content.style.setProperty('height','47%');
			content.style.setProperty('user-select','none');

			bottom.style.setProperty('border-radius','0px 0px 5px 5px');
			bottom.style.setProperty('height','26%');
			bottom.style.setProperty('background-color','#f0f0f0');

			btnOk.classList.add('asgc-button');
			btnOk.style.setProperty('float','right');
			btnOk.style.setProperty('margin','5px 10px 0px 0px');
		};

		this.bindEvent = function(){
			var ctx = this;

			this.btnOk.onclick = function(){
				ctx.close();
			};

			this.closeMenu.onclick = function(){
				ctx.close();
			};

		};

		this.close = function(){
			this.unLoad();
			this.onClose();
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
				controlBar: true,
				minMenu: UIConsts.Usability.invisible,
				minable: UIConsts.Usability.invisible,
				maxMenu: UIConsts.Usability.invisible,
				maxble: UIConsts.Usability.invisible,
				closeMenu: UIConsts.Usability.available,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
				position: 'ct',
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
