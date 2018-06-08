//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.types = (function(){ 
	var types = {};

	types.getType = function(val){
		var typeStrig = toString.call(val);

		return typeStrig.slice(8,typeStrig.length - 1);
	}

	types.isType = function(val,type){

		return types.getType(val) === type;
	}

	types.isString = function(val){

		return types.isType(val,'String');
	}

	types.isNull = function(val){

		return types.isType(val,'Null');
	}

	types.isNumber = function(val){

		return types.isType(val,'Number');
	}

	types.isBoolean = function(val){

		return types.isType(val,'Boolean');
	}

	types.isUndefined = function (val){

		return types.isType(val,'Undefined');
	}

	types.isArray = function(val){

		return types.isType(val,'Array');
	}

	types.isObject = function(val){

		return types.isType(val,'Object');
	}

	types.isRegExp = function(val){

		return types.isType(val,'RegExp');
	}

	types.isFunction = function(val){

		return types.isType(val,'Function');
	}

	types.isWindow = function(val){

		return types.isType(val,'Window');
	}

	types.isArguments = function(val){

		return types.isType(val,'Arguments');
	}

	return types;
})();