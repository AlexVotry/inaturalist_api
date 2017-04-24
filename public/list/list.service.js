(function() {
  'use strict';

  angular
  .module('list')
  .factory('ListService', ListService)

  function ListService($q, $http) {

    var slides = [];
    var species;
    var url = 'https://api.inaturalist.org/v1/observations';
    var taxaGroups = ['Reptilia', 'mammalia', 'Aves', 'Actinopterygii', 'Amphibia', 'Arachnida'];
    var route = '/app/v1/favorites';
    return {
      convert: convert,
      getImages: getImages,
      saveFavorite: saveFavorite
    };

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

    function getInfo(amount) {
      var request = {
        method: 'GET',
        url: url,
        params: {photos: true, per_page: amount, identified: true, iconic_taxa: species, popular: true}
      }
      return $http(request)
        .then( info => {
          return info.data;
      });
    }

    function getImages(amount) {
      getInfo(amount).then(response => {
        var results = response.results;
          for (var i = 0; i < results.length; i++) {
            slides.push({
              picture: results[i].photos[0].url,
              id: results[i].photos[0].id,
              location: results[i].place_guess,
              uri: results[i].uri,
              species: results[i].species_guess
            });
          }
      });
      return $q((resolve, reject) => {
        resolve(slides);
      });
    }

    function saveFavorite(fav, user) {
      var request = {
        method: 'POST',
        url: route,
        data: {favorite: fav, username: user }
      };
      return $http(request)
        .then( (info) => {
          console.log('saveFavorite: ', info);
          return info.data;
      });
    }
  }
}());
