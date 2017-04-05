module.exports = function() {
    var mongoose = require("mongoose");
    var EventSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        type: {type:String, enum:['SPORT','MOVIE','REST']},
        eventCreator: String,
        description: String,
        eventName: String,
        address: String,
        zipcode: String,
        comments: [{type: String}],
        participants :[{type: String}],
        eventDate: Date,
        url: String,
        nearByZipcodes: [{type: String}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "gms.event"});
    return EventSchema;
};