// // controllers/processController.js
// const pool = require('../db');

// // CREATE
// exports.createProcess = async (req, res) => {
//   const {
//     part_id,
//     machine_id,
//     time_per_unit,
//     parts_per_cycle,
//     program_number,
//     standard_setup_time,
//     operation_type,
//     process_order,
//     attention_time_limit,
//     setup_action_type,
//     ideal_setup_time,
//     specs_required
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `INSERT INTO process_master
//         (part_id, machine_id, time_per_unit, parts_per_cycle,
//          program_number, standard_setup_time, operation_type,
//          process_order, attention_time_limit, setup_action_type,
//          ideal_setup_time, specs_required)
//        VALUES
//         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         time_per_unit,
//         parts_per_cycle,
//         program_number,
//         standard_setup_time,
//         operation_type,
//         process_order,
//         attention_time_limit,
//         setup_action_type,
//         ideal_setup_time,
//         specs_required
//       ]
//     );
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error('Error creating process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ALL
// exports.getAllProcesses = async (_, res) => {
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM process_master ORDER BY process_id;'
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching processes:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ONE
// exports.getProcessById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM process_master WHERE process_id = $1;',
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // UPDATE
// exports.updateProcess = async (req, res) => {
//   const { id } = req.params;
//   const {
//     part_id,
//     machine_id,
//     time_per_unit,
//     parts_per_cycle,
//     program_number,
//     standard_setup_time,
//     operation_type,
//     process_order,
//     attention_time_limit,
//     setup_action_type,
//     ideal_setup_time,
//     specs_required
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `UPDATE process_master SET
//          part_id                = $1,
//          machine_id             = $2,
//          time_per_unit          = $3,
//          parts_per_cycle        = $4,
//          program_number         = $5,
//          standard_setup_time    = $6,
//          operation_type         = $7,
//          process_order          = $8,
//          attention_time_limit   = $9,
//          setup_action_type      = $10,
//          ideal_setup_time       = $11,
//          specs_required         = $12,
//          updated_at             = NOW()
//        WHERE process_id = $13
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         time_per_unit,
//         parts_per_cycle,
//         program_number,
//         standard_setup_time,
//         operation_type,
//         process_order,
//         attention_time_limit,
//         setup_action_type,
//         ideal_setup_time,
//         specs_required,
//         id
//       ]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error updating process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // DELETE
// exports.deleteProcess = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       'DELETE FROM process_master WHERE process_id = $1;',
//       [id]
//     );
//     if (result.rowCount === 0)
//       return res.status(404).json({ message: 'Not found.' });
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error deleting process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };



// // controllers/processController.js
// const pool = require('../db');

// // CREATE
// exports.createProcess = async (req, res) => {
//   const {
//     part_id,
//     machine_id,
//     time_per_unit,
//     parts_per_cycle,
//     program_number,
//     standard_setup_time,
//     operation_type,
//     attention_time_limit,
//     setup_action_type,
//     ideal_setup_time,
//     specs_required
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `INSERT INTO process_master
//         (
//           part_id, machine_id,
//           time_per_unit, parts_per_cycle,
//           program_number, standard_setup_time,
//           operation_type,
//           attention_time_limit, setup_action_type,
//           ideal_setup_time, specs_required
//         )
//        VALUES
//         ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         time_per_unit,
//         parts_per_cycle,
//         program_number,
//         standard_setup_time,
//         operation_type,
//         attention_time_limit,
//         setup_action_type,
//         ideal_setup_time,
//         specs_required
//       ]
//     );
//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error('Error creating process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ALL
// exports.getAllProcesses = async (_, res) => {
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM process_master ORDER BY process_id;'
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching processes:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // READ ONE
// exports.getProcessById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM process_master WHERE process_id = $1;',
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error fetching process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // UPDATE
// exports.updateProcess = async (req, res) => {
//   const { id } = req.params;
//   const {
//     part_id,
//     machine_id,
//     time_per_unit,
//     parts_per_cycle,
//     program_number,
//     standard_setup_time,
//     operation_type,
//     attention_time_limit,
//     setup_action_type,
//     ideal_setup_time,
//     specs_required
//   } = req.body;

//   try {
//     const { rows } = await pool.query(
//       `UPDATE process_master SET
//          part_id                = $1,
//          machine_id             = $2,
//          time_per_unit          = $3,
//          parts_per_cycle        = $4,
//          program_number         = $5,
//          standard_setup_time    = $6,
//          operation_type         = $7,
//          attention_time_limit   = $8,
//          setup_action_type      = $9,
//          ideal_setup_time       = $10,
//          specs_required         = $11,
//          updated_at             = NOW()
//        WHERE process_id = $12
//        RETURNING *;`,
//       [
//         part_id,
//         machine_id,
//         time_per_unit,
//         parts_per_cycle,
//         program_number,
//         standard_setup_time,
//         operation_type,
//         attention_time_limit,
//         setup_action_type,
//         ideal_setup_time,
//         specs_required,
//         id
//       ]
//     );
//     if (!rows.length) return res.status(404).json({ message: 'Not found.' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('Error updating process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };

// // DELETE
// exports.deleteProcess = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       'DELETE FROM process_master WHERE process_id = $1;',
//       [id]
//     );
//     if (result.rowCount === 0)
//       return res.status(404).json({ message: 'Not found.' });
//     res.status(204).send();
//   } catch (err) {
//     console.error('Error deleting process:', err);
//     res.status(500).json({ message: 'Database error.' });
//   }
// };



const pool = require('../db');

// CREATE
exports.createProcess = async (req, res) => {
  const {
    part_id,
    machine_id,
    cycle_time,
    no_of_parts_per_cycle,
    program_no,
    setup_time_sec,
    operation_name,
    ideal_time_limit_sec,
    setup_change_type,
    setup_time_standard,
    setup_validation_required,
    sequence_no
  } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO process_master
        (
          part_id,
          machine_id,
          cycle_time,
          no_of_parts_per_cycle,
          program_no,
          setup_time_sec,
          operation_name,
          ideal_time_limit_sec,
          setup_change_type,
          setup_time_standard,
          setup_validation_required,
          sequence_no
        )
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *;`,
      [
        part_id,
        machine_id,
        cycle_time,
        no_of_parts_per_cycle,
        program_no,
        setup_time_sec,
        operation_name,
        ideal_time_limit_sec,
        setup_change_type,
        setup_time_standard,
        setup_validation_required,
        sequence_no
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error creating process:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ALL
exports.getAllProcesses = async (_, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM process_master ORDER BY process_id;'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching processes:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// READ ONE
exports.getProcessById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM process_master WHERE process_id = $1;',
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching process:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// UPDATE
exports.updateProcess = async (req, res) => {
  const { id } = req.params;
  const {
    part_id,
    machine_id,
    cycle_time,
    no_of_parts_per_cycle,
    program_no,
    setup_time_sec,
    operation_name,
    ideal_time_limit_sec,
    setup_change_type,
    setup_time_standard,
    setup_validation_required,
    sequence_no
  } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE process_master SET
         part_id                  = $1,
         machine_id               = $2,
         cycle_time               = $3,
         no_of_parts_per_cycle    = $4,
         program_no               = $5,
         setup_time_sec           = $6,
         operation_name           = $7,
         ideal_time_limit_sec     = $8,
         setup_change_type        = $9,
         setup_time_standard      = $10,
         setup_validation_required= $11,
         sequence_no              = $12,
         updated_at               = NOW()
       WHERE process_id = $13
       RETURNING *;`,
      [
        part_id,
        machine_id,
        cycle_time,
        no_of_parts_per_cycle,
        program_no,
        setup_time_sec,
        operation_name,
        ideal_time_limit_sec,
        setup_change_type,
        setup_time_standard,
        setup_validation_required,
        sequence_no,
        id
      ]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating process:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// DELETE
exports.deleteProcess = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM process_master WHERE process_id = $1;',
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Not found.' });
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting process:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};


// controllers/processController.js
exports.getProcessesWithMachine = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT 
         pm.*,
         mm.machine_id       AS machine_id,
         mm.machine_name_type,
         p.part_id           AS part_id,
         COALESCE(p.part_name, p.part_name_code) AS part_name
       FROM process_master pm
       JOIN machine_master mm
         ON pm.machine_id = mm.machine_id
       JOIN part_master p
         ON pm.part_id = p.part_id
       ORDER BY pm.process_id;`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching joined processes:', err);
    res.status(500).json({ message: 'Database error.' });
  }
};
