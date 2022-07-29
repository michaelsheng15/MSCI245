let mysql = require('mysql');
let config = require('./config.js');
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();


const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = 1;
	let sql = `SELECT * from movies`
	let data = [userID]
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		// let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
})

app.post('/api/addReview', (req, res) => {

	let userID = 1;
	let data = [userID]
	console.log(req.body);

	let movieID = req.body.movieID
	console.log("ID:" + movieID);
	let reviewTitle = req.body.reviewTitle
	console.log("title:" + reviewTitle);

	let reviewContent = req.body.reviewContent
	console.log("content:" + reviewContent);

	let reviewScore = req.body.reviewScore
	console.log("score:" + reviewScore);

	let connection = mysql.createConnection(config);

	let sql = `INSERT INTO Review(userID, movies_id, reviewTitle, reviewContent, reviewScore)VALUES(${userID}, ${movieID}, 
		"${reviewTitle}", "${reviewContent}", ${reviewScore})`

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
})

app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/search', (req, res) => {
	let connection = mysql.createConnection(config);

	let userID = 1;
	let data = [userID]

	let directorFullName = req.body.searchedDirector.split(" ")
	let directorFirstName = directorFullName[0]
	let directorLastName = directorFullName[1]
	if(directorFirstName == ""){
		directorFirstName = "IS NOT NULL"
	}else{
		directorFirstName = `= "${directorFirstName}"`
	}
	if (directorLastName == "" || directorLastName == undefined){
		directorLastName = "IS NOT NULL"
	}else{
		directorLastName = `= "${directorLastName}"`
	}

	let actorFullName = req.body.searchedActor.split(" ")
	let actorFirstName = actorFullName[0]
	let actorLastName = actorFullName[1]
	if(actorFirstName == ""){
		actorFirstName = "IS NOT NULL"
	}else{
		actorFirstName = `= "${actorFirstName}"`
	}
	if (actorLastName == "" || actorLastName == undefined){
		actorLastName = "IS NOT NULL"
	}else{
		actorLastName = `= "${actorLastName}"`
	}

	let movie = req.body.searchedMovie
	if(movie == ""){
		movie = "IS NOT NULL"
	}else{
		movie = `= "${movie}"`
	}
	
	console.log(directorFullName);
	console.log(actorFullName);
	console.log(movie);

	let sql = `SELECT DISTINCT name, first_name, last_name, reviewContent FROM movies, Review, directors, movies_directors WHERE name ${movie} AND first_name ${directorFirstName} AND last_name ${directorLastName} AND movies.id = Review.movies_id`

	// AND actors.first_name ${actorFirstName} AND actors.last_name ${actorLastName} AND actors.id = roles.actor_id

	console.log(sql);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		console.log(obj);

		res.send({ express: string });
	});
	connection.end();
})

app.post('/api/findTrailer', (req, res) => {

	let userID = 1;
	let data = [userID]

	let id = req.body.movieID
	let name = req.body.movieTitle
	

	let connection = mysql.createConnection(config);

	let sql = `SELECT trailerURL FROM m3sheng.Trailer WHERE movieTrailer = "${name}" AND movieID = ${id};`

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
})

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
// app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
