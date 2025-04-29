const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/chapterController');

router.put('/project/:projectId/total-nilai-finalisasi', ctrl.nilaifinal);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;