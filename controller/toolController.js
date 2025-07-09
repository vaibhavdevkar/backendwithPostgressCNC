// // controllers/toolController.js
// const pool = require('../db');
// const fs   = require('fs');

// // Helper to delete old drawing file
// async function deleteOldDrawing(id) {
//   const { rows } = await pool.query(
//     'SELECT tool_drawing_upload FROM tool_master WHERE tool_id = $1',
//     [id]
//   );
//   const oldPath = rows[0]?.tool_drawing_upload;
//   if (oldPath) fs.unlink(oldPath, () => {});
// }

// // CREATE
// exports.createTool = async (req, res) => {
//   const {
//     tool_name,
//     tool_type,
//     machine_id,
//     part_id,
//     tool_number,
//     tool_life_limit,
//     tool_change_threshold,
//     tool_manufacturer_code,
//     tool_calibration_required,
//     tool_calibration_freq,
//     tool_holder_type,
//     status,
//     tool_wear_monitoring,
//     remaining_life_percent,
//     total_tools_used_till,
//     tool_health_status,
//     replacement_reason,
//     alert_threshold,
//     offset_no,
//     nominal_offset_value,
//     last_applied_offset,
//     offset_delta,
//     tool_wear_percent,
//     offset_change_history
//   } = req.body;

//   const drawing = req.file ? req.file.path : null;

//   try {
//     const { rows } = await pool.query(
//       `INSERT INTO tool_master
//          (
//            tool_name, tool_type, machine_id, part_id,
//            tool_number, tool_life_limit, tool_change_threshold,
//            last_change_date, tool_drawing_upload,
//            tool_manufacturer_code, tool_calibration_required,
//            tool_calibration_freq, tool_holder_type, status,
//            tool_wear_monitoring, remaining_life_percent,
//            total_tools_used_till, tool_health_status,
//            replacement_reason, alert_threshold,
//            offset_no, nominal_offset_value,
//            last_applied_offset, offset_delta,
//            tool_wear_percent, offset_change_history
//          )
//        VALUES
//          ($1,$2,$3,$4,$5,$6,$7,NOW(),$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
//        RETURNING *;`,
//       [
//         tool_name,
//         tool_type,
//         machine_id,
//         part_id || null,
//         tool_number,
//         tool_life_limit,
//         tool_change_threshold,
//         drawing,
//         tool_manufacturer_code || null,
//         tool_calibration_required || false,
//         tool_calibration_freq || null,
//         tool_holder_type || null,
//         status,
//         tool_wear_monitoring || false,
//         remaining_life_percent || null,
//         total_tools_used_till || 0,
//         tool_health_status,
//         replacement_reason || null,
//         alert_threshold,
//         offset_no || null,
//         nominal_offset_value || null,
//         last_applied_offset || null,
//         offset_delta || null,
//         tool_wear_percent || null,
//         offset_change_history ? JSON.parse(offset_change_history) : null
//       ]
//     );
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error('Error creating tool:', err);
//     if (drawing) fs.unlink(drawing, () => {});
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ALL
// exports.getAllTools = async (_, res) => {
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM tool_master ORDER BY tool_id;'
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching tools:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ONE
// exports.getToolById = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'tool_id must be integer.' });

//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM tool_master WHERE tool_id = $1;', [id]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching tool:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // UPDATE
// exports.updateTool = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'tool_id must be integer.' });

//   const {
//     tool_name,
//     tool_type,
//     machine_id,
//     part_id,
//     tool_number,
//     tool_life_limit,
//     tool_change_threshold,
//     tool_manufacturer_code,
//     tool_calibration_required,
//     tool_calibration_freq,
//     tool_holder_type,
//     status,
//     tool_wear_monitoring,
//     remaining_life_percent,
//     total_tools_used_till,
//     tool_health_status,
//     replacement_reason,
//     alert_threshold,
//     offset_no,
//     nominal_offset_value,
//     last_applied_offset,
//     offset_delta,
//     tool_wear_percent,
//     offset_change_history
//   } = req.body;

//   let drawing;
//   if (req.file) {
//     await deleteOldDrawing(id);
//     drawing = req.file.path;
//   } else {
//     const { rows } = await pool.query(
//       'SELECT tool_drawing_upload FROM tool_master WHERE tool_id = $1;', [id]
//     );
//     drawing = rows[0]?.tool_drawing_upload || null;
//   }

//   try {
//     const { rows } = await pool.query(
//       `UPDATE tool_master SET
//          tool_name                = $1,
//          tool_type                = $2,
//          machine_id               = $3,
//          part_id                  = $4,
//          tool_number              = $5,
//          tool_life_limit          = $6,
//          tool_change_threshold    = $7,
//          tool_drawing_upload      = $8,
//          tool_manufacturer_code   = $9,
//          tool_calibration_required= $10,
//          tool_calibration_freq    = $11,
//          tool_holder_type         = $12,
//          status                   = $13,
//          tool_wear_monitoring     = $14,
//          remaining_life_percent   = $15,
//          total_tools_used_till    = $16,
//          tool_health_status       = $17,
//          replacement_reason       = $18,
//          alert_threshold          = $19,
//          offset_no                = $20,
//          nominal_offset_value     = $21,
//          last_applied_offset      = $22,
//          offset_delta             = $23,
//          tool_wear_percent        = $24,
//          offset_change_history    = $25::jsonb,
//          updated_at               = NOW()
//        WHERE tool_id = $26
//        RETURNING *;`,
//       [
//         tool_name,
//         tool_type,
//         machine_id,
//         part_id || null,
//         tool_number,
//         tool_life_limit,
//         tool_change_threshold,
//         drawing,
//         tool_manufacturer_code || null,
//         tool_calibration_required || false,
//         tool_calibration_freq || null,
//         tool_holder_type || null,
//         status,
//         tool_wear_monitoring || false,
//         remaining_life_percent || null,
//         total_tools_used_till || 0,
//         tool_health_status,
//         replacement_reason || null,
//         alert_threshold,
//         offset_no || null,
//         nominal_offset_value || null,
//         last_applied_offset || null,
//         offset_delta || null,
//         tool_wear_percent || null,
//         offset_change_history ? JSON.parse(offset_change_history) : null,
//         id
//       ]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error updating tool:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // DELETE
// exports.deleteTool = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'tool_id must be integer.' });

//   try {
//     await deleteOldDrawing(id);
//     const result = await pool.query(
//       'DELETE FROM tool_master WHERE tool_id = $1;', [id]
//     );
//     if (result.rowCount === 0) return res.status(404).json({ message: 'Not found.' });
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error deleting tool:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };


// controllers/toolController.js
const pool = require('../db');

// CREATE
exports.createTool = async (req, res) => {
  const {
    tool_name,
    tool_type,
    machine_id,
    part_id,
    tool_number,
    tool_life_limit,
    tool_usage_counter,
    tool_change_threshold,
    last_change_date,
    tool_manufacturer_code,
    tool_calibration_required,
    tool_calibration_freq,
    tool_holder_type,
    status,
    tool_wear_monitoring,
    tool_usage_count,
    remaining_life_percent,
    total_tools_used_till,
    last_replacement_date,
    tool_health_status,
    replacement_reason,
    alert_threshold,
    offset_no,
    nominal_offset_value,
    last_applied_offset,
    offset_delta,
    tool_wear_percent,
    offset_change_history
  } = req.body;

  // Parse JSON for offset_change_history
  let parsedOffsetHistory = null;
  if (offset_change_history) {
    try {
      parsedOffsetHistory = JSON.parse(offset_change_history);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid JSON for offset_change_history' });
    }
  }

  // multer stores file info in req.file
  const toolDrawingPath = req.file ? req.file.path : null;

  try {
    const { rows } = await pool.query(
      `INSERT INTO tool_master (
         tool_name, tool_type, machine_id, part_id, tool_number,
         tool_life_limit, tool_usage_counter, tool_change_threshold,
         last_change_date, tool_drawing_upload, tool_manufacturer_code,
         tool_calibration_required, tool_calibration_freq, tool_holder_type,
         status, tool_wear_monitoring, tool_usage_count,
         remaining_life_percent, total_tools_used_till, last_replacement_date,
         tool_health_status, replacement_reason, alert_threshold,
         offset_no, nominal_offset_value, last_applied_offset,
         offset_delta, tool_wear_percent, offset_change_history
       ) VALUES (
         $1,$2,$3,$4,$5,
         $6,$7,$8,$9,$10,$11,
         $12,$13,$14,$15,$16,$17,
         $18,$19,$20,$21,$22,$23,
         $24,$25,$26,$27,$28,$29
       ) RETURNING *;`,
      [
        tool_name,
        tool_type,
        machine_id,
        part_id || null,
        tool_number,
        tool_life_limit,
        tool_usage_counter || 0,
        tool_change_threshold,
        last_change_date || null,
        toolDrawingPath,
        tool_manufacturer_code || null,
        tool_calibration_required,
        tool_calibration_freq || null,
        tool_holder_type || null,
        status,
        tool_wear_monitoring,
        tool_usage_count || 0,
        remaining_life_percent || null,
        total_tools_used_till || 0,
        last_replacement_date || null,
        tool_health_status,
        replacement_reason || null,
        alert_threshold,
        offset_no || null,
        nominal_offset_value || null,
        last_applied_offset || null,
        offset_delta || null,
        tool_wear_percent || null,
        parsedOffsetHistory
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating tool:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ALL
exports.getAllTools = async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM tool_master ORDER BY tool_id;'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tools:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ONE
exports.getToolById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'tool_id must be an integer.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM tool_master WHERE tool_id = $1;', [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching tool:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// UPDATE
exports.updateTool = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'tool_id must be an integer.' });
  }

  const {
    tool_name,
    tool_type,
    machine_id,
    part_id,
    tool_number,
    tool_life_limit,
    tool_usage_counter,
    tool_change_threshold,
    last_change_date,
    tool_manufacturer_code,
    tool_calibration_required,
    tool_calibration_freq,
    tool_holder_type,
    status,
    tool_wear_monitoring,
    tool_usage_count,
    remaining_life_percent,
    total_tools_used_till,
    last_replacement_date,
    tool_health_status,
    replacement_reason,
    alert_threshold,
    offset_no,
    nominal_offset_value,
    last_applied_offset,
    offset_delta,
    tool_wear_percent,
    offset_change_history
  } = req.body;

  // Parse JSON for offset_change_history
  let parsedOffsetHistory = null;
  if (offset_change_history) {
    try {
      parsedOffsetHistory = JSON.parse(offset_change_history);
    } catch (e) {
      return res.status(400).json({ message: 'Invalid JSON for offset_change_history' });
    }
  }

  // handle file if uploaded
  const toolDrawingPath = req.file ? req.file.path : req.body.tool_drawing_upload;

  try {
    const { rows } = await pool.query(
      `UPDATE tool_master SET
         tool_name                = $1,
         tool_type                = $2,
         machine_id               = $3,
         part_id                  = $4,
         tool_number              = $5,
         tool_life_limit          = $6,
         tool_usage_counter       = $7,
         tool_change_threshold    = $8,
         last_change_date         = $9,
         tool_drawing_upload      = $10,
         tool_manufacturer_code   = $11,
         tool_calibration_required= $12,
         tool_calibration_freq    = $13,
         tool_holder_type         = $14,
         status                   = $15,
         tool_wear_monitoring     = $16,
         tool_usage_count         = $17,
         remaining_life_percent    = $18,
         total_tools_used_till    = $19,
         last_replacement_date    = $20,
         tool_health_status       = $21,
         replacement_reason       = $22,
         alert_threshold          = $23,
         offset_no                = $24,
         nominal_offset_value     = $25,
         last_applied_offset      = $26,
         offset_delta             = $27,
         tool_wear_percent        = $28,
         offset_change_history    = $29,
         updated_at               = NOW()
       WHERE tool_id = $30
       RETURNING *;`,
      [
        tool_name,
        tool_type,
        machine_id,
        part_id || null,
        tool_number,
        tool_life_limit,
        tool_usage_counter || 0,
        tool_change_threshold,
        last_change_date || null,
        toolDrawingPath,
        tool_manufacturer_code || null,
        tool_calibration_required,
        tool_calibration_freq || null,
        tool_holder_type || null,
        status,
        tool_wear_monitoring,
        tool_usage_count || 0,
        remaining_life_percent || null,
        total_tools_used_till || 0,
        last_replacement_date || null,
        tool_health_status,
        replacement_reason || null,
        alert_threshold,
        offset_no || null,
        nominal_offset_value || null,
        last_applied_offset || null,
        offset_delta || null,
        tool_wear_percent || null,
        parsedOffsetHistory,
        id
      ]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating tool:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// DELETE
exports.deleteTool = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'tool_id must be an integer.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM tool_master WHERE tool_id = $1;', [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Not found.' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting tool:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};
