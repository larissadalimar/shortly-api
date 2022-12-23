import { connectionDB } from "../db/db.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export async function create(req, res){

    const { name, password, email} = req.body;

    try {

        await connectionDB.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3)",
        [name, email, bcrypt.hashSync(password, 10)]);

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function login(req, res){

    const user = res.locals.user;

    try {

        const token = uuid();
        await connectionDB.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user.id, token]);

        res.status(200).send(token);

    } catch (error) {

        res.status(500).send(error.message);
    }
}

/* export async function showUser(req, res){

    const user = res.locals.user;

    try {
        
        const userUrls = await connectionDB.query(`SELECT u.id, u.name, SUM("visitCount") AS "visitCount" FROM users JOIN `)
    } catch (error) {
        
    }
} */