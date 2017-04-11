(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.unregisterUser = unregisterUser;
        vm.updateUser=updateUser;
        vm.userId = userId;

        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }
         function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    $location.url("/user/" + userId+"/events");
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();