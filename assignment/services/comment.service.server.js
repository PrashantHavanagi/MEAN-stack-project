module.exports = function (app,commentModel) {
    app.get("/api/comment", findComments);
    // app.get("/api/user/:userId", findUserByUserId);
    // app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    app.post("/api/comment", createComment);

    // function deleteUser(req, res) {
    //     var userId = req.params.userId;
    //     userModel
    //         .deleteUser(userId)
    //         .then(function (response) {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             res.sendStatus(404);
    //         });
    // }


    function createComment(req, res) {
        var user = req.body;

        var newUser = {
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            sports : user.sports,
            movies : user.movies,
            rest : user.rest,
            address: user.address,
            zipcode: user.zipcode
        };
        console.log(newUser);
        userModel
            .createUser(newUser)
            .then(function (newUser) {
                res.json(newUser);
            }, function (err) {
                console.log("Here");
                res.sendStatus(404).send(err);
            });

    }

    // function updateUser(req, res) {
    //     var userId = req.params['userId'];
    //     var newUser = req.body;
    //     userModel
    //         .updateUser(userId, newUser)
    //         .then(function (response) {
    //             if (response.nModified === 1) {
    //                 // Update was successful
    //                 userModel
    //                     .findUserById(userId)
    //                     .then(function (response) {
    //                         res.json(response);
    //                     }, function () {
    //                         res.sendStatus(404);
    //                     })
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         }, function () {
    //             res.sendStatus(404);
    //         });
    // }

    // function findUserByUserId(req, res) {
    //     var userId = req.params.userId;
    //     userModel
    //         .findUserById(userId)
    //         .then(function (user) {
    //             res.json(user);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    //
    // }

    // function findUser(req, res) {
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //     if (username && password) {
    //         findUserByCredentials(req, res);
    //     } else if (username) {
    //         findUserByUsername(req, res);
    //     }
    // }
    //
    // function findUserByUsername(req, res) {
    //     var username = req.query.username;
    //     userModel
    //         .findUserByUsername(username)
    //         .then(function (users) {
    //             if (users.length != 0) {
    //                 res.json(users[0]);
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         }, function (err) {
    //             res.sendStatus(404);
    //         });
    // }

    function findComments(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (response) {
                if (response.length != 0) {
                    res.json(response[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
}