(function() {
  'use strict';

  angular
  .module('favorites')
  .factory('FavService', FavService);

  function FavService($http, $q) {
    let url = '/app/v1/favorites';
    let slides =[];

    return {
      getAnimals: getAnimals,
      remove: remove
    }

    function getInfo(user) {
      return $http.get(`${url}/${user}`)
        .then((info) => {
          return info.data;
      });
    }

    function getAnimals(user) {
      getInfo(user).then(results => {
          for (var i = 0; i < results.length; i++) {
            slides.push(results[i]);
          };
      });
      return $q((resolve, reject) => {
        resolve(slides);
      });
    }

    function remove(animal) {
      return $http.delete(`${url}/${animal.id}`)
      .then((deleted) => {
        console.log('deleted: ', deleted);
      });
    }


  }
}());
