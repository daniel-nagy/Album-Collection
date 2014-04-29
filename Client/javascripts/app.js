/* modules dependencies */
var albumCollection = angular.module('albumCollection', [
  'ngRoute',
  'albumControllers',
  'albumServices'
  /* 'albumAnimations' */
]);

/* routes (ngRoute) */
albumCollection.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/albums', {
        templateUrl : 'albums.html',
        controller  : 'albumCollectionCtrl'
      }).
      when('/albums-list', {
        templateUrl : 'albums-list.html',
        controller  : 'albumCollectionCtrl'
      }).
      when('/albums/:albumTitle', {
        templateUrl : 'album.html',
        controller  : 'albumDetailCtrl'
      }).
      when('/albums/:albumTitle/remove', {
        templateUrl : 'album.html',
        controller  : 'albumRemoveCtrl'
      }).
      otherwise({
        redirectTo  : '/albums'
      });
  }
]);