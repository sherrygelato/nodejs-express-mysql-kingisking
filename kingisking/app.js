// express앱의 본체 : 
// 핵심적인 서버 역할을 담당한다.
// 즉, node 서버의 entry point(진입점)이다.

var createError = require('http-errors');
var express = require('express'); // entry point(진입점)
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* connect mysql */
var mysqlDB = require('./mysql/db');
mysqlDB.connect();

var app = express(); // entry point(진입점)
// express 패키지를 호출하여 app 변수 객체를 만들었다.
// 이 객체에 기능을 하나씩 연결한다.

// view engine setup
// app.set으로 설정을 하나씩 세팅한다. 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use는 미들웨어를 연결하는 부분이다. 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// app 객체를 모듈로 만드는 코드이다.
// bin/www에서 사용된 app 모듈이다.
module.exports = app;
