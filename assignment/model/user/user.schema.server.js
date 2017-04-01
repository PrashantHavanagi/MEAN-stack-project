module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        events: [{type:String}],
        sports: Boolean,
        movies: Boolean,
        rest: Boolean,
        comments: [{type: String}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "gms.users"});
    return UserSchema;
};