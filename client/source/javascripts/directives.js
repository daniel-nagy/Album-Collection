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

/* 
 * launches HTML5's file selection window, this
 * allows me to use pretty bootstrap buttons to
 * upload files opposed to the non-themeable HTML5
 * buttons
 */

albumDirectives.directive('launchWindow', function () {
  
  return {
    link: function (scope, element) {
      element.bind('click', function () {
        this.nextElementSibling.click();
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

/* drag and drop album cover art */

albumDirectives.directive('droppable', function () {
  
  return {
    link: function (scope, element) {
      
      element[0].addEventListener('dragover', function () {
        
        event.dataTransfer.dropEffect = 'copy';
        
        if(event.preventDefault) {
          event.preventDefault();
        }
        
        this.classList.add('drop-zone');
        
      }, false);
      
      element[0].addEventListener('dragenter', function () {
        
        this.classList.add('drop-zone');
        
      }, false);
      
      element[0].addEventListener('dragleave', function () {
        
        this.classList.remove('drop-zone');
        
      }, false);
      
      element[0].addEventListener('drop', function () {
        
        if(event.stopPropagation) {
          event.stopPropagation();
        }
        
        if(event.preventDefault) {
          event.preventDefault();
        }
        
        scope.file = event.dataTransfer.files[0];
        scope.uploadFile();
        
        this.classList.remove('drop-zone');
        
      }, false);
    }
  };
});

/*
 * forces fixed views to maintain the current
 * height of the window
 */

albumDirectives.directive('windowHeight', function ($window) {
  
  return {
    link: function (scope) {
      
      scope.height = $window.innerHeight;
      
      $window.addEventListener('resize', function () {
        scope.height = $window.innerHeight;
        scope.fitToWindow(scope.height);
        scope.$apply();
      });
    }
  };
});
