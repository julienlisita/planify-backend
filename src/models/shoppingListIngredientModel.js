import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ShoppingListIngredient = sequelize.define('ShoppingListIngredient', {
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
        },
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
    isChecked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Statut de lecture du message (false = non cochée, true = cochée)',
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
    shoppingListId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Shopping_Lists',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'ShoppingList_Ingredients',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default ShoppingListIngredient;