import { sequelize } from './database.js'; // Importation de sequelize
import User from '../models/userModel.js';    // Modèle utilisateur
import Role from '../models/roleModel.js';    // Modèle rôle
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Obtenez le répertoire du fichier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utilisation de __dirname pour localiser le fichier JSON
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

const syncDatabase = async () => {
    try {
        // Synchronisation des tables
        await sequelize.sync({ force: true });
        console.log('Base de données synchronisée avec succès.');

        // Pré-remplissage des rôles
        const roles = [
            { name: 'member' },
            { name: 'admin' },
            { name: 'superAdmin' },
            { name: 'author' }
        ];
        await Role.bulkCreate(roles);
        console.log('Rôles ajoutés avec succès.');

        // Pré-remplissage des utilisateurs
        await User.bulkCreate(users);
        console.log('Utilisateurs ajoutés avec succès.');
    } catch (error) {
        console.error('Erreur lors de la synchronisation de la base de données:', error);
    } finally {
        // Fermeture de la connexion à la base
        await sequelize.close();
        console.log('Connexion à la base de données fermée.');
    }
};

// Exécution du script
syncDatabase();