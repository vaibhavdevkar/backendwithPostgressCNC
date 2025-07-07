// controllers/machineController.js
const pool = require('../db');

// Create
exports.createMachine = async (req, res) => {
  const {
    machine_name_type,
    make_model,
    controller_make_model,
    installed_date,
    location,
    ip_address,
    communication_protocol,
    tool_count,
    power_rating,
    no_of_spindels,
    no_of_servo,
    no_of_encoder,
    no_of_batteries,
    status
  } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO machine_master
        (machine_name_type, make_model, controller_make_model,
         installed_date, location, ip_address, communication_protocol,
         tool_count, power_rating, no_of_spindels, no_of_servo,
         no_of_encoder, no_of_batteries, status)
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING *;`,
      [
        machine_name_type,
        make_model,
        controller_make_model,
        installed_date,
        location,
        ip_address,
        communication_protocol,
        tool_count,
        power_rating,
        no_of_spindels,
        no_of_servo,
        no_of_encoder,
        no_of_batteries,
        status
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// Read all
exports.getAllMachines = async (_, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM machine_master ORDER BY machine_id;'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// Read one
exports.getMachineById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM machine_master WHERE machine_id = $1;',
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// Update
exports.updateMachine = async (req, res) => {
  const { id } = req.params;
  const {
    machine_name_type,
    make_model,
    controller_make_model,
    installed_date,
    location,
    ip_address,
    communication_protocol,
    tool_count,
    power_rating,
    no_of_spindels,
    no_of_servo,
    no_of_encoder,
    no_of_batteries,
    status
  } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE machine_master SET
         machine_name_type      = $1,
         make_model             = $2,
         controller_make_model  = $3,
         installed_date         = $4,
         location               = $5,
         ip_address             = $6,
         communication_protocol = $7,
         tool_count             = $8,
         power_rating           = $9,
         no_of_spindels         = $10,
         no_of_servo            = $11,
         no_of_encoder          = $12,
         no_of_batteries        = $13,
         status                 = $14,
         updated_at             = NOW()
       WHERE machine_id = $15
       RETURNING *;`,
      [
        machine_name_type,
        make_model,
        controller_make_model,
        installed_date,
        location,
        ip_address,
        communication_protocol,
        tool_count,
        power_rating,
        no_of_spindels,
        no_of_servo,
        no_of_encoder,
        no_of_batteries,
        status,
        id
      ]
    );
    if (!rows.length) return res.status(404).json({ message: 'Not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};

// Delete
exports.deleteMachine = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM machine_master WHERE machine_id = $1;',
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: 'Not found.' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error.' });
  }
};
