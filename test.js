
function classA () {
	
}

classA.prototype.say = function  (args) {
	console.log('saying');
}

classA.prototype.write = function  (args) {
	console.log('writing');
}

function wrap_prop (fn) {
	if(typeof fn !== 'function'){
		return ;
	}

	Object.keys(fn.prototype).forEach( propName => {
		var nature_prop = fn.prototype[propName];
		fn.prototype[propName] = function  () {
			console.log(this.constructor.name + '\'s ' +  'method >> ' + propName + ' << called');
			console.log('arguments: ', arguments);
			nature_prop.apply(this, arguments);
		}
	});
}

wrap_prop(classA);

var a = new classA();

a.say('hello');

a.write('world');
