'use strict';

var app = angular.module('photoQueueControllers', [
    'ngAnimate',
    'underscore',
    'angularFileUpload',
    'photoQueueResources'
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

app.controller('FileUploadController', ['$scope', '$upload', function ($scope, $upload) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'upload/url',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };
}]);

app.controller('PhotoListController', ['$log', '$scope', '$location', '_', 'Photo', function ($log, $scope, $location, _, Photo) {

    $scope.status = "queued";

    var statusMap = {
        'queued': 1,
        'deleted': 0,
        'sent': 2
    };

    $scope.init = function () {
        $scope.status = $location.search().status || 'queued';
        $scope.targetPhoto = null;
        $scope.message = "Loading...";

        Photo.query({status: statusMap[$scope.status]}).$promise.then(function (photos) {
            $scope.photos = photos;
            $scope.message = "Found " + $scope.photos.length + " images";
        });

    };

    $scope.isPageActive = function (page) {
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