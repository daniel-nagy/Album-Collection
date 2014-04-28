var albumControllers = angular.module('albumControllers', []);

albumControllers.controller('albumsViewCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('http://localhost:8080/Album-Collection/album').success(function(data) {
      $scope.collection = data;
      console.log('Albums Retrieved.');
    });
  
  $scope.orderProp = 'title';
}]);

albumControllers.controller('albumViewCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('http://localhost:8080/Album-Collection/album/' + $routeParams.albumTitle).success(function(data) {
      $scope.album = data;
      console.log('Album retrieved');
    });
}]);