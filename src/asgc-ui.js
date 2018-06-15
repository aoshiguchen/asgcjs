//--------------------------------------------------------------------
//Asgc JS 0.0.1
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.UI = (function(){
	var context = null;

	var UI = {
		setTheme: function(theme,callback){
			if(!Asgc.theme[theme]){
				throw new Error('theme:' + thmeme + '不存在!');
			}

			Asgc.config.theme = theme;

			if(Asgc.theme[theme].isLoad){
				this.init();
				return;
			}

			var ctx = this;
			callback = callback || function(){};

			Asgc.util.loadFiles([Asgc.theme[theme].path + 'index.js'],function(fileList){
				for(var file of fileList){
					logger.info('set theme load ' + file + '  finished.');
				}

				//加载主题的依赖
				var themeDeps = Asgc.UI[theme].dependents;
				if(themeDeps && themeDeps.length > 0){
					for(var i in themeDeps){
						themeDeps[i] = Asgc.theme[theme].path + themeDeps[i];
					}

					Asgc.util.loadFiles(themeDeps,function(fileList){
						for(var file of fileList){
							logger.info('theme dependents load ' + file + '  finished.');
						}
						ctx.init();
						callback();
					});
				}else{
					ctx.init();
					callback();
				}
			});
			
		},
		/**
		 * 根据类型名获取默认配置（alert、prompt、comfim）
		 */
		getConfigByType: function(type){
			return Asgc.util.deepClone({},context.config.common,context.config[type]);
		},
		getComponentById: function(id){
			return context.getComponentById(id);
		},
		init: function(){
			context = Asgc.UI[Asgc.config.theme];
			context.getConfigByType = this.getConfigByType;
			context.init();
			Asgc.theme[Asgc.config.theme].isLoad = true;
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
		alert: function(p1,p2,p3){

			if(arguments.length === 0){
				logger.error('参数有误!');
			}else if(arguments.length === 1){

				if(Asgc.types.isObject(p1)){
					this.create(Asgc.util.deepClone({},p1,{type: 'alert'}));
				}else if(Asgc.types.isString(p1)){
					this.create(Asgc.util.deepClone({},{
						type: 'alert',
						title: '系统提示',
						content: p1
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length === 2){

				if(Asgc.types.isString(p1) && Asgc.types.isFunction(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'alert',
						title: '系统提示',
						content: p1,
						callback: p2
					}));
				}else if(Asgc.types.isString(p1) && Asgc.types.isString(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'alert',
						title: p1,
						content: p2
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length >= 3){
				if(Asgc.types.isString(p1) && Asgc.types.isString(p2) && Asgc.types.isFunction(p3)){
					this.create(Asgc.util.deepClone({},{
						type: 'alert',
						title: p1,
						content: p2,
						callback: p3
					}));
				}else{
					logger.error('参数有误!');
				}
			}
			
		},
		msg: function(p1){

			if(arguments.length === 0){
				logger.error('参数有误!');
			}else if (arguments.length >= 1){
				if(Asgc.types.isObject(p1)){
					this.create(Asgc.util.deepClone({},p1,{type: 'msg'}));
				}else if(Asgc.types.isString(p1)){
					this.create({
						type: 'msg',
						text: p1
					});
				}else{
					logger.error('参数有误!');
				}
			}
			;
		},
		confirm: function(p1,p2,p3){

			if(arguments.length === 0){
				logger.error('参数有误!');
			}else if(arguments.length === 1){

				if(Asgc.types.isObject(p1)){
					this.create(Asgc.util.deepClone({},p1,{type: 'confirm'}));
				}else if(Asgc.types.isString(p1)){
					this.create(Asgc.util.deepClone({},{
						type: 'confirm',
						title: '系统提示',
						content: p1
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length === 2){

				if(Asgc.types.isString(p1) && Asgc.types.isFunction(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'confirm',
						title: '系统提示',
						content: p1,
						callback: p2
					}));
				}else if(Asgc.types.isString(p1) && Asgc.types.isString(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'confirm',
						title: p1,
						content: p2
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length >= 3){

				if(Asgc.types.isString(p1) && Asgc.types.isString(p2) && Asgc.types.isFunction(p3)){
					this.create(Asgc.util.deepClone({},{
						type: 'confirm',
						title: p1,
						content: p2,
						callback: p3
					}));
				}else{
					logger.error('参数有误!');
				}
				
			}

		},
		prompt: function(p1,p2,p3,p4){

			if(arguments.length === 0){
				logger.error('参数有误!');
			}else if(arguments.length === 1){

				if(Asgc.types.isObject(p1)){
					this.create(Asgc.util.deepClone({},p1,{type: 'prompt'}));
				}else if(Asgc.types.isString(p1)){
					this.create(Asgc.util.deepClone({},{
						type: 'prompt',
						title: '请输入',
						hint: p1
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length === 2){

				if(Asgc.types.isString(p1) && Asgc.types.isFunction(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'prompt',
						title: '请输入',
						hint: p1,
						callback: p2
					}));
				}else if(Asgc.types.isString(p1) && Asgc.types.isString(p2)){
					this.create(Asgc.util.deepClone({},{
						type: 'prompt',
						title: p1,
						hint: p2
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length === 3){

				if(Asgc.types.isString(p1) && Asgc.types.isString(p2) && Asgc.types.isFunction(p3)){
					this.create(Asgc.util.deepClone({},{
						type: 'prompt',
						title: p1,
						hint: p2,
						callback: p3
					}));
				}else{
					logger.error('参数有误!');
				}

			}else if(arguments.length >= 4){

				if(Asgc.types.isString(p1) && Asgc.types.isString(p2) && Asgc.types.isString(p3) && Asgc.types.isFunction(p4)){
					this.create(Asgc.util.deepClone({},{
						type: 'prompt',
						title: p1,
						hint: p2,
						defaultValue: p3,
						callback: p4
					}));
				}else{
					logger.error('参数有误!');
				}

			}

		}
	};

	

	return UI;
})();