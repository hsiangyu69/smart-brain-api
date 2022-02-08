const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const { Knex } = require("knex");
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const res = require("express/lib/response");

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'hsiangyuchen',
        port: 5432,
        password: '',
        database: 'smart-brain'
    }
});


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


// signIn
app.post("/signin", signin.handleSignin(db, bcrypt))

// register
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// profile
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) })

// image
app.put("/image", (req, res) => { image.handleImage(req, res, db) })

// image post
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

// run PORT=3000 npm start to define port
const PORT = process.env.PORT;
app.listen(3000, () => {
    console.log(`app is running on port 3000`);
})
