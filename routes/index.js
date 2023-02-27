const express = require('express');

const productsRouter = require('./product.router');
const usersRouter = require('./user.router');
const categoriesRouter = require('./category.router');
const orderRouter = require('./order.router');
const customerRouter = require('./customer.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customerRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
