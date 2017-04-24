(function() {
  'use strict';

  angular
  .module('favorites')
  .controller('FavController', FavController);

  function FavController($rootScope, SessionService, FavService) {
    var vm = this;
    vm.test = 'this is here';

    var user = SessionService.currentUser();
    if (user) {
      vm.currentUser = user.username;
    }
    vm.getAnimals = function (user) {
      FavService.getAnimals(user)
      .then((info) => {
        vm.animalPics = info;
        console.log('controller: ', vm.animalPics );
      });
    };

    vm.remove = function(animal) {
      console.log('id: ', animal.id);
      FavService.remove(animal);
      document.location.href = "#/favorites";
    }
  };

}());
