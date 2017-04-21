'use strict';

(function() {

  angular
    .module('auth')
    .factory('AuthInterceptor', AuthInterceptor);

  function AuthInterceptor(AuthToken) {

    function request(config) {
      var token = AuthToken.read();

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }

      return config;
    }

    return { request: request };
  }

})();
