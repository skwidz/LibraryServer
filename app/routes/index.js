const bookRoutes = require('./book_routes');
const checkoutRoutes = require('./checkout_routes');
const reviewRoutes = require('./review_routes');

module.exports = function(app, db) {
	bookRoutes(app, db);
	checkoutRoutes(app, db);
	reviewRoutes(app, db);
};