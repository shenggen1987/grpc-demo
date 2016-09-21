var path = require('path');
var fs = require('fs');
module.exports = function(obj){
	loadMiddleWare('request_user');
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
              	// return err = '错误';
              	args[1].call(this, err, response)
              });
              console.log(result);
              return result;
          };
      }
  };
  return new Proxy(obj, handler);
}

function loadMiddleWare(middleware){
	var arr = [];
	var config_root_path = path.resolve(__dirname, './', './middleware/');
	var dd = load_config(path.resolve(config_root_path, 'request_user.js'));
	arr.push({
		middleware: dd
	});
	console.log(arr);
	var aa = arr[0]['middleware'](222);
	console.log(1111);
	console.log(aa);
}
function load_config(path, must_have) {
	console.log(path);
    try {
        fs.statSync(path);
    } catch (e) {
        console.log(path, 'not exists');
    }
    return require(path);
}