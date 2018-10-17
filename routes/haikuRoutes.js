var express = require('express');
var router = express.Router();
var haikuController = require('../controllers/haikuController.js');
var auth = require('../utils/auth');

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
router.post('/', auth.check, haikuController.create);

/*
 * PUT
 */
router.put('/:id', auth.check, haikuController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.check, haikuController.remove);

module.exports = router;
