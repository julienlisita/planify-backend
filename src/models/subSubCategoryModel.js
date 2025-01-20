import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const SubSubCategory = sequelize.define('SubSubCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 30],
                msg: 'Le nom de la catégorie doit contenir entre 2 et 30 caractères.',
            }
        }
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Date de création du message',
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    subCategoryId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'SubCategories', 
          key: 'id',      
        },
    },
    
}, {
    tableName: 'SubSubCategories',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Définition des associations
SubSubCategory.associate = (models) => {
  
    // Une sous-categorie appartient à une catégorie
    SubSubCategory.belongsTo(models.SubCategory, { 
        foreignKey: 'subCategoryId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', 
        });

    // Une categorie appartient à plusieurs recette
    SubSubCategory.belongsToMany(models.Recipe, {
        through: 'RecipeSubSubCategory',
        as: 'recipes',  // Utilisez cet alias dans le contrôleur
        foreignKey: 'subSubCategoryId',
        otherKey: 'recipeId',
      });
  
};

export default SubSubCategory;