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

    // function LoginController($scope, $rootScope, $location, AuthenticationService) {
    //     // reset login status
    //     AuthenticationService.ClearCredentials();
    //
    //     $scope.login = function () {
    //         $scope.dataLoading = true;
    //         AuthenticationService.Login($scope.username, $scope.password, function(response) {
    //             if(response.success) {
    //                 AuthenticationService.SetCredentials($scope.username, $scope.password);
    //                 $location.path('/');
    //             } else {
    //                 $scope.error = response.message;
    //                 $scope.dataLoading = false;
    //             }
    //         });
    //     };
    //   };
})();
