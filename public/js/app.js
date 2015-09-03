/* This is main App.js Created by Ailen Wilson
 * App Js Contains Angular Routing And Default controller
 */

var freshmetric = angular.module('freshmetric', ['ui.router', 'angularModalService', 'ngRoute', 'ngAnimate', 'toaster', 'angularFileUpload', 'ipCookie', 'ui.bootstrap', 'controllers']);

freshmetric.config(function($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

	$compileProvider.debugInfoEnabled(false);

	$stateProvider.state('common', {
		templateUrl : 'js/views/common/dashboard.html',
		abstract : true,
	}).state('dashboard', {
		url : '/dashboard',
		parent : 'common',
		templateUrl : '/js/views/dashboard-1.html',
		controller : 'DashboardCtrl'
	}).state('profile', {
		url : '/profile',
		parent : 'common',
		templateUrl : '/js/views/profile.html',
		controller : 'ProfileCtrl'

		//controller: 'DashboardCtrl'
	}).state('billing', {
		url : '/billing',
		parent : 'common',
		templateUrl : '/js/views/billing.html',

		//controller: 'DashboardCtrl'
	}).state('team', {
		url : '/team',
		parent : 'common',
		templateUrl : '/js/views/team.html',

		//controller: 'DashboardCtrl'
	}).state('notifications', {
		url : '/notifications',
		parent : 'common',
		templateUrl : '/js/views/notifications.html',

		//controller: 'DashboardCtrl'
	}).state('acc-setting', {
		url : '/acc-setting',
		parent : 'common',
		templateUrl : '/js/views/account-setting.html',

		//controller: 'DashboardCtrl'
	}).state('signup', {
		url : '/signup',
		templateUrl : '/js/views/signup.html',
		controller : 'LoginCtrl'

		//controller: 'DashboardCtrl'
	}).state('login', {
		url : '/login',
		templateUrl : 'login.html',
		controller : 'LoginCtrl'

	}).state('reset', {
		url : '/reset/:token',
		templateUrl : '/js/views/reset-password.html',
		controller : 'LoginCtrl'

	}).state('forgot', {
		url : '/forgot',
		templateUrl : '/js/views/forgot.html',
		controller : 'LoginCtrl'

	});

	$urlRouterProvider.otherwise('/login');

	//	$urlRouterProvider.html5Mode(true);

}).factory('Intercom', function() {

	return {

		bootIntercom : function(user) {

			window.Intercom('boot', {
				app_id : "gc6ggb59",
				// TODO: The current logged in user's full name
				name : user.full_name,
				// TODO: The current logged in user's email address.
				email : user.email_address,
				// TODO: The current logged in user's sign-up date as a Unix timestamp.
				created_at : user.created_at,
				// TODO: The current logged in user's id of database.
				user_id : user.id
			});

		}
	};

}).controller('AppCtrl', function($scope, $window, $location, ipCookie) {

	$scope.logout = function() {

		ipCookie.remove('user_id')
		$window.location.href = '#/login'

	}
}).controller('ModalController', function($scope, close) {

	$scope.close = function(result) {
		close(result, 500);
		// close, but give 500ms for bootstrap to animate
	};

})