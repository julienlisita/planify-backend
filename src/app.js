import express, { json } from 'express';
import errorHandler from './middlewares/errorhandler.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser'
import helmet from 'helmet';
import morgan from 'morgan';
import {sequelize, connectToDatabase}  from './config/database.js'; 

const app = express();

connectToDatabase();

// Middlewares globaux
app.use(helmet());
app.use(morgan('dev'));
app.use(json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.json({ message: 'Homepage' })
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', userRoutes);
app.use('/api/admin/users', adminRoutes);

// Gestion des erreurs
app.use(errorHandler);

export default app;
