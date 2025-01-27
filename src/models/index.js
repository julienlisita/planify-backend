// index.js

import { sequelize } from '../config/database.js';
import { DataTypes } from 'sequelize';

import UserModel from './userModel.js';
import RoleModel from './roleModel.js';
import MessageModel from './messageModel.js';
import NotificationModel from './notificationModel.js';
import RecipeModel from './recipeModel.js';
import IngredientModel from './ingredientModel.js';
import RecipeIngredientModel from './recipeIngredientModel.js';
import ShoppingListIngredientModel from './shoppingListIngredientModel.js';
import ShoppingListModel from './shoppingListModel.js';
import EvaluationModel from './evaluationModel.js';
import FavoriteModel from './favoriteModel.js';
import MealPlanModel from './mealPlanModel.js';
import CommentModel from './commentModel.js';
import LikeModel from './likeModel.js';
import NewsModel from './newsModel.js';
import CategoryModel from './categoryModel.js';
import SubCategoryModel from './subCategoryModel.js';
import SubSubCategoryModel from './subSubCategoryModel.js';

// Initialiser les modèles
const models = {
  User: UserModel(sequelize, DataTypes),
  Role: RoleModel(sequelize, DataTypes),
  Message: MessageModel(sequelize, DataTypes),
  Notification: NotificationModel(sequelize, DataTypes),
  Recipe: RecipeModel(sequelize, DataTypes),
  Ingredient: IngredientModel(sequelize,DataTypes),
  RecipeIngredient: RecipeIngredientModel(sequelize,DataTypes),
  ShoppingListIngredient: ShoppingListIngredientModel(sequelize,DataTypes),
  ShoppingList: ShoppingListModel(sequelize,DataTypes),
  Evaluation: EvaluationModel(sequelize,DataTypes),
  Favorite: FavoriteModel(sequelize,DataTypes),
  MealPlan: MealPlanModel(sequelize,DataTypes),
  Comment: CommentModel(sequelize,DataTypes),
  Like: LikeModel(sequelize,DataTypes),
  News: NewsModel(sequelize,DataTypes),
  Category: CategoryModel(sequelize,DataTypes),
  SubCategory: SubCategoryModel(sequelize,DataTypes),
  SubSubCategory: SubSubCategoryModel(sequelize,DataTypes),
};

// Appliquer les associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;