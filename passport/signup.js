var LocalStrategy = require('passport-local').Strategy;
var USERS = rootRequire('db/models/Users').Users;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('signup', new LocalStrategy({
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, function(req, username, password, done) {

		console.log("node service called")

		findOrCreateUser = function() {
			// find a user in Mysql  with provided username
			USERS.find({
				where : {
					'email_address' : username
				}
			}).complete(function(err, user) {
				// In case of any error, return using the done method
				if (err) {
					console.log('Error in SignUp: ' + err);
					return done(err);
				}
				// already exists
				if (user) {
					console.log('User already exists with email: ' + username);
					return done(null, false, {
						'message' : 'User Already Exists.',
						'status' : 0
					});
				} else {

					var user = USERS.build({

						email_address : username,
						password : createHash(password),
						full_name : req.body.full_name,
						created_at : Math.floor(new Date() / 1000)

					});

					user.__factory = {
						autoIncrementField : 'id'
					};

					user.save().complete(function(err) {

						if (err) {
							console.log('Error in Saving user: ' + err);
							throw err;
						}

						console.log('User Registration succesful');
						return done(null, user, {
							'message' : '"You are registration was successsfull.Please login."',
							'status' : 1
						});

					})
				}
			});
		};
		// Delay the execution of findOrCreateUser and execute the method
		// in the next tick of the event loop
		process.nextTick(findOrCreateUser);
	}));

	// Generates hash using bCrypt
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}