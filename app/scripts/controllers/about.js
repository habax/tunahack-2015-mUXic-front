'use strict';

/**
 * @ngdoc function
 * @name muxicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the muxicApp
 */
angular.module('muxicApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
