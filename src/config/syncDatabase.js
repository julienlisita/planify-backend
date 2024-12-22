import { sequelize } from './database.js'; // Importation de sequelize
import User from '../models/userModel.js';    // Modèle utilisateur
import Role from '../models/roleModel.js';    // Modèle rôle
import mockUsers from '../data/mock-users.js';
import bcrypt from 'bcrypt'; // Importation de bcrypt

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
        const hashedUsers = await Promise.all(
            mockUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10) // Hachage du mot de passe
            }))
        );
        await User.bulkCreate(hashedUsers);
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