(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($routeParams, EventService, UserService, CommentService, $location, $route) {
        var vm = this;
        vm.registerEvent = registerEvent;
        vm.participateUser = participateUser;
        vm.addComment = addComment;
        vm.populateComments = populateComments;
        vm.editEvent = editEvent;
        vm.deleteEvent = deleteEvent;

        function init() {
            var userId = $routeParams['uid'];
            var eventId= $routeParams['eid'];
            if(eventId != undefined){
            EventService
                .findEventById(eventId)
                .success(function(event){
                    vm.event = event;
                    vm.event.eventDate = new Date(event.eventDate);
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
            }
            vm.userId=userId;
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function renderUser(user) {
            vm.user = user;
            console.log(user);
            EventService.findEventsByZip(user)
                .success(function(events){
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        function deleteEvent(eventId) {
            $route.reload();
            EventService.deleteEvent(eventId)
                .success(function(response){
                    $route.reload();
                })
                .error(function (err) {
                    vm.error = 'sorry could not delete event';
                });
        }
        function editEvent(eventId) {
            $location.url("/user/"+vm.userId+"/sport/edit/"+eventId);
        }

        function populateComments(eventId) {
            console.log("In populate");
            CommentService.findCommentsById(eventId)
                .success(function(comments){
                    console.log(comments);
                    vm.comments = comments;
                })
                .error(function (err) {
                    vm.error = 'sorry could not add comment';
                });
        }

        function addComment(user, eventId) {
            CommentService.addComment(user, eventId)
                .success(function(comments){
                    vm.user.comment = "";
                    console.log(comments);
                    vm.comments = comments;
                })
                .error(function (err) {
                    vm.error = 'sorry could not add comment';
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

        function participateUser(user, eventId) {
            EventService.addParticipant(user, eventId)
                .success(function(event){
                    vm.message = "You have successfully registered for this event";
                    console.log(event);
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }
    }
})();
