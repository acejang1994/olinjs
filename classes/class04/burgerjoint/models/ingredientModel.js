var mongoose = require('mongoose');

var ingredientSche = mongoose.Schema({
	name: String,
	price: Number,
	inStock: Boolean
});

module.exports = mongoose.model('Ingredient', ingredientSche);