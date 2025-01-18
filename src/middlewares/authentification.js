import jwt from 'jsonwebtoken';
import config from '../config/default.js';
import User from '../models/userModel.js';
const ROLE_ADMIN = 2;
const ROLE_SUPERADMIN = 1;

const authenticate = async (req, res, next) => {
    // Récupération du token depuis les cookies ou les headers
    const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié. Aucun token fourni.' });
    }

    try {
        // Vérification du token JWT
        const decoded = jwt.verify(token, config.jwt.secret);
        // Recherche de l'utilisateur en base de données (avec ses rôles)
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' });
        }

        // Attacher l'utilisateur et ses rôles à la requête pour un accès ultérieur
        req.user = user;
        next(); // Continuer au prochain middleware ou contrôleur
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(403).json({ message: 'Jeton invalide ou expiré.' });
    }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Accès interdit' });
    }
  };
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    // Vérifier si l'utilisateur a le rôle 'admin'
    if (user.roleId !== ROLE_ADMIN ) {
      return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }

    // Si l'utilisateur est admin, passer au middleware suivant
    next();
  } catch (error) {
    console.error('Erreur dans le middleware isAdmin:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la vérification du rôle' });
  }
};

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    // Vérifier si l'utilisateur a le rôle 'superAdmin'
    if (user.roleId !== ROLE_SUPERADMIN) {
      return res.status(403).json({ error: 'Accès réservé aux super administrateurs' });
    }

    // Si l'utilisateur est superAdmin, passer au middleware suivant
    next();
  } catch (error) {
    console.error('Erreur dans le middleware isSuperAdmin:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la vérification du rôle' });
  }
};

export {authenticate, authorize, isAdmin, isSuperAdmin};