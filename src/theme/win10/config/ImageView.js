Asgc.UI.win10.config.imageView = (function(){

	var UIConsts = Asgc.Consts.UI;
	
	return {
		width: '200px',
		height: '200px',
		minWidth: '200px', 
		maxWidth: '800px',
		minHeight: '200px',
		maxHeight: '800px',
		controlBar: true,
		shade: false,
		title: '图片查看器',
		minMenu: UIConsts.Usability.invisible,
		minable: UIConsts.Usability.invisible,
		maxMenu: UIConsts.Usability.invisible,
		maxble: UIConsts.Usability.invisible,
		closeMenu: UIConsts.Usability.available,
		closeBle: UIConsts.Usability.available,
		icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
		movable: true,
		resizable: true,
		dom: {
			img: {
				style: {
					'width': '100%',
					'height': '86%'
				}
			}
		}
	};
})();