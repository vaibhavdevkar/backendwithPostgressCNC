// const pool = require('../db');

// // CREATE
// exports.createSetup = async (req, res) => {
//   const {
//     part_id,
//     machine_id,
//     process_id,
//     step_no,
//     checklist_item_description,
//     type,
//     boolean_expected_value,
//     spec_target_value,
//     spec_min_tolerance,
//     spec_max_tolerance,
//     unit,
//     validation_method,
//     mandatory,
//     production_part_count,
//     quality_part_count
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `INSERT INTO setup_master
//         (part_id, machine_id, process_id, step_no,
//          checklist_item_description, type, boolean_expected_value,
//          spec_target_value, spec_min_tolerance, spec_max_tolerance,
//          unit, validation_method, mandatory,
//          production_part_count, quality_part_count)
//        VALUES
//         ($1,$2,$3,$4,
//          $5,$6,$7,
//          $8,$9,$10,
//          $11,$12,$13,
//          $14,$15)
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         process_id,
//         step_no,
//         checklist_item_description,
//         type,
//         boolean_expected_value,
//         spec_target_value,
//         spec_min_tolerance,
//         spec_max_tolerance,
//         unit,
//         validation_method,
//         mandatory,
//         production_part_count,
//         quality_part_count
//       ]
//     );
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error('Error creating setup:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ALL
// exports.getAllSetups = async (_, res) => {
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM setup_master ORDER BY setup_id;'
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching setups:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ONE
// exports.getSetupById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM setup_master WHERE setup_id = $1;',
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching setup:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // UPDATE
// exports.updateSetup = async (req, res) => {
//   const { id } = req.params;
//   const {
//     part_id,
//     machine_id,
//     process_id,
//     step_no,
//     checklist_item_description,
//     type,
//     boolean_expected_value,
//     spec_target_value,
//     spec_min_tolerance,
//     spec_max_tolerance,
//     unit,
//     validation_method,
//     mandatory,
//     production_part_count,
//     quality_part_count
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `UPDATE setup_master SET
//          part_id                   = $1,
//          machine_id                = $2,
//          process_id                = $3,
//          step_no                   = $4,
//          checklist_item_description= $5,
//          type                      = $6,
//          boolean_expected_value    = $7,
//          spec_target_value         = $8,
//          spec_min_tolerance        = $9,
//          spec_max_tolerance        = $10,
//          unit                      = $11,
//          validation_method         = $12,
//          mandatory                 = $13,
//          production_part_count     = $14,
//          quality_part_count        = $15,
//          updated_at                = NOW()
//        WHERE setup_id = $16
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         process_id,
//         step_no,
//         checklist_item_description,
//         type,
//         boolean_expected_value,
//         spec_target_value,
//         spec_min_tolerance,
//         spec_max_tolerance,
//         unit,
//         validation_method,
//         mandatory,
//         production_part_count,
//         quality_part_count,
//         id
//       ]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error updating setup:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // DELETE
// exports.deleteSetup = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       'DELETE FROM setup_master WHERE setup_id = $1;',
//       [id]
//     );
//     if (result.rowCount === 0)
//       return res.status(404).json({ message: 'Not found.' });
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error deleting setup:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };


const pool = require('../db');

// CREATE
exports.createSetup = async (req, res) => {
  const {
    part_id,
    machine_id,
    process_id,
    step_no,
    checklist_item_description,
    type,
    boolean_expected_value,
    spec_target_value,
    spec_min_tolerance,
    spec_max_tolerance,
    unit,
    validation_method,
    mandatory,
    production_part_count,
    quality_part_count,
    specifications,
    inspection_method,
    parameters
  } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO setup_master
        (
          part_id,
          machine_id,
          process_id,
          step_no,
          checklist_item_description,
          type,
          boolean_expected_value,
          spec_target_value,
          spec_min_tolerance,
          spec_max_tolerance,
          unit,
          validation_method,
          mandatory,
          production_part_count,
          quality_part_count,
          specifications,
          inspection_method,
          parameters
        )
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       RETURNING *;`,
      [
        part_id,
        machine_id,
        process_id,
        step_no,
        checklist_item_description,
        type,
        boolean_expected_value,
        spec_target_value,
        spec_min_tolerance,
        spec_max_tolerance,
        unit,
        validation_method,
        mandatory,
        production_part_count,
        quality_part_count,
        specifications,
        inspection_method,
        parameters
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating setup:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ALL
exports.getAllSetups = async (_, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM setup_master ORDER BY setup_id;'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching setups:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ONE
exports.getSetupById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'setup_id must be an integer.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM setup_master WHERE setup_id = $1;', [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching setup:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// UPDATE
exports.updateSetup = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'setup_id must be an integer.' });
  }

  const {
    part_id,
    machine_id,
    process_id,
    step_no,
    checklist_item_description,
    type,
    boolean_expected_value,
    spec_target_value,
    spec_min_tolerance,
    spec_max_tolerance,
    unit,
    validation_method,
    mandatory,
    production_part_count,
    quality_part_count,
    specifications,
    inspection_method,
    parameters
  } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE setup_master SET
         part_id                       = $1,
         machine_id                    = $2,
         process_id                    = $3,
         step_no                       = $4,
         checklist_item_description    = $5,
         type                          = $6,
         boolean_expected_value        = $7,
         spec_target_value             = $8,
         spec_min_tolerance            = $9,
         spec_max_tolerance            = $10,
         unit                          = $11,
         validation_method             = $12,
         mandatory                     = $13,
         production_part_count         = $14,
         quality_part_count            = $15,
         specifications                = $16,
         inspection_method             = $17,
         parameters                    = $18,
         updated_at                    = NOW()
       WHERE setup_id = $19
       RETURNING *;`,
      [
        part_id,
        machine_id,
        process_id,
        step_no,
        checklist_item_description,
        type,
        boolean_expected_value,
        spec_target_value,
        spec_min_tolerance,
        spec_max_tolerance,
        unit,
        validation_method,
        mandatory,
        production_part_count,
        quality_part_count,
        specifications,
        inspection_method,
        parameters,
        id
      ]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating setup:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// DELETE
exports.deleteSetup = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'setup_id must be an integer.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM setup_master WHERE setup_id = $1;', [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Not found.' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting setup:', err);
    res.status(500).json({ message: 'Database error.' });
  }
}


exports.getSetupsByMachineAndPart = async (req, res) => {
  const machineId = parseInt(req.params.machine_id, 10);
  const partId    = parseInt(req.params.part_id, 10);

  if (isNaN(machineId) || isNaN(partId)) {
    return res
      .status(400)
      .json({ message: 'machine_id and part_id must both be integers.' });
  }

  try {
    const { rows } = await pool.query(
      `SELECT 
         parameters,
         specifications,
         inspection_method,
         quality_part_count,
         production_part_count,
         boolean_expected_value
       FROM setup_master
       WHERE machine_id = $1
         AND part_id    = $2
       ORDER BY step_no;`,
      [machineId, partId]
    );

    // even if no rows, return empty array
    res.json(rows);
  } catch (err) {
    console.error('Error fetching setups by machine+part:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};