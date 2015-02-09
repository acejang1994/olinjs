var mongoose = require('mongoose');

var orderSch = mongoose.Schema({
	customerName: String,
	ingredients: Array,
	ingredientsStr: String
});

module.exports = mongoose.model('Orders', orderSch);
