import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const MealPLanModel = sequelize.define('MealPLanModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slot: {
        type: DataTypes.STRING, // Voir pour ENUM au lieu de STRING ou peut-être ajouter des validateurs pour plus de controle sur les valeurs
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
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
    tableName: 'Meal_plans',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default MealPLanModel;