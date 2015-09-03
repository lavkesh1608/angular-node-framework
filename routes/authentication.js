var authroute = rootRequire('controller/auth.route.js');

exports.configureRoutes = function(app, passport) {

	app.post('/authenticate', authroute.authenticate);

};
