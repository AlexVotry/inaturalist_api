(function() {

    angular
    .module('login')
    .controller('LoginController', LoginController);

    function LoginController($rootScope, LoginService) {
        var vm = this;

        vm.login = login;

        function login() {
            LoginService.login(vm.credentials).then(function() {
                $location.path('/welcome');
            });
        }
    }

})();
