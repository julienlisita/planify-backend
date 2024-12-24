import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';
import userModel from './userModel.js';
import roleModel from './roleModel.js';
import messageModel from './messageModel.js';
import notificationModel from './notificationModel.js';
import recipeModel from './recipeModel.js';
import IngredientModel from './ingredientModel.js';
import RecipeIngredientModel from './recipeIngredientModel.js';
import ShoppingListIngredientModel from './shoppingListIngredientModel.js';
import ShoppingListModel from './shoppingListModel.js';
import EvaluationModel from './evaluationModel.js';
import FavoriteModel from './favoritesModel.js';
import MealPLanModel from './mealPlanModel.js';
import CommentModel from './commentModel.js';
import LikeModel from './likeModel.js';
import NewsModel from './newsModel.js';
import CategoryModel from './categoryModel.js';
import SubCategoryModel from './subCategoryModel.js';
import SubSubCategoryModel from './subSubCategoryModel.js';

// Initialiser les modèles
const models = {
  User: userModel(sequelize),
  Role: roleModel(sequelize),
  Message: messageModel(sequelize),
  Notification: notificationModel(sequelize),
  Recipe: recipeModel(sequelize),
  Ingredient: IngredientModel(sequelize),
  RecipeIngredient: RecipeIngredientModel(sequelize),
  ShoppingListIngredient: ShoppingListIngredientModel(sequelize),
  ShoppingList: ShoppingListModel(sequelize),
  Evaluation: EvaluationModel(sequelize),
  Favorite: FavoriteModel(sequelize),
  MealPLan: MealPLanModel(sequelize),
  Comment: CommentModel(sequelize),
  Like: LikeModel(sequelize),
  News: NewsModel(sequelize),
  Category: CategoryModel(sequelize),
  SubCategory: SubCategoryModel(sequelize),
  SubSubCategory: SubSubCategoryModel(sequelize)
};

// Appliquer les associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;