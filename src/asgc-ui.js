//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.UI = (function(){
	var context = null;

	var UI = {
		/**
		 * 根据类型名获取默认配置（alert、prompt、comfim）
		 */
		getConfigByType: function(type){
			return Asgc.util.deepClone({},context.config.common,context.config[type]);
		},
		init: function(){
			context = Asgc.UI[Asgc.config.theme];
			context.getConfigByType = this.getConfigByType;
			context.init();
		},
		create: function(options){
			var config = Asgc.util.deepClone({},context.getConfigByType(options.type),options);
			context[options.type](config);
		},
		unLoad: function(id){
			context.unLoad(id);
		},
		hide: function(id){
			context.hide(id);
		},
		show: function(id){
			context.show(id);
		},
		//如果传入了callback，则异步回调（非阻塞），否则同步返回（阻塞）
		alert: function(title,msg,callback){
			this.create({
				type: 'alert',
				contentType: 'panel'
			});
		},
		msg: function(msg){
			this.create({
				type: 'msg',
				contentType: 'html',
				text: msg
			});
		},
	};

	

	return UI;
})();