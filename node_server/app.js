var express = require("express"),
		path = require("path"),
		forever = require('forever'),
		ejs = require('ejs'),
		Navigation = require('./controllers/navigation');
var models = require("./models");


// Easier namespacing for routes
require('express-namespace');
global._ = require('underscore');

var app = express();
app.use(express.cookieParser());

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Configure the app
app.configure(function() {
		app.use(express.bodyParser());
		app.use(express.cookieParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(path.join(__dirname, "public")));
		app.use(express.errorHandler({
				dumpExceptions: true,
				showStack: true
		}));
});

app.use(app.router);
app.use(function(req, res, next){
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('404', { url: req.url });
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

// Set up public resource server
app.use('/public', express.static(__dirname + '/public'));

// Site
app.get('/', function (req, res) {

	models.User.findAll({
		include: [ models.Task ]
	}).then(function(users) {
		res.send({
			title: 'Express',
			users: users
		});
	});
		//res.render('home', {featuredAds: null});
});

app.get('/example', function (req, res, next) {
	console.log('response will be sent by the next function ...')
	next()
}, function (req, res) {

	models.User
	  .create({
	    username: 'john-doe'
	  })
	  .complete(function(err, user) {
	    /* ... */
	    console.log(user)
	    res.send('Hello from B!');
	  })
	
});


// Create server
app.listen(3000, "127.0.0.1");
console.log("Server is running at 127.0.0.1:3000");