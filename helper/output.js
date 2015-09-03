

exports.render = function(req, res, view, data) {
	var query = require('url').parse(req.url, true).query;

	if (query && query.format && (query.format).toLowerCase() == 'json') {
		res.setHeader('Content-Type', 'application/json');

		res.end(JSON.stringify(data));
	} else {

		res.render(view, data);
	}
};