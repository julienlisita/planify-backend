import { sequelize } from './database.js'; // Importation de sequelize
import User from '../models/userModel.js';    // Modèle utilisateur
import Role from '../models/roleModel.js';    // Modèle rôle
import Recipe from '../models/recipeModel.js';
import Ingredient from '../models/ingredientModel.js';
import RecipeIngredient from '../models/recipeIngredientModel.js';
import ShoppingList from '../models/shoppingListModel.js';
import ShoppingListIngredient from '../models/shoppingListIngredientModel.js';
import Like from '../models/likeModel.js';
import Comment from '../models/commentModel.js'
import Favorite from '../models/favoriteModel.js';
import Notification from '../models/notificationModel.js';
import MealPlan from '../models/mealPlanModel.js';
import Evaluation from '../models/evaluationModel.js';
import Category from '../models/categoryModel.js';
import Message from '../models/messageModel.js';
import SubCategory from '../models/subCategoryModel.js';
import SubSubCategory from '../models/subSubCategoryModel.js';
import mockUsers from '../data/mock-users.js';
import mockFavorites from '../data/mock-favorites.js';
import mockRecipes from '../data/mock-recipes.js';
import mockIngredients from '../data/mock-ingredient.js';
import mockShoppingLists from '../data/mock-shoppingLists.js';
import mockShoppingListIngredients from '../data/mock-shoppingListIngredient.js';
import mockRecipeIngredients from '../data/mock-recipeIngredient.js';
import mockLikes from '../data/mock-likes.js';
import mockComments from '../data/mock-comments.js';
import mockMealPlans from '../data/mock-mealPlans.js';
import mockEvaluations from '../data/mock-evaluations.js';
import mockMessages from '../data/mock-messages.js';
import mockCategories from '../data/mock-categories.js';
import mockSubCategories from '../data/mock-subCategories.js';
import mockSubSubCategories from '../data/mock-subSubCategories.js';
import bcrypt from 'bcrypt'; // Importation de bcrypt
import mockNotifications from '../data/mock-notifications.js';

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

        // Pré-remplissage des ingrédients
        await Ingredient.bulkCreate(mockIngredients);
        console.log('Ingrédients ajoutés avec succès.');

        // Pré-remplissage de la table recipeIngredients
        await RecipeIngredient.bulkCreate(mockRecipeIngredients);
        console.log('table  RecipeIngredient remplie avec succès.');

        // Pré-remplissage de la table ShoppingLists
        await ShoppingList.bulkCreate(mockShoppingLists);
        console.log('table  ShoppingList remplie avec succès.');

        // Pré-remplissage de la table ShoppingListIngredients
        await ShoppingListIngredient.bulkCreate(mockShoppingListIngredients);
        console.log('table  ShoppingList remplie avec succès.');

        // Pré-remplissage des likes
        await Like.bulkCreate(mockLikes);
        console.log('Likes ajoutés avec succès.');

        // Pré-remplissage des likes
        await Message.bulkCreate(mockMessages );
        console.log('Likes ajoutés avec succès.');
        // Pré-remplissage des likes
        await Notification.bulkCreate(mockNotifications );
        console.log('Likes ajoutés avec succès.');
        // Pré-remplissage des commentaires
        await Comment.bulkCreate(mockComments);
        console.log('Commentaires ajoutés avec succès.');

        // Pré-remplissage des évaluations
        await Evaluation.bulkCreate(mockEvaluations);
        console.log('Evaluations ajoutés avec succès.');

        // Pré-remplissage des commentaires
        await MealPlan.bulkCreate(mockMealPlans);
        console.log('Meal plans ajoutés avec succès.');

        // Pré-remplissage des favoris
        await Favorite.bulkCreate(mockFavorites);
        console.log('Evaluations ajoutés avec succès.');

        // Pré-remplissage des catégorie
        await Category.bulkCreate(mockCategories);
        console.log('Catégories ajoutées avec succès.');

        // Pré-remplissage des sous-catégorie
        await SubCategory.bulkCreate(mockSubCategories);
        console.log('Sous catégories ajoutées avec succès.');

        // Pré-remplissage des sous-sous-catégorie
        await SubSubCategory.bulkCreate(mockSubSubCategories);
        console.log('Sous-sous catégories ajoutées avec succès.');


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