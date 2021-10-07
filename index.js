const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL

const app = express();

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use(express.static(path.join(__dirname, 'public')))

const routes = require('./routes/routes')
app.use('/', routes)


mongoose.connect(MONGODB_URL).then(result => {
    app.listen(PORT)
}).catch(err => console.log(err));