var LocalStrategy = require('passport-local').Strategy;
var USERS = rootRequire('db/models/Users').Users;
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('reset', new LocalStrategy({
		passReqToCallback : true // allows us to pass back the entire request to the callback
	}, async.waterfall([
	function(done) {
		USERS.find({
			where : {
				resetPasswordToken : req.params.token,
				resetPasswordExpires : {
					ge : Date.now()
				}

			}
		}).complete(function(err, user) {
			if (!user) {
				req.flash('errors', {
					msg : 'Password reset token is invalid or has expired.'
				});

				return done(null, false, {
					'message' : 'Password reset token is invalid or has expired.',
					'status' : 0
				});
				//return res.redirect('back');
			}

			user.password = createHash(req.body.password);
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;

			user.save(function(err) {
				if (err)
					return next(err);
				req.logIn(user, function(err) {

					return done(null, user, {
						'message' : 'login successfull.',
						'status' : 1,
						'user' : user
					});
					//done(err, user);
				});
			});
		});
	},

	function(user, done) {

		var transporter = nodemailer.createTransport({
			service : 'SendGrid',
			auth : {
				user : secrets.sendgrid.user,
				pass : secrets.sendgrid.password
			}
		});

		var mailOptions = {
			to : user.email,
			from : 'honzik1984415@gmail.com',
			subject : 'Your Honzik Kasperak password has been changed',
			text : 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		};
		transporter.sendMail(mailOptions, function(err) {
			req.flash('success', {
				msg : 'Success! Your password has been changed.'
			});
			done(err);
		});
	}])));

	// Generates hash using bCrypt
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}