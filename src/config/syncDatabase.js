import { sequelize } from './database.js'; // Importation de sequelize
import models from '../models/index.js';
const { Role, User, Recipe, Ingredient, RecipeIngredient, ShoppingList, ShoppingListIngredient, Like, Message, Notification, Comment, Evaluation, MealPlan, Favorite, Category, SubCategory, SubSubCategory  } = models;

import mockUsers from '../data/mock-users.js';
import mockFavorites from '../data/mock-favorites.js';
import mockRecipes from '../data/mock-recipes.js';
import mockIngredients from '../data/mock-ingredient.js';
import mockShoppingLists from '../data/mock-shoppingLists.js';
import mockShoppingListIngredients from '../data/mock-shoppingListIngredient.js';
import mockRecipeIngredients from '../data/mock-recipeIngredient.js';
import mockLikes from '../data/mock-likes.js';
import mockNotifications from '../data/mock-notifications.js';
import mockComments from '../data/mock-comments.js';
import mockMealPlans from '../data/mock-mealPlans.js';
import mockEvaluations from '../data/mock-evaluations.js';
import mockMessages from '../data/mock-messages.js';
import mockCategories from '../data/mock-categories.js';
import mockSubCategories from '../data/mock-subCategories.js';
import mockSubSubCategories from '../data/mock-subSubCategories.js';

import bcrypt from 'bcrypt'; // Importation de bcrypt

const syncDatabase = async () => {
    try {

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        // Supprimer toutes les tables existantes (en cas de besoin)
         await sequelize.drop();
        // Synchronisation des tables
        await sequelize.sync({ force: true });
        console.log('Base de données synchronisée avec succès.');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

        // Pré-remplissage de la table roles
        const roles = [
            { id: 1, name: 'superAdmin' },
            { id: 2, name: 'admin' },
            { id: 3, name: 'author' },
            { id: 4, name: 'member' }
        ];

        await Role.bulkCreate(roles);
        console.log('Table roles remplie avec succès.');

        // Pré-remplissage de la table users
        const hashedUsers = await Promise.all(
            mockUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10) // Hachage du mot de passe
            }))
        );
        await User.bulkCreate(hashedUsers);
        console.log('Table users remplie avec succès.');

        // Pré-remplissage de la table recipes
        await Recipe.bulkCreate(mockRecipes);
        console.log('Table recipes remplie avec succès.');

        // Pré-remplissage de la table ingredients
        await Ingredient.bulkCreate(mockIngredients);
        console.log('Table ingredients remplie avec succès.');

        // Pré-remplissage de la table pivot recipeIngredients
        await RecipeIngredient.bulkCreate(mockRecipeIngredients);
        console.log('Table recipeIngredients remplie avec succès.');

        // Pré-remplissage de la table shoppingLists
        await ShoppingList.bulkCreate(mockShoppingLists);
        console.log('Table shoppingLists remplie avec succès.');

        // Pré-remplissage de la table pivot shoppingListIngredients
        await ShoppingListIngredient.bulkCreate(mockShoppingListIngredients);
        console.log('Table pivot shoppingListIngrédients remplie avec succès.');

        // Pré-remplissage des likes
        await Like.bulkCreate(mockLikes);
        console.log('Table likes remplie succès.');

        // Pré-remplissage de la table messages
        await Message.bulkCreate(mockMessages );
        console.log('Table messages remplie avec succès.');

        // Pré-remplissage de la table likes
        await Notification.bulkCreate(mockNotifications );
        console.log('Table notifications remplie avec succès.');

        // Pré-remplissage de la table comments
        await Comment.bulkCreate(mockComments);
        console.log('Table comments remplie avec succès.');

        // Pré-remplissage de la table evaluations
        await Evaluation.bulkCreate(mockEvaluations);
        console.log('Table evaluations remplie avec succès.');

        // Pré-remplissage de la table mealPlans
        await MealPlan.bulkCreate(mockMealPlans);
        console.log('Table mealPlans remplie avec succès.');

        // Pré-remplissage de la table favorites
        await Favorite.bulkCreate(mockFavorites);
        console.log('Table favorites remplie avec succès.');

        // Pré-remplissage de la table categories
        await Category.bulkCreate(mockCategories);
        console.log('Table categories remplie avec succès.');

        // Pré-remplissage de la table subCategories
        await SubCategory.bulkCreate(mockSubCategories);
        console.log('Table subCategories remplie avec succès.');

        // Pré-remplissage de la table subSubCategories
        await SubSubCategory.bulkCreate(mockSubSubCategories);
        console.log('Table subSubcCategories remplie avec succès');

        // Pré-remplissage de la table pivot recipeSubSubCategory
        const mockRecipeSubSubCategory = [
            { recipeId: 1, subSubCategoryId: 7 },
            { recipeId: 2, subSubCategoryId: 7 } , 
            { recipeId: 3, subSubCategoryId: 7 },  
            { recipeId: 4, subSubCategoryId: 7 } ,
            { recipeId: 5, subSubCategoryId: 7 }, 
            { recipeId: 6, subSubCategoryId: 7 } , 
            { recipeId: 7, subSubCategoryId: 7 },  
            { recipeId: 8, subSubCategoryId: 7 }  , 
            { recipeId: 9, subSubCategoryId: 7 }, 
            { recipeId: 10, subSubCategoryId: 7 }  
          ];
          for (const { recipeId, subSubCategoryId } of mockRecipeSubSubCategory) {
            const recipe = await Recipe.findOne({ where: { id: recipeId } });
            const subSubCategory = await SubSubCategory.findOne({ where: { id: subSubCategoryId } });
        
            if (recipe && subSubCategory) {
              await recipe.addSubSubCategory(subSubCategory);
            }
          }
          console.log('Table pivot recipeSubSubCategories remplie avec succès.');

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