const express = require('express');
const multer = require('multer');
const path = require('path');
const ctrl = require('../controller/toolController');
const router = express.Router();

// Multer configuration for tool drawing upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.pdf','.jpg','.jpeg','.png'].includes(ext)) cb(null, true);
  else cb(new Error('Only .pdf, .jpg, .jpeg & .png allowed'), false);
};
const upload = multer({ storage, fileFilter });

// CREATE
// POST /api/tools
router.post(
  '/',
  upload.single('tool_drawing_upload'),
  ctrl.createTool
);

// READ ALL
// GET /api/tools
router.get('/', ctrl.getAllTools);

// READ ONE
// GET /api/tools/:id
router.get('/:id', ctrl.getToolById);

// UPDATE
// PUT /api/tools/:id
router.put(
  '/:id',
  upload.single('tool_drawing_upload'),
  ctrl.updateTool
);

// DELETE
// DELETE /api/tools/:id
router.delete('/:id', ctrl.deleteTool);

module.exports = router;