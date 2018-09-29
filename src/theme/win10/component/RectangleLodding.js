(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//RectangleLodding矩形加载框
	Class.define('com.asgc.ui.win10.RectangleLodding',function(options){

		this.color1 = options.color1;
		this.color2 = options.color2;

		//Override
		this.create = function(){
			this.super.create();
			
			var lodding = document.createElement('div');

			this.ele.appendChild(lodding);
			this.lodding = lodding;

			logger.info(logInfo + 'rectangleLodding id:' + this.id,' create finished.');
		};

		//Override
		this.render = function(){
			this.super.render();
			var lodding = this.lodding;

			lodding.style.setProperty('width',this.width);
			lodding.style.setProperty('height',this.height);
			lodding.style.setProperty('left',this.left);
			lodding.style.setProperty('border','1px solid #3baced');
			lodding.style.setProperty('box-shadow','rgb(0, 0, 0, 0.3) 1px 1px 24px');
			lodding.style.setProperty('border-radius','0px');
			lodding.style.setProperty('position','absolute');
			lodding.style.setProperty('margin','auto');
			lodding.style.setProperty('animation','asgc-lodding-animation 750ms infinite linear');
			lodding.style.setProperty('background-image','linear-gradient(-45deg, transparent 0em, transparent 0.8em, ' + this.color1 + ' 0.9em, ' + this.color1 + ' 2.1em, transparent 2.1em, transparent 2.9em, ' + this.color1 + ' 3.1em)');
			lodding.style.setProperty('background-size','3em 3em');
			lodding.style.setProperty('background-color',this.color2);

			this.ele.style.setProperty('margin-bottom','10px');

			logger.info(logInfo + 'rectangleLodding id:' + this.id,' render finished.');
		};

		this.bindEvent = function(){
			this.super.bindEvent();

			var ctx = this;

			
			logger.info(logInfo + 'rectangleLodding id:' + this.id,' bindEvent finished.');
		};
		

	},'com.asgc.ui.win10.Lodding');
	
	
})();