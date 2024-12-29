import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Route pour récupérer tous les utilisateurs (GET)
router.route('/')
    .get(getAllUsers)        // Récupérer tous les utilisateurs
    .post(createUser);       // Créer un nouvel utilisateur

// Route pour récupérer un utilisateur par ID, mettre à jour et supprimer (GET, PUT, DELETE)
router.route('/:id')
    .get(getUserById)        // Récupérer un utilisateur par ID
    .put(updateUser)         // Mettre à jour un utilisateur par ID
    .delete(deleteUser);     // Supprimer un utilisateur par ID

export default router;