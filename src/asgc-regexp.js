//--------------------------------------------------------------------
//Asgc JS 0.0.1
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.RegExp = (function(){
	var Consts = {
		VAR_NAME: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
		VAL1: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(\[([0-9]+)\])?$/,
		VAL2: /^([a-zA-Z_$][a-zA-Z0-9_$]*)?$/
	};

	function analysisVal1(str){
		if(!str) return null;

		var tmp = Consts.VAL1.exec(str);
		if(!tmp) return null;

		var ret = {};

		ret.name = tmp[1];
		ret.index = tmp[3];

		return ret;
	}

	return {
		Consts: Consts,
		analysisVal1: analysisVal1
	};
})();