const express = require('express');
require('dotenv').config({ path: './.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Producto 1',
      price: 1000
    },
    {
      name: 'Producto 2',
      price: 2000
    }
  ]);
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
