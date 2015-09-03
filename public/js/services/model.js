// A RESTful factory for retreiving mails from 'mails.json'
freshmetric.factory('AccessModel', ['$http', '$upload',
function($http, $upload) {

	return {

		getdata : function(url, data) {
			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $http.get(url, {
				headers : {
					'Content-type' : 'application/json'
				}
			}).then(function(result) {

				return result;
			});
		},
		create : function(url, data) {

			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $http.post(url, data).then(function(result) {

				return result;
			});
		},

		update : function(url, data) {
			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $http.get('get-company-ip-port?format=json', {
				headers : {
					'Content-type' : 'application/json'
				}
			}).then(function(result) {

				var socket = io.connect(result.data.url);
				return socket;
			});
		},

		remove : function(url, data) {
			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $http.get('get-company-ip-port?format=json', {
				headers : {
					'Content-type' : 'application/json'
				}
			}).then(function(result) {

				var socket = io.connect(result.data.url);
				return socket;
			});
		},

		uploadImage : function(url, data, file, name) {
			//since $http.get returns a promise,
			//and promise.then() also returns a promise
			//that resolves to whatever value is returned in it's
			//callback argument, we can return that.
			return $upload.upload({
				url : url, //upload.php script, node.js route, or servlet url
				data : data,
				file : file,
				fileFormDataName : name
			}).progress(function(evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {

				if (!data) {

				} else {

					return data;

				}

			});
		},
	}

}]);
