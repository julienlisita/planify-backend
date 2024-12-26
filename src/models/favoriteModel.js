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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
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
    tableName: 'Favorites',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
favorite.associate = (models) => {

    // Un favori appartient à un utilisateur
    favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Un favori appartient à une recette
    favorite.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

export default Favorite;