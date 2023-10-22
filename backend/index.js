require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors({origin:'https://65352367917348683d43f95d--sage-basbousa-dab6f4.netlify.app',credentials:true}));
const port = process.env.HOST_URL || 5000
app.use(express.json());
const session =require('express-session');
app.use(session({
    name:'something',
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:15*24*60*60*1000
    }
}));
const UserRoute = require('./routes/auth');
app.use('/api/auth',UserRoute)

const NotesRoute = require('./routes/notes');
app.use('/api/auth',NotesRoute)

require('./db')
app.listen(port, function () {
    console.log(`Server is running at port no ${port}`);
})
