import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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
    },
    recipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Recipes',
            key: 'id',
        },
    },
}, {
    tableName: 'Recipe_Ingredients',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default RecipeIngredient;