var mongoose = require('mongoose');

var orderSch = mongoose.Schema({
	ingredients: Array,
	ingredientsStr: String
});

module.exports = mongoose.model('Orders', orderSch);
