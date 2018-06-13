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
				display: 'block'
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
				shade: true
			},
			msg: {
				width: '100px',
				height: '30px',
				menuBar: false,
				aliveTime: 2000,
				maxWidth: '150px'
			}
		};
})();