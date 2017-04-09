    module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        "createUser": createUser,
        "findUserById":findUserById,
        "findUserbyUsername":findUserbyUsername,
        "findUserByCredentials":findUserByCredentials,
        "deleteUser":deleteUser,
        "updateUser":updateUser,
        "setModel":setModel,
        // "findUserByFacebookId": findUserByFacebookId,
        // "findUserByGoogleId":findUserByGoogleId
    };

    return api;

        // function findUserByFacebookId(facebookId) {
        //     return UserModel.findOne({'facebook.id': facebookId});
        // }
        // function findUserByGoogleId(googleId) {
        //     return UserModel.findOne({'google.id': googleId});
        // }
    function createUser(user) {

        delete user._id;
        return UserModel.create(user);
    }
    function findUserById(userId) {
        return UserModel.findById(userId);
    }
    function findUserbyUsername(username) {
        return UserModel.find({"username":username});
    }
    function findUserByCredentials(_username, _password) {
        return UserModel.find({username:_username, password: _password});
    }

    function deleteAll(websitesOfUser, userId) {
        if(websitesOfUser.length == 0){

            return UserModel.remove({_id: userId})
                .then(function (response) {
                    if(response.result.n == 1 && response.result.ok == 1){
                        return response;
                    }
                }, function (err) {
                   return err;
                });
        }

        return model.websiteModel.deleteChildren(websitesOfUser.shift())
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return deleteAll(websitesOfUser, userId);
                }
            }, function (err) {
                return err;
            });
    }

    function deleteUser(userId) {
        
        return UserModel.findById({_id: userId})
            .then(function (user) {
                var websitesOfUser = user.websites;
                return deleteAll(websitesOfUser, userId);
            }, function (err) {
                return err;
            });
    }
    function updateUser(userId, updatedUser) {
        return UserModel.update({_id:userId},{$set:updatedUser});
    }
    function setModel(_model) {
        model = _model;
    }
};