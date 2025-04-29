const pool = require("../db/index");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aspek');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM aspek WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  const { chapter_id, nama, total_kesalahan } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO aspek (chapter_id, nama, total_kesalahan) VALUES ($1, $2, $3) RETURNING *',
      [chapter_id, nama, total_kesalahan]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { chapter_id, nama, total_kesalahan } = req.body;
  try {
    const result = await pool.query(
      'UPDATE aspek SET chapter_id = $1, nama = $2, total_kesalahan = $3 WHERE id = $4 RETURNING *',
      [chapter_id, nama, total_kesalahan, id]
    );
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM aspek WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
