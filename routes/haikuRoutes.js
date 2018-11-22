// routes/haikuRoutes.js
const express = require('express');
const router = express.Router();
const haikuController = require('../controllers/haikuController.js');
const auth = require('../utils/auth');

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
