//--------------------------------------------------------------------
//Asgc UI 1.0.0
//作者：傲世孤尘
//QQ：1052045476
//交流群：527393872
//发布日期：2018-05-24
//--------------------------------------------------------------------
Asgc.cache = (function(){
	var storage = window.localStorage;

	return {
	    set: function(k,v){
	      storage.setItem(k,v);
	      return this;
	    },

	    get: function(k){
	      return storage.getItem(k) || '';
	    },

	    clear: function(){
	    	storage.clear();

	    	return this;
	    },

	    switchLocalStorage: function(){
	    	storage = window.localStorage;
	    	return this;
	    },

	    switchSessionStorage: function(){
	    	storage = window.sessionStorage;
	    	return this;
	    },

	    setJson: function(k,v){
	      storage.setItem(k,JSON.stringify(v));
	      return this;
	    },

	    getJson: function(k){

	      var val = storage.getItem(k);

	      if(!val) return {};
	      else return JSON.parse(val);
	    },

	    setJsonProperty: function(k,property,v){
	    	var data = this.getJson(k);
	    	data[property] = v;
	    	this.setJson(k,data);
	    	return this;
	    },

	    getJsonProperty: function(k,property){
	    	var data = this.getJson(k);

	    	return data[property];
	    },

	    getString: function(k){
	    	return this.get(k);
	    },

	    getInt: function(k){
	    	return parseInt(this.get(k));
	    },

	    getFloat: function(k){
	    	return parseFloat(this.get(k));
	    },

	    getNumber: function(k){
	    	return new Number(this.get(k));
	    },

	    getBoolean: function(k){
	    	return this.get(k) === 'true';
	    },

	    getDate: function(k){
	    	return new Date(this.get(k));
	    },

	    //超级设值
	    //如：s('a.b.c',10); => a:{b:{c:10}}
	    //暂不支持数组下标
	    s: function(k,v){
	    	if(!k) return this;

	    	var ks = k.split('.');

	    	if(ks.length === 1) return this.set(k,v);

	    	var data = this.getJson(ks[0]);

	    	function solve(data,ks,n){
	    		if(n === ks.length - 1){
	    			data[ks[n]] = v;
	    			return;
	    		}

    			if(!data[ks[n]]) data[ks[n]] = {};
    			if(!Asgc.types.isObject(data[ks[n]])){
	    			logger.error('错误的引用! k:' + k);
	    			return;
	    		}
    			solve(data[ks[n]],ks,n+1);
					    		
	    	}

	    	solve(data,ks,1);

	    	this.setJson(ks[0],data);

	    	return this;
	    },
	    //超级取值
	    //如：a:{b:{c:10}} g('a.b.c') => 10
	    //暂不支持数组下标
	    g: function(k){
	    	if(!k) return '';
	    	var ks = k.split('.');

	    	if(ks.length === 1) return this.get(k);

	    	var data = this.getJson(ks[0]);

	    	function solve(data,ks,n){
	    		if(n === ks.length - 1){
	    			return data[ks[n]];
	    		}

	    		if(!data[ks[n]]) return '';
	    		if(!Asgc.types.isObject(data[ks[n]])){
	    			logger.error('错误的引用! k:' + k);
	    			return '';
	    		}

	    		return solve(data[ks[n]],ks,n+1);

	    	}

	    	return JSON.stringify(solve(data,ks,1));
	    },

	    sJson: function(k,v){
	      this.s(k,JSON.stringify(v));

	      return this;
	    },

	    gJson: function(k){

	      var val = this.g(k);

	      if(!val) return {};
	      else return JSON.parse(val);
	    },

	    gString: function(k){
	    	return this.g(k);
	    },

	    gInt: function(k){
	    	return parseInt(this.g(k));
	    },

	    gFloat: function(k){
	    	return parseFloat(this.g(k));
	    },

	    gNumber: function(k){
	    	return new Number(this.g(k));
	    },

	    gBoolean: function(k){
	    	return this.g(k) === 'true';
	    },

	    gDate: function(k){
	    	return new Date(this.g(k));
	    },

   };
})();