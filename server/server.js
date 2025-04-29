const express = require('express');
const cors = require('cors');
require('dotenv').config();

const muridRoutes = require('./routes/murid');
const mataPelajaranRoutes = require('./routes/mata_pelajaran');
const projectRoutes = require('./routes/project');
const chapterRoutes = require('./routes/chapter');
const aspekRoutes = require('./routes/aspek');
const subaspekRoutes = require('./routes/sub_aspek');
const nilaiRoutes = require('./routes/nilai');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/murid', muridRoutes);
app.use('/mataPelajaran', mataPelajaranRoutes);
app.use('/project', projectRoutes);
app.use('/chapter', chapterRoutes);
app.use('/aspek', aspekRoutes);
app.use('/sub_aspek', subaspekRoutes);
app.use('/nilai', nilaiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
