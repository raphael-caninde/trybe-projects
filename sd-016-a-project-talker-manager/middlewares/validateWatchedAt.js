const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateValidate = regexDate.test(watchedAt);

  if (!dateValidate) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validateWatchedAt;

// Site onde achei a validação de data com regex 
// https://www.codegrepper.com/code-examples/javascript/date+regex+dd%2Fmm%2Fyyyy