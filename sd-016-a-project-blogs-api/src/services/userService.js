const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  const token = jwt.sign({ data: user.dataValues.displayName, email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return { token };
};

const getUsers = async () => {
const findUsers = await User.findAll({ attributes: { exclude: 'password' } });

return findUsers;
};

const getUserId = async (id) => {
  const userId = await User.findOne({
    where: { id },
    attributes: { exclude: 'password' },
  });

  if (!userId) throw new Error('User does not exist');

  return userId;
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};
