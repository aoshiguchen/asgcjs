(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//HtmlPage
	Class.define('com.asgc.ui.win10.ImageView',function(options){

		this.src = options.src || '';

		//Override
		this.create = function(){
			this.super.create();
			
			if(this.src){
				var img = document.createElement('img');
				img.src = this.src;
				this.img = img;
				this.ele.appendChild(img);
			}

			logger.info(logInfo + 'imageView id:' + this.id,' create finished.');
		};

		this.onMinBefore = function(){
			
			
		};

		this.onMinAfter = function(){

		};

		this.onNomalBefore = function(){
			
		};

		this.onNomalAfter = function(){

		};

		//Override
		this.render = function(){
			this.super.render();

			var ele = this.ele;
			var img = this.img;

			this.setStyle(['img']);

			ele.classList.add('asgc-htmlPage');
			
			logger.info(logInfo + 'imageView id:' + this.id,' render finished.');
		};

		this.bindEvent = function(){
			this.super.bindEvent();
		}

	},'com.asgc.ui.win10.Window');
	
})();