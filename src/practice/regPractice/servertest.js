const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyJWTTest = require('./verifyJWTtest');
const cookieParser = require('cookie-parser')
const verifyRolestest = require('./verifyRolestest');
require('dotenv').config()

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use('/registertest', require('./registertest'))
app.use('/authtest', require('./authtest'))

app.use(verifyJWTTest)

let posts = [];

// POST route to add new posts
app.post('/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.status(201).json(newPost);
});

// GET route to fetch all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
