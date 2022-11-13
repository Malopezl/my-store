const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const products = [];
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

/* Los endpoints especificos deben declararsen antes de los endpoints dinamicos. */
router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  /*
   * De esta forma se puede recibir el id
   * (se debe recibir con el mismo nombre que se puso en el path)
   *
   * Ejemplo normal: const id = req.params.id;
   */
  const { id } = req.params;

  if (id === '999') {
    res.status(404).json({
      message: 'Not found'
    });
  } else {
    res.status(200).json({
      id,
      name: 'Producto 1',
      price: 1000
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;
