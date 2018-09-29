/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
//可以配合缓存一起使用
Asgc.UI.win10.global = (function(){

	 
	return {
		Class: Asgc.Class,
		component: {},
		UIConsts: Asgc.Consts.UI,
		themeContext: Asgc.UI.win10,
		hasShade: false,
		currentMaxZIndex: 0,
		windows: [],
		currentWindow: null,
		windowsSort: function(){
			global.windows.sort(function(a,b){
				return a.zIndex - b.zIndex;
			});
		},
		zIndexGC: function(){
			if(!global.hasShade && global.currentMaxZIndex > global.UIConsts.maxZIndex && global.currentMaxZIndex > global.windows.length){
				logger.info(logInfo + 'ZIndex GC','currentMaxZIndex:' + global.currentMaxZIndex,'currentWindowCount:' + global.windows.length);
				for(var i = 0;i < global.windows.length; i++){
					global.windows[i].zIndex = i + 1;
					global.windows[i].ele.style.setProperty('z-index',i + 1);
				}
				global.currentMaxZIndex = windows.length;
				logger.info(logInfo + 'ZIndex GC finished','currentMaxZIndex:' + global.currentMaxZIndex,'currentWindowCount:' + global.windows.length);
			}
		}
	};

})();

//更新global为当前主题的global
window.global = Asgc.UI.win10.global;

