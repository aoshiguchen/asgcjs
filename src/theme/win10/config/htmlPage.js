Asgc.UI.win10.config.htmlPage = (function(){

	var UIConsts = Asgc.Consts.UI;

	return {
		width: '700px',
		height: '500px',
		minWidth: '300px', 
		maxWidth: '900px',
		minHeight: '200px',
		maxHeight: '700px',
		controlBar: true,
		shade: false,
		minMenu: UIConsts.Usability.available,
		minable: UIConsts.Usability.available,
		maxMenu: UIConsts.Usability.invisible,
		maxble: UIConsts.Usability.available,
		closeMenu: UIConsts.Usability.available,
		closeBle: UIConsts.Usability.available,
		icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
		movable: true,
		resizable: true,
		dom: {
			iframe: {
				style: {
					'position': 'absolute',
					'left': '0',
					'right': '0',
					'top': '0',
					'bottom': '0',
					'height': '100%',
					'width': '100%',
					'margin': '25px 0 0 0',
					'padding': '0',
					'border': '0'
				}
			},
			content: {
				style: {
					'margin': '8px',
					'font-family': '宋体'
				}
			}
		}
	}
})();