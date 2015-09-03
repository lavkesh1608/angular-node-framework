biInterface.factory('Connection', function($resource, $rootScope, $http) {

	return {

		getList : function() {
			console.log("Getting connections");
			return $resource('/api/v1.0/connection/list').query();
		},

		create : function(connection) {
			return $resource('/api/v1.0/connection/list').save(connection, function(res) {
				console.log(res);
			});
		},

		update : function(connection) {
			return $resource('/api/v1.0/connection/:id', {}, {
				update : {
					method : 'PUT'
				}
			}).update({
				id : connection._id
			}, connection, function(res) {
				console.log(res);
			});
		},

		delete : function(connection) {
			return $resource('/api/v1.0/connection/:id').delete({
				id : connection._id
			}, function(res) {
				console.log(res);
			});
		}
	}

});
