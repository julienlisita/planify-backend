import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import config from '../config/default.js';
import { handleCreateUser} from '../controllers/adminControllers.js'

// Contrôleur pour créer un nouveau compte
  export const signupUser = async (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;
    try{
      // Appeler la fonction générique avec role_id par défaut (user)
      await handleCreateUser(
        { username, email, password, firstname, lastname, roleId: 2 },
        res
    );
    }catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
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
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.roleId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
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