(function() {

    angular
    .module('signup')
    .factory('SignupService', SignupService);

    function SignupService($q, $http, $window, AuthToken) {
      delete $http.defaults.headers.common['X-Requested-With'];
      var config = {
        url: '',
        endpoint: '/app/v1/signup'
      };

      return {
        register: register,
        getList: getList
      };

      function register(credentials) {
        var request = {
          method: 'POST',
          url: config.url + config.endpoint,
          data: { credentials: credentials }
          // console.log('cred: ', credentials);
        };

        return $http(request)
          .then(function(response) {
            var token = response.data.token;
            AuthToken.save(token);

            return true;
          })
          // , function(response) {
          //   return $q.reject(response.data.error);
          // });
      }
      function getList() {
        var request = {
          method: 'GET',
          url: config.url + config.endpoint,
        };
        return $http(request)
        .then(function(response) {
          return response.data;
        })
      }
    };

})();
