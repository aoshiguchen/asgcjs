/*!
 * file : asgc-ui.win10.js
 * github : https://github.com/aoshiguchen
 * author : 傲世孤尘/aoshiguchen
 * version : v0.0.1
 */
Asgc.UI.win10.config = (function(){
	
	var UIConsts = Asgc.Consts.UI;

	return {
		common: {
				width: '400px',
				height: '300px',
				left: '100px',
				top: '100px',
				display: 'block',
				movable: false,
			},
			alert: {
				width: '200px',
				height: '150px',
				maxWidth: '210px',
				controlBar: true,
				minMenu: UIConsts.Usability.invisible,
				minable: UIConsts.Usability.invisible,
				maxMenu: UIConsts.Usability.invisible,
				maxble: UIConsts.Usability.invisible,
				closeMenu: UIConsts.Usability.available,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
				position: 'ct',
				shade: true,
				movable: true
			},
			msg: {
				width: '100px',
				height: '50px',
				maxWidth: '210px',
				menuBar: false,
				aliveTime: 2000,
				maxWidth: '150px'
			},
			confirm: {
				width: '200px',
				height: '150px',
				maxWidth: '210px',
				controlBar: true,
				minMenu: UIConsts.Usability.invisible,
				minable: UIConsts.Usability.invisible,
				maxMenu: UIConsts.Usability.invisible,
				maxble: UIConsts.Usability.invisible,
				closeMenu: UIConsts.Usability.available,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
				position: 'ct',
				shade: true,
				movable: true
			},
			prompt: {
				width: '300px',
				height: '180px',
				maxWidth: '210px',
				controlBar: true,
				minMenu: UIConsts.Usability.invisible,
				minable: UIConsts.Usability.invisible,
				maxMenu: UIConsts.Usability.invisible,
				maxble: UIConsts.Usability.invisible,
				closeMenu: UIConsts.Usability.available,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
				position: 'ct',
				shade: true,
				movable: true,
				inputMode: UIConsts.inputMode.multiLine
			},
			rectangleLodding: {
				width: '30%',
				height: '10px',
				left: '30%',
				color1: '#96D923',
				color2: 'rgba(135, 141, 62, 0.54)'
			},
			rectangleProgress: {
				width: '40%',
				height: '20px',
				left: '30%',
				color: 'red',
			},
			htmlPage: {
				width: '900px',
				height: '700px',
				controlBar: true,
				shade: false,
				minMenu: UIConsts.Usability.available,
				minable: UIConsts.Usability.available,
				maxMenu: UIConsts.Usability.available,
				maxble: UIConsts.Usability.available,
				closeMenu: UIConsts.Usability.available,
				closeBle: UIConsts.Usability.available,
				icon: Asgc.Consts.default, //不配置则无图标，default为默认图标，自定义图标则传入图标路径
				movable: true,
			}
		};
})();