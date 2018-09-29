(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//窗口
	Class.define('com.asgc.ui.win10.Window',function(options){

		var self = options.self;
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

		self.title = this.titleText;

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

			if(this.config.hintIcon != Asgc.Consts.UI.hintIcon.none){
				var hintIcon = document.createElement("div");
				if(this.config.hintIcon === Asgc.Consts.UI.hintIcon.success){
					hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-right"></use></svg>';
					hintIcon.style.setProperty('color','#01aaed');
				}else if(this.config.hintIcon === Asgc.Consts.UI.hintIcon.warn){
					hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-warn"></use></svg>';
					hintIcon.style.setProperty('color','#ffb800');
				}else if(this.config.hintIcon === Asgc.Consts.UI.hintIcon.error){
					hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-error"></use></svg>';
					hintIcon.style.setProperty('color','#f00');
				}else if(this.config.hintIcon === Asgc.Consts.UI.hintIcon.help){
					hintIcon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-help"></use></svg>';
					hintIcon.style.setProperty('color','#009688');
				}
				this.hintIcon = hintIcon;
			}

			if(this.config.resizable){
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

			if(!this.config.controlBar) return;
			
			var controlBar = document.createElement('div');
			var leftBar = document.createElement('div');
			var rightBar = document.createElement('div');
			var title = document.createElement('div');

			if(this.config.shade){
				var shade = document.createElement("div");
				this.shade = shade;
				document.body.appendChild(shade);
			}

			if(this.config.icon){
				var icon = document.createElement('div');
				//默认图标
				if(this.iconConf === Asgc.Consts.default){
					icon.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-default-icon"></use></svg>';
				}else{
					//TODO 自定义图标
					icon.innerHTML = '<img width="16px" height="16px" style="vertical-align: -0.15em;user-select:none;" src="' + this.iconConf + '">';
				}
				leftBar.appendChild(icon);
				this.icon = icon;
			}

			if(this.config.minMenu != Asgc.Consts.UI.Usability.invisible){
				var minMenu = document.createElement('div');
				minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';
				rightBar.appendChild(minMenu);
				this.minMenu = minMenu;
			}

			if(this.config.maxMenu  != Asgc.Consts.UI.Usability.invisible){
				var maxMenu = document.createElement('div');
				maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';
				rightBar.appendChild(maxMenu);
				this.maxMenu = maxMenu;
			}  

			if(this.config.closeMenu != Asgc.Consts.UI.Usability.invisible){
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
				global.hasShade = true;
				this.shade.style.setProperty('z-index',++global.currentMaxZIndex);
			}

			if(this.activable){
				windows.push(this);
				this.active();
			}else{
				if(this.config.closeBle === UIConsts.Usability.available){
					global.currentWindow = self;
				}
				this.setZIndex(++global.currentMaxZIndex);
				global.windowsSort();
				global.zIndexGC();
			}
		};

		this.highlight = function(flag){
			if(flag){
				this.ele.style.setProperty('border','1px solid #D5B32B');
			}else{
				this.ele.style.setProperty('border','1px solid #888');
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
			global.currentWindow = self;
			this.setZIndex(++global.currentMaxZIndex);
			global.windowsSort();
			global.zIndexGC();
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
				global.hasShade = false;
			}
		};

		this.bindEvent = function(){
			var ctx = this;

			if(this.activable){//onmousedown
				this.ele.onmousedown = function(){
					if(global.currentWindow != self){
						ctx.active();
					}
				};

				this.ele.onmouseover = function(){
					if(global.currentWindow != self){
						ctx.highlight(true);
					}
				};

				this.ele.onmouseout = function(){
					if(global.currentWindow != self){
						ctx.highlight(false);
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

			if(self.closeMenu && self.closeMenuConf === Asgc.Consts.UI.Usability.available){
				self.closeMenu.onclick = function(e){
					e.stopPropagation();

					self.close({
						btn: 'close'
					});
				};
			}

			if(self.minMenu && self.minMenuConf === Asgc.Consts.UI.Usability.available){
				self.minMenu.onclick = function(e){
					e.stopPropagation();

					self.min();
				}; 
			}

			if(self.maxMenu && self.maxMenuConf === Asgc.Consts.UI.Usability.available){
				self.maxMenu.onclick = function(e){
					e.stopPropagation();

					self.max();
				};
			}
		};

		this.onMinBefore = function(){

		};				

		this.onMinAfter = function(){

		};

		this.onMaxBefore = function(){

		};

		this.onMaxAfter = function(){

		};

		this.onNomalBefore = function(){

		};

		this.onNomalAfter = function(){

		};

		this.min = function(){
			if(this.status === UIConsts.windowStatus.min){
				this.onNomalBefore();

				this.ele.style.minHeight = this.minHeight;
				this.ele.style.minWidth = this.minWidth;
				this.ele.style.height = this.height;
				this.ele.style.width = this.width;
				this.leftBar.style.setProperty('width','75%');
				this.rightBar.style.removeProperty('width');
				this.ele.style.top = this.top;
				this.ele.style.left = this.left;
				this.minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-min"></use></svg>';
				this.status = UIConsts.windowStatus.normal;

				if(this.config.resizable){
					this.resizeTop.style.display = 'block';
					this.resizeBottom.style.display = 'block';
					this.resizeLeft.style.display = 'block';
					this.resizeRight.style.display = 'block';
					this.resizeLeftTop.style.display = 'block';
					this.resizeLeftBottom.style.display = 'block';
					this.resizeRightTop.style.display = 'block';
					this.resizeRightBottom.style.display = 'block';
				}

				if(this.maxMenuConf === Asgc.Consts.UI.Usability.available){
					this.maxMenu.classList.add('asgc-menu-icon');
					this.maxMenu.style.setProperty('color','#000');
				}
				
				this.onNomalAfter();
			}else{
				this.onMinBefore();

				this.height = this.ele.style.height;
				this.width = this.ele.style.width;
				this.left = this.ele.style.left;
				this.top = this.ele.style.top;
				this.ele.style.minHeight = '0px';
				this.ele.style.minWidth = '0px';
				this.ele.style.width = '243px';
				this.ele.style.height = '30px';
				this.leftBar.style.setProperty('width','70%');
				this.rightBar.style.setProperty('width','30%');
				this.ele.style.top = window.innerHeight - 30 + 'px';
					this.minMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-restore"></use></svg>';
				this.status = UIConsts.windowStatus.min;

				if(this.config.resizable){
					this.resizeTop.style.display = 'none';
					this.resizeBottom.style.display = 'none';
					this.resizeLeft.style.display = 'none';
					this.resizeRight.style.display = 'none';
					this.resizeLeftTop.style.display = 'none';
					this.resizeLeftBottom.style.display = 'none';
					this.resizeRightTop.style.display = 'none';
					this.resizeRightBottom.style.display = 'none';
				}

				if(this.maxMenuConf === Asgc.Consts.UI.Usability.available){
					this.maxMenu.classList.remove('asgc-menu-icon');
					this.maxMenu.style.setProperty('color','#ccc');
				}

				this.onMinAfter();
			}
		};

		this.max = function(){
			if(this.status === UIConsts.windowStatus.max){
				this.onNomalBefore();

				this.ele.style.maxHeight = this.maxHeight;
				this.ele.style.maxWidth = this.maxWidth;
				this.ele.style.height = this.height;
				this.ele.style.width = this.width;
				this.ele.style.top = this.top;
				this.ele.style.left = this.left;
				this.maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-max"></use></svg>';
				this.status = UIConsts.windowStatus.normal;

				if(this.config.resizable){
					this.resizeTop.style.display = 'block';
					this.resizeBottom.style.display = 'block';
					this.resizeLeft.style.display = 'block';
					this.resizeRight.style.display = 'block';
					this.resizeLeftTop.style.display = 'block';
					this.resizeLeftBottom.style.display = 'block';
					this.resizeRightTop.style.display = 'block';
					this.resizeRightBottom.style.display = 'block';
				}

				if(this.minMenuConf === Asgc.Consts.UI.Usability.available){
					this.minMenu.classList.add('asgc-menu-icon');
					this.minMenu.style.setProperty('color','#000');
				}

				this.onNomalAfter();
			}else{
				this.onMaxBefore();

				this.height = this.ele.style.height;
				this.width = this.ele.style.width;
				this.left = this.ele.style.left;
				this.top = this.ele.style.top;
				this.ele.style.maxWidth = '99999999px';
				this.ele.style.maxHeight = '99999999px';
				this.ele.style.width = window.innerWidth + 'px';
				this.ele.style.height = window.innerHeight + 'px';

				this.ele.style.left = '0px';
				this.ele.style.top = '0px';
				this.maxMenu.innerHTML = '<svg class="asgc-iconfont" aria-hidden="true"><use xlink:href="#asgc-icon-restore"></use></svg>';
				this.status = UIConsts.windowStatus.max;

				if(this.config.resizable){
					this.resizeTop.style.display = 'none';
					this.resizeBottom.style.display = 'none';
					this.resizeLeft.style.display = 'none';
					this.resizeRight.style.display = 'none';
					this.resizeLeftTop.style.display = 'none';
					this.resizeLeftBottom.style.display = 'none';
					this.resizeRightTop.style.display = 'none';
					this.resizeRightBottom.style.display = 'none';
				}

				if(this.minMenuConf === Asgc.Consts.UI.Usability.available){
					this.minMenu.classList.remove('asgc-menu-icon');
					this.minMenu.style.setProperty('color','#ccc');
				}

				this.onMaxAfter();
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
})();