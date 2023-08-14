require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.HOST_URL || 5000
app.use(express.json());

const UserRoute = require('./routes/auth');
app.use('/api/auth',UserRoute)

const NotesRoute = require('./routes/notes');
app.use('/api/auth',NotesRoute)

require('./db')
app.listen(port, function () {
    console.log(`Server is running at port no ${port}`);
})
