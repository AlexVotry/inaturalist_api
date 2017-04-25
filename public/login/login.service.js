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

        // function login(credentials) {
        //   var request = {
        //     method: 'POST',
        //     url: config.url + config.endpoint,
        //     data: { credentials: credentials }
        //   };
        function login() {
          var request = {
            url: 'https://www.inaturalist.org/oauth/authorize?client_id=2d037dc9fa0c24c816bd179d3c64d390e86c43b70c68357c12d144902ae69827&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code'
          };

          return $http(request).then(function(response) {
            var token = response.data.token;
              AuthToken.save(token);
              return true;
          });
        }
    };

})();
