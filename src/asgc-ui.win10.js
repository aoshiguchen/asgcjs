//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.UI.win10 = (function(){

	var UI = {
		config: {
			common: {
				width: '400px',
				height: '300px',
				left: '100px',
				top: '100px',
				controlBar: true,
				menuBar: false,
				statusBar: false,
			},
			alert: {
				width: '200px',
				height: '150px',
			},
			msg: {
				width: '100px',
				height: '30px',
				controlBar: false,
				menuBar: false,
			}
		},
		init: function(){

		},
		createForm: function(options){
			var ele = document.createElement('div');

			ele.setAttribute('id','asgc-form-' + Asgc.util.getUuid());
			ele.style.setProperty('width',options.width);
			ele.style.setProperty('height',options.height);
			ele.style.setProperty('left',options.left);
			ele.style.setProperty('top',options.top);

			ele.classList.add('horizontally-center');
			ele.classList.add('vertical-center');

			return ele;
		},
		createControlBar: function(options){

		},
		createMenuBar: function(options){

		},
		createStatusBar: function(options){

		}, 
		create: function(options){
			var form = this.createForm(options);

			if(options.controlBar){
				var controlBar = createControlBar(options);
				form.appendChild(controlBar);
			}

			if(options.menuBar){
				var menuBar = createMenuBar(options);
				form.appendChild(menuBar);
			}

			if(options.statusBar){
				var statusBar = createStatusBar(options);
				form.appendChild(statusBar);
			}

			if('html' === options.contentType){
				var content = document.createElement('div');
				content.innerHTML = options.contentText;
				form.appendChild(content);
			}

            document.body.appendChild(form);
		},
	};



	return UI;
})();