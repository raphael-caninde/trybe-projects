const loginService = require('../services/loginService');

const authLogin = async (req, res) => {
  const { email } = req.body;

  try {
    const login = await loginService.authLogin(email);

    return res.status(200).json(login);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  authLogin,
};
