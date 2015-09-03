

/*
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var bCrypt = require('bcrypt-nodejs');



module.exports = function(passport){

    passport.use('forgot', new LocalStrategy({
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },

        async.waterfall([
            function(done) {
                crypto.randomBytes(16, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
                    if (!user) {
                        req.flash('errors', { msg: 'No account with that email address exists.' });
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                var transporter = nodemailer.createTransport({
                    service: 'SendGrid',
                    auth: {
                        user: secrets.sendgrid.user,
                        pass: secrets.sendgrid.password
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'honzik1984415@gmail.com',
                    subject: 'Reset your password on Honzik Kasperak',
                    text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                    req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
                    done(err, 'done');
                });
            }
        ]))
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}*/
