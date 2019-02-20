var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	
	app.post('/books', (req, res) => {
		const book = { title: req.body.title, author: req.body.author, synopsis: req.body.synopsis }
		db.collection('books').insertOne(book, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result.ops[0])
			}
		})
	});

	app.get('/books/:id', (req, res) => {
		const id = req.params.id
		const details = { '_id': new ObjectID(id) };
		db.collection('books').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(item)
			}
		})
	});

	app.get('/books', (req, res) => {
		db.collection('books').find({}).toArray( (err, results) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(results)
			}
		})
	})
};