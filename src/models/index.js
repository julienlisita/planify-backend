import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';
import userModel from './userModel.js';
import roleModel from './roleModel.js';

// Initialiser les modèles
const models = {
  User: userModel(sequelize),
  Role: roleModel(sequelize),
};

// Appliquer les associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;