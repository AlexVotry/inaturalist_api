(function() {
  'use strict';

  angular
  .module('auth')
  .factory('AuthToken', AuthToken);

    function AuthToken($window) {
      var storage = $window.localStorage;
      var key = "mobius";

      function save(token) {
        storage.setItem(key, token);
      }

      function read() {
        return storage.getItem(key);
      }

      function erase() {
        storage.removeItem(key);
      }

      function decode() {
        var token = read();
        if (token) {
          var payload = $window.atob(token.split('.')[1]);
          return JSON.parse(payload);
        }
        return;
      }

      return {
        save: save,
        read: read,
        erase: erase,
        decode: decode
      };
    };

}());
