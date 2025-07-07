// routes/machineRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controller/machineController');

router.post('/',    ctrl.createMachine);
router.get('/',    ctrl.getAllMachines);
router.get('/:id',ctrl.getMachineById);
router.put('/:id',ctrl.updateMachine);
router.delete('/:id',ctrl.deleteMachine);

module.exports = router;
