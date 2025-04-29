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
    const {murid_id, nama, nilai_ets, nilai_eas, nilai_tugas } = req.body;
    const result = await pool.query(
      'INSERT INTO mata_pelajaran (murid_id, nama, nilai_ets, nilai_eas, nilai_tugas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [murid_id, nama, nilai_ets, nilai_eas, nilai_tugas]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {murid_id, nama, nilai_ets, nilai_eas, nilai_tugas } = req.body;
    const result = await pool.query(
      'UPDATE mata_pelajaran SET murid_id = $1, nama = $2, nilai_ets = $3, nilai_eas = $4, nilai_tugas = $5 WHERE id = $6 RETURNING *',
      [murid_id, nama, nilai_ets, nilai_eas, nilai_tugas, id]
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