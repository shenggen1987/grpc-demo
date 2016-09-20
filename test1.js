function traceMethodCalls(obj) {
			console.log(11111);
        var handler = {
            get(target, propKey, receiver) {
                const origMethod = target[propKey];
                return function (...args) {
                		console.log(args);
                		console.log(propKey + ' -> ' );
                    var result = origMethod.apply(this, args);
                    console.log(result);
                    return result;
                };
            }
        };
        return new Proxy(obj, handler);
    }

    var obj = {
        multiply(x, y) {
            return x * y;
        },
        squared(x) {
            return this.multiply(x, x);
        },
    };
var tracedObj = traceMethodCalls(obj);
  tracedObj.multiply(2,7);