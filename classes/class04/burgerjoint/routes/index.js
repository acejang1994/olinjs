var mongoose = require('mongoose');
var path = require('path');
var Ingredient = require('./../models/ingredientModel.js');
var Order = require('./../models/orderModel.js');
// var Order = require(path.join(__dirname,'../models/orderModel.js'));

var index = {};

index.home = function(req, res){
  // res.render('home');
  res.render("home");
};

index.listIngredients = function (req, res) {
		// list all of the Ingredients
	
	Ingredient.find().exec(function(err, results){
		if (err){
	 		res.status(500).send('displaying ingredients did not work');
		}else {
			var inData = [];
			var outData = [];
			results.forEach(function(data){
				// sort out the data by in stock and out of stock
				if(data.inStock){
					inData.push(data);
				}else{
					outData.push(data);
				}
			});
			res.render('ingredients', {
				inStock : inData,
				outStock : outData				
			});
		}
	})
}

index.kitchen = function (req, res) {
	// list all of the orders in the kitchen
	
	Order.find().exec(function(err, results){
		if (err){
			res.status(500).send('displaying ingredients did not work');
		}else {
			res.render('kitchen', {
				'order' : results
			});
		}
	})
}

index.finishOrder = function (req, res) {
	// deleting the order when the submit button is clicked

	deleteId = req.body;
	Order.find({'_id': deleteId}).remove(function(err) {
		if(err){
			res.status(500).send('deleting ingredients did not work');
		}
	});
}

index.addIngredient = function(req, res) {
	// add Ingredient
	
	// create ingredient
	console.log("request body", req.body);
	// console.log("request", req);

	// creating a new ingredient from the req body
	var newIn = new Ingredient({
          name: req.body.name,
          price: req.body.price,
          inStock: true
	});

	// saving the newly created ingredient to mongo
	newIn.save(function(err){
		if(err){
			console.log("saving failed");
		}
		res.json(newIn);
	})
}

index.editIngredient= function(req, res){
	// edit the ingredient

	Ingredient.update({'_id': req.body.id}, req.body, function(err){
		res.end(req.body);

	} )
}

index.OutOfStock = function(req, res) {
	// mark an ingredient when it is out of stock

 	Ingredient.update({'_id':req.body.id}, {'inStock':false}, function(err) {
 		if(err){
 			res.status(500).send(err);
 		}
		res.end(req.body.id);
	});
}

index.InStock = function(req, res) {
	// mark an ingredient when it is in stock

 	Ingredient.update({'_id':req.body.id}, {'inStock':true}, function(err) {
 		if(err){
 			res.status(500).send(err);
 		}
		res.end(req.body.id);
	});
}

index.order = function (req, res) {
	// list out all of the ingredients so that the customer can order

	Ingredient.find().exec(function(err, results){
		if(err){
			res.status(500).send(err);
		}
		res.render('order', {
			'ingredients': results
		});

	});	
}

index.submitOrder = function (req, res) {
	
	// add the given list of ingredients to the Order schema
	
	console.log(req.body)
	var ingredientsArray = req.body;
	var ingredientsStr;

	// create an ingredientsStr from the ingredientsArray
	ingredientsArray.forEach(function(x){
		ingredientsStr += x;

	})
	// create a new Order
	var newOrder = new Order({
          ingredients: ingredientsArray,
          ingredientsStr: ingredientsStr
	});
	newOrder.save(function(err){
		if(err){
			console.log("saving failed");
		}
		res.json(newOrder);
	})
};

index.orderDone = function(req, res) {
	// remove the order
	
	Order.findOneAndRemove({'_id': req.body.id}, function(err, data) {
		if(err){
			res.status(500).send(err);	
		}
		res.end(req.body.id);
	});
}

module.exports= index;