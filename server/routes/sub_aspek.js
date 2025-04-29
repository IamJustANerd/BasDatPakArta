const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subaspekController');

router.get('/aspek/:aspekId/total-kesalahan', ctrl.getTotalKesalahan);
router.put('/aspek/:aspekId/update-total-kesalahan', ctrl.updateAspekTotalKesalahan);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
