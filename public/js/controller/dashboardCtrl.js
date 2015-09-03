freshmetric.controller('DashboardCtrl', function($scope, $filter, $window, ModalService, $rootScope, ipCookie) {
	if (!ipCookie('user_id'))
		$window.location.href = '#/login'

	angular.element($window.document.getElementById('full_name')).val(ipCookie('user').full_name)
	angular.element($window.document.getElementById('email_address')).val(ipCookie('user').email_address)
	angular.element($window.document.getElementById('created_at')).val(ipCookie('user').created_at)
	angular.element($window.document.getElementById('user_id')).val(ipCookie('user').id)

	//$rootScope.calendarValue = '';

	$rootScope.getUpdate = function() {

	//	alert(angular.element($window.document.getElementsByClassName('daterange')).val())

	}

	$rootScope.showConnectPopup = function(id) {

		ModalService.showModal({
			templateUrl : 'modal' + id + '.html',
			controller : "ModalController"
		}).then(function(modal) {

			modal.element.modal();
			modal.close.then(function(result) {
				$scope.message = "You said " + result;
			});
		});
	}

	$rootScope.showConnectPopup2 = function() {
		ModalService.showModal({
			templateUrl : 'modal2.html',
			controller : "ModalController"
		}).then(function(modal) {
			modal.element.modal();
			modal.close.then(function(result) {
				$scope.message = "You said " + result;
			});
		});
	}
	if (ipCookie('user_id'))
		$rootScope.showConnectPopup(1)

	$rootScope.couponCode = "cup01010101";

})