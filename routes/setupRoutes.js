const express = require('express');
const router  = express.Router();
const ctrl    = require('../controller/setupController');

router.get(
  '/parameters/:machine_id/:part_id',
  ctrl.getSetupsByMachineAndPart
);

router.post('/',     ctrl.createSetup);
router.get('/',     ctrl.getAllSetups);
router.get('/:id', ctrl.getSetupById);
router.put('/:id', ctrl.updateSetup);
router.delete('/:id', ctrl.deleteSetup);

module.exports = router;
