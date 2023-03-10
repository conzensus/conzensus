var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// copy config defaults to config.json if it doesn't exist already
var fs = require('fs');
if (!fs.existsSync('config.json')) {
  fs.copyFileSync('config-defaults.json', 'config.json', fs.constants.COPYFILE_EXCL)
}

var app = express(); // init express app

// add websocket support
var expressWs = require('express-ws')(app); 
app = expressWs.app;

var indexRouter = require('./routes/index'); //auto generated

var testRouter = require('./routes/test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
