//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.Logger = function(name){

	var LEVEL = {
		all: {
			v: 0
		},
		debug: {
			v: 1,
			color: 'gray'
		},
		info: {
			v: 2,
			color: 'green'
		},
		warn: {
			v: 3,
			color: 'blue'
		},
		error: {
			v: 4,
			color: 'red'
		},
		off: {
			v: 5
		}
	};

	function out(data){
		var level = data[0];

		if(LEVEL[level].v < LEVEL[this.level].v) return;

		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();
		var milliSecond =  date.getMilliseconds();

		var info = '%c [Asgc Log][' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + '.' + milliSecond + '] [' + name + ' level:' + level + '] ';
		for(var i = 1; i < data.length; i++){
			info += data[i] + ' ';
		}	

		console.log(info,'color:' + LEVEL[level].color);
	}

	return {
		/**
		 * all
		 * debug
		 * info
		 * warn
		 * error
		 * off
		 * */
		 
		level: 'all',
		setLevel: function(level){
			this.level = level;
		},
		setLevelAll: function(){
			this.level = 'all';
		},
		setLevelDebug: function(){
			this.level = 'debug';
		},
		setLevelInfo: function(){
			this.level = 'info';
		},
		setLevelWarn: function(){
			this.level = 'warn';
		},
		setLevelError: function(){
			this.level = 'error';
		},
		setLevelOff: function(){
			this.level = 'off';
		},
		debug: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('debug');
			out.call(this,params);
		},
		info: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('info');
			out.call(this,params);
		},
		warn: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('warn');
			out.call(this,params);
		},
		error: function(){
			var params = Array.prototype.slice.apply(arguments);
			params.insertFirst('error');
			out.call(this,params);
		}
	};
};