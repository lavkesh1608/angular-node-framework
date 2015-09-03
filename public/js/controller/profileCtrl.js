freshmetric.controller('ProfileCtrl', function($scope, $filter, $window, AccessModel, ModalService, $rootScope, ipCookie, toaster) {
	if (!ipCookie('user_id'))
		$window.location.href = '#/login'

	$scope.profile = {}

	//$scope.changePassword = false;

	var updateUserUrl = '/user/update/' + ipCookie("user_id");
	var profile_picture = '';
	var upload_image = false;

	$scope.onFileSelect = function($files) {

		upload_image = true;
		//$files: an array of files selected, each file has name, size, and type.
		for (var i = 0; i < $files.length; i++) {
			var file = $files[i];
			profile_picture = file;
		}
	}
	/*
	 $scope.showChangePassword = function() {

	 $scope.changePassword = true;

	 }*/

	$scope.updateMyProfile = function() {

		var imageUploadUrl = "/upload-image";
		var imageData = {
			user_id : ipCookie('user_id')
		}

		var filename = "image_name";

		if (upload_image) {

			AccessModel.uploadImage(imageUploadUrl, imageData, profile_picture, filename).success(function(data, status, headers, config) {

				if (!data) {

				} else {

					$rootScope.profile_pic = data.image;

				}

			});
		}

		var checkExpand = angular.element($window.document.getElementById('checkCollapse')).attr("aria-expanded");

		if (checkExpand == "true") {

			if ($scope.profile.old_password != undefined && $scope.profile.old_password != '' && $scope.profile.new_password != undefined && $scope.profile.new_password != '' && $scope.profile.confirm_password != undefined && $scope.profile.confirm_password != '') {

				if ($scope.profile.new_password == $scope.profile.confirm_password) {

					$scope.profile.match_error = "";

					AccessModel.create('change-password/' + ipCookie('user_id'), {
						password : $scope.profile.old_password,
						new_password : $scope.profile.confirm_password
					}).then(function(result) {

						console.log("dataaaaaaaaa", JSON.stringify(result))

						if (result.data.status) {

							$scope.toaster = {
								type : 'success',
								title : 'Password Change',
								text : result.data.message
							};

							toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

							AccessModel.create(updateUserUrl, {
								full_name : $scope.profile.first_name + ' ' + $scope.profile.last_name,
								email_address : $scope.profile.email_address
							}).then(function(result) {

								console.log("ressssssssssssss", JSON.stringify(result))

								if (result.data.status) {

									$scope.toaster = {
										type : 'success',
										title : 'Profile Update',
										text : result.data.message
									};

									toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

								} else {

									$scope.toaster = {
										type : 'error',
										title : 'Profile Update',
										text : result.data.message
									};

									toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

								}

							});

						} else {

							$scope.toaster = {
								type : 'error',
								title : 'Password Change',
								text : result.data.message
							};

							toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

						}

					})
				} else {

					$scope.profile.match_error = "Confirm and New Password Must be equal!";

					return false;

				}

			}

		}

		if (!checkExpand || checkExpand == 'false') {
			AccessModel.create(updateUserUrl, {
				full_name : $scope.profile.first_name + ' ' + $scope.profile.last_name,
				email_address : $scope.profile.email_address
			}).then(function(result) {

				if (result.data.status) {

					$scope.toaster = {
						type : 'success',
						title : 'Profile Update',
						text : result.data.message
					};

					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

				} else {

					$scope.toaster = {
						type : 'error',
						title : 'Profile Update',
						text : result.data.message
					};

					toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

				}

			});

		}

	}

	AccessModel.getdata('/user/' + ipCookie('user_id'), {}).then(function(result) {

		if (result.data.status) {

			$scope.profile = result.data.user

			$rootScope.profile_pic = result.data.user.profile_pic;

			$scope.profile.first_name = result.data.user.full_name.substr(0, result.data.user.full_name.indexOf(' '))

			$scope.profile.last_name = result.data.user.full_name.substr(result.data.user.full_name.indexOf(' ') + 1, result.data.user.full_name.length)

		} else {

			ipCookie.remove('user_id')
			ipCookie.remove('user')

			$scope.toaster = {
				type : 'error',
				title : 'Login',
				text : result.data.message
			};

			toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);

			$window.location.href = '#/login'
		}

	})
})