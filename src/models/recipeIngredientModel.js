// recipeIngredientModel.js

export default (sequelize, DataTypes) => {

const RecipeIngredient = sequelize.define('RecipeIngredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        }
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 50],
                msg: "L'unité de mesure doit contenir entre 3 et 50 caractères."
            },
        },
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Ingredients',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Recipes',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'Recipe_Ingredients',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});
    return RecipeIngredient;
};