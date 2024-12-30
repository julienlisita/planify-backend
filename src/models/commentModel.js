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
    tableName: 'Comments',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
Comment.associate = (models) => {

    // Un commentaire appartient à un utilisateur
    Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Un commentaire appartient à une recette
    Comment.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

export default Comment;