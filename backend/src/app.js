require("dotenv").config();
require('./strategies/discord');

const express = require("express");
const app = express();
const port = process.env.port || 5001;
const routes = require('./routes');
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(cors({
    origin: [ 'http://localhost:3000' ],
    credentials: true
}))

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})