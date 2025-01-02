import express from 'express';
import { signupUser,login, logout } from '../controllers/authControllers.js';

const router = express.Router();

// Route pour créer un compte
router.route('/signup')
    .post(signupUser);      

// Route pour se connecter
router.route('/login')
    .post(login);

// Route pour se déconnecter
router.route('/logout')
    .post(logout);

export default router;