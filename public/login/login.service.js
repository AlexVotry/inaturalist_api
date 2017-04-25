(function() {

    angular
    .module('login')
    .factory('LoginService', LoginService);

    function LoginService($http, AuthToken, $q) {
      delete $http.defaults.headers.common['X-Requested-With'];
      var config = {
        url: '',
        endpoint: '/app/v1/login'
      };

        return {
            login: login
        };

        function login(credentials) {
          var request = {
            method: 'POST',
            url: config.url + config.endpoint,
            data: { credentials: credentials }
          };

          return $http(request).then(function(response) {
            var token = response.data.token;
              AuthToken.save(token);
              return true;
          });
        }
    };

})();
