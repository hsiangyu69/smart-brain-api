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
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// main
app.get("/", (req, res) => { res.send("It is working") })

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
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

