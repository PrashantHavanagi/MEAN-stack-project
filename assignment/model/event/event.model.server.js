module.exports = function () {
    var api = {
        createEvent: createEvent,
        findEventById: findEventById,
        findAllEventsForUser: findAllEventsForUser,
        findEventsByZip: findEventsByZip,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        //deletePageAndChildren: deletePageAndChildren,
        setModel: setModel,
    };

    var mongoose = require('mongoose');

    var EventSchema = require('./event.schema.server')();
    var EventModel = mongoose.model('EventModel', EventSchema);

    return api;

    function createEvent(userId, newEvent){
        return EventModel
            .create(newEvent)
            .then(function (event) {
                return model
                    .userModel
                    .findUserById(userId)
                    .then(function (user) {
                        user.events.push(event);
                        event._user = user._id;
                        user.save();
                        event.save();
                        return event;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }
    function findAllEventsForUser(userId){
        return EventModel.find({_event:userId});
    }
    function findEventById(eventId){
        return EventModel.findOne({_id:eventId});
    }
    function findEventsByZip(zipcode){
        return EventModel.find({zipcode:zipcode});
    }
    function updateEvent(eventId, updatedEvent){
        return EventModel.update({_id:eventId},{$set: updatedEvent});
    }
    function deleteEvent(eventId) {

        return EventModel.findEventById(eventId).populate('_user').then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            return deleteChildren(pageId);
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