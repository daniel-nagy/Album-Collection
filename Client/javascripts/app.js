var albumCollection = angular.module('albumCollection', [
  'ngRoute',
  'albumControllers'
]);

albumCollection.config(['$httpProvider',
  function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

albumCollection.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/albums', {
        templateUrl : 'albums.html',
        controller  : 'albumsViewCtrl'
      }).
      when('/albums-list', {
        templateUrl : 'albums-list.html',
        controller  : 'albumsViewCtrl'
      }).
      when('/albums/:albumTitle', {
        templateUrl : 'album.html',
        controller  : 'albumViewCtrl'
      }).
      otherwise({
        redirectTo  : '/albums'
      });
  }
]);