import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());
app.use(authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Running server in port ${PORT}`));