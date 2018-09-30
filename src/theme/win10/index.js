/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
(function(){

	var component = global.component;
	var Class = global.Class;
	var Button = Class.get('com.asgc.ui.win10.Button');
	var UIConsts = global.UIConsts;
	var logInfo = 'theme win10 ';

	Asgc.UI.win10.init = function(){
		logger.info(logInfo + 'init...');
		//TODO
		logger.info(logInfo + 'init finished.');
	};

	Asgc.UI.win10.getInstance =function(_class,options){
		var _Class = Class.get('com.asgc.ui.win10.' + _class);
		var obj = _Class.new(options);
		return obj;
	};

	Asgc.UI.win10.getComponentById = function(id){
		return component[id];
	};

	Asgc.UI.win10.unLoad = function(id){
		logger.info(logInfo + 'unLoad id:' + id);
		if(component[id]) component[id].unLoad();
	};
		
	Asgc.UI.win10.hide = function(id){
		logger.info(logInfo + 'hide id:' + id);
		if(component[id]) component[id].hide();
	};
		
	Asgc.UI.win10.close = function(id){
		if(id){
			logger.info(logInfo + 'close id:' + id);
			if(component[id]) component[id].close();
		}else if(global.currentWindow){
			global.currentWindow.close();
		}
	};
		
	Asgc.UI.win10.show = function(id){
		logger.info(logInfo + 'show id:' + id);
		if(component[id]) component[id].show();
	};
		
	Asgc.UI.win10.msg = function(options){
		logger.info(logInfo + 'msg ',JSON.stringify(options));
		var msg = this.getInstance('Msg',options);
		msg.show();

		setTimeout(function(){
			msg.unLoad();
		},options.aliveTime);
	};
		
	Asgc.UI.win10.alert = function(options){
		logger.info(logInfo + 'alert ',JSON.stringify(options));

		var alert = this.getInstance('Alert',options);
		
		alert.show();

	};
		
	Asgc.UI.win10.confirm = function(options){
		logger.info(logInfo + 'confirm ',JSON.stringify(options));

		var confirm = this.getInstance('Confirm',options);
		
		confirm.show();
	};
		
	Asgc.UI.win10.prompt = function(options){
		logger.info(logInfo + 'prompt ',JSON.stringify(options));

		var prompt = this.getInstance('Prompt',options);
		
		prompt.show();
	};
		
	Asgc.UI.win10.rectangleLodding = function(options){
		logger.info(logInfo + 'rectangleLodding ',JSON.stringify(options));

		var rectangleLodding = this.getInstance('RectangleLodding',options);
		
		rectangleLodding.show();

		return rectangleLodding;
	};
		
	Asgc.UI.win10.rectangleProgress = function(options){
		logger.info(logInfo + 'rectangleProgress ',JSON.stringify(options));

		var rectangleProgress = this.getInstance('RectangleProgress',options);
		
		rectangleProgress.show();

		return rectangleProgress;
	};
		
	Asgc.UI.win10.htmlPage = function(options){
		logger.info(logInfo + 'htmlPage ',JSON.stringify(options));

		var htmlPage = this.getInstance('HtmlPage',options);
		
		htmlPage.show();

		return htmlPage;
	};

	Asgc.UI.win10.imageView = function(options){
		logger.info(logInfo + 'imageView ',JSON.stringify(options));

		var imageView = this.getInstance('ImageView',options);
		
		imageView.show();

		return imageView;
	};

})();
