(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider

            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "HomeController",
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
            // .when("/user/:uid", {
            //     templateUrl: "views/user/templates/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model"
            // })
            .when("/user/:uid", {
                templateUrl: "views/events/templates/main.view.client.html",
                controller: "EventsController",
                controllerAs: "model"
            })
            .when("/user/:uid/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
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

           .otherwise({
               templateUrl: "views/user/templates/home.view.client.html"
            });
    }
})();