const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mata_pelajaran');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM mata_pelajaran WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, nilai_ets, nilai_eas, nilai_tugas } = req.body;
    const result = await pool.query(
      'INSERT INTO mata_pelajaran (nama, nilai_ets, nilai_eas, nilai_tugas) VALUES ($1, $2, $3, $4) RETURNING *',
      [nama, nilai_ets, nilai_eas, nilai_tugas]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nilai_ets, nilai_eas, nilai_tugas } = req.body;
    const result = await pool.query(
      'UPDATE mata_pelajaran SET nama = $1, nilai_ets = $2, nilai_eas = $3, nilai_tugas = $4 WHERE id = $5 RETURNING *',
      [nama, nilai_ets, nilai_eas, nilai_tugas, id]
    );
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM mata_pelajaran WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};