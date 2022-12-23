import { connectionDB } from "../db/db.js";
import { userSchema } from "../models/user.model.js";

export default async function userValidation(req, res, next){

    const user = req.body;

    const validation = userSchema.validate(user, { abortEarly: false});

    if(validation.error){

        const errors = validation.error.details.map(e => e.message);

        return res.status(422).send(errors);
    }

    try {
        const userExist = await connectionDB.query("SELECT * FROM users WHERE email=$1;", [user.email]);

        if(userExist.rowCount > 0) return res.sendStatus(409);

    } catch (error) {
        return res.status(500).send(error);
    }

    next()
}