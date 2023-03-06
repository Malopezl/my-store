const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'df5dfhsdf1';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
