var output = rootRequire('helper/output.js');

var USERS = rootRequire('db/models/Users').Users;

/**************************************************************************
 Below function used for authenticating user
 *************************************************************************/

exports.authenticate = function(req, res) {

	//test methode
	res.send({
		status : 1,
		message : "Login successfull."
	})

}


