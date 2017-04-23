(function() {
  'use strict';

  angular
    .module('signup')
    .config(config);

    function config($stateProvider, $httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/index.html',
        controller: 'SignupController',
        controllerAs: 'signup'
      });

    }
}());
