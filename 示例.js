Asgc.UI.msg('hello'); //2秒后消失

Asgc.UI.alert({
	title: '系统提示',
	content: '内容'
});

var Button = Asgc.Class.get('com.asgc.ui.win10.Button');
var button = Button.new({
	text: '按钮'
});
button.show();