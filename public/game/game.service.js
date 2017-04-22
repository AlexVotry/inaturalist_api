(function() {
  'use strict';

  angular
  .module('game')
  .factory('GameService', GameService);

  function GameService($http, $q, $timeout) {
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
    var code = '8d12e9fae20eefa5585b941c8e7c59e9b59b884d7be3dd2c9cdbb3a0eed87d76';
    var client_id = '456965';
    var url = 'https://api.inaturalist.org/v1/observations';
    // https://api.inaturalist.org/v1/taxa/autocomplete?q=mammalia
    var taxaGroups = ['Reptilia', 'mammalia', 'Aves', 'Actinopterygii', 'Amphibia', 'Arachnida'];
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo0NTY5NjUsImV4cCI6MTQ5MjkxMzIwNH0.Op6pC4XyKgk8hbVbA72u_vgal-8v-xLmV7I8Jgx95lXEAtRylRukuq3zbvh8yeQ_IpKK1R3Hce16lGP86hUwJQ";
    var species;

    // function getToken() {
    //   var request = {
    //     method: 'GET',
    //     url: 'https://www.inaturalist.org/users/api_token',
    //   }
    //
    //   return $http(request)
    //     .then(token => {
    //       return token.api_token
    //     });
    // }
    function convert(taxa) {
      switch (taxa) {
        case 'Reptiles':
          species = taxaGroups[0];
          break;
        case 'Mammals':
          species = taxaGroups[1];
          break;
        case 'Birds':
          species = taxaGroups[2];
          break;
        case 'Fish':
          species = taxaGroups[3];
          break;
        case 'Amphibians':
          species = taxaGroups[4];
          break;
        case 'Spiders':
          species = taxaGroups[5];
          break;
        default:
          species = taxaGroups[1];
      }
      return species;
    }

    function getInfo() {
      console.log('info species: ', species);
      var request = {
        method: 'GET',
        url: url,
        // headers: {authorization: `Bearer ${token}`},
        params: {photos: true, per_page: 8, identified: true, iconic_taxa: species }
      }
      return $http(request)
        .then( info => {
          // console.log(info.data.results);
          return info.data;
      });
    }

    function getImages(taxa) {
      getInfo(taxa).then(response => {
        var double = 2;
        while (double > 0) {
          for (var i = 0; i < response.results.length; i++) {
            slides.push({
              picture: response.results[i].photos[0].url,
              id: response.results[i].photos[0].id,
              location: response.results[i].place_guess,
              uri: response.results[i].uri,
              species: response.results[i].species_guess
            });
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
      convert: convert,
      getImages: getImages,
      makeBoard: makeBoard,
      firstPick: firstPick,
      secondPick: secondPick,
      compare: compare
    };
  }


}());
