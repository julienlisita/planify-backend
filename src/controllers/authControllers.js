// authControllers.js

import bcrypt from 'bcrypt';
import { handleCreateUser} from '../controllers/adminControllers.js'
import { generateToken } from '../utils/auth.js';
import models from '../models/index.js';
const { User } = models;

// Contrôleur pour créer un nouveau compte
  export const signupUser = async (req, res, next) => {
    const { username, email, password, firstname, lastname } = req.body;
    try {
      const user = await handleCreateUser({ username, email, password, firstname, lastname, roleId: 2 });
      const token = generateToken(user);
      res.status(201).json({ message: 'Utilisateur créé avec succès.', token, user });
    } catch (error) {
      next(error); // Utiliser le gestionnaire d'erreurs global
    }
  };


// Contrôleur pour se connecter
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    //Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    //Générer un token JWT
    const token = generateToken(user);
    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

export const logout = async (req, res) => {
  try {
    // supprimer le token du storage dans le front:
    // - localStorage pour React Web
    // - AsyncStorage pour React Native

    // Réponse de succès pour la déconnexion
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};