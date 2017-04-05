module.exports = function() {
    var mongoose = require("mongoose");
    var EventSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        type: {type:String, enum:['SPORT','MOVIE','REST']},
        description: String,
        eventname: String,
        address: String,
        zipcode: String,
        events: [{type:String}],
        comments: [{type: String}],
        eventDate: String,
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "gms.event"});
    return EventSchema;
};