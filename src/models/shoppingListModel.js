// shoppingListModel.js

export default (sequelize, DataTypes) => {

const ShoppingList = sequelize.define('ShoppingList', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Le nom doit contenir entre 3 et 30 caractères.'
            },
        },
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: 'Shopping_Lists',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
ShoppingList.associate = (models) => {

    // Une liste de course appartient à un utilisateur
    ShoppingList.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    // Many-to-Many avec table pivot ShoppingListIngredient personnalisée
    ShoppingList.belongsToMany(models.Ingredient, {
        through: models.ShoppingListIngredient,
        as: 'ingredients', 
        foreignKey: 'shoppingListId',
        otherKey: 'ingredientId',
    });
};
return ShoppingList;
    
};