/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
Asgc.UI.win10.component = (function(){

	var Class = Asgc.Class;
	var component = {};
	var UIConsts = Asgc.Consts.UI;
	var themeContext = Asgc.UI.win10; 
	var logInfo = 'theme win10 ';

	var hasShade = false;
	var currentMaxZIndex = 0;
	var windows = [];

	function windowsSort(){
		windows.sort(function(a,b){
			return a.zIndex - b.zIndex;
		});
	}

	function zIndexGC(){
		if(!hasShade && currentMaxZIndex > UIConsts.maxZIndex && currentMaxZIndex > windows.length){
			logger.info(logInfo + 'ZIndex GC','currentMaxZIndex:' + currentMaxZIndex,'currentWindowCount:' + windows.length);
			// windowsSort();
			for(var i = 0;i < windows.length; i++){
				windows[i].zIndex = i + 1;
				windows[i].ele.style.setProperty('z-index',i + 1);
			}
			currentMaxZIndex = windows.length;
			logger.info(logInfo + 'ZIndex GC finished','currentMaxZIndex:' + currentMaxZIndex,'currentWindowCount:' + windows.length);
		}
	}

	return {
		component: component,
		init: function(){

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
					component[this.id] = this.this; 
					this.ele = document.createElement('div');//默认用div包裹
					this.ele.setAttribute('id',this.id);
				};

				this.close = function(res){
					this.unLoad();
					this.onClose.invoked(res);
					logger.info(logInfo + 'component id:' + this.id,' close finished.');
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
				this.shadeConf = options.shade;
				this.movable = options.movable;
				this.onMove = options.onMove || function(e){};
				this.moveBefore = options.moveBefore || function(e){};
				this.moveAfter = options.moveAfter  || function(e){};
				this.hintIconConf = options.hintIcon || Asgc.Consts.UI.hintIcon.none;
				this.resizable = options.resizable || false;
				this.isActive = false;
				this.zIndex = 0;
				this.activable = options.activable;
				this.status = UIConsts.windowStatus.normal;
				//这个为false，则禁止esc快捷键关闭
				this.closeBle = options.closeBle === UIConsts.Usability.available;

				//API
				this.setStatusBar = function(statusBar){
					this.statusBar = statusBar;
				};

				//API
				this.setMenuBar = function(menuBar){
					this.menuBar = menuBar;
				};

				this.setZIndex = function(zIndex){
					logger.info(logInfo + 'window id:' + this.id,' title:' + this.titleText,' setZIndex:' + zIndex);
					this.zIndex = zIndex;
					this.ele.style.setProperty('z-index',this.zIndex);
				};

				this.setPopUpMenuGroup = function(popUpMenuGroup){
					this.popUpMenuGroup = popUpMenuGroup;
				};

				this.setControlMenuGroup = function(controlMenuGroup){
					this.controlMenuGroup = controlMenuGroup;
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
					var ele = this.ele;

					if(this.hintIconConf != Asgc.Consts.UI.hintIcon.none){
						var hintIcon = document.createElement("div");
						if(this.hintIconConf === Asgc.Consts.UI.hintIcon.success){
							hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-right"></use></svg>';
							hintIcon.style.setProperty('color','#01aaed');
						}else if(this.hintIconConf === Asgc.Consts.UI.hintIcon.warn){
							hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-warn"></use></svg>';
							hintIcon.style.setProperty('color','#ffb800');
						}else if(this.hintIconConf === Asgc.Consts.UI.hintIcon.error){
							hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-error"></use></svg>';
							hintIcon.style.setProperty('color','#f00');
						}else if(this.hintIconConf === Asgc.Consts.UI.hintIcon.help){
							hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-help"></use></svg>';
							hintIcon.style.setProperty('color','#009688');
						}
						this.hintIcon = hintIcon;
					}

					if(this.resizable){
						var resizeLeft = document.createElement('div');
						var resizeRight = document.createElement('div');
						var resizeTop = document.createElement('div');
						var resizeBottom = document.createElement('div');
						var resizeLeftTop = document.createElement('div');
						var resizeLeftBottom = document.createElement('div');
						var resizeRightTop = document.createElement('div');
						var resizeRightBottom = document.createElement('div');

						resizeLeft.classList.add('asgc-resize-left');
						resizeRight.classList.add('asgc-resize-right');
						resizeTop.classList.add('asgc-resize-top');
						resizeBottom.classList.add('asgc-resize-bottom');
						resizeLeftTop.classList.add('asgc-resize-left-top');
						resizeLeftBottom.classList.add('asgc-resize-left-bottom');
						resizeRightTop.classList.add('asgc-resize-right-top');
						resizeRightBottom.classList.add('asgc-resize-right-bottom');

						ele.appendChild(resizeLeft);
						ele.appendChild(resizeRight);
						ele.appendChild(resizeTop);
						ele.appendChild(resizeBottom);
						ele.appendChild(resizeLeftTop);
						ele.appendChild(resizeLeftBottom);
						ele.appendChild(resizeRightTop);
						ele.appendChild(resizeRightBottom);

						this.resizeLeft = resizeLeft;
						this.resizeRight = resizeRight;
						this.resizeTop = resizeTop;
						this.resizeBottom = resizeBottom;
						this.resizeLeftTop = resizeLeftTop;
						this.resizeLeftBottom = resizeLeftBottom;
						this.resizeRightTop = resizeRightTop;
						this.resizeRightBottom = resizeRightBottom;
					}

					if(!this.controlBarConf) return;
					
					var controlBar = document.createElement('div');
					var leftBar = document.createElement('div');
					var rightBar = document.createElement('div');
					var title = document.createElement('div');

					if(this.shadeConf){
						var shade = document.createElement("div");
						this.shade = shade;
						document.body.appendChild(shade);
					}

					if(this.iconConf){
						var icon = document.createElement('div');
						//默认图标
						if(this.iconConf === Asgc.Consts.default){
							icon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-default-icon"></use></svg>';
						}else{
							//TODO 自定义图标
							icon.innerHTML = '<img width="16px" height="16px" style="vertical-align: -0.15em;" src="' + this.iconConf + '">';
						}
						leftBar.appendChild(icon);
						this.icon = icon;
					}

					if(this.minMenuConf != Asgc.Consts.UI.Usability.invisible){
						var minMenu = document.createElement('div');
						minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';
						rightBar.appendChild(minMenu);
						this.minMenu = minMenu;
					}

					if(this.maxMenuConf  != Asgc.Consts.UI.Usability.invisible){
						var maxMenu = document.createElement('div');
						maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';
						rightBar.appendChild(maxMenu);
						this.maxMenu = maxMenu;
					}

					if(this.closeMenuConf != Asgc.Consts.UI.Usability.invisible){
						var closeMenu = document.createElement('div');
						closeMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-destroy"></use></svg>';
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
					var shade = this.shade;

		            ele.style.setProperty('width',this.width);
		            ele.style.setProperty('height',this.height);
		            ele.style.setProperty('min-width',this.minWidth);
		            ele.style.setProperty('min-height',this.minHeight);
		            ele.style.setProperty('max-width',this.maxWidth);
		            ele.style.setProperty('max-height',this.maxHeight);
		            ele.style.setProperty('top',this.top);
		            ele.style.setProperty('left',this.left);

		            if(controlBar){
		            	controlBar.style.setProperty('height','20px');
		            }
		            
		            if(leftBar){
		            	leftBar.style.setProperty('display','inline-block');
		            	leftBar.style.setProperty('width','75%');
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
						if(!this.iconConf){
							title.style.setProperty('margin-left','5px');
						}
					}
					
					if(minMenu){
						minMenu.style.setProperty('margin','0px');
						minMenu.style.setProperty('padding','5px'); 
						minMenu.style.setProperty('display','inline-block');
						if(this.minMenuConf === Asgc.Consts.UI.Usability.available){
							minMenu.classList.add('asgc-menu-icon');
						}else if(this.minMenuConf === Asgc.Consts.UI.Usability.unavailable){
							minMenu.style.setProperty('color','#ccc');
						}
					}

					if(maxMenu){
						maxMenu.style.setProperty('margin','0px');
						maxMenu.style.setProperty('padding','5px'); 
						maxMenu.style.setProperty('display','inline-block');
						if(this.maxMenuConf === Asgc.Consts.UI.Usability.available){
							maxMenu.classList.add('asgc-menu-icon');
						}else if(this.maxMenuConf === Asgc.Consts.UI.Usability.unavailable){
							maxMenu.style.setProperty('color','#ccc');
						}
					}

					if(closeMenu){
						closeMenu.style.setProperty('border-radius','0px 5px 0px 0px');
						closeMenu.style.setProperty('margin','0px');
						closeMenu.style.setProperty('padding','5px'); 
						closeMenu.style.setProperty('display','inline-block');
						if(this.closeMenuConf === Asgc.Consts.UI.Usability.available){
							closeMenu.classList.add('asgc-menu-icon-close');
						}else if(this.closeMenuConf === Asgc.Consts.UI.Usability.unavailable){
							closeMenu.style.setProperty('color','#ccc');
						}
					}

					if(shade){
						shade.classList.add("asgc-shade"); 
					}
				};

				this.showBefore = function(){
					var ele = this.ele;
					
					if(this.shade){
						hasShade = true;
						this.shade.style.setProperty('z-index',++currentMaxZIndex);
					}

					if(this.activable){
						windows.push(this);
						this.active();
					}else{
						if(this.closeBle){
							global.currentWindow = this;
						}
						this.setZIndex(++currentMaxZIndex);
						windowsSort();
						zIndexGC();
					}
				};

				//窗口被激活
				this.active = function(){
					logger.info(logInfo + 'window id:' + this.id,' title:' + this.titleText,' active.');
					for(var win of windows){
						if(win != this){
							win.unActive();
						}
					}

					this.isActive = true;
					global.currentWindow = this;
					this.setZIndex(++currentMaxZIndex);
					windowsSort();
					zIndexGC();
					this.ele.style.setProperty('border','1px solid #3baced');
				};

				//窗口变为不激活状态
				this.unActive = function(){
					logger.info(logInfo + 'window id:' + this.id,' title:' +  this.titleText,' unActive.');
					this.isActive = false;
					this.ele.style.setProperty('border','1px solid #888');
				};

				this.unLoadAfter = function(){
					if(this.shade){
						this.shade.remove();
						hasShade = false;
					}
				};

				this.bindEvent = function(){
					var ctx = this;

					if(this.activable){//onmousedown
						this.ele.onmousedown = function(){
							if(global.currentWindow != ctx){
								ctx.active();
							}
						};
					}

					// document.addEventListener("keydown", function (e) {
					// 	if(e.key === 'Escape'){
					// 		e.stopPropagation();

					// 		for(var i in windows){
					// 			if(windows[i] === ctx){
					// 				windows.splice(i,1);
					// 			}
					// 		}

					// 		if(windows && windows.length > 0){
					// 			windows[windows.length - 1].active();
					// 		}

					// 		if(currentWindow) currentWindow.close({
					// 			btn: 'close'
					// 		});
					// 	}
					// });

					if(this.shade){ 
						var ele = this.ele;
						var shade = this.shade;                
		                shade.onclick = function (e) {
		                    if (ele.classList.contains('asgc-flicker')) {
			                    ele.classList.remove('asgc-flicker');
			                }
			                ele.classList.add('asgc-flicker');
			                flickerTimer = setTimeout(function () {
			                    ele.classList.remove('asgc-flicker');
			                    clearTimeout(flickerTimer);
			                }, 120 * 8);
		                };
					}

					if(this.title && this.movable){
						new themeContext.Drag(this);
					}

					if(this.resizable){
						new themeContext.Resize(this,this.resizeLeft, false, true, false, true);
						new themeContext.Resize(this,this.resizeRight, false, false, false, true);
						new themeContext.Resize(this,this.resizeTop, true, false, true, false);
						new themeContext.Resize(this,this.resizeBottom, false, false, true, false);
						new themeContext.Resize(this,this.resizeLeftTop, true, true, false, false);
						new themeContext.Resize(this,this.resizeLeftBottom, false, true, false, false);
						new themeContext.Resize(this,this.resizeRightTop, true, false, false, false);
						new themeContext.Resize(this,this.resizeRightBottom, false, false, false, false);
					}

					if(this.closeMenu && this.closeMenuConf === Asgc.Consts.UI.Usability.available){
						this.closeMenu.onclick = function(e){
							e.stopPropagation();

							ctx.close({
								btn: 'close'
							});
						};
					}

					if(this.minMenu && this.minMenuConf === Asgc.Consts.UI.Usability.available){
						this.minMenu.onclick = function(e){
							e.stopPropagation();

							ctx.min();
						}; 
					}

					if(this.maxMenu && this.maxMenuConf === Asgc.Consts.UI.Usability.available){
						this.maxMenu.onclick = function(e){
							e.stopPropagation();

							ctx.max();
						};
					}
				};

				this.min = function(){
					if(this.status === UIConsts.windowStatus.min){
						this.minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';
						this.status = UIConsts.windowStatus.normal;
					}else{
 						this.minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-restore"></use></svg>';
						this.status = UIConsts.windowStatus.min;
					}
				};

				this.max = function(){
					if(this.status === UIConsts.windowStatus.max){
						this.maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';
						this.status = UIConsts.windowStatus.normal;
					}else{
						this.maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-restore"></use></svg>';
						this.status = UIConsts.windowStatus.min;
					}
				};

				this.close = function(res){
					for(var i in windows){
						if(windows[i] === this){
							windows.splice(i,1);
						}
					}

					if(windows && windows.length > 0){
						windows[windows.length - 1].active();
					}

					this.unLoad();
					this.onClose.invoked(res);
					logger.info(logInfo + 'component id:' + this.id,' close finished. res:' + JSON.stringify(res));
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

			//加载框
			Class.define('com.asgc.ui.win10.Lodding',function(options){


				//Override
				this.create = function(){
					this.super.create();
					
				};

				//Override
				this.render = function(){
					this.super.render();
				};

				//Override
				this.update = function(){
					
				};
		 
			},'com.asgc.ui.win10.Window');

			//进度条
			Class.define('com.asgc.ui.win10.Progress',function(options){


				this.value = options.value || 0;

				this.setValue = function(val){
					val = val || 0;

					if(val < 0) val = 0;
					if(val > 100) val = 100;

					this.value = Math.round(val);
					this.onValueChange(this.value);
				};

				this.addValue = function(val){
					val = val || 0;
					val += this.value;

					if(val < 0) val = 0;
					if(val > 100) val = 100;

					this.value = Math.round(val);
					this.onValueChange(this.value);
				};

				this.getValue = function(val){
					return this.value;
				};

				this.isFinished = function(){
					return this.value === 100;
				};

				this.onValueChange = function(val){

				};

				//Override
				this.create = function(){
					this.super.create();
					
				};

				//Override
				this.render = function(){
					this.super.render();
				};

				//Override
				this.update = function(){
					
				};
		 
			},'com.asgc.ui.win10.Window');

		}
	};

	
})();