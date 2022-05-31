const blogPostsService = require('../services/blogPostsService');

const getPosts = async (_req, res) => {
 try {
  const posts = await blogPostsService.getPosts();

  return res.status(200).json(posts);
 } catch (error) {
   return res.status(500).json({ message: error.message });
 }
};

const getPostbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const postId = await blogPostsService.getPostById(id);

    return res.status(200).json(postId);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostbyId,
};
