import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [[
        'rappel_plat_planifie', 
        'reception_message_recu', 
        'recette_likee', 
        'recette_notee', 
        'recette_commentee',
        'message_administrateur',
        'information_generale'
      ]],
    },
    comment: 'Type de notification : rappel_plat_planifie, reception_message_recu, etc.',
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [1, 255],
        msg: 'Le message doit contenir entre 1 et 255 caractères.',
      },
    },
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Notifications',
  underscored: true,
  timestamps: false, // Désactive les champs Sequelize automatiques
});

  // Fonction pour définir les associations
  Notification.associate = (models) => {
    
    // une notification appartient à un utilisateur
    Notification.belongsTo(models.User, { 
      foreignKey: 'userId'
    });
  };

export default Notification;