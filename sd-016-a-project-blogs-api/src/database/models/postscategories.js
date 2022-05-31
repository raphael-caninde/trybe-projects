module.exports = (sequelize) => {
  const PostsCategories = sequelize.define('PostsCategory',
  {},
  { tableName: 'PostsCategories' });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { // Category é o que eu definir no define da model
      as: 'categories',
      through: PostsCategories, // Tabela de associação
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostsCategories, // Tabela de associação
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategories;
};
