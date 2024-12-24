import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Category = sequelize.define('Category', {
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
}, {
    tableName: 'Categories',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Définition des associations
Category.associate = (models) => {
  
    // Une categorie appartient à plusieurs recette
    Category.belongsToMany(models.Recipe, { 
        through: RecipeCategory });

    // Une categorie possède plusieurs sous_catégories
    Category.hasMany(models.SubCategory, { 
        foreignKey: 'categoryId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', });
  
};
       

export default Category;