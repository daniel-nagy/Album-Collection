/**
 * @author    Daniel Nagy   <daniel_nagy@me.com>
 * @version   0.0.1
 * @since     2014-04-20
 */

/*
 * Single page web application built with
 * AngularJS and Bootstrap.
 */
 
/**
 * Album Collection Root Model
 *
 * <p>
 * Model albumCollection designates the root
 * element of the application. Dependencies are
 * annotated as an array of strings to allow the
 * dependency injector to identify services
 * correctly after minification.
 *
 * @param ui.bootstrap  Library containing native
 *                      AngularJS directives for
 *                      interfacing with Bootstrap
 *                      without jQuery.
 *
 * @param ngRoute       Routing service for
 *                      mapping templates to
 *                      application views.
 */
 
var albumCollection = angular.module('albumCollection', [
  'ui.bootstrap',
  'ngRoute',
  'albumAnimations',
  'albumDirectives',
  'albumControllers',
  'albumFilters',
  'albumServices'
]);

/* configuring application routes using ngRoute */
 
albumCollection.config(['$routeProvider',
  function ($routeProvider) {
    
    $routeProvider.
      when('/albums', {
        templateUrl : 'partials/albumThumbnailsView.html',
        controller  : 'retrieveCollectionController'
      }).
      when('/albums/artists', {
        templateUrl : 'partials/artistsView.html',
        controller  : 'retrieveCollectionController'
      }).
      when('/albums/songs', {
        templateUrl : 'partials/songsView.html',
        controller  : 'retrieveCollectionController'
      }).
      when('/albums/:albumTitle', {
        templateUrl : 'partials/albumView.html',
        controller  : 'retrieveAlbumController'
      }).
      otherwise({
        redirectTo  : '/albums'
      });
  }
]);