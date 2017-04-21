(function() {
  'use strict';

  angular
    .module('login')
    .config(config);

    function config($stateProvider) {
      $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/index.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    }
}());
