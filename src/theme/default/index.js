/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
Asgc.UI.default = (function(){

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
				aliveTime: 2000
			}
		},
		dependents: [
			'index.css'
		],
		init: function(){

		},
		unLoad: function(id){
			if(component[id]) component[id].unLoad();
		},
		hide: function(id){
			if(component[id]) component[id].hide();
		},
		show: function(id){
			if(component[id]) component[id].show();
		},
		msg: function(options){
			var id = 'asgc-msg' + Asgc.util.getUuid();

			var msg = document.createElement('div');
			msg.setAttribute('id',id);

			var label = document.createElement('div');
			label.innerHTML = options.text;

			msg.appendChild(label);
			document.body.appendChild(msg);
		},
		alert: function(options){

		}
	};



	return UI;
})();
