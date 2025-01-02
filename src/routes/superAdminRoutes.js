import express from 'express';
import { getAllAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin } from '../controllers/superAdminControllers.js';
import { isSuperAdmin, authenticateAndAuthorize } from '../middlewares/authentification.js';  // Middleware pour vérifier le rôle superadmin

const router = express.Router();

// Routes de gestion des admins par les superAdmins

router.route('/')

// Route pour récupérer la liste complète de tout les admins
    .get(authenticateAndAuthorize,isSuperAdmin, getAllAdmins)

// Route pour ajouter un nouvel admin
    .post(authenticateAndAuthorize,isSuperAdmin, createAdmin);

router.route('/:id')    
// Route pour récupérer un admin par son ID
    .get(authenticateAndAuthorize,isSuperAdmin, getAdminById)

// Route pour modifier les informations d'un admin
    .put(authenticateAndAuthorize,isSuperAdmin, updateAdmin)

// Route pour supprimer un admin
    .delete(authenticateAndAuthorize,isSuperAdmin, deleteAdmin);

export default router;