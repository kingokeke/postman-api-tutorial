var express = require('express');
var router = express.Router();
var haikuController = require('../controllers/haikuController.js');

/*
 * GET
 */
router.get('/', haikuController.list);

/*
 * GET
 */
router.get('/:id', haikuController.show);

/*
 * POST
 */
router.post('/', haikuController.create);

/*
 * PUT
 */
router.put('/:id', haikuController.update);

/*
 * DELETE
 */
router.delete('/:id', haikuController.remove);

module.exports = router;
