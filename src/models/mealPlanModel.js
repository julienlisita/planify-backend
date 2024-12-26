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
    tableName: 'Meal_plans',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
mealPlan.associate = (models) => {

    // Un plan de repas appartient à un utilisateur
    mealPlan.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Un plan de repas appartient à une recette
    mealPlan.belongsTo(models.Recipe, {
        through: MealPlanRecipe
    });
}

export default MealPLanModel;