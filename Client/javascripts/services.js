var albumServices = angular.module('albumServices', ['ngResource']);

albumServices.factory('Albums', ['$resource',
  function($resource) {
    return $resource('http://localhost:8080/Album-Collection/album/:albumTitle', {}, {
      query: {method:'GET', params:{albumTitle:''}, isArray:true}
    });
  }
]);