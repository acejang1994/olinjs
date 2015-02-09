var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
	res.render('home');
});

app.post('/hello', function(req, res){
	var text = req.body.text; 
	res.send('I got thiss text ', + text);
})

app.listen(3000);

// app.listen(PORT, function() {
//   console.log("Application running on port:", PORT);
// });
