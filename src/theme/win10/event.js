(function(){
	ctx = Asgc.UI.win10;

	document.addEventListener("keydown", function (e) {
		if(e.key === 'Escape'){
			e.stopPropagation();

			if(global.currentWindow){
				global.currentWindow.close({
					btn: 'esc'
				});
			}
		}
	});

	document.addEventListener("contextmenu", function (e) {
		//组织默认的右键菜单
		e.preventDefault();
	
	});

	//防止图标拖拽
	document.addEventListener("dragstart", function (e) {
		if('IMG' === e.srcElement.nodeName){
			e.preventDefault();
		}
	});

	// document.addEventListener("click", function (e) {

	// });

})();