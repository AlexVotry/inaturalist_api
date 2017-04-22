(function() {

    angular
    .module('login')
    .factory('LoginService', LoginService);

    function LoginService($http, AuthToken) {

        return {
            login: login
        };

        function login(credentials) {
            var payload = {
                client_id: '2d037dc9fa0c24c816bd179d3c64d390e86c43b70c68357c12d144902ae69827',
                client_secret: '65de5e678402d47a0f426c7407b8cf95eea538be19234586f87b4826e2ef088c',
                code: '8d12e9fae20eefa5585b941c8e7c59e9b59b884d7be3dd2c9cdbb3a0eed87d76',
                redirect_uri: 'http://127.0.0.1:8080',
                grant_type: "authorization_code"
            };

            var request = {
                method: 'POST',
                url: 'http://www.inaturalist.org/oauth/token',
                data: payload
            };
            console.log('header: ', request);
            return $http(request).then(function(response) {
                var token = JSON.parse(response)["access_token"];
                AuthToken.save(token);
            })
        }
    };

})();
