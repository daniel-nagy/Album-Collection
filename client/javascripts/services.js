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

/**
 * Allows for asynchronous file uploads using
 * HTML5's File API.
 *
 * @params $q   a promise for interacting with an
 *              object that is the result of an
 *              action preformed asynchronously
 *
 * @see FileReader
 *
 * Credit:      K. Scott Allen.
 */

albumServices.factory('fileUploadService', ['$q',
  function ($q) {
    
    var onLoad = function (fileReader, defer, scope) {
      return function () {
        scope.$apply(function () {
          defer.resolve(fileReader.result);
        });
      };
    };
    
    var onError = function (fileReader, defer, scope) {
      return function () {
        scope.$apply(function () {
          defer.reject(fileReader.result);
        });
      };
    };
    
    var onProgress = function (scope) {
      return function () {
        scope.$broadcast('fileProgress', {
          total: event.total,
          loaded: event.loaded
        });
      };
    };
    
    var onLoadend = function (scope) {
      return function () {
        scope.$broadcast('fileLoadProcessComplete');
      };
    }
    
    var getFileUpload = function(defer, scope) {
      
      /* creating a FileReader object */
      
      var fileReader = new FileReader();
      
      fileReader.onload = onLoad(fileReader, defer, scope);
      fileReader.onerror = onError(fileReader, defer, scope);
      fileReader.onprogress = onProgress(scope);
      fileReader.onloadend = onLoadend(scope);
      
      return fileReader;
    };
    
    var readAsDataURL = function (file, scope) {
      
      var defer = $q.defer();
      var upload = getFileUpload(defer, scope);
      
      upload.readAsDataURL(file);
      
      return defer.promise;
    };
    
    return {
      readAsDataURL: readAsDataURL
    };
  }
]);
