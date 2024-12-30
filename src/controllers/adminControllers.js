import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import config from '../config/default.js';

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
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
        return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
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
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error });
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
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
};


// Fonction générique pour gérer la création d'un utilisateur
const handleCreateUser = async (userData, res) => {
    const { username, email, password } = userData;
  
    try {
      // Vérifier si tous les champs obligatoires sont fournis
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Les champs username, email et password sont requis.' });
      }
  
      // Créer l'utilisateur
      const newUser = await createNewUser(userData);
  
      // Réponse avec les données de l'utilisateur (sans le mot de passe)
      return res.status(201).json({
        message: 'Utilisateur créé avec succès.',
        user: newUser,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      return res.status(500).json({
        message: 'Erreur serveur lors de la création de l\'utilisateur.',
        error: error.message,
      });
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