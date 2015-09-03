var LocalStrategy = require('passport-local').Strategy;
var USERS = rootRequire('db/models/Users').Users;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	}, function(req, username, password, done) {
		/*console.log(username + "username");*/
		// check in mysql if a user with username exists or not
		USERS.find({
			where : {
				'email_address' : username
			}
		}).complete(function(err, user) {
			// In case of any error, return using the done method
			if (err)
				return done(err);
			// Email does not exist, log the error and redirect back
			if (!user) {
				console.log('User Not Found with email ' + username);
				return done(null, false, {
					'message' : 'User not registered.',
					'status' : 0
				});
			}
			// User exists but wrong password, log the error
			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return done(null, false, {
					'message' : 'Invalid Password.',
					'status' : 0
				});
				// redirect back to login page
			}
			// User and password both match, return user from done method
			// which will be treated like success
			return done(null, user, {
				'message' : 'login successfull.',
				'status' : 1,
				'user' : user
			});
		});

	}));

	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	}
}