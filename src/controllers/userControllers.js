// userController.js

import bcrypt from 'bcrypt';
import models from '../models/index.js';
const { User } = models;


const getAllProfiles = async (req, res) => {
  try {
    // Récupérer uniquement les champs publics des utilisateurs
    const users = await User.findAll({
      attributes: ['id', 'username', 'avatar'], // Ajustez en fonction des champs publics
    });

    res.status(200).json({ users });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};
 
const getUserProfile = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
    const { id } = req.params;

    // Chercher l'utilisateur dans la base de données
    const user = await User.findByPk(id, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'email', 'avatar'], 
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé ' });
    }

    // Retourner les informations publiques de l'utilisateur
    return res.status(200).json(user);

  } catch (error) {
    next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

const getOwnProfile = async (req, res) => {
  try {
    // L'ID de l'utilisateur est extrait du middleware d'authentification
    const userId = req.user.id;
    // Recherche de l'utilisateur par son ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé " });
    }

    res.status(200).json(user);
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

const updateOwnProfile = async (req, res) => {
  const userId = req.user?.id; // ID de l'utilisateur authentifié, obtenu par un middleware (à configurer)
  const { username, email, password, firstname, lastname } = req.body;

  try {
      // Vérifier si l'utilisateur est authentifié
      if (!userId) {
          return res.status(401).json({ message: 'Non autorisé. Veuillez vous connecter.' });
      }

      // Trouver l'utilisateur dans la base
      const user = await User.findByPk(userId);
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé ' });
      }

      // Mettre à jour les informations de l'utilisateur
      user.username = username || user.username;
      user.email = email || user.email;
      user.firstname = firstname || user.firstname;
      user.lastname = lastname || user.lastname;

      // Si un nouveau mot de passe est fourni, le hacher avant de le sauvegarder
      if (password) {
          user.password = await bcrypt.hash(password, 10);
      }

      await user.save();

      // Réponse avec les informations mises à jour (sans le mot de passe)
      const { password: _, ...updatedUser } = user.toJSON(); // Exclure le mot de passe de la réponse
      return res.status(200).json({ message: 'Profil mis à jour avec succès.', user: updatedUser });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

const deleteOwnProfile = async (req, res) => {
  try {
    // Récupérer l'utilisateur connecté depuis `req.user`
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Supprimer l'utilisateur de la base de données
    await user.destroy();

    // Effacer le cookie d'authentification et renvoyer une réponse
    res.clearCookie('access_token')
      .status(200)
      .json({ message: 'Utilisateur supprimé avec succès.', user: { id: user.id, email: user.email } });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs

  }
};

export {getAllProfiles, getUserProfile, getOwnProfile, updateOwnProfile, deleteOwnProfile}


  
