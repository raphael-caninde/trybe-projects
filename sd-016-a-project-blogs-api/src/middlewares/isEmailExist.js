const { User } = require('../database/models');

const isEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = {
  isEmailExist,
};
