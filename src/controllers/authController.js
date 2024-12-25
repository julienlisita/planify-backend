import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import config from '../config/default.js';

// Remplacez cette clé par une clé plus sécurisée dans un fichier `.env`
const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRATION = config.jwt.expiresIn;

// Contrôleur pour la connexion
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
      { id: user.id, email: user.email, role: user.roleId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};