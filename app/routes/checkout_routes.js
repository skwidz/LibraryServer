var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

	// /////checkout
	// bookId
	// userId
	// date
	// returned

	app.get('/checkouts', (req, res) => {
		db.collection('checkouts').find({}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})
	
	app.post('/checkouts', (req, res) => {
		const checkout = { bookId: req.body.bookId, userId: req.body.userId, returned: false}
		db.collection('checkouts').find({'bookId': checkout.bookId, 'returned': false}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				if (result.length > 0) {
					res.send({'error': 'a checkout for that book already exsists', 'checkout': result})
				} else {
					db.collection('checkouts').insertOne(checkout, (err, results) => {
						if (err) {
							res.send({ 'error': 'An error has occurred' + err})
						} else {
							res.send(results.ops[0])
						}
					})
				}
			}
		})
	});


	app.get('/checkouts/:id', (req, res) => {
		const id = req.params.id
		const details = { '_id': new ObjectID(id) };
		db.collection('checkouts').findOne(details, (err, results) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(results)
			}
		})
	})

	app.post('/checkouts/return', (req, res) => {
		const checkout = { bookId: req.body.bookId, userId: req.body.userId }
		result = db.collection('checkouts').update(
			{ 'bookId': checkout.bookId, 'userId': checkout.userId },
			{ $set: { 'returned': true }}
		)
		// if result.nUpdated <= 0
	})

	app.get('/checkouts/user/:userId', (req, res) => {
		const userId = req.params.userId
		db.collection('checkouts').find({'userId': userId}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})

	app.get('/checkouts/book/:bookId', (req, res) => {
		const bookId = req.params.bookId
		db.collection('checkouts').find({'bookId': bookId}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})
}