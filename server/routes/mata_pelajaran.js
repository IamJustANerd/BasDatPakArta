const express = require('express');
const router = express.Router();
const controller = require('../controllers/mataPelajaranController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.put('/:id/nilai', controller.addNilaiEntry);

module.exports = router;