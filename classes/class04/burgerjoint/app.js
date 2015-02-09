var exphbs = require('express-handlebars'); 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var mongoose = require('mongoose');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI;

app.get('/', index.home);

app.get('/ingredients', index.listIngredients);

app.get('/order', index.order);

app.get('/kitchen', index.listOrders);

app.post('/newIngredient', index.addIngredient);
app.post('/ingredients', index.editIngredient);
app.post('/markOutOfStock', index.OutOfStock);
app.post('/markInStock', index.InStock);
app.post('/submitOrder', index.submitOrder);

mongoose.connect('mongodb://localhost/test');
// mongoose.connect(mongoURI);
app.listen(3000);

// app.listen(PORT, function() {
//   console.log("Application running on port:", PORT);
// });
