(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//RectangleProgress矩形进度条
	Class.define('com.asgc.ui.win10.RectangleProgress',function(options){

		this.color = options.color;

		//Override
		this.create = function(){
			this.super.create();
			
			var border = document.createElement('div');
			var content = document.createElement('div');
			var progress = document.createElement('div');
			var valueDiv = document.createElement('div');

			content.appendChild(progress);
			border.appendChild(content);
			border.appendChild(valueDiv);

			valueDiv.innerHTML = '0%';

			this.ele.appendChild(border);

			this.border = border;
			this.content = content;
			this.progress = progress;
			this.valueDiv = valueDiv;

			logger.info(logInfo + 'rectangleProgress id:' + this.id,' create finished.');
		};

		//Override
		this.render = function(){
			this.super.render();

			var progress = this.progress;

			progress.style.setProperty('background-color',this.color);
			this.setStyle(['border','content','progress','valueDiv']);
			this.ele.style.setProperty('margin-bottom','10px');

			logger.info(logInfo + 'rectangleProgress id:' + this.id,' render finished.');
		};


		this.onValueChange = function(val){
			this.progress.style.setProperty('width',val + '%');
			this.valueDiv.innerHTML = val + '%';
		}

	},'com.asgc.ui.win10.Progress');
	
	
})();