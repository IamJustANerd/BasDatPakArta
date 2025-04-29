// routes/nilaiRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/murid/:muridId', async (req, res) => {
  const muridId = req.params.muridId;

  try {
    const result = await pool.query(`SELECT 
        p.nama AS project_nama,
        c.id AS chapter_id,
        c.nama AS chapter_nama,
        COUNT(sa.id) AS total_sub_aspek,
        SUM(sa.jumlah_kesalahan) AS total_kesalahan,
        (90 - SUM(sa.jumlah_kesalahan)) AS total_nilai,
        ROUND((100.0 / (
          SELECT COUNT(*) FROM chapter WHERE project_id = p.id
        ))::numeric, 2) AS bobot_chapter,
        ROUND((90 - SUM(sa.jumlah_kesalahan)) * (100.0 / (
          SELECT COUNT(*) FROM chapter WHERE project_id = p.id
        ))::numeric, 2) AS nilai_bobot,
        CASE 
          WHEN (90 - SUM(sa.jumlah_kesalahan)) >= 86 THEN 'Istimewa'
          WHEN (90 - SUM(sa.jumlah_kesalahan)) >= 78 THEN 'Sangat Baik'
          WHEN (90 - SUM(sa.jumlah_kesalahan)) >= 65 THEN 'Baik'
          ELSE 'Cukup'
        END AS predikat
      FROM nilai n
      JOIN project p ON n.project_id = p.id
      JOIN chapter c ON c.project_id = p.id
      JOIN aspek a ON a.chapter_id = c.id
      JOIN sub_aspek sa ON sa.aspek_id = a.id
      WHERE n.murid_id = $1
      GROUP BY p.nama, c.id, c.nama, p.id
      ORDER BY c.id;
      `, [muridId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching nilai:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;