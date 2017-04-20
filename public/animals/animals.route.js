(function() {
  'use strict';

  angular
    .module('animals')
    .config(config);

    function config($stateProvider) {
      $stateProvider
      .state('animals', {
        url: '/animals',
        templateUrl: 'animals/index.html',
        controller: 'AnimalController',
        controllerAs: 'animals'
      });

    }
}());
