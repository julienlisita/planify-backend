import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Route de connexion
router.route('/login')
    .post(login);

export default router;