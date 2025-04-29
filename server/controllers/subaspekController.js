const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sub_aspek');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM sub_aspek WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { aspek_id, nama, jumlah_kesalahan } = req.body;
    const result = await pool.query(
      'INSERT INTO sub_aspek (aspek_id, nama, jumlah_kesalahan) VALUES ($1, $2, $3) RETURNING *',
      [aspek_id, nama, jumlah_kesalahan]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { aspek_id, nama, jumlah_kesalahan } = req.body;
    const result = await pool.query(
      'UPDATE sub_aspek SET aspek_id = $1, nama = $2, jumlah_kesalahan = $3 WHERE id = $4 RETURNING *',
      [aspek_id, nama, jumlah_kesalahan, id]
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
    const result = await pool.query('DELETE FROM sub_aspek WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// New method to get the total kesalahan for a given aspek_id
exports.getTotalKesalahan = async (req, res) => {
    try {
      const { aspekId } = req.params;
      const result = await pool.query(
        'SELECT SUM(jumlah_kesalahan) AS total_kesalahan FROM sub_aspek WHERE aspek_id = $1',
        [aspekId]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.updateAspekTotalKesalahan = async (req, res) => {
    try {
      const { aspekId } = req.params;
  
      // Get total from sub_aspek
      const result = await pool.query(
        'SELECT SUM(jumlah_kesalahan) AS total_kesalahan FROM sub_aspek WHERE aspek_id = $1',
        [aspekId]
      );
      const total = result.rows[0].total_kesalahan || 0;
  
      // Update aspek table
      await pool.query(
        'UPDATE aspek SET total_kesalahan = $1 WHERE id = $2',
        [total, aspekId]
      );
  
      res.json({ aspek_id: aspekId, total_kesalahan: total });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };