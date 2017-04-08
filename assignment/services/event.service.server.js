module.exports = function (app,eventModel) {
    app.get("/api/event/:eventId", findEventById);
    // app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // app.put("/api/page/:pageId", updatePage);
    app.delete("/api/event/:eventId", deleteEvent);
    app.get("/api/event", findEventsByZip);
    app.post("/api/user/:userId/event", createEvent);
    app.put("/api/event/:eventId", addParticipant);

    function deleteEvent(req, res) {
        var eventId = req.params.eventId;
        eventModel
            .deleteEvent(eventId)
            .then(function (response) {
                if(response.result.n==1 && response.result.ok==1){
                    res.sendStatus(200);
                }
                else
                {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function addParticipant(req, res){
        var eventId = req.params.eventId;
        var user = req.body;
        eventModel
            .addParticipant(eventId, user)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function createEvent(req, res) {
        var event = req.body;
        event.dateCreated = Date.now();
        var userId = req.params['userId'];
        eventModel
            .createEvent(userId,event)
            .then(function (event) {
                res.json(event);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var update = req.body;
        pageModel
            .updatePage(pageId,update)
            .then(function (response) {
                if (response.ok == 1 && response.n == 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);

            },function (err) {
                res.sendStatus(404);
            });
    }

    function findEventById(req, res) {
        var eventId = req.params['eventId'];
        eventModel
            .findEventById(eventId)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function findEventsByZip(req, res) {
        var zipcode = req.query['zipcode'];
        var userId = req.query['userId'];
        eventModel
            .findEventsByZip(zipcode, userId)
            .then(function (events) {
                if(events[0]){
                    // res.json(events);
                    res.send(events);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

};