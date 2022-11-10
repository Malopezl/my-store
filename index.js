const express = require('express');
const routerApi = require('./routes')
require('dotenv').config({ path: './.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});
