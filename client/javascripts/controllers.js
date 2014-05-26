/* Album Collection Controllers */
 
var albumControllers = angular.module('albumControllers', []);

/**
 * The main controller resides at the root scope
 * of the application and is visible to all its
 * children. It retrieves an album collection once
 * when the page loads allowing the application
 * to maintain most functionallity when
 * disconnected from the network.
 *
 * @param $scope    An object that refers to the
 *                  application model.
 *
 * @param $modal    Service for creating AngularJS
 *                  modal windows.
 *
 * @param albumResourceService    Provides RESTful
 *                                services.
 *
 * @see             ui.bootstrap.modal
 */

albumControllers.controller('mainController', ['$scope', '$modal', 'albumResourceService',
  function ($scope, $modal, albumResourceService) {
    
    /*
     * pull the collection once from the server
     * when the page first loads
     */
    
    $scope.collection = albumResourceService.query(function () {
      
      console.log('Albums retrieved');
      
    }, function (error) {
      
      console.log(error);
      
      /* 
       * opening a modal to let the user know an
       * error occurred
       */
      
      $scope.openErrorModal(error, 'Unable to retrieve your album collection from the server.');
      
    });
    
    /* 
     * opens a modal to let the user know an error
     * occurred
     */
    
    $scope.openErrorModal = function (error, message) {
      
      var modalInstance = $modal.open({
        templateUrl : 'modals/errorModal.html',
        controller  : 'errorController',
        resolve     : {
          error     : function () {
            return error;
          },
          message   : function () {
            return message;
          }
        }
      });
      
    };
    
    /* placeholder for albums without cover art */
    
    $scope.placeholder = '/images/artwork/place holder.png';
    
    /*
     * initializing the dropdown menu for both the
     * albums and artists views
     */
    
    $scope.orderProp = 'title';
    $scope.options = ['Artist', 'Title', 'Year'];
    $scope.reverse = false;
    
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
    
    /*
    * initializing the dropdown menu for the 
    * songs view
    */
    
    $scope.songsViewOrderProp = 'title';
    $scope.sonsViewOptions = ['Album', 'Artist', 'Genre', 'Title'];
    $scope.songsViewReverse = false;
    
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
       * creating an array of artists, this
       * provides the list of artists for the
       * artists view
       */
      
      var artists = [];
      
      for(i = 0; i < $scope.collection.length; i++) {
        artists.push($scope.collection[i].artist);
      }
      
      /* filtering duplicate atrists */
      
      $scope.artists = artists.filter(function (element, position) {
        return artists.indexOf(element) === position;
      });
      
      /* 
       * creating an array of tracks, this
       * provides the list of tracks for the songs
       * view
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
     * resizes fixed views to maintain the current
     * height of the window; takeing advatntage of
     * screen realestate and ensuring they scroll
     * properly
     */
    
    $scope.fitToWindow = function (windowHeight) {
      return {
        position: 'fixed',
        height: (windowHeight - 194) + 'px',
        'overflow-y': 'scroll',
        margin: '145px 0 0',
      }
    };
    
    /*
     * populates an object with albums by 
     * a selected artist
     */
    
    $scope.viewAlbumsBy = function (artist) {
      
      $scope.albumsByArtist = [];
      
      for(i = 0; i < $scope.collection.length; i++) {        
        if($scope.collection[i].artist === artist) {
          $scope.albumsByArtist.push($scope.collection[i]);
        }
      }
    };
    
    /* clears the albums by artist */
    
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
    
    /* 
     * if the collection has been populated just
     * retreive the album from the collection 
     */
    
    if($scope.collection.$resolved) {
      for(i = 0; i < $scope.collection.length; i++) {        
        if($scope.collection[i].title === $routeParams.albumTitle) {
          $scope.album = $scope.collection[i];
        }
      }
    }
    
    /*
     * if the collection is unavailable go ahead 
     * and reteive the album from the database
     */
    
    else {
      $scope.album = albumResourceService.get({albumTitle: $routeParams.albumTitle}, function () {
        
        console.log('Album retrieved');
        
      }, function (error) {
        
        console.log(error);
        
        /* 
         * opening a modal to let the user know an
         * error occurred
         */
        
        $scope.openErrorModal(error, 'Unable to retrieve ' + $routeParams.albumTitle + ' from your collection.');
        
      });
    }
  }
]);

/*
 * opens a modal for creating or updating an album
 */

albumControllers.controller('updateAlbumModalController',  ['$scope', '$modal',
  function ($scope, $modal) {
    
    $scope.updateAlbum = function () {
      
      /* 
       * if a user is adding a new album to their
       * collection create an empty album object
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
          },
          openErrorModal : function () {
            return $scope.openErrorModal;
          }
        }
      });
      
      /* 
       * after the user has saved their album 
       * update the current scope to avoid pulling
       * the enitre collection from the server
       */
      
      modalInstance.result.then(function (album) {
        
        if($scope.isNewAlbum) {
          $scope.collection.push(album);
          
          /* 
           * if it's a new artist push the artist
           * onto the current list of artists
           */
          
          var newArtist = true;
          
          for(i = 0; i < $scope.artists.length; i++) {
            if($scope.artists[i] === album.artist) {
              newArtist = false;
              break;
            }
          }
          
          if(newArtist) {
            $scope.artists.push(album.artist);
          }
          
          /* 
           * if the artist view is currently 
           * displaying albums by this artist
           * update the artist view
           */
          
          if($scope.albumsByArtist && $scope.albumsByArtist[0].artist === album.artist) {
            $scope.viewAlbumsBy(album.artist);
          }
          
          /*
           * pushing new tracks onto the current
           * list of tracks
           */
          
          for(i = 0; i < album.tracks.length; i++) {
            $scope.tracks.push({
              title   : album.tracks[i],
              album   : album.title,
              artist  : album.artist,
              genre   : album.genre,
              year    : album.year,
              artwork : album.artwork
            });
          }
        }
        
        else {
          
          /* 
           * making a copy of the original album
           * title and tracklisting
           */
          
          var originalTitle = $scope.album.title;
          var originalTracks = $scope.album.tracks;
          
          /* updating the current scope */
          
          $scope.album.title = album.title;
          $scope.album.artist = album.artist;
          $scope.album.genre = album.genre;
          $scope.album.tracks = album.tracks;
          $scope.album.artwork = album.artwork;
          $scope.album.year = album.year;
          
          /* updating the root scope */
          
          for(i = 0; i < $scope.collection.length; i++) {
            if($scope.collection[i].title === originalTitle) {
              
              $scope.collection[i].title = album.title;
              $scope.collection[i].artist = album.artist;
              $scope.collection[i].genre = album.genre;
              $scope.collection[i].tracks = album.tracks;
              $scope.collection[i].artwork = album.artwork;
              $scope.collection[i].year = album.year;
              
              break;
            }
          }
          
          /* updating new tracks */
          
          for(i = 0; i < album.tracks.length; i++) {
            
            var notSeen = true;
            
            for(j = 0; j < originalTracks.length; j++) {
              if(originalTracks[j] === album.tracks[i]) {
                notSeen = false;
                break;
              }
            }
            
            if(notSeen) {
              $scope.tracks.push({
                title   : album.tracks[i],
                album   : album.title,
                artist  : album.artist,
                genre   : album.genre,
                year    : album.year,
                artwork : album.artwork
              });
            }
          }
          
          /* updating old tracks */
          
          for(i = 0; i < originalTracks.length; i++) {
            
            var notSeen = true;
            
            for(j = 0; j < album.tracks.length; j++) {
              if(album.tracks[j] === originalTracks[i]) {
                notSeen = false;
                break;
              }
            }
            
            if(notSeen) {
              for(k = 0; k < $scope.tracks.length; k++) {
                if($scope.tracks[k].title === originalTracks[i]) {
                  $scope.tracks.splice(k, 1);
                  break;
                }
              }
            }
          }
          
        }
        
      });
    };
  }
]);

/* updates or creates an album in a collection */

albumControllers.controller('updateAlbumController', ['$scope', '$modalInstance', 'album', 'isNewAlbum', 'openErrorModal', 'albumResourceService',
  function ($scope, $modalInstance, album, isNewAlbum, openErrorModal, albumResourceService) {
    
    /* creating a modal title for the user */
    
    $scope.modalTitle = isNewAlbum ? 'Add Album' : 'Edit Album';
    
    /* initializing artwork */
    
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
    
    /* removes a track from the album */
    
    $scope.removeTrack = function (index) {
      
      /* 
       * if only a single track remains delete
       * its value so the user still has the
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
    
    /* adds a track to the album */
    
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
      
      /* begin the loading indicator */
      
      $scope.loading = true;
      
      /* 
       * converting the track-listing back to an
       * array of strings
       */
      
      for(i = 0; i < $scope.trackListing.tracks.length; i++) {
        if($scope.trackListing.tracks[i].track) {
          $scope.album.tracks.push($scope.trackListing.tracks[i].track);
        }
      }
      
      /* 
      * wrapping the database query in a three
      * second timeout to simulate the delay of
      * a real request
      */
      
      setTimeout(function () {
        
        /* 
         * if the user is creating a new album go 
         * ahead and save it to the database
         */
        
        if(isNewAlbum) {
          
          albumResourceService.save($scope.album).$promise.then(function () {
            
            console.log('album saved');
            $modalInstance.close($scope.album);
            
          }, function (error) {
            
            console.log(error);
            $modalInstance.dismiss('cancel');
            
            /* 
             * opening a modal to let the user know an
             * error occurred
             */
            
            openErrorModal(error, 'Unable to save ' + $scope.album.title + ' to your collection.');
            
          });
        }
        
        else {
          
          albumResourceService.get({albumTitle: album.title}, function () {
            
            albumResourceService.update({albumTitle: album.title}, $scope.album).$promise.then(function () {
              
              console.log('Album updated');
              $modalInstance.close($scope.album);
              
            }, function (error) {
              
              console.log(error);
              $modalInstance.dismiss('cancel');
              
              /* 
               * opening a modal to let the user know an
               * error occurred
               */
              
              openErrorModal(error, 'Unable to save changes to ' + $scope.album.title + '.');
              
            });
            
          }, function (error) {
            
            console.log(error);
            $modalInstance.dismiss('cancel');
            
            /* 
             * opening a modal to let the user know an
             * error occurred
             */
            
            openErrorModal(error, 'Unable to save changes to ' + $scope.album.title + '.');
            
          });
          
        }
      }, 3000);
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
          },
          openErrorModal : function () {
            return $scope.openErrorModal;
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
            $scope.collection.splice(i, 1);
            break;
          }
        }
        
        /* 
         * if no more albums by this artist remain
         * remove this artist from the list of 
         * artists
         */
        
        var notSeen = true;
        
        for(i = 0; i < $scope.collection.length; i++) {
          if($scope.collection[i].artist === album.artist) {
            notSeen = false;
            break;
          }
        }
        
        if(notSeen) {
          for(i = 0; i < $scope.artists.length; i++) {
            if($scope.artists[i] === album.artist) {
              $scope.artists.splice(i, 1);
            }
          }
        }
        
        /* 
         * if the artist view is currently 
         * displaying albums by this artist
         * update the artist view
         */
        
        if($scope.albumsByArtist && $scope.albumsByArtist[0].artist === album.artist && !notSeen) {
          $scope.viewAlbumsBy(album.artist);
        }
        
        else if ($scope.albumsByArtist && $scope.albumsByArtist[0].artist === album.artist) {
          $scope.clearAlbumsByArtist();
        }
        
        /* 
         * remove this album's tracks from the
         * list of tracks
         */
        
        for(i = 0; i < album.tracks.length; i++) {
          for(j = 0; j < $scope.tracks.length; j++) {
            if($scope.tracks[j].title === album.tracks[i]) {
              $scope.tracks.splice(j, 1);
              break;
            }
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

albumControllers.controller('removeAlbumController', ['$scope', '$location', '$modalInstance', 'album', 'openErrorModal', 'albumResourceService',
  function ($scope, $location, $modalInstance, album, openErrorModal, albumResourceService) {
    
    $scope.album = album;
    
    $scope.ok = function () {
      
      /* begin the loading indicator */
      
      $scope.loading = true;
      
      /* 
       * wrapping the database query in a three
       * second timeout to simulate a real
       * request
       */
      
      setTimeout(function () {
        
        albumResourceService.delete({albumTitle: album.title}).$promise.then(function () {
          
          $location.path('#');
          console.log('Album removed');
          $modalInstance.close(album);
          
        }, function (error) {
          
          console.log(error);
          $modalInstance.dismiss('cancel');
          
          /* 
           * opening a modal to let the user know an
           * error occurred
           */
          
          openErrorModal(error, 'Unable to remove ' + album.title + ' from your collection.');
          
        });
        
      }, 3000);
      
    };
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);

/* displays an error message to the user */

albumControllers.controller('errorController', ['$scope', '$modalInstance', 'error', 'message',
  function ($scope, $modalInstance, error, message) {
    
    $scope.message = message;
    
    if(error.status === 0) {
      $scope.errorMessage = 'Communication with the server failed.';
    }
    
    else if (error.data.userMessage) {
      $scope.errorMessage = error.data.userMessage;
    }
    
    else if (error.message) {
      $scope.errorMessage = error.message;
    }
    
    else {
      $scope.errorMessage = 'An unknown error occurred.'
    }
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
    
  }
]);

/* artist view controller */

albumControllers.controller('artistViewController', ['$scope',
  function ($scope) {
    
    /*
     * if the user selected an artist return
     * albums by that artist, else return albums
     * by all arists
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
    
  }
]);

/* validates user input */

albumControllers.controller('inputValidationController', ['$scope',
  function ($scope) {
    
    /* 
     * forces the user to enter numeric characters
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
