(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

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
	
})();