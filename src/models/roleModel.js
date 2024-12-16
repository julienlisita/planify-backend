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
  timestamps: false, // Pas besoin de timestamps pour une table de référence
  underscored: true,
});

  // Fonction pour définir les associations
  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: 'role_id', as: 'users' });
  };

export default Role;