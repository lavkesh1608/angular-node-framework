var login = require('./login');
var signup = require('./signup');
var USERS = rootRequire('db/models/Users').Users;

module.exports = function(passport) {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(users, done) {
		console.log('serializing user: ');

		done(null, users.id);
	});

	passport.deserializeUser(function(id, done) {

		USERS.find({
			where : {
				id : id
			}
		}).complete(function(err, user) {
			if (err)
				console.log('deserializing user error:', err);

			done(err, user);
		});
	});

	// Setting up Passport Strategies for Login and SignUp/Registration
	login(passport);
	signup(passport);

}