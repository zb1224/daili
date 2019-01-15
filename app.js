var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var petMasterRouter = require('./routes/petMaster');
var shopRouter = require('./routes/shop');
var supplierRouter = require('./routes/supplier');
var suppliersRouter = require('./routes/suppliers');
var supplierStatRouter=require('./routes/supplierStat');
var shopComRouter = require('./routes/shopCom');
var supplierComRouter = require('./routes/supplierCom');
var shoperInfoRouter = require('./routes/shoperInfo');
var comSalesCountRouter = require('./routes/comSalesCount');
var comSalesMoneyRouter = require('./routes/comSalesMoney');
var ordersRouter = require('./routes/orders');
var mapRouter = require('./routes/map');
var shoppingRouter = require('./routes/shopping');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: "lovo",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/petMaster', petMasterRouter);
app.use('/shop', shopRouter);
app.use('/supplier', supplierRouter);
app.use('/suppliers', suppliersRouter);
app.use('/supplierStat',supplierStatRouter);
app.use('/shopCom', shopComRouter);
app.use('/supplierCom', supplierComRouter);
app.use('/shoperInfo', shoperInfoRouter);
app.use('/comSalesCount', comSalesCountRouter);
app.use('/comSalesMoney', comSalesMoneyRouter);
app.use('/orders', ordersRouter);
app.use('/map', mapRouter);
app.use('/shopping', shoppingRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;