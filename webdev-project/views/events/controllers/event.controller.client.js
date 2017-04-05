(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($routeParams, EventService, $location, UserService) {
        var vm = this;
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
            console.log(user);
            EventService.findEventsByZip(user.zipcode)
                .success(function(events){
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        function registerEvent(event, type) {
            event.type = type;
            EventService.findNearByZipCodes(event.zipcode)
                .success(function(result){
                    var zipcodes = [];
                    var zipcodesArr = result.zip_codes;
                    for(var index in zipcodesArr){
                        zipcodes.push(zipcodesArr[index].zip_code);
                    }
                    event.nearByZipcodes = zipcodes;
                    EventService
                        .createEvent(vm.userId, event)
                        .success(function(events){
                            console.log(events);
                            $location.url("/user/"+vm.userId);
                        })
                        .error(function (err) {
                            vm.error = 'sorry could not create event';
                        });
                })
                .error(function (err) {
                    vm.error = 'something went wrong';
                });
        }
    }
})();
