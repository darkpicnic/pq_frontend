'use strict';

var app = angular.module('photoQueueControllers', [
    'ngAnimate',
    'underscore',
    'angularFileUpload'
]);

var mock_photos = [
    {
        "id": 1,
        "url": "http://cdn.arstechnica.net/wp-content/uploads/2015/03/729665main_A-BlackHoleArt-pia16695_full-640x360.jpg",
        "key": "asdfasldfjasd9asdfkjasdfkj.jpg",
        "created": "2015-03-01T23:12:52.378Z",
        "modified": "2015-03-01T23:12:52.378Z",
        "mailed_datetime": null,
        "name": "Test Image asdfasdf",
        "image_uuid": "asdfasldfjasd9asdfkjasdfkj",
        "height": null,
        "width": null,
        "status": "queued"
    },
    {
        "id": 2,
        "url": "http://cdn.arstechnica.net/wp-content/uploads/2015/03/bhlens_riazuelo_960-640x512.jpg",
        "key": null,
        "created": "2015-03-02T06:01:50.773Z",
        "modified": "2015-03-02T06:01:50.773Z",
        "mailed_datetime": null,
        "name": "converted image",
        "image_uuid": "593717d4-4b5a-40d2-837a-627134983492",
        "height": null,
        "width": null,
        "status": "queued"
    },
    {
        "id": 3,
        "url": "http://cdn.arstechnica.net/wp-content/uploads/2015/03/facepalm-statue-640x427.jpg",
        "key": "67aea321-82b1-4af5-b0a7-4a38ab275666.png",
        "created": "2015-03-02T06:03:34.974Z",
        "modified": "2015-03-02T06:03:34.974Z",
        "mailed_datetime": null,
        "name": "converted image",
        "image_uuid": "67aea321-82b1-4af5-b0a7-4a38ab275666",
        "height": null,
        "width": null,
        "status": "queued"
    }
];

app.controller('PhotoDetailController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.photo = mock_photos[$routeParams.photoId - 1];
}]);

app.controller('SettingsController', ['$scope', function ($scope) {

}]);

app.controller('SignInController', ['$scope', function ($scope) {

}]);

app.controller('IndexController', ['$scope', function ($scope) {
    console.log("asdfasdf");
}]);

app.controller('PhotoListController', ['$log', '$scope', '$location', '_', function ($log, $scope, $location, _) {
    $scope.photos = mock_photos;
    $scope.targetPhoto = null;
    $scope.status = "queued";
    $scope.message = "Loading...";

    $scope.init = function () {
        $scope.status = $location.search().type;
        $log.info($scope.status);
        $scope.message = "Found " + $scope.photos.length + " images";
    };

    $scope.isPageActive = function(page) {
        return page == $scope.status;
    };

    $scope.hidePhoto = function () {
        $scope.targetPhoto = null;
    };

    $scope.showPhoto = function (id) {
        $scope.targetPhoto = $scope.photos[id - 1];
    };

    $scope.init();
}]);