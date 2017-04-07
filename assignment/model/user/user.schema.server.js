module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imageUrl: String,
        phone: String,
        address: String,
        zipcode: String,
        events: [{type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}],
        sports: Boolean,
        movies: Boolean,
        rest: Boolean,
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "gms.users"});
    return UserSchema;
};