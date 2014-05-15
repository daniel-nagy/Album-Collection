/* Album Collection Directives */

var albumDirectives = angular.module('albumDirectives', []);

/* placeholder for albums without cover art */

albumDirectives.directive('placeHolder', function () {
  
  return {
    link: function (scope, element, attributes) {
      element.bind('error', function() {
        this.setAttribute('src', attributes.placeHolder);
      });
    }
  };
});

/* upload album cover art */

albumDirectives.directive('fileUpload', function () {
  
  return {
    link: function (scope, element) {
      element.bind('change', function () {
        scope.file = (event.srcElement || event.target).files[0];
        scope.uploadFile();
      });
    }
  };
});