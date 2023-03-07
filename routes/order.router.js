const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, addItemSchema } = require('../dtos/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/* Los endpoints especificos deben declararsen antes de los endpoints dinamicos. */
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      };
      const newItem = await service.create(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/items',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.addItem(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getProductSchema, 'params'),
//   validatorHandler(updateProductSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const product = await service.update(id, body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.delete(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
