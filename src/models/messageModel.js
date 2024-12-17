import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Message = sequelize.define('Message', {
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
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Statut de lecture du message (false = non lu, true = lu)',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date de création du message',
  },
}, {
  tableName: 'Messages',
  underscored: true,
  timestamps: false, // Désactive les champs Sequelize automatiques
});

// Définition des associations
Message.associate = (models) => {
  
  // un message est envoyé par un utilisateur
  Message.belongsTo(models.User, { 
    foreignKey: 'senderId', 
    as: 'sender'});

  // un message est reçu par un utilisateur
  Message.belongsTo(models.User, { 
    foreignKey: 'receiverId', 
    as: 'receiver'});
};

export default Message;