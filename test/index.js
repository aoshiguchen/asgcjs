function main(){
	log.info('welcome to Asgc JS !');

	$('#1').click(function(){
		Asgc.UI.msg('默认提示');
	});

	$('#2').click(function(){
		Asgc.UI.msg({
			text: '成功提示',
			hintIcon: 'success'
		});
	});

	$('#3').click(function(){
		Asgc.UI.msg({
			text: '警告提示',
			hintIcon: 'warn'
		});
	});

	$('#4').click(function(){
		Asgc.UI.msg({
			text: '错误提示',
			hintIcon: 'error'
		});
	});

	$('#5').click(function(){
		Asgc.UI.msg({
			text: '帮助提示',
			hintIcon: 'help'
		});
	});

	$('#21').click(function(){
		Asgc.UI.alert('默认标题的弹框');
	});

	$('#22').click(function(){
		Asgc.UI.alert('标题','带标题的弹框');
	});

	$('#23').click(function(){
		Asgc.UI.alert('标题','带回调的弹框',function(){
			console.log('关闭');
		});
	});

	$('#24').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '右上角没有关闭按钮',
			closeMenu: 'invisible',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#25').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '带成功的弹框',
			closeMenu: 'available',
			hintIcon: 'success',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#26').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '带警告的弹框',
			closeMenu: 'available',
			hintIcon: 'warn',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#27').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '带错误的弹框',
			closeMenu: 'available',
			hintIcon: 'error',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#28').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '带帮助的弹框',
			closeMenu: 'available',
			hintIcon: 'help',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#29').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '另一种回调风格',
			closeMenu: 'invisible',
			callback: ['btn',function(res){
				console.log('关闭',res);
			}]
		});
	});

	$('#2a').click(function(){
		Asgc.UI.alert({
			title: '标题',
			content: '自定义图标的弹框',
			closeMenu: 'available',
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			callback: function(res){
				console.log('关闭',res);
			}
		});
	});

	$('#31').click(function(){
		Asgc.UI.confirm('默认标题询问');
	});

	$('#32').click(function(){
		Asgc.UI.confirm('标题','带标题的询问');
	});

	$('#33').click(function(){
		Asgc.UI.confirm('标题','带回调的询问1',function(res){
			console.log('关闭',res);
		});
	});

	$('#34').click(function(){
		Asgc.UI.confirm({
			title: '标题',
			content: '带回调的询问2',
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
	});

	$('#35').click(function(){
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

	});

	$('#36').click(function(){
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
	});

	$('#37').click(function(){
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

	});

	$('#38').click(function(){
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
	});

	$('#39').click(function(){
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
			onOk: ['btn',function(res){
				console.log('确定',res);
			}],
			//点击cancel时回调
			onCancel: function(res){
				console.log('取消',res);
			}
		});
	});

	$('#3a').click(function(){
		Asgc.UI.confirm({
			title: '标题',
			content: '自定义图标询问',
			closeMenu: 'available',
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			callback: function(res){
				console.log('关闭',res);
			},
		});
	});

	$('#41').click(function(){
		Asgc.UI.prompt('默认标题输入');
	});

	$('#42').click(function(){
		Asgc.UI.prompt('标题','带标题的输入');
	});

	$('#43').click(function(){
		Asgc.UI.prompt('带回调的输入1',function(res){
			console.log('关闭',res);
		});
	});

	$('#44').click(function(){
		Asgc.UI.prompt({
			title: '标题',
			hint: '带回调的输入2',
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

	});

	$('#45').click(function(){
		Asgc.UI.prompt({
			title: '标题',
			hint: '带回调的输入2',
			defaultValue: '默认值',
			closeMenu: 'available',
			//点击ok、cancel都会回调，res：ok/cancel
			callback: function(res){
				console.log('关闭',res);
			},
			//点击ok时回调
			onOk: ['value',function(value){
				console.log('确定',value);
			}],
			//点击cancel时回调
			onCancel: function(res){
				console.log('取消',res);
			}
		});

	}); 

	$('#46').click(function(){
		Asgc.UI.prompt({
			title: '请输入结果',
			hint: '5 * 6 = ?',
			closeMenu: 'available',
			inputMode: 'singleLine',
			//点击ok时回调
			onOk: ['value',function(value){
				console.log('确定',value);
				if(value == 30){
					Asgc.UI.msg({
						text: '回答正确!',
						hintIcon: 'success'
					});
				}else{
					Asgc.UI.msg({
						text: '回答错误!',
						hintIcon: 'error'
					});
				}
			}]
		});
	});

	$('#47').click(function(){
		Asgc.UI.prompt({
			title: '标题',
			hint: '自定义图标输入',
			defaultValue: '默认值',
			closeMenu: 'available',
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			callback: function(res){
				console.log('关闭',res);
			}
		});

	});

	$('#51').click(function(){
		var lodding = Asgc.UI.rectangleLodding();
		setTimeout(function(){
			lodding.close();
		},3000);
	});

	$('#52').click(function(){
		var lodding = Asgc.UI.rectangleLodding({
			color1: 'red',
			color2: 'white'
		});
		setTimeout(function(){
			lodding.close();
		},3000);
	});

	$('#53').click(function(){
		var lodding = Asgc.UI.rectangleLodding({
			color1: 'yellow',
			color2: 'blue'
		});
		setTimeout(function(){
			lodding.close();
		},3000);
	});

	$('#61').click(function(){
		var rectangleProgress = Asgc.UI.rectangleProgress();

		var run = function(){
			rectangleProgress.addValue(Math.random() * 10);

			if(!rectangleProgress.isFinished()){
				setTimeout(run,Math.random()*1000);
			}else{
				setTimeout(function(){
					rectangleProgress.close();
				},3000);
			}
		};

		run();

	});

	$('#62').click(function(){
		var rectangleProgress = Asgc.UI.rectangleProgress({
			color: '#bbbb00'
		});

		var run = function(){
			rectangleProgress.addValue(Math.random() * 10);

			if(!rectangleProgress.isFinished()){
				setTimeout(run,Math.random()*1000);
			}else{
				setTimeout(function(){
					rectangleProgress.close();
				},3000);
			}
		};

		run();

	});

	$('#63').click(function(){
		var rectangleProgress = Asgc.UI.rectangleProgress({
			color: 'blue'
		});

		var run = function(){
			rectangleProgress.addValue(Math.random() * 10);

			if(!rectangleProgress.isFinished()){
				setTimeout(run,Math.random()*1000);
			}else{
				setTimeout(function(){
					rectangleProgress.close();
				},3000);
			}
		};

		run();

	});

	var htmlPageCount = 0;
	$('#71').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'unavailable',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#72').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'unavailable',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: true,
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#73').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'unavailable',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			shade: true,
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#74').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'unavailable',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			shade: true,
			icon: '',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#75').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'unavailable',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			shade: true,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});
 
	$('#76').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'invisible',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			shade: true,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#77').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'available',
			maxMenu:'unavailable',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: false,
			shade: true,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#78').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'available',
			maxMenu:'unavailable', 
			closeMenu: 'available',
			htmlContent: 'this is html page.', 
			resizable: true,
			shade: false,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#79').click(function(){
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'available',
			maxMenu:'available',
			closeMenu: 'available',
			htmlContent: 'this is html page.',
			resizable: true,
			shade: false,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#81').click(function(){ 
		Asgc.UI.htmlPage({
			title:'测试页面' + (++htmlPageCount),
			width: '400px',
			height: '300px',
			minMenu: 'available',
			maxMenu:'available',
			closeMenu: 'available',
			url: './child1.html',
			resizable: true,
			shade: false,
			icon: 'img/Aim_128px_1134223_easyicon.net.png',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#82').click(function(){ 
		Asgc.UI.htmlPage({
			title:'百度',
			width: '800px',
			height: '600px',
			minMenu: 'available',
			maxMenu:'available',
			closeMenu: 'available',
			url: 'http://www.baidu.com',
			resizable: true,
			shade: false,
			icon: 'http://img2.imgtn.bdimg.com/it/u=825124447,3121939879&fm=27&gp=0.jpg',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#91').click(function(){ 
		Asgc.UI.imageView({
			src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=108664394,3970512532&fm=173&app=25&f=JPEG?w=218&h=146&s=4FB0BEE25C424ECE08B7A748030000FF',
			onClose: function(){
				log.info('页面已关闭');
			}
		});
	});

	$('#92').click(function(){ 
		Asgc.UI.imageView('https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3456421808,4079941850&fm=173&app=25&f=JPEG?w=218&h=146&s=84E1DA5AE2B1A6755679F3A70300E00F');
	});
}
