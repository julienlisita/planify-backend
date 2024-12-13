import { Sequelize } from 'sequelize';
import config from '../config/default.js';  // Importation de la configuration de la DB

const sequelize = new Sequelize({
    database: config.db.database, 
    username: config.db.user, 
    password:config.db.password, 
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
    port: config.db.port
});

const connectToDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données réussie');
    } catch (error) {
      console.error('Impossible de se connecter à la base de données:', error);
    }
  };

export { sequelize,connectToDatabase } ;