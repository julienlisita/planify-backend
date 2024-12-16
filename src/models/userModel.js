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
        msg: 'Le username doit contenir entre 3 et 30 caractères.',
      },
    },
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Le firstname doit contenir entre 2 et 50 caractères.',
      },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Le lastname doit contenir entre 2 et 50 caractères.',
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users',
  underscored: true,
  hooks: {
    beforeValidate(user) {
      // Enforce lastname and firstname if role is author
      if (user.role_id === 4 && (!user.firstname || !user.lastname)) { // assuming "author" has role_id = 4
        throw new Error('Firstname et lastname sont requis pour le rôle author.');
      }
    },
  },
});

User.associate = (models) => {
  User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
};

export default User;