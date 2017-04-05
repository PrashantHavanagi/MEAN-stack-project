module.exports = function (app,eventModel) {
    app.get("/api/page/:eventId", findEventById);
    // app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    // app.put("/api/page/:pageId", updatePage);
    // app.delete("/api/page/:pageId", deletePage);
    app.post("/api/user/:userId/event", createEvent);

    // function deletePage(req, res) {
    //     var pageId = req.params.pageId;
    //     pageModel
    //         .deletePage(pageId)
    //         .then(function (response) {
    //             if(response.result.n==1 && response.result.ok==1){
    //                 res.sendStatus(200);
    //             }
    //             else
    //             {
    //                 res.sendStatus(404);
    //             }
    //         },function (err) {
    //             res.sendStatus(404);
    //         });
    //
    // }

    function createEvent(req, res) {
        var event = req.body;
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
        var userId = req.params['userId'];
        eventModel
            .findEventById(eventId)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(404);
            });
    }

};