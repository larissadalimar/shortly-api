import { connectionDB } from "../db/db";

export default async function userUrlValidation(req, res, next){

    const id = req.params.id;
    const user = res.locals.user;

    try {
        const url = await connectionDB.query("SELECT * FROM links WHERE id=$1;" [id]);

        if(url.rowCount < 1) return res.sendStatus(404);

        if(url.rows[0].userId !== user.id) return res.sendStatus(401);

    } catch (error) {
        res.status(500).send(error.message);
    }

    next();
}