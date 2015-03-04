'use strict';

var app = angular.module('photoQueueApp', [
    'ngRoute',
    'photoQueueControllers'
]);

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'IndexController'
      }).
      when('/signin', {
        templateUrl: 'partials/signin.html',
        controller: 'SignInController'
      }).
      when('/settings/', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsController'
      }).
      when('/photos/', {
        templateUrl: 'partials/photo-list.html',
        controller: 'PhotoListController'
      }).
      when('/photos/:photoId', {
        templateUrl: 'partials/photo-detail.html',
        controller: 'PhotoDetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
