(function() {

    angular
    .module('signup')
    .controller('SignupController', SignupController);

    function SignupController($rootScope, SignupService, $location) {
      var vm = this;
      vm.credentials = {
        username: '',
        password: ''
      };
      vm.register = register;
      vm.success = false;
      vm.error = '';
      // vm.getList = getList;

      function register() {
        SignupService.register(vm.credentials)
          .then(function(success) {
            vm.success = success;
            $rootScope.$broadcast('RegistrationSuccess');
            $location.path('/game');
          }, function(error) {
            vm.error = error;
          });
      };

      // function getList() {
      //   SignupService.getList()
      //   .then(function(list) {
      //     vm.list = list;
      //   });
      // }
    }

})();
