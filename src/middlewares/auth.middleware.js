import { connectionDB } from "../db/db.js";
import { loginSchema } from "../models/login.model.js";
import bcrypt from 'bcrypt';

export default async function authMiddleware(req, res, next){

    const { email, password} = req.body;

    const validation = loginSchema.validate({email, password}, { abortEarly: false } );

    if(validation.error) {
        const errors = validation.error.details.map(e => e.message);
        return res.status(422).send(errors);
    }

    try {
    
        const userExist = await connectionDB.query("SELECT * FROM users WHERE email=$1", [email]);

        if(userExist.rowCount < 1) return res.sendStatus(401);

        if(!bcrypt.compareSync(password, userExist.rows[0].password)) return res.sendStatus(401);

        res.locals.user = userExist.rows[0];

    } catch (error) {
        return res.status(500).send(error.message);
    }


    next();
}