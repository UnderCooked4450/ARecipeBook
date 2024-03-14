const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();


const app = express();


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString,{dbName: 'ArCooked'});
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use('/api/', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)//make server visible on 3000
})