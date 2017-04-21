(function() {
  'use strict';

  angular
    .module('game')
    .config(config);

    function config($stateProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);
      $stateProvider
      .state('game', {
        url: '/game',
        templateUrl: 'game/index.html',
        controller: 'GameController',
        controllerAs: 'game'
      });

    }
}());
