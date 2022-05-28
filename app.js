const sqlite3 = require('sqlite3');
const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");

const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("__dirname"));

var sql;


// create database
const db = new sqlite3.Database("./movie.db", sqlite3.OPEN_READWRITE, (err) =>{
    if (err) return console.error(err.message+" database create");
    console.log("Connected to the movie database.");
});

// create table
sql = 'CREATE TABLE MOVIE(id INTEGER PRIMARY KEY AUTOINCREMENT, m_name TEXT, m_actor TEXT, m_actress TEXT, m_year INTEGER, m_director TEXT)';
db.run(sql, (err) => {
    if (err) return console.error(err.message+" create table");
    console.log('Table created successfully');
});

// index page
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})

// insert data
app.post('/insert', (req, res) => {
    var movie_title = req.body.movie_title;
    var actor_name = req.body.actor_name;
    var actress_name = req.body.actress_name;
    var movie_year = req.body.movie_year;
    var director_name = req.body.director_name;

    sql = 'INSERT INTO MOVIE(m_name, m_actor, m_actress, m_year, m_director) VALUES(?, ?, ?, ?, ?)';
    db.run(sql, [movie_title, actor_name, actress_name, movie_year, director_name], (err) => {
        if (err) return console.error(err.message+" insert data");
        console.log('Data inserted successfully');
    });

    res.redirect('/');
});

// select data
app.all("/show", (req, res) => {
    sql = 'SELECT * FROM MOVIE';
    db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message+" select data");
        console.log('Data selected successfully');
        res.render("display", {here: rows});
    });
});

//select data with m_actor
app.post('/select', (req, res) => {
    var movie_title = req.body.q_movie_title;
    var actor_name = req.body.q_actor_name;
    var actress_name = req.body.q_actress_name;
    var movie_year = req.body.q_movie_year;
    var director_name = req.body.q_director_name;

    if(movie_title != ""){
        sql = 'SELECT * FROM MOVIE WHERE m_name = ?';
        db.all(sql, [movie_title], (err, rows) => {
            if (err) return console.error(err.message);
            console.log('Data selected successfully');
            res.render("display", {here: rows});
        });
    }

    else if(actor_name != ""){
        sql = 'SELECT * FROM MOVIE WHERE m_actor = ?';
        db.all(sql, [actor_name], (err, rows) => {
            if (err) return console.error(err.message);
            console.log('Data selected successfully');
            res.render("display", {here: rows});
        });
    }
    else if(actress_name != ""){
        sql = 'SELECT * FROM MOVIE WHERE m_actress = ?';
        db.all(sql, [actress_name], (err, rows) => {
            if (err) return console.error(err.message);
            console.log('Data selected successfully');
            res.render("display", {here: rows});
        });
    }
    else if(movie_year != ""){
        sql = 'SELECT * FROM MOVIE WHERE m_year = ?';
        db.all(sql, [movie_year], (err, rows) => {
            if (err) return console.error(err.message);
            console.log('Data selected successfully');
            res.render("display", {here: rows});
        });
    }
    else if(director_name != ""){
        sql = 'SELECT * FROM MOVIE WHERE m_director = ?';
        db.all(sql, [director_name], (err, rows) => {
            if (err) return console.error(err.message);
            console.log('Data selected successfully');
            res.render("display", {here: rows});
        });
    }
    else{
        res.write("<p>NOT FOUND<p>")
        res.write("<a href="/">GO BACK</a>")
        res.send();
    }
});

// drop table
app.get("/drop", (req, res) => {
    sql = 'DROP TABLE MOVIE';
    try{
        db.run(sql, (err) => {
            if (err) return console.error(err.message);
            console.log('Table dropped successfully');
        });
    }
    catch(e){
        if ( e instanceof ERR_INVALID_ARG_TYPE ) {
            res.write("<p>TABLE DROPPED SUCCESSFULLY</p>")
            res.write("<a href="/">GO BACK</a>")
            res.send();
        }
    }
});

app.listen(3000, () => {
    console.log("Server listening to port 3000")
});