import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    added_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Favorites',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default Favorite;