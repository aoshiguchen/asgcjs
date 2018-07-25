/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
Asgc.UI.win10 = (function(){

	var component;

	function init(){


		component = Asgc.UI.win10.component.component;
		var Class = Asgc.Class;

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

		//Alert提示信息
		Class.define('com.asgc.ui.win10.Alert',function(options){

			this.contentText = options.content || '';
			//Override
			this.create = function(){
				this.super.create();
				
				var ele = this.ele;
				var content = document.createElement('div');
				var hint = document.createElement('div');
				var bottom = document.createElement('div');
				var btnOk = document.createElement('div');

				if(this.hintIcon){
					content.appendChild(this.hintIcon);
				}

				hint.innerHTML = this.contentText;	
				btnOk.innerHTML = '确定';

				content.appendChild(hint);
				ele.appendChild(content);
				bottom.appendChild(btnOk);
				ele.appendChild(bottom);

				this.content = content;
				this.bottom = bottom;
				this.btnOk = btnOk;
				logger.info(logInfo + 'alert id:' + this.id,' create finished.');
			};

			//Override
			this.render = function(){
				this.super.render();

				var ele = this.ele;
				var content = this.content;
				var bottom = this.bottom;
				var btnOk = this.btnOk;
				var hintIcon = this.hintIcon;

				if(hintIcon){
					hintIcon.style.setProperty('float','left');
					hintIcon.style.setProperty('margin-right','10px');
				}

				ele.classList.add('asgc-alert');

				content.style.setProperty('margin','10px auto 10px 10px');
				content.style.setProperty('font-size','14px');
				content.style.setProperty('color','#039');
				content.style.setProperty('height','47%');
				content.style.setProperty('user-select','none');

				bottom.style.setProperty('border-radius','0px 0px 5px 5px');
				bottom.style.setProperty('height','26%');
				bottom.style.setProperty('background-color','#f0f0f0');

				btnOk.classList.add('asgc-button');
				btnOk.style.setProperty('float','right');
				btnOk.style.setProperty('margin','5px 10px 0px 0px');

				logger.info(logInfo + 'alert id:' + this.id,' render finished.');
			};
 
			this.bindEvent = function(){
				this.super.bindEvent(); 

				var ctx = this;

				this.btnOk.onclick = function(){
					ctx.close({
						btn: 'ok'
					});
				};
				
				logger.info(logInfo + 'alert id:' + this.id,' bindEvent finished.');
			};

		},'com.asgc.ui.win10.Window');

		//Confirm提示信息
		Class.define('com.asgc.ui.win10.Confirm',function(options){

			this.onOk = new Asgc.Callback(options.onOk || function(){});
			this.onCancel = new Asgc.Callback(options.onCancel || function(){});
			this.contentText = options.content || '';

			//Override
			this.create = function(){
				this.super.create();
				
				var ele = this.ele;
				var content = document.createElement('div');
				var hint = document.createElement('div');
				var bottom = document.createElement('div');
				var btnOk = document.createElement('div');
				var btnCancel = document.createElement('div');


				if(this.hintIcon){
					content.appendChild(this.hintIcon);
				}

				hint.innerHTML = this.contentText;
				btnOk.innerHTML = '确定';
				btnCancel.innerHTML = '取消';

				content.appendChild(hint);
				ele.appendChild(content);
				bottom.appendChild(btnCancel);
				bottom.appendChild(btnOk);
				ele.appendChild(bottom);

				this.content = content;
				this.bottom = bottom;
				this.btnOk = btnOk;
				this.btnCancel = btnCancel;
				logger.info(logInfo + 'confirm id:' + this.id,' create finished.');
			};

			//Override
			this.render = function(){
				this.super.render();

				var ele = this.ele;
				var content = this.content;
				var bottom = this.bottom;
				var btnOk = this.btnOk;
				var btnCancel = this.btnCancel;

				var hintIcon = this.hintIcon;

				if(hintIcon){
					hintIcon.style.setProperty('float','left');
					hintIcon.style.setProperty('margin-right','10px');
				}

				ele.classList.add('asgc-confirm');

				content.style.setProperty('margin','10px auto 10px 10px');
				content.style.setProperty('font-size','14px');
				content.style.setProperty('color','#039');
				content.style.setProperty('height','47%');
				content.style.setProperty('user-select','none');

				bottom.style.setProperty('border-radius','0px 0px 5px 5px');
				bottom.style.setProperty('height','26%');
				bottom.style.setProperty('background-color','#f0f0f0');

				btnOk.classList.add('asgc-button');
				btnOk.style.setProperty('float','right');
				btnOk.style.setProperty('margin','5px 10px 0px 0px');

				btnCancel.classList.add('asgc-button');
				btnCancel.style.setProperty('float','right');
				btnCancel.style.setProperty('margin','5px 10px 0px 0px');

				logger.info(logInfo + 'confirm id:' + this.id,' render finished.');
			};

			this.bindEvent = function(){
				this.super.bindEvent(); 

				var ctx = this;

				this.btnOk.onclick = function(){
					var res = {
						btn: 'ok'
					};

					ctx.close(res);
					ctx.onOk.invoked(res);
					logger.info(logInfo + 'confirm id:' + this.id,' close finished.');
				};

				this.btnCancel.onclick = function(){
					var res = {
						btn: 'cancel'
					};

					ctx.close(res);
					ctx.onCancel.invoked(res);
					logger.info(logInfo + 'confirm id:' + this.id,' close finished.');
				};

				logger.info(logInfo + 'confirm id:' + this.id,' bindEvent finished.');
			};
			

		},'com.asgc.ui.win10.Window');

		//Prompt提示信息
		Class.define('com.asgc.ui.win10.Prompt',function(options){

			this.onOk = new Asgc.Callback(options.onOk || function(){});
			this.onCancel = new Asgc.Callback(options.onCancel || function(){});
			this.hintText = options.hint || '';
			this.defaultValue = options.defaultValue || '';
			this.inputMode = options.inputMode;

			//Override
			this.create = function(){
				this.super.create();

				var ele = this.ele;
				var hint = document.createElement('div');
				var bottom = document.createElement('div');
				var btnOk = document.createElement('div');
				var btnCancel = document.createElement('div');

				hint.innerHTML = this.hintText;
				
				btnOk.innerHTML = '确定';
				btnCancel.innerHTML = '取消';

				ele.appendChild(hint);

				if(this.inputMode === UIConsts.inputMode.multiLine){
					var textarea = document.createElement('textarea');
					textarea.innerHTML = this.defaultValue;
					ele.appendChild(textarea);
					this.textarea = textarea;
				}else if(this.inputMode === UIConsts.inputMode.singleLine){
					var input = document.createElement('input');
					input.setAttribute('value',this.defaultValue);
					ele.appendChild(input);
					this.input = input;
				}

				
				bottom.appendChild(btnCancel);
				bottom.appendChild(btnOk);
				ele.appendChild(bottom);

				this.hint = hint;
				this.bottom = bottom;
				this.btnOk = btnOk;
				this.btnCancel = btnCancel;
				logger.info(logInfo + 'prompt id:' + this.id,' create finished.');
			};

			//Override
			this.render = function(){
				this.super.render();

				var ele = this.ele;
				var hint = this.hint;
				var textarea = this.textarea;
				var input = this.input;
				var bottom = this.bottom;
				var btnOk = this.btnOk;
				var btnCancel = this.btnCancel;

				ele.classList.add('asgc-prompt');

				hint.style.setProperty('margin','10px auto 10px 10px');
				hint.style.setProperty('font-size','14px');
				hint.style.setProperty('color','#039');
				hint.style.setProperty('height','20%');
				hint.style.setProperty('user-select','none');


				if(textarea){
					textarea.style.setProperty('display','block');
					textarea.style.setProperty('border','1px solid #dfdfdf');
					textarea.style.setProperty('width','90%');
					textarea.style.setProperty('resize','none');
					textarea.style.setProperty('height','28%');
					textarea.style.setProperty('margin','8px');
					textarea.style.setProperty('font-size','15px');
					textarea.style.setProperty('color','#000');
				}else if(input){
					input.style.setProperty('margin','8px');
					input.style.setProperty('width','90%');
					input.style.setProperty('height','16px');
					hint.style.setProperty('height','34%');
				}

				bottom.style.setProperty('border-radius','0px 0px 5px 5px');
				bottom.style.setProperty('height','22%');
				bottom.style.setProperty('background-color','#f0f0f0');

				btnOk.classList.add('asgc-button');
				btnOk.style.setProperty('float','right');
				btnOk.style.setProperty('margin','5px 10px 0px 0px');

				btnCancel.classList.add('asgc-button');
				btnCancel.style.setProperty('float','right');
				btnCancel.style.setProperty('margin','5px 10px 0px 0px');

				logger.info(logInfo + 'prompt id:' + this.id,' render finished.');
			};

			this.getValue = function(){
				if(this.textarea){
					return this.textarea.innerHTML;
				}else if(this.input){
					return this.input.value;
				}
			};

			this.setValue = function(val){
				if(this.textarea){
					this.textarea.innerHTML = val;
				}else if(this.input){
					this.input.value = val;
				}
			};

			this.bindEvent = function(){
				this.super.bindEvent();

				var ctx = this;

				if(this.input){
					this.input.onkeydown = function(e){
						if(e.key === 'Enter'){
							var res = {
								btn: 'ok',
								value: ctx.getValue()
							};

							ctx.close(res);
							ctx.onOk.invoked(res);
							logger.info(logInfo + 'prompt id:' + this.id,' close finished.');
						}
					}
				};

				this.btnOk.onclick = function(){
					var res = {
						btn: 'ok',
						value: ctx.getValue()
					};

					ctx.close(res);
					ctx.onOk.invoked(res);
					logger.info(logInfo + 'prompt id:' + this.id,' close finished.');
				};

				this.btnCancel.onclick = function(){
					var res = {
						btn: 'cancel'
					};

					ctx.close(res);
					ctx.onCancel.invoked(res);
					logger.info(logInfo + 'prompt id:' + this.id,' close finished.');
				};

				logger.info(logInfo + 'prompt id:' + this.id,' bindEvent finished.');
			};
			

		},'com.asgc.ui.win10.Window');

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

				var border = this.border;
				var content = this.content;
				var progress = this.progress;
				var valueDiv = this.valueDiv;

				border.style.setProperty('width','40%');
				border.style.setProperty('height','20px');
				border.style.setProperty('left','30%');
				border.style.setProperty('border','1px solid #3baced');
				border.style.setProperty('box-shadow','rgb(0, 0, 0, 0.3) 1px 1px 24px');
				border.style.setProperty('border-radius','0px');
				border.style.setProperty('position','absolute');
				border.style.setProperty('margin','auto');

				content.style.setProperty('float','left');
				content.style.setProperty('height','100%');
				content.style.setProperty('width','100%');

				progress.style.setProperty('height','100%');
				progress.style.setProperty('width','0%');
				progress.style.setProperty('background-color',this.color);

				valueDiv.style.setProperty('float','right');
				valueDiv.style.setProperty('position','absolute');
				valueDiv.style.setProperty('margin-left','5px');
				valueDiv.style.setProperty('display','inline-block');

				this.ele.style.setProperty('margin-bottom','10px');

				logger.info(logInfo + 'rectangleProgress id:' + this.id,' render finished.');
			};


			this.onValueChange = function(val){
				this.progress.style.setProperty('width',val + '%');
				this.valueDiv.innerHTML = val + '%';
			}

		},'com.asgc.ui.win10.Progress');

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
				var iframe = this.iframe;
				var content = this.content;

				if(iframe){
					iframe.style.setProperty('width','99%');
					iframe.style.setProperty('height','89%');
					iframe.style.setProperty('margin','0');
					iframe.style.setProperty('padding','0');
				}

				if(content){
					content.style.setProperty('margin','8px');
					content.style.setProperty('font-family','宋体');
				}

				ele.classList.add('asgc-htmlPage');

				logger.info(logInfo + 'htmlPage id:' + this.id,' render finished.');
			};

			this.bindEvent = function(){
				this.super.bindEvent();
			}

		},'com.asgc.ui.win10.Window');

	}
	

	
	var Button = Asgc.Class.get('com.asgc.ui.win10.Button');
	var UIConsts = Asgc.Consts.UI;
	var logInfo = 'theme win10 ';

	var UI = {
		dependents: [
			'global.js',
			'index.css',
			'config.js',
			'drag.js',
			'resize.js',
			'component.js',
			'event.js'
		],
		init: function(){
			logger.info(logInfo + 'init...');
			this.component.init();
			init();
			logger.info(logInfo + 'init finished.');
		},
		getInstance: function(_class,options){
			var _Class = Asgc.Class.get('com.asgc.ui.win10.' + _class);
			var obj = _Class.new(options);
			return obj;
		},
		getComponentById: function(id){
			return component[id];
		},
		unLoad: function(id){
			logger.info(logInfo + 'unLoad id:' + id);
			if(component[id]) component[id].unLoad();
		},
		hide: function(id){
			logger.info(logInfo + 'hide id:' + id);
			if(component[id]) component[id].hide();
		},
		close: function(id){
			if(id){
				logger.info(logInfo + 'close id:' + id);
				if(component[id]) component[id].close();
			}else if(global.currentWindow){
				global.currentWindow.close();
			}
		},
		show: function(id){
			logger.info(logInfo + 'show id:' + id);
			if(component[id]) component[id].show();
		},
		msg: function(options){
			logger.info(logInfo + 'msg ',JSON.stringify(options));
			var msg = this.getInstance('Msg',options);
			msg.show();

			setTimeout(function(){
				msg.unLoad();
			},options.aliveTime);
		},
		alert: function(options){
			logger.info(logInfo + 'alert ',JSON.stringify(options));

			var alert = this.getInstance('Alert',options);
			
			alert.show();

		},
		confirm: function(options){
			logger.info(logInfo + 'confirm ',JSON.stringify(options));

			var confirm = this.getInstance('Confirm',options);
			
			confirm.show();
		},
		prompt: function(options){
			logger.info(logInfo + 'prompt ',JSON.stringify(options));

			var prompt = this.getInstance('Prompt',options);
			
			prompt.show();
		},
		rectangleLodding: function(options){
			logger.info(logInfo + 'rectangleLodding ',JSON.stringify(options));

			var rectangleLodding = this.getInstance('RectangleLodding',options);
			
			rectangleLodding.show();

			return rectangleLodding;
		},
		rectangleProgress: function(options){
			logger.info(logInfo + 'rectangleProgress ',JSON.stringify(options));

			var rectangleProgress = this.getInstance('RectangleProgress',options);
			
			rectangleProgress.show();

			return rectangleProgress;
		},
		htmlPage: function(options){
			logger.info(logInfo + 'htmlPage ',JSON.stringify(options));

			var htmlPage = this.getInstance('HtmlPage',options);
			
			htmlPage.show();

			return htmlPage;
		}
	};



	return UI;
})();


