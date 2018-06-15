# msg
Asgc.UI.msg('默认提示'); //2秒后消失

Asgc.UI.msg({
	text: '成功提示',
	hintIcon: 'success'
});

Asgc.UI.msg({
	text: '警告提示',
	hintIcon: 'warn'
});

Asgc.UI.msg({
	text: '错误提示',
	hintIcon: 'error'
});

Asgc.UI.msg({
	text: '帮助提示',
	hintIcon: 'help'
});

# alert
Asgc.UI.alert('默认标题的alert');
Asgc.UI.alert('标题','内容');
Asgc.UI.alert('标题','内容',function(){
	console.log('关闭');
});

Asgc.UI.alert({
	title: '标题',
	content: '右上角没有关闭按钮',
	closeMenu: 'invisible',
	callback: function(res){
		console.log('关闭',res);
	}
});

Asgc.UI.alert({
	title: '标题',
	content: '带成功的弹框',
	closeMenu: 'available',
	hintIcon: 'success',
	callback: function(res){
		console.log('关闭',res);
	}
});

Asgc.UI.alert({
	title: '标题',
	content: '带警告的弹框',
	closeMenu: 'available',
	hintIcon: 'warn',
	callback: function(res){
		console.log('关闭',res);
	}
});

Asgc.UI.alert({
	title: '标题',
	content: '带错误的弹框',
	closeMenu: 'available',
	hintIcon: 'error',
	callback: function(res){
		console.log('关闭',res);
	}
});

Asgc.UI.alert({
	title: '标题',
	content: '带帮助的弹框',
	closeMenu: 'available',
	hintIcon: 'help',
	callback: function(res){
		console.log('关闭',res);
	}
});

# button
var Button = Asgc.Class.get('com.asgc.ui.win10.Button');
var button = Button.new({
	text: '按钮'
});
button.show();

# confirm
Asgc.UI.confirm('默认标题的confirm');
Asgc.UI.confirm('标题','内容');
//点击ok、cancel都会回调，res：ok/cancel
Asgc.UI.confirm('标题','内容',function(res){
	console.log('关闭',res);
});

Asgc.UI.confirm({
	title: '标题',
	content: '右上角没有关闭按钮',
	closeMenu: 'invisible',
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

Asgc.UI.confirm({
	title: '标题',
	content: '带成功的询问',
	closeMenu: 'available',
	hintIcon: 'success',
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

Asgc.UI.confirm({
	title: '标题',
	content: '带警告的询问',
	closeMenu: 'available',
	hintIcon: 'warn',
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

Asgc.UI.confirm({
	title: '标题',
	content: '带错误的询问',
	closeMenu: 'available',
	hintIcon: 'error',
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

Asgc.UI.confirm({
	title: '标题',
	content: '带帮助的询问',
	closeMenu: 'available',
	hintIcon: 'help',
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
