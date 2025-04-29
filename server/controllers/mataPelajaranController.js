const pool = require("../db/index");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mata_pelajaran');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM mata_pelajaran WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.create = async (req, res) => {
  const { murid_id, nama, nilai_tugas, nilai_ets, nilai_eas } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO mata_pelajaran (murid_id, nama, nilai_tugas, nilai_ets, nilai_eas) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [murid_id, nama, nilai_tugas, nilai_ets, nilai_eas]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { murid_id, nama, nilai_tugas, nilai_ets, nilai_eas } = req.body;
  try {
    const result = await pool.query(
      'UPDATE mata_pelajaran SET murid_id = $1, nama = $2, nilai_tugas = $3, nilai_ets = $4, nilai_eas = $5 WHERE id = $6 RETURNING *',
      [murid_id, nama, nilai_tugas, nilai_ets, nilai_eas, id]
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
    const result = await pool.query('DELETE FROM mata_pelajaran WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addNilaiEntry = async (req, res) => {
  const { id } = req.params;
  const newEntry = req.body;

  try {
    // Ambil nilai lama
    const result = await pool.query('SELECT nilai FROM mata_pelajaran WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send("Mata pelajaran tidak ditemukan");

    const currentNilai = result.rows[0].nilai || [];

    // Tambah nilai baru
    const updatedNilai = [...currentNilai, newEntry];

    // Simpan ke database
    const updateResult = await pool.query(
      'UPDATE mata_pelajaran SET nilai = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(updatedNilai), id]
    );

    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menyimpan nilai: " + err.message);
  }
};