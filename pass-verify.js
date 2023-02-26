const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$XjXE67/DvOLBRsC6KZFEx.xuxCLMKZVZznrJr3qk64JE/oJXMVxIK';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
