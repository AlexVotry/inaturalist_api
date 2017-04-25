(function() {
  'use strict';

  angular
    .module('list')
    .config(config);

    function config($stateProvider, $locationProvider) {
      $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'list/index.html',
        controller: 'ListController',
        controllerAs: 'list'
      });

    }
}());
