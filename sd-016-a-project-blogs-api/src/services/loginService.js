const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../database/models');

const authLogin = async (email) => {
  const findEmail = await User.findOne({ where: { email } });

  if (findEmail === null) throw new Error('Invalid fields');

  const token = jwt.sign({ data: email, name: findEmail.dataValues.displayName },
    process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return { token };
};

module.exports = {
  authLogin,
};
