const express = require('express');
const productRouters = require('./routers/productRouters');
const salesRouters = require('./routers/salesRouters');
require('dotenv').config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouters);
app.use('/sales', salesRouters);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

/* link que me ajudou:
https://www.chaijs.com/api/bdd/#method_language-chains

obtive ajuda tambem em algumas funções do banco e validações na mentoria e
do meu amigo thiago leite turma 11.
 */