module.exports = function () {
    var api = {
        createComment: createComment,
        findCommentsById: findCommentsById,
        findComments: findComments,
        // findEventsByZip: findEventsByZip,
        // updateEvent: updateEvent,
        deleteComment: deleteComment,
        // //deletePageAndChildren: deletePageAndChildren,
        setModel: setModel,
        // addParticipant: addParticipant
    };

    var mongoose = require('mongoose');

    var CommentSchema = require('./commentBox.schema.server')();
    var CommentModel = mongoose.model('CommentModel', CommentSchema);

    return api;

    function findCommentsById(eventId) {
        return CommentModel.find({eventId:eventId}).sort({dateCreated:-1});
    }
    // function addParticipant(eventId, user){
    //  return model.userModel
    //         .findUserById(user._id)
    //         .then(function (user) {
    //             return EventModel.update(
    //                 { _id: eventId },
    //                 { $addToSet: {participants: user._id } })
    //                 .then(function (event) {
    //                 user.events.push(eventId);
    //                 user.save();
    //                 return event;
    //                 }, function (err) {
    //                     return err;
    //                 });
    //         }, function (err) {
    //             return err;
    //         });
    // }

    function createComment(newComment){
        return CommentModel
            .create(newComment)
            .then(function (newComment) {
                return findCommentsById(newComment.eventId)
                    .then(function (comments) {
                        return comments;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }
    function findComments(userId){
        return EventModel.find({_event:userId});
    }
    function findEventById(eventId){
        return EventModel.findOne({_id:eventId});
    }
    function findEventsByZip(zipcode, userId){
        console.log(userId);
        return model.userModel
            .findUserById(userId)
            .then(function (user) {
                var type1 = "INTEREST";
                var type2 = "INTEREST";
                var type3 = "INTEREST";
                if(user.sports){
                    type1 = "SPORT";
                }
                if(user.movies){
                    type2 = "MOVIE";
                }
                if(user.rest){
                    type3 = "REST";
                }
                return EventModel.find(
                    { $and: [ { type: { $in: [type1, type2, type3] } }, { nearByZipcodes: zipcode, eventDate: {"$gte": Date.now()}} ] }
                ).then(function (events) {
                    return events;
                }, function (err) {
                    return err;
                });
            }, function (err) {
                return err;
            });
    }
    function updateEvent(eventId, updatedEvent){
        return EventModel.update({_id:eventId},{$set: updatedEvent});
    }
    function deleteComment(eventId) {
        return CommentModel.remove({eventId:eventId}).then(function (response) {
            return response;
        }, function (err) {
            return err;
        });
    }

    function deleteAll(widgetsOfPage, pageId) {
        if(widgetsOfPage.length == 0){

            return EventModel.remove({_id: pageId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                    return err;
                });
        }

        return model.widgetModel.deleteWidgetOfPage(widgetsOfPage.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return deleteAll(widgetsOfPage, pageId);
                }
            }, function (err) {
                return err;
            });
    }

    function deleteChildren(pageId) {

        return EventModel.findById({_id: pageId})
            .then(function (page) {
                var widgetsOfPage = page.widgets;
                return deleteAll(widgetsOfPage, pageId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};