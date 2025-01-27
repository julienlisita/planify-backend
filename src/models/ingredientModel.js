// ingredientModel.js

export default (sequelize, DataTypes) => {

const Ingredient = sequelize.define('Ingredient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 30],
        msg: 'Le nom de l\'ingrédient doit contenir entre 2 et 30 caractères.',
      }
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date de création du message',
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Ingredients',
  timestamps: false, // Pas besoin de timestamps pour une table de référence
  underscored: true,
});

 // Définition des associations
 Ingredient.associate = (models) => {

  // Many-to-Many avec table pivot explicite Recipe-Ingredients
    Ingredient.belongsToMany(models.Recipe, { 
    through: models.RecipeIngredient,
    as: 'recipes',  
    foreignKey: 'ingredientId',
    otherKey: 'recipeId',
   });

  // Many-to-Many avec table pivot ShoppingList-Ingredients
    Ingredient.belongsToMany(models.ShoppingList, { 
    through: models.ShoppingListIngredient,
    as: 'shoppingLists',  
    foreignKey: 'ingredientId',
    otherKey: 'shoppingListId', 
  });
};

    return Ingredient;
};