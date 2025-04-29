const express = require('express');
const router = express.Router();
const muridController = require('../controllers/muridController');

router.get('/', muridController.getAll);
router.get('/:id', muridController.getById);
router.post('/', muridController.create);
router.put('/:id', muridController.update);
router.delete('/:id', muridController.remove);

module.exports = router;
