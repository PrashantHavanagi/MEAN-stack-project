(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/login');
            }
        });
    };

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider

            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/admin/:uid', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: {
                    //adminUser: isAdmin
                }
            })
            .when("/user/:uid/events", {
                templateUrl: "views/events/templates/main.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/:uid/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/:uid/sport", {
                templateUrl: "views/events/templates/sport.event.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/user/:uid/movie", {
                templateUrl: "views/events/templates/movie.event.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/user/:uid/restaurant", {
            templateUrl: "views/events/templates/restaurant.event.view.client.html",
            controller: "EventsController",
            controllerAs: "model"
            })
            .when("/user/:uid/sport/edit/:eid", {
                templateUrl: "views/events/templates/sport.edit.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/:eid", {
                templateUrl: "views/events/templates/event.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    // function isAdmin(UserService, $location) {
    //     UserService
    //         .isAdmin()
    //         .then(function (user) {
    //             if(user == '0') {
    //                 $location.url('/admin')
    //             } else {
    //                 $location.url("/user/" + user._id+"/events");
    //             }
    //         });
    // }
})();