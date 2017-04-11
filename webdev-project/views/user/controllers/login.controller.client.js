(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, EventService, $location) {
        var vm = this;
        vm.login = login;

        function init() {
            EventService.findEvents()
                .success(function(events){
                    if(events.length > 10){
                        events.splice(0,0+9);
                    }
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        init();

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
