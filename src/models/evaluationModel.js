import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Evaluation = sequelize.define('Evaluation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 0,
                msg: "La note ne peut pas être inférieure à 0."
            },
            max: {
                args: 5,
                msg: "La note ne peut pas être supérieure à 5."
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
    tableName: 'Evaluations',
    timestamps: false, // Pas besoin de timestamps pour une table de référence
    underscored: true,
});

export default Evaluation;