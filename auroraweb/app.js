
var path = require('path');
var routes = require('./routes');
var conf = require('./conf');

var express = require('express');

/* Serving fav-icon */
var favicon = require('serve-favicon');

/* Logger */
var logger = require('morgan');

// /* Form handling */
// var bodyParser = require('body-parser'); //may shift to formidable

/* Session Handling */
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);




var app = express();





/* Server fav-icon */
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

/* Logger */
app.use(logger('dev'));

// /* Form Handling */
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); // may shift to formidable

/* Session Handling */
conf.session.store = new MongoStore({ url: 'mongodb://localhost/aurora'});
app.use(session(conf.session));

/* Public Directory */
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

/* Template View Engine */
require('./hbsconf.js')(app);




routes(app);

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
    console.log(err);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.send(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
  res.send(err);
});

module.exports = app;
