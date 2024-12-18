import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const like = sequelize.define('like', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    liked_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Likes',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default like;