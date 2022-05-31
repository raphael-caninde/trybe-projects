const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValidate = regexEmail.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!emailValidate) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateName = (req, res, next) => { 
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
};
