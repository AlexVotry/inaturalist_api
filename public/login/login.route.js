(function() {
  'use strict';

  angular
    .module('login')
    .config(config);

    function config($stateProvider, $httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/index.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    }
}());
