const express = require('express');
const { faker } = require('@faker-js/faker');
require('dotenv').config({ path: './.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.get('/products', (req, res) => {
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
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filter');
});

app.get('/products/:id', (req, res) => {
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

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});
