import { Router } from 'express';
const router = Router();
import { findAllUsers } from '../controllers/userController.js';

// Exemple de route

router
    .route('/')
    .get(findAllUsers)

export default router;