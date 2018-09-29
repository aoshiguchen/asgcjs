(function(){

	var logInfo = 'theme win10 ';
	var Class = global.Class;
	var UIConsts = global.UIConsts;
	var component = global.component;
	var windows = global.windows;
	var themeContext = global.themeContext;

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
	
	
})();