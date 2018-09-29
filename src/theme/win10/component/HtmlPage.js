(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

	//HtmlPage
	Class.define('com.asgc.ui.win10.HtmlPage',function(options){

		this.url = options.url || '';
		this.htmlContent = options.htmlContent || '';

		//Override
		this.create = function(){
			this.super.create();
			
			if(this.url){
				var iframe = document.createElement('iframe');
				iframe.src = this.url;

				this.ele.appendChild(iframe);
				this.iframe = iframe;
			}else if(this.htmlContent){
				var content = document.createElement('div');
				content.innerHTML = this.htmlContent;
				this.ele.appendChild(content);
				this.content = content;
			}	

			logger.info(logInfo + 'htmlPage id:' + this.id,' create finished.');
		};

		this.onMinBefore = function(){
			if(this.url){
				this.iframe.style.display = 'none';
			}else{
				this.content.style.display = 'none';
			}
			
		};

		this.onMinAfter = function(){

		};

		this.onNomalBefore = function(){
			if(this.url){
				this.iframe.style.display = 'block';
			}else{
				this.content.style.display = 'block';
			}
		};

		this.onNomalAfter = function(){

		};

		//Override
		this.render = function(){
			this.super.render();

			var ele = this.ele;

			this.setStyle(['iframe','content']);
			ele.classList.add('asgc-htmlPage');

			logger.info(logInfo + 'htmlPage id:' + this.id,' render finished.');
		};

		this.bindEvent = function(){
			this.super.bindEvent();
		}

	},'com.asgc.ui.win10.Window');
	
	
})();