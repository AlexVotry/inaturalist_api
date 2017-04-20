(function() {
  'use strict';

  angular
  .module('animals')
  .factory('AnimalService', AnimalService);

  function AnimalService($http, $q, $timeout) {
    var question = {
      "picture": "http://gogaytours.com/wp-content/uploads/2013/04/questionmark.png",
      "name": "question",
      "id": 10
    };

    var gotIt = {
      "picture": "http://cdn.phys.org/newman/csz/news/800/2015/thehumorousp.jpg",
      "name": "einstein",
      "id": 9
    };
    var slides = [];
    var count = 0;
    var first = {};
    var second = {};

    function getPics() {
      return $http.get('../pictures.json')
        .then( pictures => {
          return pictures.data;
      });
    }

    function getImages() {
      getPics().then(pictures => {
        var double = 2;
        while (double > 0) {
          for (var i = 0; i < 8; i++) {
            slides.push(pictures[i]);
          }
          double --;
        };
        shuffle(slides);
      });
      return $q((resolve, reject) => {
        resolve(slides);
      });
    }

    function shuffle(array) {
      var currentIndex = array.length;
      var temp;
      var randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
      };
      return array;
    };

    function makeBoard() {
      var starter = [];
      for (var i = 0; i < 16; i++) {
        starter.push(question);
      }
      return starter;
    }

    function firstPick(index) {
          first = slides[index];
          first.index = index;
          return first;
    };

    function secondPick(index) {
          second = slides[index];
          second.index = index;
          return second;
    }
    function compare() {
        if (first.id != second.id) {
          return question;
        }
        else {
          return gotIt;
        }
    };

    return {
      getImages: getImages,
      makeBoard: makeBoard,
      firstPick: firstPick,
      secondPick: secondPick,
      compare: compare
    };
  }


}());
