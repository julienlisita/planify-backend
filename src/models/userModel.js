import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [3, 30],
        msg: 'Le pseudo doit contenir entre 3 et 30 caractères.',
      },
    },
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Le prénom doit contenir entre 2 et 50 caractères.',
      },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Le nom doit contenir entre 2 et 50 caractères.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Le champ email doit contenir une adresse email valide.',
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  roleId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles', 
      key: 'id',      
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',  
  },
}, {
  tableName: 'Users',
  underscored: true,
  hooks: {
    beforeValidate(user) {
      // Enforce lastname and firstname if role is author
      if (user.role_id === 4 && (!user.firstname || !user.lastname)) { // assuming "author" has roleId = 4
        throw new Error('Firstname et lastname sont requis pour le rôle author.');
      }
    },
  },
});
    // Définition des associations
    User.associate = (models) => {

      // Un utilisateur appartient à un rôle
      User.belongsTo(models.Role, { 
          foreignKey: 'roleId', 
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
      });

      // Un utilisateur a plusieurs notifications
      User.hasMany(models.Notification, { 
          foreignKey: 'userId', 
          onDelete: 'CASCADE',
      });
      
      // Un utilisateur a plusieurs likes
      User.hasMany(models.Like, { 
          foreignKey: 'userId', 
          onDelete: 'CASCADE',
      });

      // Un utilisateur a plusieurs commentaires
      User.hasMany(models.Comment, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Un utilisateur a plusieurs favoris
      User.hasMany(models.Favorite, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE',
      });

      // Un utilisateur a plusieurs évaluations
      User.hasMany(models.Evaluation, { 
        foreignKey: 'userId', 
        onDelete: 'CASCADE',
      });

      // Un utilisateur envoie plusieurs messages
      User.hasMany(models.Message, { 
        foreignKey: 'senderId', 
        as: 'sentMessages', 
        onDelete: 'CASCADE' });

      // Un utilisateur reçoit plusieurs messages
      User.hasMany(models.Message, { 
        foreignKey: 'receiverId', 
        as: 'receivedMessages', 
        onDelete: 'CASCADE' });

      // Un utilisateur possedent plusieurs recettes
      User.hasMany(models.Recipe, { 
        foreignKey: 'userId',});

  };

export default User;