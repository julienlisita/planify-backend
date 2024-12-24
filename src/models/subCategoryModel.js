import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const SubCategory = sequelize.define('SubCategory', {
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
    categoryId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories', 
          key: 'id',      
        },
    },
}, {
    tableName: 'SubCategories',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Définition des associations
SubCategory.associate = (models) => {
  
    // Une sous-categorie appartient à une catégorie
    SubCategory.belongsTo(models.Category, { 
        foreignKey: 'categoryId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', 
        });

    // Une categorie possède plusieurs sous_catégories
    SubCategory.hasMany(models.SubSubCategory, { 
        foreignKey: 'subCategoryId', 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE', });
  
};

export default SubCategory;