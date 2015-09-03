easycast.factory('Dashboard', function ($resource, $rootScope, $http) {
	
	return {
		
		getList : function() { return $resource('/api/v1.0/dashboard/list').query();},

		create: function(dashboard){return $resource('/api/v1.0/dashboard/list').save(dashboard);},

		update: function(dashboard){
			return $resource('/api/v1.0/dashboard/:id',  {}, {update: {method: 'PUT'}}).update({id: dashboard._id}, dashboard, function(res){
				console.log(res);
			});
		},

		delete: function(dashboard){
			return $resource('/api/v1.0/dashboard/:id').delete({id: dashboard._id}, function(res){
				console.log(res);
			});
		}
		
	}

});