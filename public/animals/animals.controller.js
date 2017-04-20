(function() {
  'use strict';

  angular
  .module('animals')
  .controller('AnimalController', AnimalController);

  function AnimalController($rootScope, AnimalService, $timeout) {
    var vm = this;
    vm.test = 'animals';
    vm.gotRight = 0;
    vm.guesses = 0;
    var count = 0;
    var first ;
    var second;
    var setup;
    var findex;


    var didIt = 'http://www.onefortraining.org/sites/default/files/YouDidIt.png';

    AnimalService.getImages().then( slides => {
      vm.animalPics = slides;
    });
    vm.images = AnimalService.makeBoard();

    vm.choose = function(pic, index) {
      if (count === 0) {
        first = AnimalService.firstPick(index);
          if(pic.id === 10) {
            vm.images[index] = first;
            findex = first.index;
          }
          count++;
      } else if (count === 1) {
        second = AnimalService.secondPick(index);
          if(pic.id === 10) {
            vm.images[index] = second;
          }
          count++
      }
      if (count > 1) {
        setup = AnimalService.compare()
        function revert() {
          vm.images[findex] = setup;
          vm.images[second.index] = setup;
        }
        $timeout(revert, 1000);
        count = 0;
      }
    }
  }
}());
