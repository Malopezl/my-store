const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema } = require('../dtos/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
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
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
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
  validatorHandler(getOrderSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const order = await service.delete(id);
    res.json(order);
  }
);

module.exports = router;
