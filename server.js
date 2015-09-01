var express = require('express');
var path = require('path');
var http = require('http');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var jasonParser = bodyParser.json(); 
var port = 8080;
app.use(express.static('static'));
var tools = require('./tools');

// var Schema = mongoose.Schema;

// var bandSchema = new Schema({
// 	name: String,
// 	genre: String
// });
// var band = mongoose.model('band', bandSchema);
// mongoose.connect('mongodb://localhost/myapp');

app.listen(port);
app.get('/', function (req, res) {
	console.log('Listening at: ' + port);
	res.sendFile('index.html');
});

app.get('/banddb', function (req, res) {
	fs.readFile('./log.txt', function read(err, data){
		if(err) throw err;
		var buffer = "<html><head><meta charset=\"UTF-8\"><title>Bandit</title><link rel=\"stylesheet\" href=\"style.css\"/></head><body><div class=\"logo\"></div><div class=\"slogan\">FIND&nbspIT!&nbsp&nbsp&nbspBOOK&nbspIT!&nbsp&nbsp&nbspLOVE&nbspIT!</div><br><div class=\"textbox\"><a href=\"index.html\">Return Home</a></div><div class=\"textbox\">";
		buffer+=data.toString();
		buffer+="</div></body></html>"
		res.send(buffer);
	});
});

app.post('/register', urlencodedParser, function (req, res) {
	if (!req.body) return res.sendStatus(400)
	// var b_name = req.body.bandName;
	// var b_genre = req.body.bandGenre;
	// console.log(b_name  + " " + b_genre);
	tools.registerBand(req.body.bandName, req.body.bandGenre, function(error){
		if(error == 0){
			console.log("Successfully Registerd Band");
		}else if(error == 1){
			console.log("Band Already Registerd");
		}else if(error == 2){
			console.log("Enter a Band Name");
		}else if(error == 3){
			console.log("Enter a Genre");
		}else{
			console.log("Error");
		}
	});
	// if(error == 0)console.log("Successfully Registerd Band");
	// else console.log("Error Registering Band");
	

	// res.send('Successfully Logged in ' + b_name);
	// var test = new band({name: b_name, genre: b_genre});
	// test.save(function(err, save) {
	// 	if(err) return console.error(err);
	// 	else console.log('saved');
	// });
	// // console.log("Schema: " + test.name);
	// mongoose.model('band').find(function(err, bands) {
	// 	res.send(band);
	// });

});