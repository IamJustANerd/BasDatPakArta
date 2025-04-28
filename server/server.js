const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const connectDB = require('./config/dbConn');
require('./config/passport');

const userRouter = require('./routes/userRoutes');
const recipesRouter = require('./routes/recipeRoutes');
const socialRouter = require('./routes/socialRoutes');


connectDB();

const app = express();
const PORT = 8080;

const API_URL = '/api';

corsOptions = {
    origin: ['http://localhost:5173'],
};

// Middleware
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(passport.initialize());

// Routes
app.get('/api', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API!');
});

app.use(`${API_URL}/user`, userRouter);         // User Management
app.use(`${API_URL}/recipes`, recipesRouter);   // Recipe Management
app.use(`${API_URL}/social`, socialRouter);//Interaction and Social Features

// Multer configuration
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// Start the server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});