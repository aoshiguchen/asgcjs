# msg
Asgc.UI.msg('hello'); //2秒后消失

# alert
Asgc.UI.alert({
	title: '标题',
	content: '内容',
	closeMenu: 'available',
	callback: function(res){
		console.log('关闭',res);
	}
});

Asgc.UI.alert('默认标题的alert');
Asgc.UI.alert('标题','内容');
Asgc.UI.alert('标题','内容',function(){
	console.log('关闭');
});

# button
var Button = Asgc.Class.get('com.asgc.ui.win10.Button');
var button = Button.new({
	text: '按钮'
});
button.show();

# confirm
Asgc.UI.confirm({
	title: '标题',
	content: '内容',
	closeMenu: 'available',
	//点击ok、cancel都会回调，res：ok/cancel
	callback: function(res){
		console.log('关闭',res);
	},
	//点击ok时回调
	onOk: function(res){
		console.log('确定',res);
	},
	//点击cancel时回调
	onCancel: function(res){
		console.log('取消',res);
	}
});

Asgc.UI.confirm('默认标题的confirm');
Asgc.UI.confirm('标题','内容');
//点击ok、cancel都会回调，res：ok/cancel
Asgc.UI.confirm('标题','内容',function(res){
	console.log('关闭',res);
});

# prompt
Asgc.UI.prompt('默认标题的prompt');
Asgc.UI.prompt('标题','提示');
Asgc.UI.prompt('提示',function(res){
	console.log('关闭',res);
});

Asgc.UI.prompt({
	title: '标题',
	hint: '提示',
	defaultValue: '默认值',
	closeMenu: 'available',
	//点击ok、cancel都会回调，res：ok/cancel
	callback: function(res){
		console.log('关闭',res);
	},
	//点击ok时回调
	onOk: function(res){
		console.log('确定',res);
	},
	//点击cancel时回调
	onCancel: function(res){
		console.log('取消',res);
	}
});