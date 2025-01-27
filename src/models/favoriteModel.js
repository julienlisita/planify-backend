// favoriteModel.js

export default (sequelize, DataTypes) => {

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
    tableName: 'Favorites',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
Favorite.associate = (models) => {

    // Un favori appartient à un utilisateur
    Favorite.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Un favori appartient à une recette
    Favorite.belongsTo(models.Recipe, {
        foreignKey: 'recipeId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

        return Favorite;
};