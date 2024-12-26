import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ShoppingList = sequelize.define('ShoppingList', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
}, {
    tableName: 'Shopping_Lists',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
shoppingList.associate = (models) => {

    // Many-to-Many avec table pivot ShoppingListRecipes
    ShoppingList.belongsToMany(models.Recipe, {
        through: ShoppingListRecipe
    });

    // Une Liste de courses contient plusieurs Ingrédients
    ShoppingList.hasMany(models.ShoppingListIngredient, {
        foreignKey: 'shoppingListId',
        onDelete: 'CASCADE'
    });
};

export default ShoppingList;