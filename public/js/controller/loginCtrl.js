/*

 author : Ailen Wilson
 Date : 17 July 2015
 Description : This controller used for below functionality -
 i) Login
 ii) Signup
 iii)Forgot Password
 iv) Reset Password

 */

var app = angular.module('controllers', []).controller('LoginCtrl', function($scope, $filter, $timeout, $window, $location, $rootScope, AccessModel, toaster, ipCookie, $stateParams, Intercom, $http) {

	$scope.contentTitle = "You do not have any active campagins. Create One:";

	if (ipCookie('user_id'))
		$window.location.href = '#/dashboard'

	/*******************Data initializtion*******************/

	var singupUrl = "signup"
	var loginUrl = "login"
	var forgotUrl = "forgot"
	var userData = {}

	$scope.showStepTwo = false;
	$scope.full_name = '';
	$scope.email_address = "";
	$scope.password = '';
	$scope.cnum = '';
	$scope.cexpiry = "";
	$scope.ccode = '';
	$scope.forgot_email_address = ''
	$scope.password_reset = '';
	$scope.password_reset_confirm = '';
	
	
	alert(typeof new Date('2011-04-11'));

	/*********************Test code for xml request********************************/

	/*
	$scope.data = {
	"request" : {
	"category" : {
	"name" : "Gasoline"
	},
	"_method" : "category.create"
	}
	};*/
	/*$scope.url = "https://test5267.freshbooks.com/api/2.1/xml-in";
	$scope.data = '<?xml version="1.0" encoding="utf-8"?> <request method="category.create">  <category><name>Gasoline</name>  <!-- (Required) Category name -->  </category></request>  ';
	alert($scope.url);
	alert($scope.data);
	$scope.config = "{'Content-Type': 'application/xml','Authorization': 'fa515e1972c37351620e33ad1d110e53','Authentication Token':'fa515e1972c37351620e33ad1d110e53',}";

	alert($scope.config);

	$http.post($scope.url, {
	data : $scope.data,
	headers : $scope.config
	}).then(function(data) {

	alert("http request was successful");
	alert("data is : " + data);
	alert("status is : " + status);

	})
	.error(function(data, status) {

	alert("http request failed");
	alert("data is : " + data);
	alert("status is : " + status);
	});*/
	/*
	var oauth_data = {
	'oauth_consumer_key' : oauth_consumer_key,
	'oauth_callback' : callback,
	'oauth_signature' : oauth_consumer_secret + '&',
	'oauth_signature_method' : 'PLAINTEXT',
	'oauth_version' : '1.0',
	'oauth_timestamp' : new Date().getTime(),
	'oauth_nonce' : 'abcdvdvdfsasdasadadsagsdfdgdvdsfdsv'

	}

	var oauth_consumer_key = 'test5267';
	var callback = 'https://test5267.freshbooks.com';
	var oauth_consumer_secret = '365ekW7kENz8WfqwvKkXaf7sVfAAuhR6VH';

	$http.post('https://test5267.freshbooks.com/oauth/oauth_request.php', oauth_data, {
	'Access-Control-Allow-Origin' : '*',
	'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers' : 'Content-Type, X-Requested-With',
	'X-Random-Shit' : '123123123'
	}).then(function(result) {
	alert(result);
	});*/

	//Below condition used to check token is valid if reset/:token path is called
	if ($stateParams.token) {

		AccessModel.getdata('/reset/' + $stateParams.token, {}).then(function(result) {

			if (result.data.status) {

			} else {

				$scope.toaster = {
					type : 'error',
					title : 'Login',
					text : result.data.message
				};

				toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
				$window.location.href = '#/login'
			}

		})
	}

	//Below function used to reset password if token is valid
	$scope.resetPassword = function() {

		if ($scope.password_reset != '' && $scope.password_reset_confirm != '' && $scope.password_reset_confirm == $scope.password_reset) {
			if ($stateParams.token) {

				AccessModel.create('/reset/' + $stateParams.token, {
					password : $scope.password_reset_confirm
				}).then(function(result) {

					if (result.data.status) {

						$scope.toaster = {
							type : 'success',
							title : 'Success',
							text : result.data.message
						};

						toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

						$scope.password_reset = '';
						$scope.password_reset_confirm = '';
						//setting up cookie for current user

						ipCookie.remove('user_id')
						ipCookie('user_id', result.data.user.id, {
							expires : ''
						})

						$window.location.href = '#/dashboard'

					} else {

						$scope.toaster = {
							type : 'error',
							title : 'Login',
							text : result.data.message
						};
						toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

						$window.location.href = '#/login'
					}

				})
			} else {

				alert("no user id param found.")
			}

		} else {

			return false;

		}

	}
	//Below function used to render next step for signup
	$scope.nextStepSignUp = function() {

		if ($scope.full_name != '' && $scope.email_address != '' && $scope.password != '') {
			$scope.showStepTwo = true;

			userData = {

				full_name : $scope.full_name,
				username : $scope.email_address,
				password : $scope.password

			}

		} else {

			return false;

		}

	}
	//Below function used to register user
	$scope.signUp = function() {

		if ($scope.cnum != '' && $scope.cexpiry != '' && $scope.ccode != '') {

			userData.cnum = $scope.cnum
			userData.cexpiry = $scope.cexpiry
			userData.ccode = $scope.ccode

			AccessModel.create(singupUrl, userData).then(function(result) {

				if (result.data.status) {

					$scope.full_name = '';
					$scope.email_address = "";
					$scope.password = '';
					$scope.cnum = '';
					$scope.cexpiry = "";
					$scope.ccode = '';

					$scope.toaster = {
						type : 'success',
						title : 'SignUp',
						text : result.data.message
					};

					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

				} else {

					$scope.toaster = {
						type : 'error',
						title : 'SignUp',
						text : result.data.message
					};

					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

				}

			})
		} else {

			return false;

		}

	}
	//Below function used to authenticate user email for login
	$scope.login = function() {

		if ($scope.email_address == '' || $scope.password == '')
			return false;

		var authuserData = {
			username : $scope.email_address,
			password : $scope.password

		}

		//Set cookie expire time if keep me logged in checked
		if ($scope.keep_logged) {
			var now = new Date();
			var expireDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
		} else {
			var expireDate = ''
		}

		AccessModel.create(loginUrl, authuserData).then(function(result) {

			if (result.data.status) {

				//setting up cookie for current user
				ipCookie('user_id', result.data.user.id, {
					expires : expireDate
				})

				ipCookie('user', result.data.user, {
					expires : expireDate
				})

				$rootScope.profile_pic = result.data.user.profile_pic;

				Intercom.bootIntercom(result.data.user);

				$window.location.href = '#/dashboard'

			} else {

				$scope.toaster = {
					type : 'error',
					title : 'Login',
					text : result.data.message
				};
				toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
			}

		})
	}
	//Below function used to post user email for forgot password
	$scope.forgotPassword = function() {

		if ($scope.forgot_email_address != '' && $scope.forgot_email_address.indexOf('@') > 0) {
			var data = {
				email : $scope.forgot_email_address
			}

			AccessModel.create(forgotUrl, data).then(function(result) {

				if (result.data.status) {

					$scope.toaster = {
						type : 'success',
						title : 'Forgot Password',
						text : result.data.message
					};
					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

				} else {

					$scope.toaster = {
						type : 'error',
						title : 'Login',
						text : result.data.message
					};
					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
				}

			})
		} else {

			return false;

		}
	}
})