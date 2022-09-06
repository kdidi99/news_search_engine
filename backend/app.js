//
//
//  IMPORT MODULES
//

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//
//  
//  DATABASE
//  

// connects to database "article-database"
// creates new database if not already existing
mongoose.connect('mongodb://localhost:27017/article-database');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

//
//
//  EXPRESS SETTINGS
//

const app = express();

//setting HTML templating engine to EJS
app.set('view engine', 'ejs');
//setting path to 'views' (to directory)
app.set('views', path.join(__dirname, 'views'));

//  MIDDLEWARE

//tell express to parse bodies as URL encoded of post requests for adding new articles
app.use(express.urlencoded({extended: true}));
//tell express to parse request bodies with JSON payloads
app.use(express.json());
app.use(methodOverride('_method'));

//
//
//  ROUTES
//

//sets up router for CRUD
    //CRUD will most likely be implemented *through* API
    //just wanted it out of app.js for now so it's easier to read
const CRUDRouter = require(path.resolve(__dirname, "./routes/crud.js"));
//uses CRUD routing when '/articles/' is getting used
app.use("/articles/", CRUDRouter);

//sets up router for API
const apiRouter = require(path.resolve(__dirname, "./routes/api.js"));
//uses API routing when '/api/' is getting used
app.use("/api/", apiRouter);

//defaults to homepage when no other request is used (make sure this is the last request!)
app.get('*', (req, res) => {
    //update link to frontend!!
    res.render('home');
});

//
//
//  FINAL
//

app.listen(3000, () => {
    console.log('Serving on port 3000')
});
