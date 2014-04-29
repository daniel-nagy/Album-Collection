var albumControllers = angular.module('albumControllers', []);

/* high level (ngResource) */

// query
albumControllers.controller('albumCollectionCtrl', ['$scope', 'Albums',
  function($scope, Albums) {
    $scope.collection = Albums.query();
    $scope.orderProp = 'artist';
    console.log('Albums retrieved');
  }
]);

// get
albumControllers.controller('albumDetailCtrl', ['$scope', '$routeParams', 'Albums',
  function($scope, $routeParams, Albums) {
    $scope.album = Albums.get({albumTitle: $routeParams.albumTitle});
    console.log('Album retrieved');
  }
]);

// delete
albumControllers.controller('albumRemoveCtrl', ['$scope', '$routeParams', '$location', 'Albums',
  function($scope, $routeParams, $location, Albums) {
    Albums.delete({albumTitle: $routeParams.albumTitle}, function() {
      $location.path('/albums');
    });
    
    console.log('Album removed');
  }
]);