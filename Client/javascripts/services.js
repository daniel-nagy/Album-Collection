/* Album Collection Services */

var albumServices = angular.module('albumServices', ['ngResource']);

/**
 * Provides highlevel RESTful services.
 *
 * @param $resource   factory for interacting with
 *                    server-side data sources.
 */

albumServices.factory('albumResourceService', ['$resource',
  function ($resource) {
    
    return $resource('http://localhost:8080/Album-Collection/album/:albumTitle', {}, {
      query  : {method:'GET', params:{albumTitle:''}, isArray:true},
      update : {method:'PUT'}
    });
  }
]);
