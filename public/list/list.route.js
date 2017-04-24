(function() {
  'use strict';

  angular
    .module('list')
    .config(config);

    function config($stateProvider, $locationProvider) {
      // $locationProvider.html5Mode(true);
      $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'list/index.html',
        controller: 'ListController',
        controllerAs: 'list'
      });

    }
}());
