var userroute = rootRequire('controller/user.route.js');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var isAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();

	// if the user is not authenticated then redirect him to the login page
	res.send({
		status : 0,
		message : "Authentication Failed."
	});
}

exports.configureRoutes = function(app, passport) {

	app.get('/user/:user_id', isAuthenticated, userroute.getUser);

	app.post('/upload-image', isAuthenticated, multipartMiddleware, userroute.uploadImage);

	app.post('/user/update/:user_id', isAuthenticated, userroute.updateUserProfile);

};
