import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Le contenu du message ne peut pas être vide.',
            },
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Date de création du message',
    },
}, {
    tableName: 'Comments',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default Comment;