const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL
const User = require('./models/user')

const app = express();

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

const csurfProtection = csrf();

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use(express.static(path.join(__dirname, 'public')))
    .use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    }));
    // app.use(csurfProtection);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            res.locals.username = user.username;
            next();
        })
        .catch(err => {
            next(new Error(err));
        })
})

const routes = require('./routes/routes')
app.use(routes)


mongoose.connect(MONGODB_URL).then(result => {
    app.listen(PORT)
}).catch(err => console.log(err));