var nodemailer = require('nodemailer');

exports.notifyByMail = function(req, res, receiver_email, subject, message, body) {

	var transporter = nodemailer.createTransport({
		service : 'gmail',
		auth : {
			user : 'xxxxxxx@gmail.com',
			pass : 'xxxxxxxxxx'
		}
	});

	transporter.sendMail({
		from : 'sender@address',
		to : receiver_email,
		subject : subject,
		text : message,
		html : body,
	}, function(error, response) {

		if (error) {
			console.log('Email Send Error:', error);
			//throw (error);
		} else {
			console.log("Successfully email send");

		}
	});

}
