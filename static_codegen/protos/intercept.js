module.exports = function(fn){
	console.log(typeof fn);
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