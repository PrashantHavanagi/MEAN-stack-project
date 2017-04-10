(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($routeParams, EventService, UserService, CommentService, $location) {
        var vm = this;
        vm.registerEvent = registerEvent;
        vm.participateUser = participateUser;
        vm.addComment = addComment;
        vm.showEvent = showEvent;
        vm.editEvent = editEvent;
        vm.deleteEvent = deleteEvent;
        vm.updateEvent = updateEvent;
        vm.doLike = doLike;

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
            if(vm.event != undefined && vm.user.likedEvents.indexOf(vm.event._id) !== -1) {
                console.log("Liked");
                vm.userLiked = 1;
            }
            else{
                vm.userLiked = 0;
            }
            EventService.findEventsByZip(user)
                .success(function(events){
                    console.log(events);
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        function doLike(user, eventId) {
            if (vm.userLiked == 1) {
                delete vm.userLiked;
                EventService.doLike(user, eventId, 'sub')
                    .success(function(event){
                        console.log(event.likes);
                        vm.event.likes = event.likes;
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            } else {
                vm.userLiked = 1;
                EventService.doLike(user, eventId, 'add')
                    .success(function(event){
                        console.log(event.likes);
                        vm.event.likes = event.likes;
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }
        }

        function updateEvent(event) {
            EventService.findNearByZipCodes(event.zipcode)
                .success(function(result){
                    var zipcodes = [];
                    var zipcodesArr = result.zip_codes;
                    for(var index in zipcodesArr){
                        zipcodes.push(zipcodesArr[index].zip_code);
                    }
                    event.nearByZipcodes = zipcodes;
                    EventService.updateEvent(event._id, event)
                        .success(function(response){
                            $location.url("/user/"+vm.userId+"/events");
                        })
                        .error(function (err) {
                            vm.error = 'sorry could not delete event';
                        });
                })
                .error(function (err) {
                    vm.error = 'something went wrong';
                });
        }

        function deleteEvent(eventId) {
            var answer = confirm("Are you sure?");
            if(answer){
                EventService.deleteEvent(eventId)
                    .success(function(response){
                        $location.url("/user/"+vm.userId+"/events");
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not delete event';
                    });
            }
        }
        function editEvent(eventId) {
            $location.url("/user/"+vm.userId+"/sport/edit/"+eventId);
        }

        function showEvent(event) {
            CommentService.findCommentsById(event._id)
                .success(function(comments){
                    vm.event = event;
                    console.log(event);
                    vm.comments = comments;
                    $location.url("/user/"+vm.userId+"/event/"+event._id);
                })
                .error(function (err) {
                    vm.error = 'sorry could not add comment';
                });
        }

        function addComment(user, eventId) {
            CommentService.addComment(user, eventId)
                .success(function(comments){
                    vm.user.comment = "";
                    vm.comments = comments;
                })
                .error(function (err) {
                    vm.error = 'sorry could not add comment';
                });
        }

        function registerEvent(event, type) {
            event.type = type;
            if(type == "MOVIE"){
                event.eventDate = new Date();
                event.eventDate.setDate(event.eventDate.getDate() + 30);
                EventService
                    .createEvent(vm.userId, event)
                    .success(function(events){
                        console.log(events);
                        $location.url("/user/"+vm.userId+"/events");
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }
            else{
                if(event.eventDate == undefined){
                    event.eventDate = new Date();
                    event.eventDate.setDate(event.eventDate.getDate() + 30);
                }
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
                                $location.url("/user/"+vm.userId+"/events");
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
