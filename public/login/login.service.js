(function() {
    
    angular
    .module('login')
    .factory('LoginService', LoginService);
    
    function LoginService($http, $window) {
        
        return {
            login: login
        };
        
        function login(credentials) {
            var payload = {
                client_id: '93f6d5e9f99e11f18194377732a5161ca164386cce6e53e83c066aa245e6e199',
                client_secret: 'd0e8e216da14a2d46026500a0e5d4e1a8f569622034e3525cbc959e3a52fa2e3',
                grant_type: 'password',
                username: credentials.name,
                password: credentials.password
            };
            var request = {
                method: 'POST',
                url: 'http://www.inaturalist.org/oauth/applications/new',
                // headers: { 'Access-Control-Allow-Origin': 'https://mobious-favedmonds.c9users.io'},
                headers: { 'Access-Control-Allow-Origin': '//mobious-favedmonds.c9users.io'},
                // headers: { 'Access-Control-Allow-Origin': '*'},
                data: payload
            };
            
            return $http(request).then(function(response) {
                token = JSON.parse(response)["access_token"];
                $window.localStorage.setItem("naturist", token);
            })
        }
    };
    
})();