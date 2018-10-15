var haikuModel = require('../models/haikuModel.js');

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
        haikuModel.find(function (err, haikus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting haiku.',
                    error: err
                });
            }
            return res.json(haikus);
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
            return res.json(haiku);
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
            return res.status(201).json(haiku);
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

                return res.json(haiku);
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
