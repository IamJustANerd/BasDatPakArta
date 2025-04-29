const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/aspekController');

router.get('/chapter/:chapterId/total-kesalahan', ctrl.getTotalKesalahan);
router.put('/chapter/:chapterId/update-total-kesalahan', ctrl.updateAspekTotalKesalahan);
router.put('/chapter/:chapterId/totalnilai', ctrl.nilaitotal);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;