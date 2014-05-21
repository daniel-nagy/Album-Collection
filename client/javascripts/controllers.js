/* Album Collection Controllers */

/*
 * My Todo List
 *
 * - When an album is created, updated, or removed
 *   update the artist and songs arrays to
 *   compensate for these actions without having
 *   to pull the collection down again from the
 *   server.
 *
 * - Create a modal for displaying errors to the
 *   user, for example an album was unable to be
 *   saved to the database.
 */
 
var albumControllers = angular.module('albumControllers', []);

/**
 * Retrieves an album collection.
 *
 * @param $scope                  An object that
 *                                refers to the
 *                                application
 *                                model.
 * 
 * @param albumResourceService    Provides RESTful
 *                                services.               
 */

albumControllers.controller('retrieveCollectionController', ['$scope', 'albumResourceService',
  function ($scope, albumResourceService) {
    
    /*
     * pull down the entire collection once when
     * the page first loads
     */
    
    $scope.collection = albumResourceService.query(function () {
      console.log('Albums retrieved');
    });
    
    /* placeholder for albums without cover art */
    
    $scope.placeholder = '/images/artwork/place holder.png';
    
    /* initializing the dropdown menu */
    
    $scope.orderProp = 'title';
    $scope.songsViewOrderProp = 'title';
    $scope.options = ['Artist', 'Title', 'Year'];
    $scope.sonsViewOptions = ['Album', 'Artist', 'Genre', 'Title'];
    $scope.reverse = false;
    $scope.songsViewReverse = false;
    
    /* logic for the dropdown menu */
    
    $scope.order = function (input) {
      switch(input) {
        case 'Artist':
          $scope.orderProp = 'artist';
          $scope.reverse = !$scope.reverse;
          break;
        case 'Title':
          $scope.orderProp = 'title';
          $scope.reverse = !$scope.reverse;
          break;
        case 'Year':
          $scope.orderProp = 'year';
          $scope.reverse = !$scope.reverse;
          break;
        default:
          $scope.orderProp = 'title';
      }
    };
    
    /* songs view has slightly different options */
    
    $scope.songsViewOrder = function (input) {
      switch(input) {
        case 'Album':
          $scope.songsViewOrderProp = 'album';
          $scope.songsViewReverse = !$scope.songsViewReverse;
          break;
        case 'Artist':
          $scope.songsViewOrderProp = 'artist';
          $scope.songsViewReverse = !$scope.songsViewReverse;
          break;
        case 'Genre':
          $scope.songsViewOrderProp = 'genre';
          $scope.songsViewReverse = !$scope.songsViewReverse;
          break;
        case 'Title':
          $scope.songsViewOrderProp = 'title';
          $scope.songsViewReverse = !$scope.songsViewReverse;
          break;
        default:
          $scope.songsViewOrderProp = 'title';
      }
    };
    
    /* 
     * waiting for the collection to be 
     * populated
     */
    
    $scope.collection.$promise.then(function () {
      
      /* 
       * creating an array of artists, this is
       * for the artists view
       */
      
      var artists = [];
      
      for(i = 0; i < $scope.collection.length; i++) {
        artists.push($scope.collection[i].artist);
      }
      
      /* filter duplicate atrists */
      
      $scope.artists = artists.filter(function (element, position) {
        return artists.indexOf(element) === position;
      });
      
      /* 
       * creating an array of tracks, currently
       * this is the only way I can think of to
       * achive the songs view
       */
      
      var tracks = [];
      
      for(i = 0; i < $scope.collection.length; i++) {
        for(j = 0; j < $scope.collection[i].tracks.length; j++) {
          tracks.push({
            title   : $scope.collection[i].tracks[j],
            album   : $scope.collection[i].title,
            artist  : $scope.collection[i].artist,
            genre   : $scope.collection[i].genre,
            year    : $scope.collection[i].year,
            artwork : $scope.collection[i].artwork
          });
        }
      }
      
      $scope.tracks = tracks;
      
    });
    
    /*
     * when the user selects an artist, populate
     * an object with all the albums by that
     * artist
     */
    
    $scope.viewAlbumsBy = function (artist) {
      
      $scope.albumsByArtist = [];
      
      for(i = 0; i < $scope.collection.length; i++) {        
        if($scope.collection[i].artist === artist) {
          $scope.albumsByArtist.push($scope.collection[i]);
        }
      }
    };
    
    /* clears the artist when the user selects
     * all artists
     */
    
    $scope.clearAlbumsByArtist = function () {
      $scope.albumsByArtist = '';
    };
    
  }
]);

/**
 * Retrieves an album from a collection.
 * 
 * @param $routeParams    Provides access to route
 *                        parameters.                 
 */

albumControllers.controller('retrieveAlbumController', ['$scope', '$routeParams', 'albumResourceService',
  function ($scope, $routeParams, albumResourceService) {
    $scope.album = albumResourceService.get({albumTitle: $routeParams.albumTitle}, function () {
      console.log('Album retrieved');
    });
  }
]);

/**
* Opens a modal for creating or updating an album.
*
* @param $modal    Service for creating AngularJS
*                  modal windows.
*
* @see             ui.bootstrap.modal
*/

albumControllers.controller('updateAlbumModalController',  ['$scope', '$modal',
  function ($scope, $modal) {
    
    $scope.updateAlbum = function () {
      
      /* 
       * if the user is adding a new album 
       * create an empty album object
       */
      
      if($scope.isNewAlbum) {
        $scope.album = {
          title   : '',
          artist  : '',
          genre   : '',
          tracks  : [],
          artwork : $scope.placeholder,
          year    : ''
        }
      }
      
      /* creating a modal instance */
      
      var modalInstance = $modal.open({
        templateUrl  : 'modals/editAlbumModal.html',
        controller   : 'updateAlbumController',
        resolve      : {
          album      : function () {
            return $scope.album;
          },
          isNewAlbum : function () {
            return $scope.isNewAlbum;
          }
        }
      });
      
      /* 
       * after the user has saved their album 
       * update the current scope
       */
      
      modalInstance.result.then(function (album) {
        
        if($scope.isNewAlbum) {
          $scope.collection.push(album);
        }
        
        /*
         * instead of pulling down the entire
         * collection from the server just update
         * the scope
         */
        
        else {
          
          var original = $scope.album.title ;
          
          $scope.album.title = album.title;
          $scope.album.artist = album.artist;
          $scope.album.genre = album.genre;
          $scope.album.tracks = album.tracks;
          $scope.album.artwork = album.artwork;
          $scope.album.year = album.year;
          
          for(i = 0; i < $scope.collection.length; i++) {
            if($scope.collection[i].title === original) {
              
              $scope.collection[i].title = album.title;
              $scope.collection[i].artist = album.artist;
              $scope.collection[i].genre = album.genre;
              $scope.collection[i].tracks = album.tracks;
              $scope.collection[i].artwork = album.artwork;
              $scope.collection[i].year = album.year;
              
              break;
            }
          }
        }
      });
    };
  }
]);

/* Updates an album in a collection */

albumControllers.controller('updateAlbumController', ['$scope', '$modalInstance', 'album', 'isNewAlbum', 'albumResourceService',
  function ($scope, $modalInstance, album, isNewAlbum, albumResourceService) {
    
    /* creating a modal title for the user */
    
    $scope.modalTitle = isNewAlbum ? 'Add Album' : 'Edit Album';
    
    $scope.artwork = album.artwork;
    
    /* creating a copy of the album for editing */
    
    $scope.album = {
      title   : album.title,
      artist  : album.artist,
      genre   : album.genre,
      tracks  : [],
      artwork : album.artwork,
      year    : album.year
    }
    
    /*
    * converting the track-listing from an array
    * of strings to an object of key value pairs
    * so I can use ng-model to update their values
    */
    
    $scope.trackListing = {
      tracks : [{track: ""}]
    }
    
    for(i = 0; i < album.tracks.length; i++) {
       $scope.trackListing.tracks[i] = {track: album.tracks[i]};
    }
    
    $scope.removeTrack = function (index) {
      
      /* 
       * if only a single track remains delete
       * only its value so the user still has the
       * option to add more tracks
       */
      
      if($scope.trackListing.tracks.length === 1) {
        delete $scope.trackListing.tracks[index].track;
      }
      
      /*
       * when a user removes a track reorder the
       * proceeding tracks and pop the duplicate
       * track from the end
       */
      
      else {
        for(i = index; i < $scope.trackListing.tracks.length - 1; i++) {
            $scope.trackListing.tracks[i] = $scope.trackListing.tracks[i + 1];
         }
         
          $scope.trackListing.tracks.pop(); 
      }
    };
    
    $scope.addTrack = function (index) {
      
      /*
       * when a user adds a track reorder the
       * proceeding tracks and overwrite the
       * duplicate track
       */
      
      for(i = $scope.trackListing.tracks.length; i > index + 1; i--) {
        $scope.trackListing.tracks[i] = $scope.trackListing.tracks[i - 1];
      }
      
      $scope.trackListing.tracks[index + 1] = {track: ""};
    };
    
    $scope.ok = function () {
      
      /* 
       * converting the track-listing back to an
       * array of strings
       */
      
      for(i = 0; i < $scope.trackListing.tracks.length; i++) {
        if($scope.trackListing.tracks[i].track) {
          $scope.album.tracks.push($scope.trackListing.tracks[i].track);
        }
      }
      
      if(isNewAlbum) {
        albumResourceService.save($scope.album);
      }
      
      else {
        
        /*
         * preserving the original title becuase the
         * database query is asynchronous and the
         * scope will be updated before the callback
         */
        
        var original = album.title;
        
        albumResourceService.get({albumTitle: original}, function () {
          
          albumResourceService.update({albumTitle: original}, $scope.album);
          
          console.log('Album updated');
        });
        
      }
      
      $modalInstance.close($scope.album);
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }
]);

/* opens a modal for confirming album removal */

albumControllers.controller('removeAlbumModalController',  ['$scope', '$modal',
  function ($scope, $modal) {
    
    $scope.removeAlbum = function () {
      
      var modalInstance = $modal.open({
        templateUrl : 'modals/removeAlbumModal.html',
        controller  : 'removeAlbumController',
        resolve     : {
          album     : function () {
            return $scope.album;
          }
        }
      });
      
      modalInstance.result.then(function (album) {
        
        /*
         * update the scope after the user removes
         * an album
         */
        
        for(i = 0; i < $scope.collection.length; i++) {
          if($scope.collection[i].title === album.title) {
            $scope.collection.splice(i,1);
            break;
          }
        }
      });
    };
  }
]);

/**
 * Removes an album from the collection.
 *
 * @param $location   Service that parses the URL
 *                    in the browser's address bar
 */

albumControllers.controller('removeAlbumController', ['$scope', '$location', '$modalInstance', 'album', 'albumResourceService',
  function ($scope, $location, $modalInstance, album, albumResourceService) {
    
    $scope.album = album;
    
    $scope.ok = function () {
      
      albumResourceService.delete({albumTitle: album.title}, function () {
        
        $location.path('#');
        
        console.log('Album removed');
      });
      
      $modalInstance.close(album);
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }
]);

/* albums view controller */

albumControllers.controller('albumsViewController', ['$scope',
  function ($scope) {
    
    /* 
     * resizes fixed views to fit the current
     * window to take advatntage of screen
     * realestate and to scroll properly
     */
    
    $scope.fitToWindow = function () {
      return {
        position: 'fixed',
        height: ($scope.height - 194) + 'px',
        'overflow-y': 'scroll',
        margin: '145px 0 0',
        'background-color': '#f9f9f9'
      }
    };
    
  }
]);

/* artist view controller */

albumControllers.controller('artistViewController', ['$scope',
  function ($scope) {
    
    /*
     * if an artist is in scope return albums by
     * that artist, else return all albums
     */
    
    $scope.getAlbums = function () {
      return $scope.albumsByArtist ? $scope.albumsByArtist : $scope.collection;
    };
    
    /* generating artist album count */
    
    $scope.albumCount = function () {
      if($scope.albumsByArtist) {
        if($scope.albumsByArtist.length === 1) {
          return $scope.albumsByArtist.length + ' album';
        }
        else if($scope.albumsByArtist.length > 1) {
          return $scope.albumsByArtist.length + ' albums';
        }
      }
      else {
        return $scope.collection.length + ' albums'
      }
    };
    
    /* toggles the artist list on mobile devices */
    
    $scope.toggleArtistList = function () {
      $scope.toggled = !$scope.toggled;
    }
    
    /* fits the view to the window when resized */
    
    $scope.fitToWindow = function () {
      return {
        position: 'fixed',
        height: ($scope.height - 194) + 'px',
        'overflow-y': 'scroll',
        margin: '145px 0 0',
        'background-color': '#f9f9f9'
      }
    };
    
  }
]);

/* songs view controller */

albumControllers.controller('songsViewController', ['$scope',
  function ($scope) {
    
    /* fits the view to the window when resized */
    
    $scope.fitToWindow = function () {
      return {
        position: 'fixed',
        height: ($scope.height - 194) + 'px',
        'overflow-y': 'scroll',
        margin: '145px 0 0',
        'background-color': '#f9f9f9'
      }
    };
    
  }
]);

/* album view controller */

albumControllers.controller('albumViewController', ['$scope',
  function ($scope) {
    
    /* fits the view to the window when resized */
    
    $scope.fitToWindow = function () {
      return {
        position: 'fixed',
        height: ($scope.height - 194) + 'px',
        'overflow-y': 'scroll',
        margin: '145px 0 0',
      }
    };
    
  }
]);

/* validates user input */

albumControllers.controller('inputValidationController', ['$scope',
  function ($scope) {
    
    /* 
     * force the user to enter numeric characters
     * for the year
     */
    
    $scope.keyValidate = function (key) {
      
      var charecterCode = (key.which) ? key.which : event.keyCode
      
      if(charecterCode < 48 || charecterCode > 57) {
        
        if(key.preventDefault()) {
          key.preventDefault();
        }
        
        return false;
      }
      
      return true;
    };
    
  }
]);

/**
 * Uplaod album artwork.
 *
 * @param fileUploadService   file upload service
 *                            using HTML5's File
 *                            API (FileReader)
 */

albumControllers.controller('fileUploadController', ['$scope', 'fileUploadService',
  function ($scope, fileUploadService) {
    
    $scope.uploadFile = function () {
      
      fileUploadService.readAsDataURL($scope.file, $scope).then(function (result) {
        $scope.album.artwork = '/images/artwork/' + $scope.file.name;
        $scope.artwork = result;
      });
    };
    
    $scope.$on('fileProgress', function (event, progress) {
      $scope.progress = progress.loaded / progress.total;
    });
    
    $scope.$on('fileLoadProcessComplete', function () {
      $scope.progress = 0;
    });
    
  }
]);
