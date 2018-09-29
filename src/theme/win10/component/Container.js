(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext; 

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
})();