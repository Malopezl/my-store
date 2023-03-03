const jwt = require('jsonwebtoken');

const { config } = require('./config/config');

const secret = config.secret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3NzgxODU3M30.drbM-VUR--ml2ysf3Qy1bZf5o4k1YJQVWwSufKRPnis';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
