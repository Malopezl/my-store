const express = require('express');
const cors = require('cors');
const routerApi = require('./routes')
require('dotenv').config({ path: './.env' });
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});
