const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM project');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM project WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const {mata_pelajaran_id, nama, predikat, catatan_penguji, status } = req.body;
    const result = await pool.query(
      'INSERT INTO project (mata_pelajaran_id, nama, predikat, catatan_penguji, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [mata_pelajaran_id, nama, predikat, catatan_penguji, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {mata_pelajaran_id, nama, predikat, catatan_penguji, status } = req.body;
    const result = await pool.query(
      'UPDATE project SET mata_pelajaran_id = $1, nama = $2, predikat = $3, catatan_penguji = $4, status = $5 WHERE id = $6 RETURNING *',
      [mata_pelajaran_id, nama, predikat, catatan_penguji, status, id]
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
    const result = await pool.query('DELETE FROM project WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.nilai_final = async (req, res) => {
  try {
    const { projectId } = req.params;

    const result = await pool.query(
      `SELECT 
         SUM(bobot_chapter * total_nilai)::FLOAT / NULLIF(SUM(bobot_chapter), 0) AS nilai_final
       FROM chapter
       WHERE project_id = $1`,
      [projectId]
    );

    res.json({ project_id: projectId, nilai_final: result.rows[0].nilai_final || 0 });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
