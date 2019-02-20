const express 		= require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db 					= require('./config/db');

const app = express();
const port = 4000; 
app.use(express.json());

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
	if (err) return console.log(err)

	data = database.db("jobberlibrarydb")
	require('./app/routes')(app, data)

	app.listen(port, () => {
	console.log('server started on port ' + port)
	})
})
