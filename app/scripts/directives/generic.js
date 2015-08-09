'use strict';

/**
 * @ngdoc directive
 * @name muxicApp.directive:generic
 * @description
 * # generic
 */
angular.module('muxicApp')
  .directive('generic', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the generic directive');
      }
    };
  })
  // check http://stackoverflow.com/questions/26153652/angular-js-with-imgliquid
  .directive('imgLiquid', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        $timeout(function () {
          var prop = {fill: true, horizontalAlign: '50%', verticalAlign: 'top'};
          element.imgLiquid(prop);
        });
      }
    };
  })
;
