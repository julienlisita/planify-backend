import express from 'express';
import { getAllProfiles, getUserProfile, getOwnProfile, updateOwnProfile, deleteOwnProfile } from '../controllers/userControllers.js';
import { authenticate } from '../middlewares/authentification.js'

const router = express.Router();

// Routes utilisateur : voir, modifier, supprimer son propre profil
router.route('/me')

    .get(authenticate, getOwnProfile) // Voir son propre profil
    .put(authenticate, updateOwnProfile) // Modifier son propre profil
    .delete(authenticate, deleteOwnProfile); // Supprimer son propre profil  

// Route pour consulter le profil public d'un utilisateur (pas besoin d'être authentifié)
router.route('/')
    .get(getAllProfiles);

// Route pour consulter le profil public d'un utilisateur (pas besoin d'être authentifié)
router.route('/:id')
    .get(getUserProfile);


export default router;