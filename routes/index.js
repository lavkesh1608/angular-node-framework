/*

 Author : Ailen Wilson
 Date : 17 July 2015
 Description : This has routing configuration.

 */

var indexroute = rootRequire('controller/index.route.js');
//used to load index controller

var USERS = rootRequire('db/models/Users').Users;
//used to manipulate user table/model

var isAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

exports.configureRoutes = function(app, passport) {

	app.get('/home', indexroute.homepage);

	app.post('/signup', function(req, res, next) {
		passport.authenticate('signup', function(err, user, info) {
		if (err) { return next(err); }
		// Redirect if it fails
		if (!user) { return res.send(info); }
		req.logIn(user, function(err) {
		if (err) { return next(err); }
		// Redirect if it succeeds
		return res.send(info);
		});
		})(req, res, next);
	});

	app.post('/login', function(req, res, next) {
		passport.authenticate('login', function(err, user, info) {
		if (err) { return next(err); }
		// Redirect if it fails
		if (!user) { return res.send(info); }
		req.logIn(user, function(err) {
		if (err) { return next(err); }
		// Redirect if it succeeds
		return res.send(info);
		});
		})(req, res, next);
	});

	app.post('/forgot', indexroute.forgotPassward);

	app.get('/reset/:token', function(req, res) {
		USERS.find({
			where : {
				resetPasswordToken : req.params.token,
				resetPasswordExpires : {
					gt : Date.now()
				}
			}
		}).complete(function(err, user) {
			if (!user) {
				return res.send({
					status : 0,
					message : 'Password reset token is invalid or has expired.'
				});
			}

			return res.send({
				status : 1,
				message : 'Valid token user'
			});

		});
	});

	app.post('/reset/:token', indexroute.resetPassword)

	app.post('/change-password/:user_id', isAuthenticated, indexroute.changePassword)

	app.post('/email-exists/:user_id', isAuthenticated, indexroute.emailExists)

};

