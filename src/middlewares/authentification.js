import jwt from 'jsonwebtoken';

const authenticateAndAuthorize = async (req, res, next) => {
    // Récupération du token depuis les cookies ou les headers
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Non authentifié. Aucun token fourni.' });
    }

    try {
        // Vérification du token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Recherche de l'utilisateur en base de données (avec ses rôles)
        const user = await User.findByPk(decoded.userId, {
            include: ['roles'], // Suppose que les rôles sont liés au modèle utilisateur
        });

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

export default authenticateAndAuthorize;