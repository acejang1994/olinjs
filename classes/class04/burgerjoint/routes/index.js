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
	
	Ingredient.find().exec(function(err, results){
		if (err){
	 		res.status(500).send('displaying ingredients did not work');
		}else {
			var inData = [];
			var outData = [];
			results.forEach(function(data){
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

index.listOrders = function (req, res) {
	
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

index.addIngredient = function(req, res) {
	// create ingredient
	console.log("request body", req.body);
	// console.log("request", req);
	var newIn = new Ingredient({
          name: req.body.name,
          price: req.body.price,
          inStock: true
	});

	newIn.save(function(err){
		if(err){
			console.log("saving failed");
		}
		res.json(newIn);
	})
}

index.editIngredient= function(req, res){

	Ingredient.update({'_id': req.body.id}, req.body, function(err){
		res.end(req.body);

	} )
}

index.OutOfStock = function(req, res) {
// mark an ingredient out of stock
 	Ingredient.update({'_id':req.body.id}, {'inStock':false}, function(err) {
 		if(err){
 			res.status(500).send(err);
 		}
		res.end(req.body.id);
	});
}

index.InStock = function(req, res) {
// mark an ingredient out of stock
 	Ingredient.update({'_id':req.body.id}, {'inStock':true}, function(err) {
 		if(err){
 			res.status(500).send(err);
 		}
		res.end(req.body.id);
	});
}

index.order = function (req, res) {
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
	console.log(req.body)
	var ingredientIds = req.body
	var ingredientsStr;
	var ingredientsArray = [];

	var arr = Object.keys(ingredientIds).map(function(k) { return ingredientIds[k] });
	
	arr.forEach(function(a) {
    	Ingredient.find({ 'name': a }).exec(function(err, results){
    		ingredientsArray.push(results);
    		ingredientsStr += results;
    	});
	});
	console.log(ingredientsStr);
	
	console.log(ingredientsArray);
	var newOrder = new Order({
          customerName : 'random',
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
// remove an order
	Order.findOneAndRemove({'_id': req.body.id}, function(err, data) {
		if(err){
			res.status(500).send(err);	
		}
		res.end(req.body.id);
	});
}



module.exports= index;