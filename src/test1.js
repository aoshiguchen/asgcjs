// function A(options){
// 	if(!(this instanceof arguments.callee)){
// 		throw new Error('调用方式有误!');
// 	}
// 	this.options = options;

// 	this.a = function(){
// 		console.log('A: a...')
// 	}

// 	this.b = function(key){
// 		console.log('key:' + key + ' val:' + this.options[key]);
// 	}
// }

// function B(options){
// 	A.apply(this,arguments);

// 	this.a = function(){
// 		console.log('B: a...')
// 	}


// }

// B.prototype = new A();

// var a = new A({a:1});
// var b = new B({b:2});

// console.log(a.options)
// console.log(b.options)
// console.log(a instanceof A)
// console.log(b instanceof B)
// console.log(b instanceof A)

// a.a();
// b.a();
// a.b('a')
// b.b('b')


function A(options){
	if(!(this instanceof arguments.callee)){
		throw new Error('调用方式有误!');
	}

	console.log('new A',options);
}

function b(a){
	return {
		new: function(options){
			new a(options);
		}
	}
}

b(A).new({a:1});