(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($routeParams, UserService, $location) {
        var vm = this;
        //vm.login = login;


        function init() {
            var userId = $routeParams['uid'];
            vm.userId=userId;
            UserService
                .findUserById(userId)
                .success(renderUser);

        }
        init();

        function renderUser(user) {
            vm.user = user;
            console.log("Hiiiiiiiiiii");
            console.log(user);
            UserService
                .findNearByZipCodes(user.zipcode)
                .success(function (response) {
                    console.log(response);
                })
                .error(function(err) {
                    console.log("error"+err);
                });
        }
    }
})();
