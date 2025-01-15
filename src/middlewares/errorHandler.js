import {UniqueConstraintError, ValidationError} from "sequelize"

const errorHandler = (error, req, res, next) => {
    if (error instanceof UniqueConstraintError) {
      const substrings = error.parent.sqlMessage.split(`'`);
      const field = substrings[substrings.length - 2];
      return res.status(400).json({ message: `${field} déjà pris` });
    }
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    console.error('Erreur non gérée:', error);
    res.status(500).json({ message: `Une erreur est survenue : ${error.message}` });
  };
  
  export default errorHandler;