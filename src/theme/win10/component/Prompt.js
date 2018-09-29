(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

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
	
	
})();