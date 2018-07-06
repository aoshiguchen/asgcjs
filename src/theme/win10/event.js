(function(){
	ctx = Asgc.UI.win10;

	document.addEventListener("keydown", function (e) {
		if(e.key === 'Escape'){
			e.stopPropagation();

			if(global.currentWindow) global.currentWindow.close({
				btn: 'close'
			});
		}
	});

})();