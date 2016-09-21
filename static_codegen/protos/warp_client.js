var _ = require('lodash');
module.exports = function(obj){
	var handler = {
      get(target, propKey, receiver) {
          const origMethod = target[propKey];
          return function (...args) {
          		args[0].setName('22323');
          		console.log('request intercept:setName:  22323');
          		// _controller(args[1]);
          		// console.log(getArgs(args[1]));

  						// console.log(typeof args[1]);
              console.log(propKey + ' -> ' );
              // var result = origMethod.apply(obj, args);
              var result = origMethod.call(obj, args[0], function(err, response){
              	console.log('response intercept:' +response.getMessage());
              	args[1].call(this, err, response)
              });
              console.log(result);
              return result;
          };
      }
  };
  return new Proxy(obj, handler);
}

function wrap_prop (fn) {
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

// function _controller(func){
// 		console.log(func.err);
//   }



function wrap(v) {
    if(typeof v == 'function'){
        return _controller(v);
    }else{
        return _.reduce(v,function (re,func,url) {
            if(!re[url]){
                re[url] = _controller(func);
            }
            return re;
        },{});
    }
    function _controller(func){
    	console.log(55);
        return function (req,res) {
            //绑定athis而不是this,解决高并发情况下输出流会混乱的问题
            var athis = {};
            athis.err = err;
            athis.res = res;
            console.log(444);
            //每次请求都会new一个对象，解决异步导致缓存错乱的问题
            func.apply(athis,arguments);
        };
    }
}

  function getArgs(func) {
  	var foo = {err: null, response: null};
  	var bar = function(){
        console.log(this.response);
    }
    var boundFunc = bar.bind(func);
    boundFunc(); 
  // First match everything inside the function argument parens.
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
  // Split the arguments string into an array comma delimited.
  return args.split(',').map(function(arg) {
    // Ensure no inline comments are parsed and trim the whitespace.
    return arg.replace(/\/\*.*\*\//, '').trim();
  }).filter(function(arg) {
    // Ensure no undefined values are added.
    return arg;
  });
}