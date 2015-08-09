'use strict';

/**
 * @ngdoc service
 * @name muxicApp.underscore
 * @description
 * # underscore
 * Service in the muxicApp.
 */
/*
angular.module('muxicApp')
  .service('underscore', function () {

  });
*/

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});
