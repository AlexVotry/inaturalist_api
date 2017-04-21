(function() {

    angular
    .module('login')
    .factory('LoginService', LoginService);

    function LoginService($http, AuthToken) {

        return {
            login: login
        };
        var url = 'http://www.inaturalist.org/';
        var endpoint = 'oauth/token';

        function login(credentials) {
            var payload = {
                client_id: '2d037dc9fa0c24c816bd179d3c64d390e86c43b70c68357c12d144902ae69827',
                client_secret: '65de5e678402d47a0f426c7407b8cf95eea538be19234586f87b4826e2ef088c',
                grant_type: 'password',
                username: credentials.name,
                password: credentials.password
            };
            var request = {
                method: 'POST',
                url: '/login',
                // url: url + endpoint,
                // Access-Control-Allow-Origin: 'https://localhost:8080'},
                // header: { 'Access-Control-Allow-Origin': 'http://localhost:8080'},
                // headers: { 'Access-Control-Allow-Origin': '*'},
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
