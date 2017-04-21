'use strict';

(function() {

  angular
    .module('auth')
    .factory('SessionService', SessionService);

  function SessionService(AuthToken) {

    return {
      currentUser: currentUser,
      logout: logout
    };

    function currentUser() {
      var payload = AuthToken.decode();
      if (payload) {
        return payload;
      }
      return;
    }

    function logout() {
      AuthToken.erase();
    }
  }

})();
