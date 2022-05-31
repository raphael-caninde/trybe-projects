const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const blogPostsRoutes = require('./src/routes/blogPostsRoutes');

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', blogPostsRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
