'use strict';

var app = angular.module('photoQueueApp', [
    'ngRoute',
    'photoQueueControllers'
]);

var underscore = angular.module('underscore', []);
underscore.factory('_', function () {
    return window._; // assumes underscore has already been loaded on the page
});

app.config(['$routeProvider', '$resourceProvider',
    function ($routeProvider, $resourceProvider) {
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

        $resourceProvider.defaults.stripTrailingSlashes = false;

        // ex4zsEFtCZ9z9ea3YdNDltz;NllMuyH468yYXYK.
        // KTCq6Xr:-nBC:9WeH@5Oy:Q!SojjLLG2diM3AMN1R1?ky5?=lWqqOo;v08wSs0ISKsLGOFl?0BCj.Ufrkz2XxHBat.EH856x8:goQ9!h63p5Hstz51rB?GkjNwH6uhP?
    }
]);