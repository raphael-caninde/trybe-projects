const isValidationEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) {
    return res.status(400).json({
      message: '"email" is required',
    });
  }

  if (emailValidate.test(email)) {
    next();
  } else {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
};

module.exports = {
  isValidationEmail,
};
