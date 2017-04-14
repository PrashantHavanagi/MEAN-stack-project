// (function () {
//     angular
//         .module("WebAppMaker")
//         .controller('FlickrImageSearchController',FlickrImageSearchController);
//
//     function FlickrImageSearchController($routeParams, $location, FlickrService) {
//         var vm = this;
//
//         var userId = $routeParams['uid'];
//         // var eventId= $routeParams['eid'];
//         // vm.eventId = eventId;
//         vm.userId=userId;
//         // vm.type = $routeParams.type;
//         // vm.websiteId          = $routeParams.wid;
//         // vm.pageId          = $routeParams.pid;
//         // vm.widgetId         = $routeParams.wgid;
//         vm.searchPhotos = searchPhotos;
//         vm.selectPhoto  = selectPhoto;
//
//         function searchPhotos(searchTerm) {
//             FlickrService
//                 .searchPhotos(searchTerm)
//                 .then(function(response) {
//                     data = response.data.replace("jsonFlickrApi(","");
//                     data = data.substring(0,data.length - 1);
//                     data = JSON.parse(data);
//                     vm.photos = data.photos;
//                 });
//         }
//
//         function selectPhoto(photo) {
//             var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
//             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
//             // EventService
//             //     .findEventById(vm.eventId)
//             //     .then(function (response) {
//             //         var updatedWidget = response.data;
//             //         updatedWidget.url = url;
//             event.url=url;
//                     // EventService
//                     //     .createEvent(vm.userId, event)
//                     //     .success(function(events){
//                     //         console.log(events);
//                     //         $location.url("/user/"+vm.userId+"/events");
//                     //     })
//                     //     .error(function (err) {
//                     //         vm.error = 'sorry could not create event';
//                     //     });
//
//
//         }
//     }
// })();
