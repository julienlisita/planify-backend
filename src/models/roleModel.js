import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isIn: [['member', 'admin', 'superAdmin', 'author']], // Liste des rôles autorisés
    },
  },
}, {
  tableName: 'Roles',
  timestamps: false, // Pas besoin de timestamps pour une table de référence
  underscored: true,
});

  // Fonction pour définir les associations
  Role.associate = (models) => {

    // Un role est partagé par plusieurs utilisateurs
    Role.hasMany(models.User, { 
      foreignKey: 'roleId', 
      onDelete: 'SET NULL', 
      onUpdate: 'CASCADE',});
  };

export default Role;