const pool = require("../db/index");

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT mp.*, jsonb_agg(n.nilai_data) as nilai
      FROM mata_pelajaran mp
      LEFT JOIN nilai n ON mp.id = n.mata_pelajaran_id
      GROUP BY mp.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getById = async (req, res) => {
  const { ids } = req.query;
  
  if (!ids) {
    return res.status(400).json({ error: 'Missing ids parameter' });
  }

  try {
    const idArray = ids.split(',').map(id => parseInt(id));
    const result = await pool.query(
      'SELECT * FROM project WHERE id = ANY($1::int[])',
      [idArray]
    );
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { mata_pelajaran_id, nama, predikat, catatan_penguji, status } = req.body;
  try {
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
  const { id } = req.params;
  const { mata_pelajaran_id, nama, predikat, catatan_penguji, status } = req.body;
  try {
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
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM project WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getByMataPelajaranId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM project WHERE mata_pelajaran_id = $1',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProjectDetail = async (req, res) => {
  const { id } = req.params;

  try {
    // Get all chapters for this project
    const chapterResult = await pool.query(
      'SELECT * FROM chapter WHERE project_id = $1',
      [id]
    );

    const chapters = chapterResult.rows;

    // For each chapter, get its aspek and sub_aspek
    for (const chapter of chapters) {
      const aspekResult = await pool.query(
        'SELECT * FROM aspek WHERE chapter_id = $1',
        [chapter.id]
      );

      const aspekList = aspekResult.rows;

      for (const aspek of aspekList) {
        const subAspekResult = await pool.query(
          'SELECT * FROM sub_aspek WHERE aspek_id = $1',
          [aspek.id]
        );
        aspek.sub_aspek = subAspekResult.rows;
      }

      chapter.aspek = aspekList;
    }

    res.json({
      project_id: id,
      chapters: chapters
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch project detail: " + err.message);
  }
};

exports.getByMuridAndPelajaran = async (req, res) => {
  console.log('Received params:', req.query);
  
  const { muridId, mataPelajaranId } = req.query;
  
  if (!muridId || !mataPelajaranId) {
    console.error('Missing parameters');
    return res.status(400).json({ 
      error: 'Both muridId and mataPelajaranId are required' 
    });
  }

  try {
    // First verify the student and subject exist
    const [murid, pelajaran] = await Promise.all([
      pool.query('SELECT id FROM murid WHERE id = $1', [muridId]),
      pool.query('SELECT id FROM mata_pelajaran WHERE id = $1', [mataPelajaranId])
    ]);

    if (murid.rows.length === 0 || pelajaran.rows.length === 0) {
      return res.status(404).json({ error: 'Student or subject not found' });
    }

    // Then query projects
    const result = await pool.query(`
      SELECT p.* FROM project p
      JOIN mata_pelajaran mp ON p.mata_pelajaran_id = mp.id
      WHERE p.mata_pelajaran_id = $1
    `, [mataPelajaranId]);

    console.log('Found projects:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Database operation failed',
      details: err.message 
    });
  }
};