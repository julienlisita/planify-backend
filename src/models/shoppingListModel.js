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
}, {
    tableName: 'Shopping_Lists',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default ShoppingList;