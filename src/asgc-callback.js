var Callback = function(args,_default){
	if(!(this instanceof Callback)){
		return new callback(args,context);
	}

	var fn,argv = [];

	if(Asgc.types.isFunction(args)){
		fn = args;
	}else if(Asgc.types.isArray(args)){
		if(args.length <= 0){
			throw new Error('arguments invalid !');
		}else{
			argv = args.slice(0,args.length - 1);
			fn = args[args.length - 1];

			if(!Asgc.types.isFunction(fn)){
				throw new Error('arguments invalid !');
			}
		}
	}else{
		throw new Error('arguments invalid !');
	}

	this.fn = fn;
	this.argv = argv;

	if(argv.length == 0 && _default){
		this.argv = _default;
	}	
};

Callback.prototype.invoked = function(data = {},context){
	var params = [];

	if(this.argv && this.argv.length > 0){
		for(var item of this.argv){
			params.push(data[item]);
		}

		return this.fn.apply(context,params);
	}else{
		return this.fn(data)
	}
	
};

Asgc.Callback = Callback;