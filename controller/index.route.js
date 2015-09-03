/*

 Author : Ailen Wilson
 Date : 17 July 2015
 Description : This controller used for below functionality -
 i) Forgot Password
 ii) Reset Password

 */

var output = rootRequire('helper/output.js');
//used to provide response into json if req hase format=json in query string

var USERS = rootRequire('db/models/Users').Users;
//used to manipulate user table/model

var emailNotifier = rootRequire('helper/email-config-and-send.js');
//used to send email

var async = require('async');
//for synchronous function calling

var crypto = require('crypto');
//used to generate reset password token

var bCrypt = require('bcrypt-nodejs');
//used to generate encrypted password

exports.homepage = function(req, res) {

	output.render(req, res, 'index', {
		title : 'homepage',
		user_id : ''
	})

}

exports.forgotPassward = function(req, res) {

	async.waterfall([
	function(done) {
		crypto.randomBytes(20, function(err, buf) {
			var token = buf.toString('hex');
			done(err, token);
		});
	},
	function(token, done) {

		USERS.find({
			where : {
				email_address : req.body.email
			}
		}).complete(function(err, user) {
			if (!user) {
				req.flash('error', 'No account with that email address exists.');
				return res.send({
					status : 0,
					message : 'No account with that email address exists.'
				});
			}

			user.resetPasswordToken = token;
			user.resetPasswordExpires = Date.now() + 3600000;
			// 1 hour

			user.save().complete(function(err) {
				if (!!err) {
					throw (err);

					// res.send(err);
				} else {

					done(err, token, user);

				}

			});

		});
	},
	function(token, user, done) {

		var subject = 'Forgot Password Recovery';
		var message = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://' + req.headers.host + '/#/reset/' + token + '\n\n' + 'If you did not request this, please ignore this email and your password will remain unchanged.\n';
		var body = ''//body should be html code

		emailNotifier.notifyByMail(req, res, user.email_address, subject, message, body)

		return res.send({
			status : 1,
			message : 'An e-mail has been sent to ' + user.email_address + ' with further instructions.'
		});

	}], function(err) {
		if (err) {
			return res.send({
				status : 0,
				message : 'error occured',
				error : err
			});

			console.log(err)
		}

	})
}

exports.resetPassword = function(req, res) {

	async.waterfall([
	function(done) {
		USERS.find({
			where : {
				resetPasswordToken : req.params.token,
				resetPasswordExpires : {
					gt : Date.now()
				}
			}
		}).complete(function(err, user) {

			if (!user) {
				req.flash('error', 'Password reset token is invalid or has expired.');
				return res.send({
					status : 0,
					message : 'Password reset token is invalid or has expired.',

				});
			}

			if (err)
				console.log(err)

			user.password = createHash(req.body.password);
			user.resetPasswordToken = null;
			user.resetPasswordExpires = null;

			user.save().complete(function(err) {
				req.logIn(user, function(err) {
					done(err, user);
				});
			});
		});
	},

	function(user, done) {

		var subject = 'Password Changed Confirmation';
		var message = 'You are password has been changed.You can login now to Freshmetrics.';
		var body = ''//body should be html code

		emailNotifier.notifyByMail(req, res, user.email_address, subject, message, body)

		return res.send({
			status : 1,
			message : 'You are password has been changed successfully.',
			user : user
		});

	}], function(err) {
		if (err) {
			return res.send({
				status : 0,
				message : 'error occured',
				error : err
			});
			console.log(err)
		}

	})
	// Generates hash using bCrypt
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
}

exports.changePassword = function(req, res) {

	console.log("req bodyyy", req.body)

	var password = req.body.password

	async.waterfall([
	function(done) {
		USERS.find({
			where : {
				id : req.params.user_id,
			}
		}).complete(function(err, user) {

			if (!user) {
				req.flash('error', 'Invalid user!.');
				return res.send({
					status : 0,
					message : 'Invalid user!.',

				});
			}

			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return res.send({
					message : 'Invalid Password.',
					status : 0
				});
				// redirect back to login page
			}

			if (err)
				console.log(err)

			user.password = createHash(req.body.new_password);
			user.resetPasswordToken = null;
			user.resetPasswordExpires = null;

			user.save().complete(function(err) {

				done(err, user);

			});
		});
	},

	function(user, done) {

		var subject = 'Password Changed Confirmation';
		var message = 'You are password has been changed.You can login now to Freshmetrics.';
		var body = ''//body should be html code

		emailNotifier.notifyByMail(req, res, user.email_address, subject, message, body)

		return res.send({
			status : 1,
			message : 'You are password has been changed successfully.',
			user : user
		});

	}], function(err) {
		if (err) {
			return res.send({
				status : 0,
				message : 'error occured',
				error : err
			});
			console.log(err)
		}

	})
	// Generates hash using bCrypt
	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	}
	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	}
}

exports.emailExists = function(req, res) {

	console.log("req bodyyy", req.body)

	USERS.find({
		where : [' email_address = ? AND id != ?', req.body.email_address, req.params.user_id],
	}).on('success', function(emailExist) {
		if (emailExist) {
			

			res.send({
				"error" : "Email Id already exist.",
				"message" : "Email Id already exist.",
				"status" : 0,

			});

		} else {
			
			res.send({
				status : 1,

			});

		}

	})
}

exports.test = function(req, res) {

	console.log("calllllllllllllllllllllllllleddddddd")

	USERS.findAll({}).on('success', function(instance) {

		console.log(instance);

	});

	output.render('index', {
		title : 'homepage',
		user_id : ''
	})

}

