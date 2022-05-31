const { BlogPost } = require('../database/models');
const { User } = require('../database/models');
const { Category } = require('../database/models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getPostById = async (id) => {
  const postId = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!postId) throw new Error('Post does not exist');

  return postId;
};

module.exports = {
  getPosts,
  getPostById,
};
