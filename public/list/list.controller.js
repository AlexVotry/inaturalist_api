(function() {
  'use strict';

  angular
  .module('list')
  .controller('ListController', ListController);

  function ListController($rootScope, ListService, SessionService) {
    var vm = this;
    var total_images = 100;
    var clickable = true;
    vm.animalGroups = ['Reptiles', 'Mammals', 'Birds', 'Fish', 'Amphibians', 'Spiders'];

    var user = SessionService.currentUser();
    if (user) {
      vm.currentUser = user.username;
    }

    vm.chooseSpecies = function(species) {
      vm.taxa = species;
      ListService.convert(species);
      ListService.getImages(total_images).then(info => {
        vm.animalPics = info;
        console.log('list: ', vm.animalPics);
      })
    };

    vm.reset = function() {
      document.location.href = "#/list";
    };

    vm.favorite = function(fav) {
      ListService.saveFavorite(fav, user);
      clickable = !clickable;
    }

  }
}());
