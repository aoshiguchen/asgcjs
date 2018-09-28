Asgc.UI.win10.config.prompt = (function(){

	var UIConsts = Asgc.Consts.UI;

	return {
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
		inputMode: UIConsts.inputMode.multiLine,
		activable: false,
	};
})();