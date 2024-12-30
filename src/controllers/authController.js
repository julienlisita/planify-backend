import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import config from '../config/default.js';
import { handleCreateUser} from '../controllers/adminControllers.js'

// Contrôleur pour créer un nouveau compte
  export const signupUser = async (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;
  
    // Appeler la fonction générique avec role_id par défaut (user)
    await handleCreateUser(
      { username, email, password, firstname, lastname, roleId: 2 },
      res
    );
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
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
  
    res.clearCookie('token', { httpOnly: true, secure: config.app.env === 'production' });

    // Réponse de succès pour la déconnexion
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la déconnexion' });
  }
};