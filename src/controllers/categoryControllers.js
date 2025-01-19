import Category from '../models/categoryModel.js';

const getAllCategories = async (req, res) => {
  try {
    // Récupérer uniquement les champs publics des utilisateurs
    const categories = await Category.findAll({
      attributes: ['name'], // Ajustez en fonction des champs publics
    });

    res.status(200).json({ categories });
  } catch (error) {
      next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};
 
const getCategoryById = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
    const { id } = req.params;

    // Chercher la category dans la base de données
    const categorie = await Category.findByPk(id, {
      attributes: ['name'], 
    });

    // Vérifier si la catégire existe
    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie non trouvée ' });
    }

    return res.status(200).json(categorie);

  } catch (error) {
    next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

export {getAllCategories, getCategoryById};

