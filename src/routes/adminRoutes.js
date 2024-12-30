import express from 'express';
import { getAllUsers, getUserById, updateUserById, deleteUserById,createUser } from '../controllers/adminControllers.js';
import { isAdmin } from '../middlewares/authentification.js';

const router = express.Router();

router.route('/')
    .get(isAdmin, getAllUsers)        // Récupérer tous les utilisateurs
    .post(isAdmin, createUser);       // Créer un nouvel utilisateur

router.route('/:id')     
    .get(isAdmin, getUserById)            // obtenir les informations d'un utilisateur
    .put(isAdmin,updateUserById)          // Modifier les informations d'un utilisateur
    .delete(isAdmin, deleteUserById);     // Supprimer un utilisateur

export default router;