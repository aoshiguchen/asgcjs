(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

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
	
})();