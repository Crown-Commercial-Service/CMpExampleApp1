var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var AppConfig = require('./utils/appconfig');
var indexRouter = require('./routes/index');

var app = express();

// Make the application config availables 
app.set("appConfig", new AppConfig() );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
  src: path.join(__dirname, 'node_modules'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: false,
  debug : true,
  force : true
}));

app.use('/govuk-frontend', express.static(path.join(__dirname, 'node_modules/govuk-frontend')));
app.use('/assets', express.static(path.join(__dirname, 'node_modules/govuk-frontend/assets')));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

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
