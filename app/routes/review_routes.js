var ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {

	app.post('/reviews', (req, res) => {
		const review = {
			bookId: req.body.bookId,
			userId: req.body.userId,
			reviewBody: req.body.reviewBody,
			reviewTitle: req.body.reviewTitle,
			date: new Date().toLocaleDateString()
		}
		db.collection('reviews').insertOne(review, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result.ops[0])
			}
		})
	})

	app.get('/reviews', (req, res) => {
		db.collection('reviews').find({}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})

	// get reviews for a book
	app.get('/reviews/book/:book_id', (req, res) => {
		const bookId = req.params.book_id
		db.collection('reviews').find({'bookId': bookId}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})

	//get reviews for a user
	app.get('/reviews/user/:user_id', (req, res) => {
		const userId = req.params.user_id
		db.collection('reviews').find({'userId': userId}).toArray( (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' + err})
			} else {
				res.send(result)
			}
		})
	})

}