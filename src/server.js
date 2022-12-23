import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/user.routes.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
    console.log("teste");
    res.send("oi!");
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Running server in port ${PORT}`));