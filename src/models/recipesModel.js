import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Recipes = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Le titre doit contenir entre 3 et 30 caractères.'
            },
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' }
        },
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [2, 50],
                msg: 'Le nom de l\'image doit contenir entre 2 et 50 caractères.'
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Le contenu de la description ne peut pas être vide.' }
        },
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Les instructions sont obligatoires.' }
        },
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    price_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Le titre doit contenir entre 3 et 30 caractères.'
            },
        },
    },
    likes_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit contenir un nombre entier.' }
        },
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
};

export default Recipes;