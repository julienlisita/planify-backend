// adminControllers.js

import bcrypt from 'bcrypt';
import models from '../models/index.js';
const { User } = models;

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        ext(error); // Passer l'erreur au middleware de gestion des erreurs
    }
};

// Créer un user par un admin
const createUser = async (req, res) => {
    const { username, email, password, firstname, lastname, roleId } = req.body;
  
    // Appeler la fonction générique
    await handleCreateUser(
      { username, email, password, firstname, lastname, roleId },
      res
    );
  };

// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error); // Passer l'erreur au middleware de gestion des erreurs
    }
};

// Mettre à jour un utilisateur
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, roleId } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;
        user.roleId = roleId || user.roleId;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        next(error); // Passer l'erreur au middleware de gestion des erreurs
    }
};

// Supprimer un utilisateur
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        await user.destroy();
        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        next(error); // Passer l'erreur au middleware de gestion des erreurs
    }
};

// Fonction générique pour gérer la création d'un utilisateur
  const handleCreateUser = async (userData) => {
    const { username, email, password } = userData;
  
    if (!username || !email || !password) {
      throw new Error('Les champs username, email et password sont requis.');
    }
  
    try {
      const newUser = await createNewUser(userData);
      return newUser; 
    } catch (error) {
      throw error; 
    }
  };
  
  // Fonction pour la logique de création d'un utilisateur (générique)
const createNewUser = async (userData) => {
    const { username, email, password, firstname, lastname, roleId } = userData;
  
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstname,
      lastname,
      roleId,
    });
  
    return newUser;
  };

  export { getAllUsers, getUserById, updateUserById, deleteUserById, createUser, handleCreateUser, createNewUser }