(function() {

    angular
    .module('login')
    .controller('LoginController', LoginController);

    function LoginController($rootScope, LoginService, $location, SessionService) {
        var vm = this;

        vm.credentials = {
              username: '',
              password: ''
            };
        vm.loggedIn = true;
        vm.logout = logout;
        vm.login = login;
        vm.success = false;

        function login() {
          LoginService.login(vm.credentials).then(function(success) {
            vm.success = success;
            $rootScope.$broadcast('RegistrationSuccess');
            $location.path('/game');
            vm.loggedIn = true;
          }, function(error) {
            vm.error = error;
          });
        }

        function logout() {
          SessionService.logout();
          vm.currentUser = {};
          $rootScope.$broadcast('logout');
          $location.path('/welcome');
          vm.loggedIn = false;
        }

    }
})();
