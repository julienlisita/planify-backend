import jwt from 'jsonwebtoken';
import config from '../config/default.js';
import User from '../models/userModel.js';

const authenticateAndAuthorize = async (req, res, next) => {
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

const isAdmin = async (req, res, next) => {
    try {
      // Récupérer le token depuis les en-têtes de la requête
      const token = req.headers.authorization?.split(' ')[1]; // On suppose que le token est dans le format "Bearer <token>"
  
      // Si aucun token n'est fourni, renvoyer une erreur
      if (!token) {
        return res.status(401).json({ error: 'Accès non autorisé, token manquant' });
      }
  
      // Vérifier le token avec la clé secrète
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Décodage du token avec la clé secrète
  
      // Récupérer l'utilisateur depuis la base de données à l'aide de l'ID contenu dans le token
      const user = await User.findByPk(decoded.id);
  
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  
      // Vérifier si l'utilisateur a le rôle 'admin'
      if (user.role !== 'admin' && user.role !== 'superAdmin') {
        return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
      }
  
      // Si l'utilisateur est admin, passer au middleware suivant
      req.user = user;  // Ajouter l'utilisateur dans la requête pour l'utiliser dans les autres middlewares ou contrôleurs
      next();
    } catch (error) {
      console.error('Erreur dans le middleware isAdmin:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la vérification du rôle' });
    }
  };

export {authenticateAndAuthorize, isAdmin};