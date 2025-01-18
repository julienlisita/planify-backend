import express from 'express';
import { getAllUsers, getUserById, updateUserById, deleteUserById,createUser } from '../controllers/adminControllers.js';
import { authenticate, isAdmin } from '../middlewares/authentification.js';

const router = express.Router();

router.route('/')
    .get(authenticate, isAdmin, getAllUsers)        // Récupérer tous les utilisateurs
    .post(authenticate, isAdmin, createUser);       // Créer un nouvel utilisateur

router.route('/:id')     
    .get(authenticate, isAdmin, getUserById)            // obtenir les informations d'un utilisateur
    .put(authenticate, isAdmin,updateUserById)          // Modifier les informations d'un utilisateur
    .delete(authenticate, isAdmin, deleteUserById);     // Supprimer un utilisateur

export default router;