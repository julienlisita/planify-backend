// newsModel.js

export default (sequelize, DataTypes) => {

const News = sequelize.define('News', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Le contenu de la description ne peut pas être vide.' }
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Le contenu du message ne peut pas être vide.',
            },
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
    tableName: 'News',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

// Fonction pour définir les associations
News.associate = (models) => {

    // une notification appartient à un utilisateur
    News.belongsTo(models.User, {
        foreignKey: 'userId'
    });
};

    return News;
};
