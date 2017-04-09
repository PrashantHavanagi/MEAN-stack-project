(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;


        function login(user) {
            if (user == null) {
                vm.registrationerror = "Please enter your details";
                return;
            }

                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (user) {
                        var loginUser = user;
                        if (loginUser != null) {
                            $location.url("/user/" + user._id+"/events");
                        } else {

                            vm.registrationerror = 'user not found';
                        }
                    })
                    .error(function (err) {
                        vm.registrationerror = 'user not found';
                    });

        }
    }
})();
