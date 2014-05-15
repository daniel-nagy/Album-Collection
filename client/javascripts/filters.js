/* Album Collection Fitlers */

var albumFilters = angular.module('albumFilters', []);

/*
 * wraps parentheses around the year for better
 * visualization
 */

albumFilters.filter('yearFilter', function () {

  return function (input) {
    return input ? '(' + input + ')' : input;
  };
});

/* returns a correctly capitalized proper noun */

albumFilters.filter('capitalizeFilter', function () {
  
  return function (input) {
    return input ? input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase() : input;
  };
});