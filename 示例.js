Asgc.UI.msg('hello'); //2秒后消失

Asgc.UI.alert({
	title: '标题',
	content: '内容',
	callback: function(){
		console.log('关闭');
	}
});

Asgc.UI.alert('默认标题的alert');
Asgc.UI.alert('标题','内容');
Asgc.UI.alert('标题','内容',function(){
	console.log('关闭');
});

var Button = Asgc.Class.get('com.asgc.ui.win10.Button');
var button = Button.new({
	text: '按钮'
});
button.show();

Asgc.UI.confirm({
	title: '标题',
	content: '内容',
	//点击ok、cancel都会回调，res：ok/cancel
	callback: function(res){
		console.log('关闭',res);
	},
	//点击ok时回调
	onOk: function(){
		console.log('确定');
	},
	//点击cancel时回调
	onCancel: function(){
		console.log('取消');
	}
});

Asgc.UI.confirm('默认标题的confirm');
Asgc.UI.confirm('标题','内容');
//点击ok、cancel都会回调，res：ok/cancel
Asgc.UI.confirm('标题','内容',function(res){
	console.log('关闭',res);
});