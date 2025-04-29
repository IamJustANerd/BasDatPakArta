const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aspek');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM aspek WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { chapter_id, nama, total_kesalahan } = req.body;
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
  try {
    const { id } = req.params;
    const { chapter_id, nama, total_kesalahan } = req.body;
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
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM aspek WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.getTotalKesalahan = async (req, res) => {
    try {
      const { chapterId } = req.params;
      const result = await pool.query(
        'SELECT SUM(total_kesalahan) AS total_kesalahan_aspek FROM aspek WHERE chapter_id = $1',
        [chapterId]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.updateAspekTotalKesalahan = async (req, res) => {
    try {
      const { chapterId } = req.params;
  
      // Get total from sub_aspek
      const result = await pool.query(
        'SELECT SUM(total_kesalahan) AS total_kesalahan_aspek FROM aspek WHERE chapter_id = $1',
        [chapterId]
      );
      const total = result.rows[0].total_kesalahan_aspek || 0;
  
      // Update aspek table
      await pool.query(
        'UPDATE chapter SET total_kesalahan_aspek = $1 WHERE id = $2',
        [total, chapterId]
      );
  
      res.json({ chapter_id: chapterId, total_kesalahan_aspek: total });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.nilaitotal = async (req, res) => {
    try {
      const { chapterId } = req.params;
  
      const result = await pool.query(
        `SELECT SUM(total_kesalahan) AS total_kesalahan_aspek
         FROM aspek
         WHERE chapter_id = $1`,
        [chapterId]
      );
  
      const totalKesalahan = result.rows[0].total_kesalahan_aspek || 0;
  
      // Calculate nilai
      const totalNilai = 90 - totalKesalahan;
  
      // Update chapter
      await pool.query(
        `UPDATE chapter 
         SET total_kesalahan_aspek = $1, total_nilai = $2 
         WHERE id = $3`,
        [totalKesalahan, totalNilai, chapterId]
      );
  
      res.json({ chapter_id: chapterId, total_kesalahan_aspek: totalKesalahan, total_nilai: totalNilai });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };