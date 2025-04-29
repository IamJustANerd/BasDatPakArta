const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chapter');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM chapter WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { total_kesalahan, bobot_chapter, predikat_chapter } = req.body;
    const result = await pool.query(
      'INSERT INTO chapter (total_kesalahan, bobot_chapter, predikat_chapter) VALUES ($1, $2, $3) RETURNING *',
      [total_kesalahan, bobot_chapter, predikat_chapter]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { total_kesalahan, bobot_chapter, predikat_chapter } = req.body;
    const result = await pool.query(
      'UPDATE chapter SET total_kesalahan = $1, bobot_chapter = $2, predikat_chapter = $3 WHERE id = $4 RETURNING *',
      [total_kesalahan, bobot_chapter, predikat_chapter, id]
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
    const result = await pool.query('DELETE FROM chapter WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
