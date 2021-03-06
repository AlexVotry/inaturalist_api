(function() {
  'use strict';

  angular
    .module('favorites')
    .config(config);

    function config($stateProvider, $locationProvider) {
      $stateProvider
      .state('favorites', {
        url: '/favorites',
        templateUrl: 'favorites/index.html',
        controller: 'FavController',
        controllerAs: 'favorite'
      });

    }
}());
