import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
const ROLE_ADMIN = 2;

// Récupérer tous les admins
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await User.findAll({ where: { roleId: ROLE_ADMIN }, attributes: ['id', 'username', 'firstname','lastname','email'] });
    res.status(200).json({ admins });
  } catch (error) {
    next(error);
  }
};

// Récupérer un admin spécifique
const getAdminById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await User.findByPk(id, { attributes: ['id', 'username','firstname','lastname', 'email', 'roleId'] });

    if (!admin || admin.roleId !== ROLE_ADMIN) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    return res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
};

// Créer un nouvel admin
const createAdmin = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      roleId:ROLE_ADMIN,
    });

    res.status(201).json({ message: 'Admin créé avec succès', admin });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un admin
const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const admin = await User.findByPk(id);

    if (!admin || admin.roleId !== ROLE_ADMIN) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    admin.username = username || admin.username;
    admin.firstname = firstname || admin.firstname;
    admin.lastname = lastname || admin.lastname;
    admin.email = email || admin.email;

    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();

    res.status(200).json({ message: 'Admin mis à jour avec succès', admin });
  } catch (error) {
    next(error);
  }
};

// Supprimer un admin
const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await User.findByPk(id);
    if (!admin || admin.roleId !== ROLE_ADMIN) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    await admin.destroy();
    res.status(200).json({ message: 'Admin supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};

export { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin };