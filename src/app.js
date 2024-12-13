import express, { json } from 'express';
import errorHandler from './middlewares/errorhandler.js';
import userRoutes from './routes/userRoutes.js';
import helmet from 'helmet';
import morgan from 'morgan';
import {sequelize, connectToDatabase}  from './config/database.js'; 

const app = express();

connectToDatabase();

// Middlewares globaux
app.use(helmet());
app.use(morgan('dev'));
app.use(json());


app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

// Routes
app.use('/api/users', userRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;
