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
  res.json({
    id,
    name: 'Producto 1',
    price: 1000
  });
});

module.exports = router;
