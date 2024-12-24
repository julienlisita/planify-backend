import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Like = sequelize.define('Like', {
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
    tableName: 'Likes',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

  // Fonction pour définir les associations
  Like.associate = (models) => {

    // Un like appartient à un utilisateur
    Like.belongsTo(models.User, { 
      foreignKey: 'userId', 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE',});
    
    // un like appartient à une recette
    Like.belongsTo(models.Recipe, { 
        foreignKey: 'recipeId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE',});
  };

export default Like;