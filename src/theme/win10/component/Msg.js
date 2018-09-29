(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//Msg提示信息
	Class.define('com.asgc.ui.win10.Msg',function(options){

		this.contentText = options.text || '';

		//Override
		this.create = function(){
			this.super.create();
			var content = document.createElement('div');
			var hint = document.createElement('div');

			hint.innerHTML = this.contentText;

			if(this.hintIcon){
				content.appendChild(this.hintIcon);
			}

			content.appendChild(hint);
			this.ele.appendChild(content);
			logger.info(logInfo + 'msg id:' + this.id,' create finished.');
		}

		//Override
		this.render = function(){
			var ele = this.ele;
			var hintIcon = this.hintIcon;

			if(hintIcon){
				hintIcon.style.setProperty('float','left');
			}

			ele.style.setProperty('max-width',options.maxWidth);
			ele.style.setProperty('left',options.left);
			ele.style.setProperty('top',options.top);

			ele.classList.add('asgc-msg');
			logger.info(logInfo + 'msg id:' + this.id,' render finished.');
		};

		//Override
		this.update = function(){
			
		};
 
	},'com.asgc.ui.win10.Window');
	
	
})();