const pool = require("../db/index");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM chapter');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM chapter WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  const { project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO chapter (project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter) VALUES ($1, $2, $3, $4) RETURNING *',
      [project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter } = req.body;
  try {
    const result = await pool.query(
      'UPDATE chapter SET project_id = $1, total_kesalahan_aspek = $2, bobot_chapter = $3, predikat_chapter = $4 WHERE id = $5 RETURNING *',
      [project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, id]
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
    const result = await pool.query('DELETE FROM chapter WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
