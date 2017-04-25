(function() {
  'use strict';

  angular
  .module('favorites')
  .controller('FavController', FavController);

  function FavController($rootScope, SessionService, FavService) {
    var vm = this;
    vm.test = 'this is here';
    vm.currentUser = SessionService.currentUser();
    var user = vm.currentUser;

    vm.getAnimals = function (user) {
      FavService.getAnimals(user.username)
      .then((info) => {
        vm.animalPics = info;
        console.log('info: ', info);
      });
    };

    $rootScope.$on('RegistrationSuccess', function() {
      vm.currentUser = SessionService.currentUser();
    });
    $rootScope.$on('reset', function() {
    });

    vm.remove = function(animal) {
      FavService.remove(animal);
      document.location.href = "#/favorites";
    }
  };

}());
