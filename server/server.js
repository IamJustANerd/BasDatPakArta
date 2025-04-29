const express = require('express');
const cors = require('cors');
require('dotenv').config();

const muridRoutes = require('./routes/murid');
const mataPelajaranRoutes = require('./routes/mata_pelajaran');
const projectRoutes = require('./routes/project');
const chapterRoutes = require('./routes/chapter');
const aspekRoutes = require('./routes/aspek');
const subaspekRoutes = require('./routes/sub_aspek');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/murid', muridRoutes);
app.use('/api/mataPelajaran', mataPelajaranRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/chapter', chapterRoutes);
app.use('/api/aspek', aspekRoutes);
app.use('/api/sub_aspek', subaspekRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
