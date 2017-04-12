module.exports = function (app,userModel) {

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(localStrategy));

    app.post("/api/login", passport.authenticate('local'), login);
    app.post('/api/logout',logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.post('/api/isAdmin', isAdmin);
    app.get('/api/allUsers', findAllUsers);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        console.log("in local strategy");
        userModel
        // .findUserByCredentials(username, password)

            .findUserbyUsername(username)
            .then(
                function(user) {
                    console.log("found user");
                    if(user != null && user.username === username && bcrypt.compareSync(password, user.password)) {
                        console.log(user);
                        return done(null, user);
                    } else {
                        console.log(bcrypt.hashSync(user.password));
                        console.log(password);
                        console.log(user.password);
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    function login(req, res) {
        console.log("came to login as well");
        var user = req.user;
        res.json(user);
    }
    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }
    function serializeUser(user, done) {
        done(null, user);
    }
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function isAdmin(req, res) {
        res.send(req.user.role == 'ADMIN' ? req.user : '0');
    }
    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (response) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(404);
            });
    }


    function createUser(req, res) {
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
            zipcode: user.zipcode,
            dateCreated: Date.now()
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

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (response) {
                if (response.nModified === 1) {
                    // Update was successful
                    userModel
                        .findUserById(userId)
                        .then(function (response) {
                            res.json(response);
                        }, function () {
                            res.sendStatus(404);
                        })
                }
                else {
                    res.sendStatus(404);
                }
            }, function () {
                res.sendStatus(404);
            });
    }

    function findUserByUserId(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (users) {
                if (users.length != 0) {
                    res.json(users[0]);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function findUserByCredentials(req, res) {
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