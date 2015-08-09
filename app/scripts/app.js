'use strict';

/**
 * @ngdoc overview
 * @name muxicApp
 * @description
 * # muxicApp
 *
 * Main module of the application.
 */
angular
  .module('muxicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../views/pages/catalog/index.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })

;
