(function() {

    angular
    .module('login')
    .controller('LoginController', LoginController);

    function LoginController($rootScope, LoginService, $location) {
        var vm = this;

        vm.credentials = {
              username: '',
              password: ''
            };

        vm.login = login;
        vm.success = false;

        function login() {
          LoginService.login(vm.credentials).then(function(success) {
            vm.success = success;
            $rootScope.$broadcast('RegistrationSuccess');
            $location.path('/welcome');
          }, function(error) {
            vm.error = error;
          });
        }

    }
})();
