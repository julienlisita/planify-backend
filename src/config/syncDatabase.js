import { sequelize } from './database.js'; // Importation de sequelize
import User from '../models/userModel.js';    // Modèle utilisateur
import Role from '../models/roleModel.js';    // Modèle rôle
import Recipe from '../models/recipeModel.js';
import Like from '../models/likeModel.js';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subCategory.js';
import mockUsers from '../data/mock-users.js';
import mockRecipes from '../data/mock-recipes.js';
import mockLikes from '../data/mock-likes.js';
import mockCategories from '../data/mock-categories';
import mockSubCategories from '../data/mock-subCategories';
import bcrypt from 'bcrypt'; // Importation de bcrypt

const syncDatabase = async () => {
    try {

        // Supprimer toutes les tables existantes (en cas de besoin)
         await sequelize.drop();
        // Synchronisation des tables
        await sequelize.sync({ force: true });
        console.log('Base de données synchronisée avec succès.');

        // Pré-remplissage des rôles
        const roles = [
            { id: 1, name: 'superAdmin' },
            { id: 2, name: 'admin' },
            { id: 3, name: 'author' },
            { id: 4, name: 'member' }
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

        // Pré-remplissage des recettes
        await Recipe.bulkCreate(mockRecipes);
        console.log('Recette ajoutées avec succès.');

        // Pré-remplissage des likes
        await Like.bulkCreate(mockLikes);
        console.log('Likes ajoutés avec succès.');

        // Pré-remplissage des catégorie
        await Category.bulkCreate(mockCategories);
        console.log('Catégories ajoutées avec succès.');

        // Pré-remplissage des catégorie
        await SubCategory.bulkCreate(mockSubCategories);
        console.log('Sous catégories ajoutées avec succès.');


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