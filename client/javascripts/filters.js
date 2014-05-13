/* Album Collection Fitlers */

var albumFilters = angular.module('albumFilters', []);

/*
 * Provides a place holder for albums without
 * artwork.
 */

albumFilters.filter('imageFilter', function () {
  
  return function (input) {
    return input ? '/images/artwork/' + input + '.jpg' : '/images/artwork/place-holder.png';
  };
});

/*
 * Wraps parentheses around the year for better
 * visualization.
 */

albumFilters.filter('yearFilter', function () {

  return function (input) {
    return input ? '(' + input + ')' : input;
  };
});

/* Returns a correctly capitalized proper noun. */

albumFilters.filter('capitalizeFilter', function () {
  
  return function (input) {
    return input ? input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase() : input;
  };
});