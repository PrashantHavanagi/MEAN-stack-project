(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($routeParams, EventService, $location) {
        var vm = this;
        //vm.login = login;
        vm.registerEvent = registerEvent;


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

        function registerEvent(event) {
            EventService
                // .findUserByUsername(user.username)
                // .success(function (user) {
                //     vm.error = "sorry that username is taken"
                // })
                // .error(function(){
                //     UserService
                        .createEvent(event)
                        .success(function(event){
                            $location.url("/user/"+user._id); //from here @@
                        })
                        .error(function () {
                            vm.error = 'sorry could not create event';
                        });
        }
    }
})();
