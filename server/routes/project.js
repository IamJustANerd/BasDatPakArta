const express = require('express');
const router = express.Router();
const controller = require('../controllers/projectController');

router.get('/by-murid-pelajaran', controller.getByMuridAndPelajaran);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/by-mataPelajaran/:id', controller.getByMataPelajaranId);
router.get('/:id/detail', controller.getProjectDetail);


module.exports = router;
