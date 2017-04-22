(function() {
  'use strict';

  angular
  .module('game')
  .controller('GameController', GameController);

  function GameController($rootScope, GameService, $timeout) {
    var vm = this;
    vm.gotRight = 0;
    vm.guesses = 0;
    vm.blank = '_blank';
    vm.showInfo = false;
    var count = 0;
    var first ;
    var second;
    var setup;
    var findex;
    var didIt = 'http://www.onefortraining.org/sites/default/files/YouDidIt.png';
    var indx;
    var loc;
    vm.animalGroups = ['Reptiles', 'Mammals', 'Birds', 'Fish', 'Amphibians', 'Spiders'];

    vm.chooseSpecies = function(species) {
      vm.taxa = species;
      GameService.convert(species);
      GameService.getImages().then(info => {
        vm.animalPics = info;
      })
    };

    vm.images = GameService.makeBoard();
    vm.reset = function() {
      document.location.href = "#/game";
    };

    vm.choose = function(pic, index) {
      vm.showInfo = true;
      if (count === 0) {
        first = GameService.firstPick(index);
          if(pic.id === 10) {
            vm.images[index] = first;
            findex = first.index;
            vm.infoPage = first.uri;
            vm.species = first.species;
            loc = first.location;
            if(loc) {
              vm.loc = loc.split(',').join("\n");
            }
            count++;
          }
      } else if (count === 1) {
        second = GameService.secondPick(index);
          if(pic.id === 10) {
            vm.images[index] = second;
            vm.infoPage = second.uri;
            vm.species = second.species;
            loc = second.location;
            if(loc) {
              vm.loc = loc.split(',').join("\n");
              console.log('loc: ', vm.loc)
            }
            count++
          }
      }
      if (count > 1) {
        setup = GameService.compare()
        function revert() {
          vm.guesses ++;
          if (setup.id === 9) {
            vm.gotRight ++;
          };
          vm.images[findex] = setup;
          vm.images[second.index] = setup;
        }
        $timeout(revert, 1500);
        count = 0;
        if (vm.gotRight === 7) {
          for (indx in vm.images) {
            vm.images[indx].picture = didIt;
          }
        }
      }

    }
  }
}());
