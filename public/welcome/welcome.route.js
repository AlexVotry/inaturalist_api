(function() {
  'use strict';

  angular
    .module('welcome')
    .config(config);

    function config($stateProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: 'welcome/index.html',
        controller: 'WelcomeController',
        controllerAs: 'welcome'
      });

    }
}());
