import express from 'express';
import { getAllCategories, getCategoryById} from '../controllers/categoryControllers.js';

const router = express.Router();

// Récupère toutes les catégories
router.route('/')
    .get(getAllCategories);      

// Récupère une catégorie par ID
router.route('/:id')
    .post(getCategoryById);

export default router;