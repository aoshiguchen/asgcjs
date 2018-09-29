(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

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
})();