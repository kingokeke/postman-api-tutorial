var haikuModel = require('../models/haikuModel.js');
var hal = require('hal');

/**
 * haikuController.js
 *
 * @description :: Server-side logic for managing haikus.
 */
module.exports = {

    /**
     * haikuController.list()
     */
    list: function (req, res) {
        haikuModel.paginate({}, { page: req.query.page || 1 }, function (err, haikus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting haiku.',
                    error: err
                });
            }

            // store some vars about the state of request
            var resourceLink = '/haiku',
                firstPage = 1,
                currentPage = Number(haikus.page),
                currentLink = req.query.page ? `${resourceLink}?page=${currentPage}` : resourceLink,
                prevPage = currentPage-1,
                nextPage = currentPage+1,
                lastPage = Number(haikus.pages);

            // generate an new docs array of `hal` resources with their own links.
            var docs = haikus.docs.map(function(haiku) {
                return new hal.Resource(haiku._doc, `${resourceLink}/${haiku._id}`);
            });

            // deleting the docs array from the original paginated result, so we can embed them with HAL.
            delete haikus.docs; 

            // create a `hal` resource of our paginated collection
            // use the `currentLink` variable so it displays page number if it's set
            var collection = new hal.Resource(haikus, currentLink);

            // embed the new docs array.
            collection.embed("haikus", docs);

            // add in our first, prev, next, last pagination links
            collection.link("first", `${resourceLink}?page=${firstPage}`);
            if (currentPage > firstPage) {
                collection.link("prev", `${resourceLink}?page=${prevPage}`);
            }
            if (currentPage < lastPage) {
                collection.link("next", `${resourceLink}?page=${nextPage}`);
            }
            collection.link("last", `${resourceLink}?page=${lastPage}`);

            collection.link("create", {href: `${resourceLink}`, method: "POST"});

            return res.json(collection);
        });
    },

    /**
     * haikuController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        haikuModel.findOne({_id: id}, function (err, haiku) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting haiku.',
                    error: err
                });
            }
            if (!haiku) {
                return res.status(404).json({
                    message: 'No such haiku'
                });
            }

            var resourceLink = `/haiku/${haiku._id}`,
                resource = new hal.Resource(haiku._doc, resourceLink);

            resource.link("update", {href: `${resourceLink}`, method: "PUT"});
            resource.link("delete", {href: `${resourceLink}`, method: "DELETE"});

            return res.json(resource);
        });
    },

    /**
     * haikuController.create()
     */
    create: function (req, res) {
        var haiku = new haikuModel({
			line1 : req.body.line1,
			line2 : req.body.line2,
			line3 : req.body.line3,
			author : req.body.author

        });

        haiku.save(function (err, haiku) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating haiku',
                    error: err
                });
            }

            var resource = new hal.Resource(haiku._doc, `/haiku/${haiku._id}`);
            return res.status(201).json(resource);
        });
    },

    /**
     * haikuController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        haikuModel.findOne({_id: id}, function (err, haiku) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting haiku',
                    error: err
                });
            }
            if (!haiku) {
                return res.status(404).json({
                    message: 'No such haiku'
                });
            }

            haiku.line1 = req.body.line1 ? req.body.line1 : haiku.line1;
			haiku.line2 = req.body.line2 ? req.body.line2 : haiku.line2;
			haiku.line3 = req.body.line3 ? req.body.line3 : haiku.line3;
			haiku.author = req.body.author ? req.body.author : haiku.author;
			
            haiku.save(function (err, haiku) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating haiku.',
                        error: err
                    });
                }

                var resource = new hal.Resource(haiku._doc, `/haiku/${haiku._id}`);
                return res.json(resource);
            });
        });
    },

    /**
     * haikuController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        haikuModel.findByIdAndRemove(id, function (err, haiku) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the haiku.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
