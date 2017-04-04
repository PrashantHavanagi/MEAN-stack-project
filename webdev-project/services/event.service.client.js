(function(){
    angular
        .module("WebAppMaker")
        .factory('EventService', eventService);

    function eventService($http) {

        var api = {
            "createEvent": createEvent,
           // "deleteUser": deleteUser,
            //"updateUser": updateUser,
            "findEventByCredentials": findEventByCredentials,
            "findEventById": findEventById,
            "findEventByUsername": findEventByUsername,
            "findNearByZipCodes": findNearByZipCodes,
            "findEventByZipCode":findEventByZipCode
        };
        return api;

        // function deleteUser(userId) {
        //     return $http.delete('/api/user/'+userId);
        // }

        function createEvent(event) {
            return $http.post("/api/user", event);
        }

        function findEventByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findEventByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        // function updateUser(userId, newUser) {
        //     return $http.put("/api/user/"+userId, newUser);
        // }

        function findEventById(uid) {
            return $http.get("/api/user/"+uid);
        }
        function findNearByZipCodes(zipcode){
            var key = "js-rqggQX3IUkKVa0ZHDqFQjkn6iUqtNcofCEwtBzcvUWr5XrMARrrbMOh4JIxxVVMx";
            var format = "json";
            var units = "mile";
            var distance = "1";
            var urlBase = "https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/<units>";

            var url = urlBase.replace("<api_key>", key).replace("<format>", format).replace("<zip_code>", zipcode).replace("<distance>", distance).replace("<units>", units);
            return $http.get(url);
        }

        function findEventByZipCode(zipcode){
            $http.get("/api/user?zipcode="+zipcode);
        }

    }
})();