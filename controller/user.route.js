var output = rootRequire('helper/output.js');
var USERS = rootRequire('db/models/Users').Users;

var async = require('async');
//for synchronous function calling

var fs = require('node-fs');

/**************************************************************************
 Below function used to get user by Id
 *************************************************************************/

exports.getUser = function(req, res) {

	var user_id = req.params.user_id;

	console.log(user_id)

	USERS.find({
		where : {
			id : user_id
		}
	}).complete(function(err, user) {
		if (err)
			console.log("errrrrrrrrrrrrr" + err);

		res.send({
			status : 1,
			user : user
		})

	})
}

exports.uploadImage = function(req, res) {

	console.log("call ajaxUploadCompanyLogo");
	var user_data_str = req.body.data;

	var user_data_obj = JSON.parse(user_data_str);

	var file_name;
	var time = new Date().getTime();
	console.log("image upload++");
	console.log("target_path==" + req.files.image_name.fieldName);

	if ( typeof req.files.image_name != "undefined") {

		console.log("req.files.profile_pic not undefined==");

		var tmp_path = req.files.image_name.path;

		var base = process.env.PWD;

		file_name = req.files.image_name.name;

		var upload_dir = base + '/public/pictures/'

		if (!fs.existsSync(upload_dir)) {

			console.log("rpictures  pictures==");

			fs.mkdirSync(upload_dir)

		}

		upload_dir = upload_dir + '/users/'

		if (!fs.existsSync(upload_dir)) {

			console.log("users  usersusers==");

			fs.mkdirSync(upload_dir);

		}

		var target_path = upload_dir + time + file_name;
		console.log("target_path++++++" + target_path);

		console.log("tmp_path+++++++" + tmp_path);
		if (req.files.image_name.name) {

			console.log("file is uploaded==");
			fs.rename(tmp_path, target_path, function(err) {
				if (err)
					console.log("error in remname image =" + err);
				//throw err;
				// delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
				fs.unlink(tmp_path, function() {
					if (err)
						console.log("Error in image file upload==" + err);
					else {
						USERS.update({
							profile_pic : time + file_name,
						}, {
							where : {
								id : user_data_obj.user_id
							}

						}).on('success', function(upload_image) {
							console.log("Image upload successfully");
						});

					}
					//throw err;
				});
			});

		} else {

			time = '';
			file_name = '';
		}

		res.send({
			"status" : 1,
			"image" : time + file_name
		});

	} else {

		time = '';
		file_name = '';

		res.send({
			"status" : 0,
			"image" : time + file_name
		});

	}
}

exports.updateUserProfile = function(req, res) {

	console.log("req bodyyy", req.params.user_id)

	async.waterfall([
	function(done) {

		USERS.find({
			where : ['email_address = ? AND id != ?', req.body.email_address, req.params.user_id]
		}).on('success', function(emailExist) {
			if (emailExist) {

				return res.send({
					"error" : "Email Id already exist.",
					"message" : "Email Id already exist.",
					"status" : 0,

				});

			} else {

				USERS.find({
					where : {
						id : req.params.user_id,
					}
				}).complete(function(err, user) {

					if (!user) {

						return res.send({
							status : 0,
							message : 'Invalid user!.',

						});
					}

					if (err)
						console.log(err)

					user.email_address = req.body.email_address;
					user.full_name = req.body.full_name;
					user.save().complete(function(err) {

						done(err, user);

					});

				});

			}

		}).on('error', function(err) {
			console.log(err)
		})
	},

	function(user, done) {

		return res.send({
			status : 1,
			message : 'You are profile updated successfully.',
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
}
