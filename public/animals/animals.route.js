(function() {
  'use strict';

  angular
    .module('animals')
    .config(config);

    function config($stateProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);
      $stateProvider
      .state('animals', {
        url: '/animals',
        templateUrl: 'animals/index.html',
        controller: 'AnimalController',
        controllerAs: 'animals'
      });

    }
}());
