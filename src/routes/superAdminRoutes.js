import express from 'express';
import { getAllAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin } from '../controllers/superAdminControllers.js';
import { isSuperAdmin, authenticate } from '../middlewares/authentification.js';

const router = express.Router();

// Routes de gestion des admins par les superAdmins

router.route('/')

// Route pour récupérer la liste complète de tout les admins
    .get(authenticate,isSuperAdmin, getAllAdmins)

// Route pour ajouter un nouvel admin
    .post(authenticate,isSuperAdmin, createAdmin);

router.route('/:id')    
// Route pour récupérer un admin par son ID
    .get(authenticate,isSuperAdmin, getAdminById)

// Route pour modifier les informations d'un admin
    .put(authenticate,isSuperAdmin, updateAdmin)

// Route pour supprimer un admin
    .delete(authenticate,isSuperAdmin, deleteAdmin);

export default router;