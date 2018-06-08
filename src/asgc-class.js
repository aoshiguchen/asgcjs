//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.Class = (function(){
	var Class = {};

	var ctx = {
		fullClassNameMap: {},
		simpleClassNameMap: {},
		packageNameMap: {}
	}; 

	function _Class(packageName,className,constructor,parentClassName){
		this.fullClassName = packageName + '.' + className;
		this.packageName = packageName;
		this.className = className;
		this.constructor = constructor;
		this.parentClassName = parentClassName;
		this.method = {};

		this.new = function(options){
			var _objContext = {};

			_objContext.fullClassName = this.fullClassName;
			_objContext.packageName = this.packageName;
			_objContext.className = this.className;
			_objContext.constructor = this.constructor;
			_objContext.parentClassName = this.parentClassName;
			_objContext.method = this.method;
			_objContext.hasSuper = false;

			if(parentClassName){
				var parentClass = Class.get(parentClassName);
				if(!parentClass){
					throw new Error('类型不存在：' + parentClassName);
				}

				_objContext.__proto__ = parentClass.new(options);
				_objContext.hasSuper = true;
				_objContext.super = _objContext.__proto__;
			}

			for(var name in this.method){
				console.log(_objContext)
				_objContext.__proto__[name] = this.method[name];
			}

			this.constructor.apply(_objContext,[options]);

			return _objContext;
		};

		this.addMethod = function(name,method){
			if(!Asgc.types.isString(name) || !Asgc.types.isFunction(method)){
				throw new Error('参数有误!');
			}

			this.method[name] = method;
		};
	}

	/**
	 * 定义一个class
	 * @param  全类名
	 * @param  构造器
	 * @param  父类
	 * @return
	 */
	Class.define = function(fullClassName,constructor,parentClassName){
		if(!Asgc.types.isString(fullClassName) || !Asgc.types.isFunction(constructor) || !(!parentClassName || Asgc.types.isString(parentClassName))){
			throw new Error('参数有误!');
		}

		var index = fullClassName.lastIndexOf('.');
		var packageName = fullClassName.substr(0,index);
		var className = fullClassName.substr(index + 1);

		var _class = new _Class(packageName,className,constructor,parentClassName);

		if(!ctx.packageNameMap[packageName]) ctx.packageNameMap[packageName] = {};

		ctx.fullClassNameMap[fullClassName] = _class;
		ctx.simpleClassNameMap[className] = _class;
		ctx.packageNameMap[packageName][className] = _class;
	};

	Class.getByFullClassName = function(fullClassName){
		return ctx.fullClassNameMap[fullClassName];
	};

	Class.getByClassName = function(className){
		return ctx.simpleClassNameMap[className];
	};

	Class.getByPackageName = function(packageName){
		return ctx.packageNameMap[packageName];
	};

	Class.get = function(name){
		var ret = Class.getByFullClassName(name);
		if(ret) return ret;

		ret = Class.getByClassName(name);

		return ret;
	};

	return Class;
})(); 

// 使用示例
// Asgc.Class.define('com.asgc.Animal',function(options){
// 	this.options = options;
// 	console.log('Animal constructor,options:' + JSON.stringify(options));
// 	this.hello2 = function(){
// 		console.log('Animal ' + this.options.name + ' hello2 !');
// 	};
// });

// var Animal = Asgc.Class.get('Animal');
// Animal.addMethod('say',function(msg){
// 	console.log('Animal ' + this.options.name + ' say : ' + msg);
// });
// Animal.addMethod('hello',function(){
// 	console.log('Animal ' + this.options.name + ' hello !');
// });

// var animal = Animal.new({name: 'aaa'});
// animal.say('hello1');
// animal.hello();
// animal.hello2();

// Asgc.Class.define('com.asgc.Dog',function(options){
// 	console.log('Dog constructor,options:' + JSON.stringify(options));
// 	this.hello = function(){
// 		console.log('Dog ' + this.options.name + ' hello !');
// 	};
// },'Animal');
// var Dog = Asgc.Class.get('Dog');
// Dog.addMethod('hello2',function(){
// 	console.log('Dog ' + this.options.name + ' hello2 !');
// });

// var dog = Dog.new({name: 'bbb'});
// dog.say('hello1');
// dog.hello();
// dog.hello2();
