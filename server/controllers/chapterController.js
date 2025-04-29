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
    const { project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, total_nilai } = req.body;
    const result = await pool.query(
      'INSERT INTO chapter (project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, total_nilai) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, total_nilai]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, total_nilai } = req.body;
    const result = await pool.query(
      'UPDATE chapter SET project_id = $1, total_kesalahan_aspek = $2, bobot_chapter = $3, predikat_chapter = $4, total_nilai = $5 WHERE id = $6 RETURNING *',
      [project_id, total_kesalahan_aspek, bobot_chapter, predikat_chapter, total_nilai]
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

exports.nilaifinal = async (req, res) => {
    try {
      const { projectId } = req.params;
  
      // Calculate weighted average
      const result = await pool.query(
        `SELECT 
           SUM(bobot_chapter * total_nilai)::FLOAT / NULLIF(SUM(bobot_chapter), 0) AS nilai_final
         FROM chapter
         WHERE project_id = $1`,
        [projectId]
      );
  
      // Round the result to integer
      const nilaiFinal = Math.round(result.rows[0].nilai_final || 0);
  
      // Update project table
      await pool.query(
        `UPDATE project SET nilai_final = $1 WHERE id = $2`,
        [nilaiFinal, projectId]
      );
  
      res.json({ project_id: projectId, nilai_final: nilaiFinal });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  