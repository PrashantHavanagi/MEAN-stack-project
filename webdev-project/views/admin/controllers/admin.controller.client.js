(function () {
    angular
        .module('WebAppMaker')
        .controller('AdminController', adminController);
    
    function adminController(UserService, EventService, $routeParams) {
        var model = this;

        model.deleteUser = deleteUser;
        model.updateUser = updateUser;
        model.deleteEvent = deleteEvent;

        function init() {
            model.userId = $routeParams['uid'];
            findAllUsers();
            findAllEvents();
        }
        init();

        function findAllEvents() {
            EventService.findEvents()
                .success(function(events){
                    console.log(events);
                    model.events = events;
                })
                .error(function (err) {
                    model.error = 'sorry could not create event';
                });
        }
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllUsers() {
            UserService.
                findAllUser()
                .then(renderUsers);
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .success(function(events){
                    findAllUsers();
                    findAllEvents();
                })
                .error(function (err) {
                    model.error = 'sorry could not create event';
                });
        }
        
        function renderUsers(users) {
            console.log(users);
            model.users = users.data;
        }
        function deleteEvent(event) {
            EventService.deleteEvent(event._id)
                .success(function(res){
                    findAllEvents();
                })
                .error(function (err) {
                    model.error = 'sorry could not delete event';
                });
        }
    }
})();