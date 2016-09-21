module.exports = function(client, method){
	var _render = method;
    return function (req, func) {
        console.log(req);
        _render.call(client,req,func);
    }
}