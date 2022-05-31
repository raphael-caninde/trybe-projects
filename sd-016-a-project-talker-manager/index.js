const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const crypto = require('crypto');

const {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
} = require('./middlewares/validateUser');

const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateRate');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateToken = require('./middlewares/validateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkJson = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talker = await fs.readFile(talkJson, 'utf8');

  if (!talker) return res.status(HTTP_OK_STATUS).json(JSON.parse([]));

  return res.status(HTTP_OK_STATUS).json(JSON.parse(talker));
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile(talkJson, 'utf8');
  const talkerId = JSON.parse(talker).find((t) => t.id === Number(id));

  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(talkJson, 'utf8')
      .then((talker) => JSON.parse(talker));

    const newTalker = {
      id: talkers.length + 1,
      name,
      age,
      talk,
    };

    await fs.writeFile(talkJson, JSON.stringify([...talkers, newTalker]));

    return res.status(201).json(newTalker);
});

app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = await fs.readFile(talkJson, 'utf8')
      .then((talker) => JSON.parse(talker));
    const findTalker = talkers.find((t) => t.id === Number(id));
 
    findTalker.name = name;
    findTalker.age = age;
    findTalker.talk = talk;

    await fs.writeFile(talkJson, JSON.stringify(talkers));

    return res.status(200).json(findTalker);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(talkJson, 'utf8')
      .then((talker) => JSON.parse(talker));
  
  const removeTalker = talkers.filter((t) => t.id !== Number(id));

  await fs.writeFile(talkJson, JSON.stringify(removeTalker));

  return res.status(204).end();
});
