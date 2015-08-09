'use strict';

/**
 * @ngdoc function
 * @name muxicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muxicApp
 */
angular.module('muxicApp')
  .controller('MainCtrl', function ($scope,$http, $timeout, $cookies, _) {
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

      //      $cookies.remove('mySongList');

      $scope.profile = {
        name: "Starbucks",
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

            _.each(response.data.items,function(song,key){ song.track.order = key; });
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


/*
    function addCookieSong(trackId){



      var mySongList = $cookies.get('mySongList');

      if(mySongList != undefined){ // use the list
        mySongList = JSON.parse(mySongList);

        var song = _.find(mySongList , function(song){ return song.id == trackId; });
        if(song == undefined ){
          mySongList.push({id:trackId,order:''});
        }
      }else { // create the list
        mySongList = [{id:trackId,order:''}]
      }

      //save
      $cookies.put('mySongList',JSON.stringify(mySongList));
    }

    function updateCokieSong(playNow) {
      var mySongList = $cookies.get('mySongList');

      _.each(mySongList,function(value,key){
        if(value.order == ''){
          var idLast = _.findLastIndex(playNow.items, {id: value.id});  // search id track

          if(idLast != undefined){
            value.order = playNow.items[idLast].track.order; // set id Track
          }
        }
      });

      $cookies.put('mySongList', JSON.stringify(mySongList));
    };
    */



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
          //addCookieSong(trackId);

          $timeout(function() {
            $scope.initPlayNow();
            angular.element(document.querySelector('#button-play-now')).trigger('click');
          }, 3000);

        }, function(response) {
          $scope.status = response.status;
          $scope.sendingUp = false;
        });
    };

/*
    $scope.isAdded = function(trackId){
      var isAdded = false;
      var mySongList = $cookies.get('mySongList');

      if(mySongList != undefined) { // use the list
        mySongList = JSON.parse(mySongList);
        var idLast = _.findLastIndex(mySongList, {id: trackId});  // search id track

        if(idLast != -1){
          isAdded = true;
        }
      }

      return isAdded
    };

*/

  });
