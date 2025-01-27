// recipeModel.js

export default (sequelize, DataTypes) => {

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Le titre doit contenir entre 3 et 30 caractères.'
            },
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' }
        },
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [2, 50],
                msg: 'Le nom de l\'image doit contenir entre 2 et 50 caractères.'
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Le contenu de la description ne peut pas être vide.' }
        },
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Les instructions sont obligatoires.' }
        },
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    priceLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Le titre doit contenir entre 3 et 30 caractères.'
            },
        },
    },
    likesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', 
          key: 'id',      
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     },
}, {
    tableName: 'Recipes',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

    // Définition des associations
    Recipe.associate = (models) => {

        // Une recette appartient à un utilisateur
        Recipe.belongsTo(models.User, { 
            foreignKey: 'userId', 
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });

        // Une recette possède plusieurs likes
        Recipe.hasMany(models.Like, { 
          foreignKey: 'recipeId', 
          onDelete: 'CASCADE' });

        // Une recette possède plusieurs commentaires
        Recipe.hasMany(models.Comment, { 
        foreignKey: 'recipeId', 
        onDelete: 'CASCADE' });

        // Une recette reçoie plusieurs favoris
        Recipe.hasMany(models.Favorite, { 
            foreignKey: 'recipeId', 
            onDelete: 'CASCADE' });

        // Une recette possède plusieurs evaluations
        Recipe.hasMany(models.Evaluation, { 
            foreignKey: 'recipeId', 
            onDelete: 'CASCADE' });

        // Many-to-Many avec table pivot RecipeIngredient personnalisée
        Recipe.belongsToMany(models.Ingredient, {
            through: models.RecipeIngredient,
            as: 'ingredients',  
            foreignKey: 'recipeId',
            otherKey: 'ingredientId',
        });

        // Many-to-Many avec table pivot RecipeSubSubCategory
        Recipe.belongsToMany(models.SubSubCategory, {
            through: 'RecipeSubSubCategory',
            as: 'subSubCategories',  
            foreignKey: 'recipeId',
            otherKey: 'subSubCategoryId',
          });
    };
    return Recipe;
};