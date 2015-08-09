'use strict';

/**
 * @ngdoc function
 * @name muxicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muxicApp
 */
angular.module('muxicApp')
  .controller('MainCtrl', function ($scope,$http, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.tabs = [
      { title:'Catálogo', content:'/views/pages/catalog/catalog.html' },
      { title:'Play', content:'/views/pages/catalog/playnow.html' },
      { title:'Sugerencia', content:'/views/pages/catalog/suggest.html' }
    ];

    $scope.isLoading = false;
    $scope.profile = {};
    $scope.apiURL = 'http://192.168.211.206:3000';
    $scope.data={
      catalog: {items: []},
      playnow:{items: []}
    };
    $scope.sendingUp = false;


    $scope.getProfile = function(){

      $scope.profile = {
        name: "StarFucks",
        place: "Plaza San Luis",
        //image: "http://placehold.it/128x128",
        image:"images/star.jpg",
        teaser: "Bienvenidos"
      };
    };

    function offLoader (){
      $scope.isLoading = false;
    }

    function getPlaylist (config,who) {
      $scope.isLoading = true;

      $http(config).
        then(function(response) {
          $scope.status = response.status;

          if(response.data.items.length > 0){

            switch(who) {
              case 'cat':
                $scope.data.catalog.items = [];
                $scope.data.catalog = response.data;
                break;
              case'play':
                $scope.data.playnow.items = [];
                $scope.data.playnow = response.data;
                break;
            }

            offLoader();
          }
        }, function(response) {
          $scope.status = response.status;
          offLoader();
        });
    }

    $scope.initCatalog= function(){

      var config = {
        method: 'get',
        url: $scope.apiURL+'/catalog',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      getPlaylist(config,'cat');
    };

    $scope.initPlayNow= function(){

      var config = {
        method: 'get',
        url: $scope.apiURL+'/current',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      getPlaylist(config,'play');
    };





    $scope.addSong = function(trackId){

      $scope.config = {
        method: 'post',
        url: $scope.apiURL+'/add',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data : {
          track_id : trackId
        }
      };

      $scope.sendingUp = true;
      $http($scope.config).
        then(function(response) {
          $scope.status = response.status;
          $scope.sendingUp = false;

          $scope.initPlayNow();
          $timeout(function() {
            angular.element(document.querySelector('#button-play-now')).trigger('click');
          }, 1000);

        }, function(response) {
          $scope.status = response.status;
          $scope.sendingUp = false;
        });
    };
  });
