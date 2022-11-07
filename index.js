const express = require('express');
require('dotenv').config({ path: './.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});
