var app = angular.module('photoQueueResources', ['ngResource', 'ngCookies']);
var token = 'c65716e5699e9f1ffd716812bd7a899545a62103';

app.factory('Photo', ['$resource', function ($resource) {

    return $resource('http://127.0.0.1:8000/photos/:id', {id: '@id', status: 1}, {
        query: {
            method: 'GET',
            isArray: true,
            headers: {'Authorization': 'Token ' + token}
        }
    });
}]);


app.factory('Auth', ['$resource', '$http', '$cookies', function ($resource, $http, $cookies) {
    $http.defaults.useXDomain = true;
    console.log($cookies.csrftoken);
    delete $http.defaults.headers.common['X-Requested-With'];
    return $resource('http://127.0.0.1:8000/');
}]);