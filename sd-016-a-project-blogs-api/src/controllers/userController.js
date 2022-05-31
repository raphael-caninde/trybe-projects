const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const newUser = await userService.createUser({ displayName, email, password, image });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (_req, res) => {
 try {
  const findUsers = await userService.getUsers();

  return res.status(200).json(findUsers);
 } catch (error) {
   return res.status(500).json({ message: error.message });
 }
};

const getUserId = async (req, res) => {
  const { id } = req.params;

  try {
  const userId = await userService.getUserId(id);

  return res.status(200).json(userId);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
};
