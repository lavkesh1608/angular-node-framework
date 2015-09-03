var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');
var compress = require('compression');

global.__base = __dirname + '/';

/*
 * Below global rootRequire return full path of file
 */
global.rootRequire = function(path) {
	return require(global.__base + '/' + path);
}


var routeUrl = './routes';
var routes = fs.readdirSync(routeUrl);
var app = express();

//To implement gzip
app.use(compress());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
	secret : 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


/*
 * Below forEach loop declare all routes of files that are presents in routes folder
 */
routes.forEach(function(file) {
	var route = require(routeUrl + '/' + file);
	if ( typeof route.configureRoutes === "function") {
		route.configureRoutes(app, passport);
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
